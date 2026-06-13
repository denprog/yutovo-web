const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.setTimeout(300000);

test.describe('Stress', () =>
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
    });

    test.afterEach(async () =>
    {
        if (conn)
            await conn.end();
    });

    test('repeated login and logout keeps server responding', async ({ page }) =>
    {
        const iterations = 15;
        for (let i = 0; i < iterations; i++)
        {
            await page.goto(address);
            await page.waitForTimeout(4000);
            await utils.login(page, 'test1', '11');
            await page.waitForTimeout(3000);
            const names = await page.locator('.documents-item').allTextContents();
            expect(names.length).toBeGreaterThanOrEqual(1);

            await utils.logout(page);
            await page.waitForTimeout(1000);
            const response = await page.goto(address);
            expect(response.status()).toBe(200);
        }
    });

    test('many concurrent sessions do not break the server', async ({ browser }) =>
    {
        const count = 10;
        const contexts = [];
        for (let i = 0; i < count; i++)
        {
            const ctx = await browser.newContext();
            await ctx.addCookies([
                { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
            ]);
            contexts.push(ctx);
        }

        const pages = await Promise.all(contexts.map(async (ctx) =>
        {
            const p = await ctx.newPage();
            await p.goto(address);
            await p.waitForTimeout(4000);
            await utils.login(p, 'test1', '11');
            await p.waitForTimeout(2000);
            return p;
        }));

        for (const p of pages)
        {
            const names = await p.locator('.documents-item').allTextContents();
            expect(names.length).toBeGreaterThanOrEqual(1);
        }

        for (const p of pages)
            await p.close();
        for (const ctx of contexts)
            await ctx.close();

        const checkPage = await browser.newPage();
        await checkPage.goto(address);
        await checkPage.waitForTimeout(4000);
        expect(checkPage.url()).toMatch(/https:\/\/www\.yutovo\.ru/);
        await checkPage.close();
    });
});
