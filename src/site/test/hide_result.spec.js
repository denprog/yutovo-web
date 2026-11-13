const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Hidden result', () =>
{
    test('hide the result from the context menu and reveal it by a click', async ({ page, context }) =>
    {
        await context.clearCookies();
        await context.addCookies([
            { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
        ]);
        await page.goto(address);
        await page.waitForTimeout(6000);
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 30000 });

        await utils.insertCode(page);
        await utils.writeText(page, '1+2=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '1+2=3.')).toBe(true);

        //the result is rendered on the canvas, find it by clicking: a left click
        //moves the caret and WASM reports whether it is inside a result
        const box = await page.locator('#canvas').boundingBox();
        let resultX = -1;
        let resultY = -1;
        for (let y = 25; y <= 85 && resultX < 0; y += 5)
        {
            for (let x = 60; x <= 210; x += 5)
            {
                await page.mouse.click(box.x + x, box.y + y);
                await page.waitForTimeout(150);
                const p = await page.evaluate(() => Module.cwrap('GetPresentAsMenu', 'int', [])());
                if (p != 0)
                {
                    resultX = x;
                    resultY = y;
                    break;
                }
            }
        }
        expect(resultX).toBeGreaterThan(0);

        //the context menu of the result contains the Hide item
        await page.mouse.click(box.x + resultX, box.y + resultY, { button: 'right' });
        await page.locator('#hide-result-menu').waitFor({ state: 'visible', timeout: 5000 });

        //the click collapses the result into the "Show result" box and closes the menu
        await page.locator('#hide-result-menu').click();
        await page.waitForTimeout(500);
        await expect(page.locator('#copy-menu')).toBeHidden();
        const hidden_html = await page.evaluate(() => window.getHtml());
        expect(String(hidden_html).includes('<mtext>Show result</mtext>')).toBe(true);
        expect(await utils.documentContains(page, '1+2=3.')).toBe(true); //the document text keeps the value

        //a click on the collapsed box reveals the content; the box sits right after the '='
        //sign, scan the line for it - the box is wider than the collapsed value
        let revealed = false;
        for (let y = 25; y <= 85 && !revealed; y += 6)
        {
            for (let x = 100; x <= 320 && !revealed; x += 8)
            {
                await page.mouse.click(box.x + x, box.y + y);
                await page.waitForTimeout(120);
                const html = await page.evaluate(() => window.getHtml());
                if (!String(html).includes('<mtext>Show result</mtext>'))
                    revealed = true;
            }
        }
        expect(revealed).toBe(true);
        const shown_html = await page.evaluate(() => window.getHtml());
        expect(String(shown_html).includes('3.')).toBe(true);
    });
});
