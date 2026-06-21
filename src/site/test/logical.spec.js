const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Logical operations toolbar', () =>
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

    test('toolbar buttons insert mathematical logical symbols', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        const buttons = [
            { img: '/images/logical/and.png', symbol: '∧' },
            { img: '/images/logical/or.png', symbol: '∨' },
            { img: '/images/logical/xor.png', symbol: '⊕' },
            { img: '/images/logical/not.png', symbol: '¬' },
        ];

        for (const btn of buttons)
        {
            const locator = page.locator(`img[src="${btn.img}"]`).first();
            await expect(locator).toBeVisible();
            await locator.click();
            await page.waitForTimeout(200);
        }

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('∧');
        expect(text).toContain('∨');
        expect(text).toContain('⊕');
        expect(text).toContain('¬');
    });

    test('caret key inserts power', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        await page.keyboard.type('2');
        await page.keyboard.press('^');
        await page.keyboard.type('3');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('pow(2,3)');
    });
});
