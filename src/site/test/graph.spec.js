const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Graphs', () =>
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
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 30000 });
    });

    test.afterEach(async () =>
    {
        if (conn)
            await conn.end();
    });

    test('copy a graph from a code block as PNG into text', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const canvas = await page.locator('#canvas');
        const box = await canvas.boundingBox();
        await page.mouse.click(box.x + 50, box.y + 50);
        await page.waitForTimeout(500);
        await utils.insertCode(page);
        await page.waitForTimeout(1000);
        await utils.insertGraphLine(page);
        await page.waitForTimeout(2000);

        //fill in the graph: y_top=1, expression=x, y_bottom=-1, x_left=-1, variable=x, x_right=1
        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('x');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Minus');
        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Minus');
        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('x');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('1');
        await page.waitForTimeout(3000);

        //move caret to the graph (home twice, then right)
        await page.keyboard.press('Home');
        await page.keyboard.press('Home');
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(500);

        //get the canvas CSS scale and the original graph image dimensions
        const canvasInfo = await page.evaluate(
            () =>
            {
                const c = document.getElementById('canvas');
                const rect = c.getBoundingClientRect();
                return {
                    backingWidth: c.width,
                    backingHeight: c.height,
                    cssWidth: rect.width,
                    cssHeight: rect.height
                };
            });
        const scaleX = canvasInfo.cssWidth / canvasInfo.backingWidth;
        const scaleY = canvasInfo.cssHeight / canvasInfo.backingHeight;

        const originalImageInfo = await page.evaluate(
            async () =>
            {
                const dataUrl = UTF8ToString(Module.cwrap('GetGraphImage', 'number', [])());
                const img = new Image();
                img.src = dataUrl;
                await new Promise((resolve) => { img.onload = resolve; });
                return { width: img.width, height: img.height };
            });
        expect(originalImageInfo.width).toBeGreaterThan(0);
        expect(originalImageInfo.height).toBeGreaterThan(0);

        const expectedWidth = Math.max(1, Math.round(originalImageInfo.width * scaleX));
        const expectedHeight = Math.max(1, Math.round(originalImageInfo.height * scaleY));

        //open context menu and copy the graph image
        const box2 = await canvas.boundingBox();
        await page.mouse.click(box2.x + 120, box2.y + 120, { button: 'right' });
        await page.waitForTimeout(800);
        await expect(page.locator('#copy-graph-image')).toBeVisible({ timeout: 2000 });
        await utils.copyGraphImage(page);
        await page.waitForTimeout(1000);

        const htmlBefore = await page.evaluate(() => window.getHtml());

        //move caret out of the code block into normal text and paste
        await page.keyboard.press('End');
        await page.waitForTimeout(300);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
        await utils.paste(page);
        await page.waitForTimeout(2000);

        //verify the document text/HTML contains the pasted image
        const htmlAfter = await page.evaluate(() => window.getHtml());
        expect(htmlAfter).toContain('data:image/png;base64,');

        //verify the pasted image dimensions match the on-screen graph size
        function extractPngSrcs(html)
        {
            const matches = html.match(/data:image\/png;base64,[A-Za-z0-9+/=]+/g);
            return matches || [];
        }

        const beforeSrcs = extractPngSrcs(htmlBefore);
        const afterSrcs = extractPngSrcs(htmlAfter);
        const newSrcs = afterSrcs.filter((s) => !beforeSrcs.includes(s));
        expect(newSrcs.length).toBeGreaterThan(0);

        const pastedImageInfo = await page.evaluate(
            async (src) =>
            {
                const img = new Image();
                img.src = src;
                await new Promise((resolve) => { img.onload = resolve; });
                return { width: img.width, height: img.height };
            }, 
            newSrcs[0]);

        expect(pastedImageInfo.width).toBe(expectedWidth);
        expect(pastedImageInfo.height).toBe(expectedHeight);

        //verify the original graph is still present (graph_line(...) in text)
        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('graph_line(');
    });
});
