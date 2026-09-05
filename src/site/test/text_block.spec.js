const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Text block', () =>
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

    test('insert text block button is visible', async ({ page }) =>
    {
        await expect(page.locator('#insert-text-block-button')).toBeVisible();
    });

    test('code block cannot be inserted into a text block', async ({ page }) =>
    {
        await utils.insertTextBlock(page);
        await page.waitForTimeout(500);
        await utils.writeText(page, 'x');
        await page.waitForTimeout(500);
        await utils.insertCode(page);
        await page.waitForTimeout(1000);
        //the insert was rejected - the caret stays in the text block, the equation is not solved
        await utils.writeText(page, '=1');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, 'x=1')).toBe(true);
        expect(await utils.documentContains(page, '~')).toBe(false);
    });

    test('typing = in a text block placed in the document text', async ({ page }) =>
    {
        //click into the document text below the code block
        const box = await page.locator('#canvas').boundingBox();
        await page.mouse.click(box.x + 350, box.y + 600);
        await page.waitForTimeout(500);
        await utils.insertTextBlock(page);
        await page.waitForTimeout(500);
        await utils.writeText(page, '2x=9');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '2x=9')).toBe(true);
        //= creates a text equation, not a plain string
        const html = await page.evaluate(() => window.getHtml());
        expect(String(html)).toContain('<mo>=</mo>');
    });

    test('typing in a text block is not solved', async ({ page }) =>
    {
        await utils.insertTextBlock(page);
        await page.waitForTimeout(500);
        //the entered right part stays as typed - a computing block would replace 7 with 5
        await utils.writeText(page, '2+3=7');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '2+3=7')).toBe(true);
        expect(await utils.documentContains(page, '~')).toBe(false);
    });
});
