const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Functions', () =>
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

    test('function at point button inserts the template and solves', async ({ page }) =>
    {
        //declare the function first
        await utils.insertCode(page);
        await utils.writeText(page, 'func(y):y^2');
        await page.keyboard.press('ArrowRight'); //move out of the exponent
        await page.waitForTimeout(3000);

        //use it below with the button
        await page.keyboard.press('Enter'); //new paragraph
        await page.waitForTimeout(200);
        const button = page.locator('img[src="/images/algebra/function_at_point.png"]').first();
        await expect(button).toBeVisible();
        await button.click(); //the brackets for the function followed by the evaluation bar
        await page.waitForTimeout(200);

        await utils.writeText(page, 'func');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, 'y');
        for (let i = 0; i < 4; ++i)
            await page.keyboard.press('ArrowRight');
        await utils.writeText(page, 'y');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '3');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('func(y)[y=3]=9');
    });
});
