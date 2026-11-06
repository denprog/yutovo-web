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

    test('solve the limit of sin(x)/x at zero', async ({ page }) =>
    {
        await utils.insertCode(page);
        await utils.insertLimit(page);
        await page.waitForTimeout(500);
        //the caret starts in the variable row: fill the variable, cross the arrow into the value row,
        //leave the limit into the containing row and type the function
        await page.keyboard.type('x');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('0');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('sin(x)/x');
        await page.keyboard.press('ArrowRight'); //leave the denominator of the fraction
        await page.keyboard.type('=');
        await page.waitForTimeout(3000);
        const text = await page.evaluate(() => window.getText());
        expect(String(text)).toContain('lim[x\u21920]');
        expect(String(text)).toContain('=1.');
    });

    test('solve the one-sided limit of 1/x at zero plus', async ({ page }) =>
    {
        await utils.insertCode(page);
        await utils.insertLimit(page);
        await page.waitForTimeout(500);
        //the direction is a power of the value: 0^+
        await page.keyboard.type('x');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('0^+');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('1/x');
        await page.keyboard.press('ArrowRight'); //leave the denominator of the fraction
        await page.keyboard.type('=');
        await page.waitForTimeout(3000);
        const text = await page.evaluate(() => window.getText());
        expect(String(text)).toContain('lim[x\u2192pow(0,+)]');
        expect(String(text)).toContain('\u221e');
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

    test('syntax error for 234 & 456= in German', async ({ page }) =>
    {
        await utils.setLanguage(page, 'Deutsch');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, 'Syntaxfehler')).toBe(true);
    });

    test('syntax error for 234 & 456= in French', async ({ page }) =>
    {
        await utils.setLanguage(page, 'Français');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, "Erreur de syntaxe")).toBe(true);
    });

    test('syntax error for 234 & 456= in Italian', async ({ page }) =>
    {
        await utils.setLanguage(page, 'Italiano');
        await utils.insertCode(page);
        await utils.writeText(page, '234 & 456=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, "Errore di sintassi")).toBe(true);
    });
});
