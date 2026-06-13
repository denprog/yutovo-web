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
});
