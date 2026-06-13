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

    test('load a library document from Calculators', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Calculators', 'Algebra', 'Binomial theorem');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Calculators/Algebra/Binomial%20theorem.yut');
        expect(await utils.getDocumentName(page)).toBe('/Calculators/Algebra/Binomial theorem.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Finance', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Finance', 'Bonds', 'Coupon yield');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Finance/Bonds/Coupon%20yield.yut');
        expect(await utils.getDocumentName(page)).toBe('/Finance/Bonds/Coupon yield.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Mathematics', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Mathematics', 'Planimetry', 'Circle');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Mathematics/Planimetry/Circle.yut');
        expect(await utils.getDocumentName(page)).toBe('/Mathematics/Planimetry/Circle.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Units by url', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await page.goto(address + '/library/en/Units/Energy.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Units/Energy.yut');
        expect(await utils.getDocumentName(page)).toBe('/Units/Energy.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Help', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Help', 'Calculations', 'Performing calculations');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Help/Calculations/Performing%20calculations.yut');
        expect(await utils.getDocumentName(page)).toBe('/Help/Calculations/Performing calculations.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Physics Thermodynamics', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Physics', 'Thermodynamics', 'First law of thermodynamics');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Physics/Thermodynamics/First%20law%20of%20thermodynamics.yut');
        expect(await utils.getDocumentName(page)).toBe('/Physics/Thermodynamics/First law of thermodynamics.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Finance Deposits', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Finance', 'Deposits', 'Compound interest');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Finance/Deposits/Compound%20interest.yut');
        expect(await utils.getDocumentName(page)).toBe('/Finance/Deposits/Compound interest.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Calculators Electrical engineering', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Calculators', 'Electrical engineering', 'Conductor resistance calculator');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Calculators/Electrical%20engineering/Conductor%20resistance%20calculator.yut');
        expect(await utils.getDocumentName(page)).toBe('/Calculators/Electrical engineering/Conductor resistance calculator.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Others by url', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await page.goto(address + '/library/en/Others/First%20page.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Others/First%20page.yut');
        expect(await utils.getDocumentName(page)).toBe('/Others/First page.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a library document from Help Yutovo by url', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await page.goto(address + '/library/en/Help/Yutovo.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Help/Yutovo.yut');
        expect(await utils.getDocumentName(page)).toBe('/Help/Yutovo.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a Spanish library document by url after setting language', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'Español');
        await page.waitForTimeout(3000);
        await page.goto(address + '/library/es/Ayuda/Yutovo.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/es/Ayuda/Yutovo.yut');
        expect(await utils.getDocumentName(page)).toBe('/Ayuda/Yutovo.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('load a Russian library document by url after setting language', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'Русский');
        await page.waitForTimeout(3000);
        await page.goto(address + '/library/ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B0/%D0%AE%D1%82%D0%BE%D0%B2%D0%BE.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B0/%D0%AE%D1%82%D0%BE%D0%B2%D0%BE.yut');
        expect(await utils.getDocumentName(page)).toBe('/Справка/Ютово.yut');
        expect(await utils.documentNotEmpty(page)).toBe(true);
    });

    test('save a library document from Mathematics as a user document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Mathematics', 'Planimetry', 'Circle');
        await page.waitForTimeout(2000);
        await utils.save(page);
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        expect(page.url()).toBe(address + '/document/' + c1.value);
        expect(await utils.getDocumentName(page)).toBe('Circle.yut');
        const names = await page.locator('.documents-item').allTextContents();
        expect(names).toContain('Circle.yut');
    });

    test('saved library document survives page reload', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        await utils.save(page);
        await page.waitForTimeout(2000);
        const url = page.url();
        await page.reload();
        await page.waitForTimeout(6000);
        expect(page.url()).toBe(url);
        expect(await utils.documentContains(page, 'Data')).toBe(true);
    });

    test('library document is not in user documents before saving', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Finance', 'Bonds', 'Coupon yield');
        await page.waitForTimeout(2000);
        const names = await page.locator('.documents-item').allTextContents();
        expect(names).not.toContain('Coupon yield');
    });

    test('open a non-existent library document by url shows not found', async ({ page }) =>
    {
        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
            page.goto(address + '/library/en/Physics/Dynamics/Missing.yut'),
        ]);
        expect(dialog.message()).toBe('Error loading the library document');
        await dialog.accept();
    });

    test('navigate between two library documents', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Calculators', 'Algebra', 'Binomial theorem');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Calculators/Algebra/Binomial%20theorem.yut');

        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        expect(await utils.documentContains(page, 'Data')).toBe(true);
    });

    test('load library document after user document keeps user document in list', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'my_text');
        await utils.save(page);
        await page.waitForTimeout(1000);

        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');

        const names = await page.locator('.documents-item').allTextContents();
        expect(names).toContain('document_1');
    });

    test('library document original stays unchanged after saving edited copy', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Physics', 'Dynamics', 'Moment of force');
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'edited');
        await utils.save(page);
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        expect(page.url()).toBe(address + '/document/' + c1.value);

        await page.goto(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        expect(await utils.documentContains(page, 'edited')).toBe(false);
        expect(await utils.documentContains(page, 'Data')).toBe(true);
    });

    test('save a library document and rename the user copy', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(1000);
        await utils.clickLibrary(page, 'Mathematics', 'Planimetry', 'Circle');
        await page.waitForTimeout(2000);
        await utils.save(page);
        await page.waitForTimeout(2000);
        await utils.rename(page, 'renamed_circle');
        await page.waitForTimeout(2000);

        expect(await utils.getDocumentName(page)).toBe('renamed_circle');
        const names = await page.locator('.documents-item').allTextContents();
        expect(names).toContain('renamed_circle');
    });

    test('open a library document by url without login keeps library url after login', async ({ page }) =>
    {
        await page.goto(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');

        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        expect(page.url()).toBe(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut');
        expect(await utils.getDocumentName(page)).toBe('/Physics/Dynamics/Moment of force.yut');
    });
});
