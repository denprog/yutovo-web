const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Library', () =>
{
    let conn;

    test.beforeEach(async ({ page, context }) =>
    {
        await context.clearCookies();
        await context.addCookies([
            { name: 'app_initialized', value: 'true', path: '/', domain: 'www.yutovo.ru' },
        ]);
        conn = await utils.getDbConnection();
        await utils.clearTestUser(conn);
        await page.goto(address);
        await page.waitForTimeout(6000);
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 30000 });
    });

    test.afterEach(async () =>
    {
        if (conn)
    await conn.end();
    });

    test('load a library document and save as a user document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'Data')).toBe(true);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        expect(await utils.getDocumentName(page)).toBe('/Physics/Dynamics/Moment of force.yut');
        await utils.save(page);
        await page.waitForTimeout(2000);
        await utils.clickCategory(page, 'Physics');
        await page.waitForTimeout(2000);
        await utils.clickDocument(page, 'Moment of force');
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        expect(page.url()).toBe(address + '/document/' + c1.value);
        expect(await utils.documentContains(page, 'Data')).toBe(true);
    });

    test('click on a document, then on a library document, then on a user document', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { state: 'attached', timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.writeText(page, 'document_test_1');
        await page.waitForTimeout(1000);
        await utils.save(page);

        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'Data')).toBe(true);

        await utils.clickDocument(page, 'document_1');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'document_test_1')).toBe(true);
    });

    test('open a library document by url at start', async ({ browser }) =>
    {
        const context = await browser.newContext(
        {
            viewport: { width: 1100, height: 900 },
            ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();
        await page.goto(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        expect(await utils.getDocumentName(page)).toBe('/Physics/Dynamics/Moment of force.yut');
        await context.close();
    });

    test('load a library document, change it and save as a user document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');

        await utils.writeText(page, 'document');
        await utils.save(page);

        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'Data')).toBe(true);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        expect(await utils.getDocumentName(page)).toBe('/Physics/Dynamics/Moment of force.yut');
        await utils.writeText(page, '12345');
        await utils.save(page);

        await utils.clickDocument(page, 'document_1');

        await page.waitForTimeout(2000);
        await utils.clickDocument(page, 'Moment of force');
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        expect(page.url()).toBe(address + '/document/' + c1.value);
        expect(await utils.documentContains(page, 'Data')).toBe(true);
    });
});
