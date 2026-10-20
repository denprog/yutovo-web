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

//The e-mail code requests must carry the ui language and no client-side subject or message.
test.describe('Send email code', () =>
{
    const inputsXPath = '.q-dialog input';

    test.beforeEach(async ({ page, context }) =>
    {
        await context.clearCookies();
        await context.addCookies([
            { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
        ]);
        await page.goto(address);
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 10000 });
        await page.waitForTimeout(2000);
    });

    async function sendRegisterCode(page, login, email)
    {
        await page.locator('#register').first().evaluate((el) => el.click());
        await page.waitForTimeout(1000);
        const inputs = page.locator(inputsXPath);
        if (await inputs.count() < 6)
        {
            test.skip(true, 'the captcha field is hidden in test builds, run against a production frontend build');
        }
        await inputs.nth(0).fill(login);
        await inputs.nth(1).fill(login);
        await inputs.nth(2).fill(email);
        await inputs.nth(3).fill('11');
        await inputs.nth(4).fill('11');
        await inputs.nth(5).fill('000000');
        await page.locator('.q-dialog button.bg-primary').first().evaluate((el) => el.click());
    }

    test('register sends language instead of subject and message (en)', async ({ page }) =>
    {
        let payload = null;
        await page.route('**/auth/send-email-code', async (route) =>
            {
                payload = route.request().postDataJSON();
                await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
            });

        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await sendRegisterCode(page, 'test2', 'test2@mail.ru');

        await expect.poll(() => payload).toBeTruthy();
        expect(payload.language).toBe('en');
        expect(payload.action).toBe('register');
        expect(payload.login).toBe('test2');
        expect(payload.email).toBe('test2@mail.ru');
        expect(payload.captcha).toBe('000000');
        expect(payload.subject).toBeUndefined();
        expect(payload.message).toBeUndefined();
    });

    test('register sends the selected ui language (ru)', async ({ page }) =>
    {
        let payload = null;
        await page.route('**/auth/send-email-code', async (route) =>
            {
                payload = route.request().postDataJSON();
                await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
            });

        await utils.setLanguage(page, 'Русский');
        await page.waitForTimeout(1000);
        await sendRegisterCode(page, 'test2', 'test2@mail.ru');

        await expect.poll(() => payload).toBeTruthy();
        expect(payload.language).toBe('ru');
        expect(payload.action).toBe('register');
        expect(payload.subject).toBeUndefined();
        expect(payload.message).toBeUndefined();
    });
});
