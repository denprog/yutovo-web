const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Unordered list', () =>
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

    test.afterEach(async () =>
    {
        if (conn)
            await conn.end();
    });

    //click into the document text below the calculator - the caret of a fresh document sits inside the calculator
    //where the list marker is a no-op; a raw mouse click is used because #scroll-space intercepts canvas clicks
    async function clickIntoText(page)
    {
        const box = await page.locator('#canvas').boundingBox();
        await page.mouse.click(box.x + 400, box.y + 400);
        await page.waitForTimeout(300);
    }

    test('unordered list button is visible and offers all the four markers', async ({ page }) =>
    {
        await expect(page.locator('#unordered-list-button')).toBeVisible();
        //the button is disabled while the caret sits inside the calculator - click into the text first
        await clickIntoText(page);
        await expect(page.locator('#unordered-list-button')).toBeEnabled();
        await page.locator('#unordered-list-button').first().evaluate((el) => el.click());
        await page.waitForTimeout(300);
        await expect(page.locator('#unordered-list-small-circle-item')).toBeVisible();
        await expect(page.locator('#unordered-list-large-circle-item')).toBeVisible();
        await expect(page.locator('#unordered-list-diamond-item')).toBeVisible();
        await expect(page.locator('#unordered-list-square-item')).toBeVisible();
    });

    test('the button is disabled inside the calculator and enabled in the text', async ({ page }) =>
    {
        //the caret of a new document sits inside the calculator where list markers do not apply
        await page.waitForTimeout(500);
        await expect(page.locator('#unordered-list-button')).toBeDisabled();

        await clickIntoText(page);
        await expect(page.locator('#unordered-list-button')).toBeEnabled();
    });

    test('apply a list marker to a paragraph', async ({ page }) =>
    {
        await clickIntoText(page);
        await utils.writeText(page, 'Item');
        await utils.insertUnorderedList(page, 1);
        await page.waitForTimeout(500);
        const html = await page.evaluate(() => window.getHtml());
        expect(html.includes('•&nbsp;')).toBe(true);
        //the plain text does not contain the marker
        expect(await utils.documentContains(page, 'Item')).toBe(true);
        const text = await page.evaluate(() => window.getText());
        expect(String(text).includes('•')).toBe(false);
    });

    test('Enter continues the list and applying the same marker again removes it', async ({ page }) =>
    {
        await clickIntoText(page);
        await utils.writeText(page, 'First');
        await utils.insertUnorderedList(page, 1);
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(300);
        await utils.writeText(page, 'Second');
        await page.waitForTimeout(500);
        const countMarkers =
            (str) => String(str).split('•&nbsp;').length - 1;
        let html = await page.evaluate(() => window.getHtml());
        expect(countMarkers(html)).toBe(2);

        //applying the same marker again toggles it off - only the current (second) item loses the marker
        await utils.insertUnorderedList(page, 1);
        await page.waitForTimeout(500);
        html = await page.evaluate(() => window.getHtml());
        expect(countMarkers(html)).toBe(1);
    });

    test('switch the list marker through all the four variants', async ({ page }) =>
    {
        await clickIntoText(page);
        await utils.writeText(page, 'Item');
        const htmlIncludes =
            async (marker) => (await page.evaluate(() => window.getHtml())).includes(marker + '&nbsp;');
        const markers = ['•', '●', '♦', '■'];
        let previous = null;
        for (let i = 0; i < markers.length; ++i)
        {
            await utils.insertUnorderedList(page, i + 1);
            await page.waitForTimeout(500);
            expect(await htmlIncludes(markers[i])).toBe(true);
            if (previous)
                expect(await htmlIncludes(previous)).toBe(false);
            previous = markers[i];
        }
    });
});
