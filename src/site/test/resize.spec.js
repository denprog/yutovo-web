const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Editor resize', () =>
{
    let conn;

    test.beforeEach(async ({ page, context }) =>
    {
        conn = await utils.getDbConnection();
        await utils.clearTestUser(conn);
        await context.clearCookies();
        await context.addCookies([
            { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
        ]);
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);
        await page.goto(address);
        await page.waitForTimeout(6000);
        await page.evaluate(() =>
        {
            localStorage.clear();
            sessionStorage.clear();
        });
    });

    test.afterEach(async () =>
    {
        if (conn)
            await conn.end();
    });

    test('editor shrinks with viewport and scrolls only after reaching minimum height', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const getSizes = () => page.evaluate(() =>
        {
            const editor = document.getElementById('editor');
            return {
                editorHeight: editor ? editor.clientHeight : 0,
                scrollHeight: document.documentElement.scrollHeight,
                viewportHeight: window.innerHeight
            };
        });

        await page.setViewportSize({ width: 1280, height: 900 });
        await page.waitForTimeout(1000);
        const large = await getSizes();

        await page.setViewportSize({ width: 1280, height: 600 });
        await page.waitForTimeout(1000);
        const medium = await getSizes();

        await page.setViewportSize({ width: 1280, height: 300 });
        await page.waitForTimeout(1000);
        const small = await getSizes();

        expect(medium.editorHeight).toBeLessThan(large.editorHeight);
        expect(medium.editorHeight).toBeGreaterThanOrEqual(200);
        expect(small.editorHeight).toBe(200);

        //no page scroll while the editor is above the minimum height
        expect(large.scrollHeight).toBeLessThanOrEqual(large.viewportHeight + 1);
        expect(medium.scrollHeight).toBeLessThanOrEqual(medium.viewportHeight + 1);

        //once the minimum height is reached, the page should scroll
        expect(small.scrollHeight).toBeGreaterThan(small.viewportHeight);
    });

    test('canvas drawing buffer matches display size after resize', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const getCanvasSizes = () => page.evaluate(() =>
        {
            const canvas = document.getElementById('canvas');
            return {
                cssWidth: canvas ? canvas.clientWidth : 0,
                cssHeight: canvas ? canvas.clientHeight : 0,
                bufferWidth: canvas ? canvas.width : 0,
                bufferHeight: canvas ? canvas.height : 0
            };
        });

        await page.setViewportSize({ width: 1280, height: 900 });
        await page.waitForTimeout(1000);
        const large = await getCanvasSizes();
        expect(large.bufferWidth).toBe(large.cssWidth);
        expect(large.bufferHeight).toBe(large.cssHeight);

        await page.setViewportSize({ width: 1280, height: 600 });
        await page.waitForTimeout(1000);
        const medium = await getCanvasSizes();
        expect(medium.bufferWidth).toBe(medium.cssWidth);
        expect(medium.bufferHeight).toBe(medium.cssHeight);

        await page.setViewportSize({ width: 1280, height: 300 });
        await page.waitForTimeout(1000);
        const small = await getCanvasSizes();
        expect(small.bufferWidth).toBe(small.cssWidth);
        expect(small.bufferHeight).toBe(small.cssHeight);
    });

    test('paste keeps scroll position when page is scrolled', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        //make the window small enough to create page scroll
        await page.setViewportSize({ width: 1280, height: 300 });
        await page.waitForTimeout(1000);

        //scroll down a bit
        await page.evaluate(() => window.scrollTo(0, 50));
        const scrollBefore = await page.evaluate(() => window.scrollY);
        expect(scrollBefore).toBe(50);

        //put text into the clipboard and paste it
        await page.evaluate(() => navigator.clipboard.writeText('pasted_text'));
        await page.locator('#canvas').focus();
        await page.keyboard.press('Control+v');
        await page.waitForTimeout(1000);

        const scrollAfter = await page.evaluate(() => window.scrollY);
        expect(scrollAfter).toBe(scrollBefore);

        //make sure the paste actually happened
        expect(await utils.documentContains(page, 'pasted_text')).toBe(true);
    });

    test('toolbars wrap instead of overflowing on narrow viewport', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const getOverflow = () => page.evaluate(() =>
        {
            const panels = Array.from(document.querySelectorAll('.toolbar-panel'));
            const panelsOverflow = panels.reduce((max, panel) => Math.max(max, panel.scrollWidth - panel.clientWidth), 0);
            const toolbars = document.getElementById('toolbars');
            return {
                panelsOverflow: panelsOverflow,
                toolbarsOverflow: toolbars ? toolbars.scrollWidth - toolbars.clientWidth : 0,
                pageOverflow: document.documentElement.scrollWidth - window.innerWidth
            };
        });

        for (const width of [900, 700])
        {
            await page.setViewportSize({ width: width, height: 900 });
            await page.waitForTimeout(1000);
            const state = await getOverflow();
            expect(state.panelsOverflow).toBeLessThanOrEqual(1);
            expect(state.toolbarsOverflow).toBeLessThanOrEqual(1);
            expect(state.pageOverflow).toBeLessThanOrEqual(1);
        }

        //the buttons must stay reachable without page-level horizontal scrolling
        await expect(page.locator('#bold-button')).toBeVisible();
        await expect(page.locator('#graph-line-button')).toBeVisible();
    });

    test('toolbars can be toggled from the context menu and the state persists', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        await expect(page.locator('#calculus-toolbar')).toBeVisible();
        await expect(page.locator('#logical-toolbar')).toBeVisible();

        //the menu closes after every click - open it again for the second panel
        await page.locator('#toolbars').click({ button: 'right' });
        await page.locator('#calculus-toolbar-item').click();
        await expect(page.locator('#calculus-toolbar-item')).toBeHidden();
        await expect(page.locator('#calculus-toolbar')).toBeHidden();

        await page.locator('#toolbars').click({ button: 'right' });
        await page.locator('#logical-toolbar-item').click();
        await expect(page.locator('#logical-toolbar')).toBeHidden();

        const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('yutovo-toolbar-visibility')));
        expect(saved['calculus']).toBe(false);
        expect(saved['logical']).toBe(false);
        expect(saved['standard']).toBe(true);

        //the state survives a page reload
        await page.reload();
        await page.waitForTimeout(6000);

        await expect(page.locator('#calculus-toolbar')).toBeHidden();
        await expect(page.locator('#logical-toolbar')).toBeHidden();

        //clicking the toggle itself also toggles the panel and closes the menu
        await page.locator('#toolbars').click({ button: 'right' });
        await page.locator('#calculus-toolbar-item .q-toggle').click();
        await expect(page.locator('#calculus-toolbar-item')).toBeHidden();
        await expect(page.locator('#calculus-toolbar')).toBeVisible();

        await page.locator('#toolbars').click({ button: 'right' });
        await page.locator('#logical-toolbar-item .q-toggle').click();
        await expect(page.locator('#logical-toolbar')).toBeVisible();
    });

    test('toolbars can be reordered by dragging and the order persists', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const panelOrder = () => page.evaluate(() =>
            Array.from(document.querySelectorAll('.toolbar-panel'))
                .map(el => ({ id: el.id, order: parseInt(getComputedStyle(el).order, 10) }))
                .sort((a, b) => a.order - b.order)
                .map(panel => panel.id.replace('-toolbar', '')));

        const dragPanel = (dragId, targetId, half) => page.evaluate(([dragId, targetId, half]) =>
        {
            const drag = document.getElementById(dragId);
            const target = document.getElementById(targetId);
            const rect = target.getBoundingClientRect();
            const dt = new DataTransfer();
            const toolbars = document.getElementById('toolbars');
            const point =
            {
                clientX: rect.left + rect.width * half,
                clientY: rect.top + rect.height / 2
            };
            drag.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: dt }));
            toolbars.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt, ...point }));
            toolbars.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt, ...point }));
            drag.dispatchEvent(new DragEvent('dragend', { bubbles: true }));
        }, [dragId, targetId, half]);

        expect((await panelOrder())[0]).toBe('standard');

        //the panel shows the move cursor - it can be grabbed and dragged -
        //while the buttons keep the pointer cursor
        const cursors = await page.evaluate(() =>
        {
            return {
                panel: getComputedStyle(document.getElementById('standard-toolbar')).cursor,
                button: getComputedStyle(document.getElementById('bold-button')).cursor
            };
        });
        expect(cursors.panel).toBe('move');
        expect(cursors.button).toBe('pointer');

        //drop on the left edge of the standard panel - the dragged panel goes first
        await dragPanel('calculus-toolbar', 'standard-toolbar', 0.01);
        const order = await panelOrder();
        expect(order[0]).toBe('calculus');
        expect(order[1]).toBe('standard');

        //drop on the right edge of the calculus panel - the graphs panel goes right after it
        await dragPanel('graphs-toolbar', 'calculus-toolbar', 0.99);
        const orderAfterRightEdge = await panelOrder();
        expect(orderAfterRightEdge[0]).toBe('calculus');
        expect(orderAfterRightEdge[1]).toBe('graphs');
        expect(orderAfterRightEdge[2]).toBe('standard');

        const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('yutovo-toolbar-order')).flat());
        expect(saved[1]).toBe('graphs');

        //the order survives a page reload
        await page.reload();
        await page.waitForTimeout(6000);
        expect((await panelOrder())[1]).toBe('graphs');

        //the panels really moved on the screen - the graphs panel follows the calculus one
        const calculus = await page.locator('#calculus-toolbar').boundingBox();
        const graphs = await page.locator('#graphs-toolbar').boundingBox();
        expect(Math.abs(calculus.y - graphs.y)).toBeLessThan(3);
        expect(calculus.x).toBeLessThan(graphs.x);

        await page.evaluate(() => localStorage.removeItem('yutovo-toolbar-order'));
    });

    test('a panel can be dropped in front of the first panel of a row', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        //find the first panel of the second on-screen row
        const target = await page.evaluate(() =>
        {
            const panels = Array.from(document.querySelectorAll('.toolbar-panel')).map(el =>
            {
                const r = el.getBoundingClientRect();
                return { id: el.id, left: r.left, top: r.top };
            });
            const top = Math.min(...panels.map(p => p.top));
            const row2 = panels.filter(p => p.top > top + 3);
            return row2.length > 0 ? row2[0] : null;
        });
        expect(target).not.toBeNull();

        //drop the calculus panel just in front of that panel
        await page.evaluate((targetId) =>
        {
            const drag = document.getElementById('calculus-toolbar');
            const target = document.getElementById(targetId);
            const rect = target.getBoundingClientRect();
            const dt = new DataTransfer();
            const toolbars = document.getElementById('toolbars');
            const point =
            {
                clientX: rect.left - 5,
                clientY: rect.top + rect.height / 2
            };
            drag.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: dt }));
            toolbars.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt, ...point }));
            toolbars.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt, ...point }));
            drag.dispatchEvent(new DragEvent('dragend', { bubbles: true }));
        }, target.id);
        await page.waitForTimeout(300);

        //the dragged panel must take the exact place where the row started -
        //not join the tail of the row above
        const calculus = await page.locator('#calculus-toolbar').boundingBox();
        expect(Math.abs(calculus.y - target.top)).toBeLessThan(3);
        expect(Math.abs(calculus.x - target.left)).toBeLessThan(3);

        await page.evaluate(() => localStorage.removeItem('yutovo-toolbar-order'));
    });

    test('header fits on narrow viewport', async ({ page }) =>
    {
        await page.setViewportSize({ width: 500, height: 600 });
        await page.waitForTimeout(1000);

        const headerOverflow = await page.evaluate(() =>
        {
            const header = document.getElementById('header');
            return header ? header.scrollWidth - header.clientWidth : 0;
        });
        expect(headerOverflow).toBeLessThanOrEqual(1);
    });
});
