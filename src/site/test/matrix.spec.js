const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Matrices', () =>
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

    test('insert and fill a matrix', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertMatrix(page, 2, 2);
        await page.waitForTimeout(1000);

        //fill the cells in reading order: the caret starts in the first cell
        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('2');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('3');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('4');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('[[1,2],[3,4]]');
    });

    test('insert a non-square matrix with dialog sizes', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertMatrix(page, 3, 1);
        await page.waitForTimeout(1000);

        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('2');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('3');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('[[1],[2],[3]]');
    });

    test('insert and fill a determinant', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertDeterminant(page, 2, 2);
        await page.waitForTimeout(1000);

        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('2');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('3');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('4');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('det([[1,2],[3,4]])');
    });

    test('solve a determinant', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertDeterminant(page, 2, 2);
        await page.waitForTimeout(1000);

        await page.keyboard.type('1');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('2');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('3');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.type('4');
        //leave the matrix (the right bracket is not a caret stop - a single arrow exits it) and append the equation
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '=');
        await page.waitForTimeout(5000);

        expect(await utils.documentContains(page, '-2')).toBe(true);
    });

    test('resize a matrix from the context menu', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertMatrix(page, 2, 2);
        await page.waitForTimeout(1000);

        //click into the matrix (the caret lands in a cell) and open the context menu there
        const canvas = await page.locator('#canvas');
        const box = await canvas.boundingBox();
        await page.mouse.click(box.x + 60, box.y + 40);
        await page.waitForTimeout(300);
        await page.mouse.click(box.x + 60, box.y + 40, { button: 'right' });
        await page.waitForTimeout(1000);

        const menu_item = await page.locator('#matrix-size-menu');
        await menu_item.waitFor({ state: 'visible', timeout: 5000 });
        await menu_item.click();
        await page.waitForTimeout(500);

        //the dialog is prefilled with the current size, grow to 3x3
        const rows = await page.locator("xpath=//input[@aria-label='Rows']").inputValue();
        expect(rows).toBe('2');
        await utils.fillMatrixSizeDialog(page, 3, 3);
        await page.waitForTimeout(1000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('[[,,],[,,],[,,]]');
    });

    test('insert a large matrix', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.insertMatrix(page, 20, 20);
        await page.waitForTimeout(1000);

        //an empty n x n grid has n * n - 1 commas; the old limit of 10 would give 99
        const text = await page.evaluate(() => window.getText());
        const commas = text.split(',').length - 1;
        expect(commas).toBe(399);
    });
});
