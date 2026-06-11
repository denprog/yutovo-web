const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Register', () =>
{
    let conn;

    test.beforeEach(async ({ page, context }) =>
    {
        conn = await utils.getDbConnection();
        await utils.deleteTestUser(conn);
        await context.clearCookies();
        await context.addCookies([
            { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
        ]);
        await page.goto(address);
    });

    test.afterEach(async () =>
    {
        if (conn)
    await conn.end();
    });

    test('register new user', async ({ page }) =>
    {
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(2000);
        await utils.registerUser(page, 'test2', '11', 'test2@mail.ru');
        await page.waitForTimeout(2000);
        expect(await utils.loginCaption(page)).toBe('test2');
    });
});
