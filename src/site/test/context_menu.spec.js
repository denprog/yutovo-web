const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Result context menu', () =>
{
    test('submenus open on hover', async ({ page, context }) =>
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

        //open the context menu of the result
        await page.mouse.click(box.x + resultX, box.y + resultY, { button: 'right' });
        await page.locator('#present-as-menu').waitFor({ state: 'visible', timeout: 5000 });

        //the menu sizes to its items, not to the width of the page
        const menu_width = await page.locator('#copy-menu').evaluate((el) => el.closest('.q-menu').offsetWidth);
        const viewport = page.viewportSize();
        expect(menu_width).toBeLessThan(viewport.width / 2);

        //the submenu opens on hover, without any click
        await page.locator('#present-as-menu').hover();
        await page.locator('#present-as-real-menu').waitFor({ state: 'visible', timeout: 2000 });

        //a click on the parent item does not toggle the submenu closed
        await page.locator('#present-as-menu').click();
        await page.waitForTimeout(300);
        await expect(page.locator('#present-as-real-menu')).toBeVisible();

        //the nested "Symbolic" submenu opens on hover and keeps its parent open
        await page.locator('#symbolic-as-menu').hover();
        await page.locator('#symbolic-as-real-menu').waitFor({ state: 'visible', timeout: 2000 });
        await expect(page.locator('#present-as-real-menu')).toBeVisible();

        //moving the mouse away closes the submenu chain, the root menu stays open
        await page.mouse.move(10, 10);
        await page.waitForTimeout(600);
        await expect(page.locator('#present-as-real-menu')).toBeHidden();
        await expect(page.locator('#symbolic-as-real-menu')).toBeHidden();
        await expect(page.locator('#copy-menu')).toBeVisible();

        //a click on a leaf item closes the whole menu
        await page.locator('#present-as-menu').hover();
        await page.locator('#present-as-real-menu').waitFor({ state: 'visible', timeout: 2000 });
        await page.locator('#present-as-real-menu').click();
        await page.waitForTimeout(300);
        await expect(page.locator('#copy-menu')).toBeHidden();
    });

    test('present a result as a vector', async ({ page, context }) =>
    {
        await context.clearCookies();
        await context.addCookies([
            { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
        ]);
        await page.goto(address);
        await page.waitForTimeout(6000);
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 30000 });

        //an array literal solves as an array of real in the auto mode
        await utils.insertCode(page);
        await utils.writeText(page, '[1,2,3]=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '[1,2,3]=[1.,2.,3.]')).toBe(true);

        //the result is rendered on the canvas, find it by clicking: a left click moves the caret and WASM reports whether it is inside a result
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

        //present the array result as a vector of real: the flat array becomes a column
        await page.mouse.click(box.x + resultX, box.y + resultY, { button: 'right' });
        await page.locator('#present-as-menu').waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('#present-as-menu').hover();
        await page.locator('#vector-as-menu').waitFor({ state: 'visible', timeout: 2000 });
        await page.locator('#vector-as-menu').hover();
        await page.locator('#vector-as-real-menu').waitFor({ state: 'visible', timeout: 2000 });
        await page.locator('#vector-as-real-menu').click();
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '[[1.],[2.],[3.]]')).toBe(true);
    });
});
