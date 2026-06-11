const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Login', () =>
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
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 30000 });
    });

    test.afterEach(async () =>
    {
        if (conn)
    await conn.end();
    });

    test('login and logout', async ({ page, context }) =>
    {
        await page.waitForTimeout(1000);
        await utils.login(page, 'test1', '11');
        const c = await page.locator('#login').textContent({ timeout: 10000 });
        expect(c).toBe('test1');
        await utils.logout(page);
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');
        expect(c1).toBeNull();
        const count = await page.locator('#login').count();
        expect(count).toBe(0);
    });

    test('login and logout two users', async ({ page, context }) =>
    {
        await page.waitForTimeout(1000);
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 10000 });
        await page.waitForTimeout(1000);
        await page.keyboard.type('document_test_1');
        await page.waitForTimeout(1000);
        await utils.save(page);
        await page.waitForTimeout(3000);
        await utils.logout(page);
        await page.waitForSelector('#logout', { state: 'hidden', timeout: 10000 });
        await page.waitForTimeout(1000);

        await utils.login(page, 'test2', '11');
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 10000 });
        await page.waitForTimeout(1000);
        await page.keyboard.type('document_test_2');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(2000);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
        await utils.save(page);
        await page.waitForTimeout(2000);
        await utils.logout(page);
        await page.waitForTimeout(1000);

        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(3000);
        await utils.clickDocument(page, 'document_1');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'document_test_1')).toBe(true);
        await utils.logout(page);

        await utils.login(page, 'test2', '11');
        await page.waitForTimeout(3000);
        await utils.clickDocument(page, 'document_1');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'document_test_2')).toBe(true);
        await utils.logout(page);
    });

    test('set language', async ({ page }) =>
    {
        await page.waitForTimeout(1000);
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);
        await utils.setLanguage(page, 'Русский');
        await utils.logout(page);
        await page.waitForTimeout(1000);

        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);
        expect(await utils.getLanguage(page)).toBe('Русский');

        await page.goto(address);
        await page.waitForTimeout(4000);
        expect(await utils.getLanguage(page)).toBe('Русский');
    });

    test('paste into password field goes to password field', async ({ page, context }) =>
    {
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        await page.waitForTimeout(1000);
        await page.locator("xpath=//*[contains(text(), 'Login')] | //*[contains(text(), 'Войти')] | //*[contains(text(), 'Acceder')]").first().evaluate((el) => el.click());
        await page.waitForTimeout(1000);

        await page.locator("xpath=//input[contains(@class, 'login-username')]").fill('testuser');
        await page.evaluate(() => navigator.clipboard.writeText('testpassword'));
        await page.locator("xpath=//input[contains(@class, 'login-password')]").click();
        await page.waitForTimeout(500);
        await page.keyboard.press('Shift+Insert');
        await page.waitForTimeout(500);

        const passwordValue = await page.locator("xpath=//input[contains(@class, 'login-password')]").inputValue();
        const usernameValue = await page.locator("xpath=//input[contains(@class, 'login-username')]").inputValue();
        expect(passwordValue).toBe('testpassword');
        expect(usernameValue).toBe('testuser');
    });
});
