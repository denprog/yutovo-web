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

test.describe('Comparison operations toolbar', () =>
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

    test('toolbar buttons insert comparison symbols', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        const buttons = [
            { img: '/images/algebra/equal.png', symbol: '=' },
            { img: '/images/algebra/greater.png', symbol: '>' },
            { img: '/images/algebra/less.png', symbol: '<' },
            { img: '/images/algebra/greater_equal.png', symbol: '\u2a7e' },
            { img: '/images/algebra/less_equal.png', symbol: '\u2a7d' },
            { img: '/images/algebra/not_equal.png', symbol: '\u2260' },
        ];

        for (const btn of buttons)
        {
            const locator = page.locator(`img[src="${btn.img}"]`).first();
            await expect(locator).toBeVisible();
            await locator.click();
            await page.waitForTimeout(200);
        }

        const text = await page.evaluate(() => window.getText());
        for (const btn of buttons)
            expect(text).toContain(btn.symbol);
    });

    test('comparison buttons build a solvable inequality', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        await page.keyboard.type('2');
        await page.locator('img[src="/images/algebra/greater.png"]').first().click();
        await page.waitForTimeout(200);
        await page.keyboard.type('3');
        await page.keyboard.press('ArrowRight'); //leave the comparison
        await page.keyboard.press('=');
        await page.waitForTimeout(2000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('2>3=0.');
    });

    test('keyboard inserts comparison operators', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        await page.keyboard.type('2');
        await page.keyboard.press('<');
        await page.keyboard.type('3');
        await page.keyboard.press('ArrowRight'); //leave the comparison
        await page.keyboard.type('5');
        await page.keyboard.press('Control+=');
        await page.keyboard.type('5');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('2<3');
        expect(text).toContain('5=5');
    });

    test('comma after a comparison separates the if arguments', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        await page.keyboard.type('if(1');
        await page.keyboard.press('<');
        await page.keyboard.type('2');
        await page.keyboard.press(','); //leaves the comparison into the if head
        await page.keyboard.type('(3),(4))');
        await page.keyboard.press('=');
        await page.waitForTimeout(2000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('if(1<2,(3),(4))=3.');
    });

    test('keyboard modifier shortcuts insert compound comparisons', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });

        await page.keyboard.type('2');
        await page.keyboard.press('Control+Shift+='); //not equal
        await page.keyboard.type('3');
        await page.keyboard.press('ArrowRight'); //leave the comparison
        await page.keyboard.type('4');
        await page.keyboard.press('Control+Shift+Period'); //Ctrl+Shift+>, greater or equal
        await page.keyboard.type('5');
        await page.keyboard.press('ArrowRight'); //leave the comparison
        await page.keyboard.type('6');
        await page.keyboard.press('Control+Shift+Comma'); //Ctrl+Shift+<, less or equal
        await page.keyboard.type('7');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('2\u22603');
        expect(text).toContain('4\u2a7e5');
        expect(text).toContain('6\u2a7d7');
    });
});
