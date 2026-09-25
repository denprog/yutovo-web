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

    test('insert and fill a histogram graph', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const canvas = await page.locator('#canvas');
        const box = await canvas.boundingBox();
        await page.mouse.click(box.x + 50, box.y + 50);
        await page.waitForTimeout(500);
        await utils.insertCode(page);
        await page.waitForTimeout(1000);
        await utils.insertGraphHistogram(page);
        await page.waitForTimeout(2000);

        //the histogram has a single field: the array expression, one paragraph is one bar series
        await page.keyboard.type('[1,5,3,2]');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('graph_bar([1,5,3,2])');
    });
});
