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

    test('insert and fill a surface graph', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        const canvas = await page.locator('#canvas');
        const box = await canvas.boundingBox();
        await page.mouse.click(box.x + 50, box.y + 50);
        await page.waitForTimeout(500);
        await utils.insertCode(page);
        await page.waitForTimeout(1000);
        await utils.insertGraphSurface(page);
        await page.waitForTimeout(2000);

        //fill in the graph: y_top=2, expression=x+y, y_bottom=-2, x_left=-4, x_right=4
        //the variable rows are prefilled: entering a row stops before the string - three arrows pass through it
        await page.keyboard.type('2');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('x');
        await utils.writeText(page, '+');
        await page.keyboard.type('y');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Minus');
        await page.keyboard.type('2');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Minus');
        await page.keyboard.type('4');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('4');
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('graph_surface(2,x+y,-2,-4,x,4,y)');
    });
});
