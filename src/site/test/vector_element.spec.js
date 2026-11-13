const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Vector with arrow', () =>
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

    test('insert and fill a vector with arrow', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertVectorElement(page);
        await page.waitForTimeout(500);

        //the caret starts in the vector row - the arrow does not change the text
        await page.keyboard.type('a+b');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(String(text)).toContain('a+b');
    });

    test('the equation solves the row content of the vector', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertVectorElement(page);
        await page.waitForTimeout(500);

        //the vector is a notation only - the parser string is the row content
        await page.keyboard.type('x+1');
        await page.keyboard.press('ArrowRight'); //leave the vector into the containing row
        await page.keyboard.type('=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(String(text)).toContain('x+1');
        expect(String(text)).toContain('=1+x');
    });
});
