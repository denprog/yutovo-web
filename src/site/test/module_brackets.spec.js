const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Module brackets', () =>
{
    test.beforeEach(async ({ page, context }) =>
    {
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

    test('insert and fill the module brackets', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertModuleBrackets(page);
        await page.waitForTimeout(500);

        //the caret starts between the bars
        await page.keyboard.type('5');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(String(text)).toContain('|5|');
    });

    test('the module brackets mean the absolute value', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertModuleBrackets(page);
        await page.waitForTimeout(500);

        await page.keyboard.type('2-7');
        await page.keyboard.press('End'); //leave the module before the equation
        await page.keyboard.type('=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(String(text)).toContain('|2-7|');
        expect(String(text)).toContain('=5');
    });
});
