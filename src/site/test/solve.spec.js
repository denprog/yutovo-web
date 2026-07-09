const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Solve', () =>
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

    test('solve simple simbolic expression', async ({ page }) =>
    {
        await utils.insertCode(page);
        await utils.writeText(page, 'x+x=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '2*x')).toBe(true);
    });

    test('syntax error for 234 & 456= in English', async ({ page }) =>
    {
        await utils.setLanguage(page, 'English');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, 'Syntax error')).toBe(true);
    });

    test('syntax error for 234 & 456= in Russian', async ({ page }) =>
    {
        await utils.setLanguage(page, 'Русский');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, 'Синтаксическая ошибка')).toBe(true);
    });

    test('syntax error for 234 & 456= in Spanish', async ({ page }) =>
    {
        await utils.setLanguage(page, 'Español');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, 'Error de sintaxis')).toBe(true);
    });

    test('syntax error for 234 & 456= in Portuguese', async ({ page }) =>
    {
        await utils.setLanguage(page, 'Português brasileiro');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, 'Erro de sintaxe')).toBe(true);
    });
});
