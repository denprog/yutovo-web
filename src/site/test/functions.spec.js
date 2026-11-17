const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Functions', () =>
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

    test('function at point button inserts the template and solves', async ({ page }) =>
    {
        //declare the function first
        await utils.insertCode(page);
        await utils.writeText(page, 'func(y):y^2');
        await page.keyboard.press('ArrowRight'); //move out of the exponent
        await page.waitForTimeout(3000);

        //use it below with the button
        await page.keyboard.press('Enter'); //new paragraph
        await page.waitForTimeout(200);
        const button = page.locator('img[src="/images/algebra/function_at_point.png"]').first();
        await expect(button).toBeVisible();
        await button.click(); //the brackets for the function followed by the evaluation bar
        await page.waitForTimeout(200);

        await utils.writeText(page, 'func');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, 'y');
        for (let i = 0; i < 4; ++i)
            await page.keyboard.press('ArrowRight');
        await utils.writeText(page, 'y');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '3');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('func(y)[y=3]=9');
    });

    test('function button inserts the definition template', async ({ page }) =>
    {
        await utils.insertCode(page);

        const button = page.locator('img[src="/images/algebra/function_x.png"]').first();
        await expect(button).toBeVisible();
        await button.click(); //the f(x)= template with the caret after the assignment
        await page.waitForTimeout(200);
        await utils.writeText(page, 'x*x');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('f(x)=x*x');
    });

    test('function of two variables button inserts the definition template', async ({ page }) =>
    {
        await utils.insertCode(page);

        const button = page.locator('img[src="/images/algebra/function_xy.png"]').first();
        await expect(button).toBeVisible();
        await button.click(); //the f(x,y)= template with the caret after the assignment
        await page.waitForTimeout(200);
        await utils.writeText(page, 'x*y');
        await page.waitForTimeout(500);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('f(x,y)=x*y');
    });

    test('sine button inserts the function and solves', async ({ page }) =>
    {
        await utils.insertCode(page);

        const combo = page.locator('#trigonometric-functions-button');
        await expect(combo).toBeVisible();
        await combo.click(); //open the trigonometric functions dropdown
        const button = page.locator('#sin-button');
        await expect(button).toBeVisible();
        await button.click(); //the sin() template with the caret inside the brackets
        await page.waitForTimeout(200);
        await utils.writeText(page, '0');
        await page.keyboard.press('ArrowRight'); //step over the closing bracket
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('sin(0)=0');
    });

    test('hyperbolic sine button inserts the function and solves', async ({ page }) =>
    {
        await utils.insertCode(page);

        const combo = page.locator('#hyperbolic-functions-button');
        await expect(combo).toBeVisible();
        await combo.click(); //open the hyperbolic functions dropdown
        const button = page.locator('#sinh-button');
        await expect(button).toBeVisible();
        await button.click(); //the sinh() template with the caret inside the brackets
        await page.waitForTimeout(200);
        await utils.writeText(page, '0');
        await page.keyboard.press('ArrowRight'); //step over the closing bracket
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('sinh(0)=0');
    });

    test('exponent button inserts the function and solves', async ({ page }) =>
    {
        await utils.insertCode(page);

        const combo = page.locator('#elementary-functions-button');
        await expect(combo).toBeVisible();
        await combo.click(); //open the elementary functions dropdown
        const button = page.locator('#exp-button');
        await expect(button).toBeVisible();
        await button.click(); //the exp() template with the caret inside the brackets
        await page.waitForTimeout(200);
        await utils.writeText(page, '1');
        await page.keyboard.press('ArrowRight'); //step over the closing bracket
        await page.keyboard.press('ArrowRight');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('exp(1)=2.71'); //e rounded
    });

    test('logarithm button inserts the base template and solves', async ({ page }) =>
    {
        await utils.insertCode(page);

        const combo = page.locator('#elementary-functions-button');
        await expect(combo).toBeVisible();
        await combo.click(); //open the elementary functions dropdown
        const button = page.locator('#log-button');
        await expect(button).toBeVisible();
        await button.click(); //the log with the caret in the base subscript
        await page.waitForTimeout(200);
        await utils.writeText(page, '2');
        await page.keyboard.press('ArrowRight'); //step out of the base
        await utils.writeText(page, '8');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);

        const text = await page.evaluate(() => window.getText());
        expect(text).toContain('log:2,8=3');
    });
});
