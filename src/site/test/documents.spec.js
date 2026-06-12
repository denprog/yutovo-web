const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Documents', () =>
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
    });

    test.afterEach(async () =>
    {
        if (conn)
            await conn.end();
    });

    test('write text, login, save the document, check the cookie', async ({ page, context }) =>
    {
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.keyboard.type('12345');
        await page.waitForTimeout(1000);
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);
        await utils.save(page);
        await page.waitForTimeout(1000);
        const c = await utils.getCookie(context, 'document_id');
        expect(c).not.toBeNull();
        await page.waitForTimeout(1000);
        expect(await utils.fileContains(conn, c.value, '12345')).toBe(true);
        expect(page.url()).toBe(address + '/document/' + c.value);
        await page.waitForTimeout(1000);
    });

    test('check cookie after login', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        const c = await utils.getCookie(context, 'document_id');
        expect(c).not.toBeNull();
    });

    test('create new document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        expect(c1).not.toBeNull();
        await utils.newDoc(page);
        await page.waitForTimeout(2000);
        const c2 = await utils.getCookie(context, 'document_id');
        expect(c2).not.toBeNull();
        expect(c2.value).not.toBe(c1.value);
        expect(page.url()).toBe(address + '/document/' + c2.value);
    });

    test('delete a document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.newDoc(page);
        await page.waitForTimeout(2000);
        const c2 = await utils.getCookie(context, 'document_id');
        await utils.deleteDoc(page);
        await page.waitForTimeout(4000);
        const c3 = await utils.getCookie(context, 'document_id');
        expect(c3.value).not.toBe(c2.value);
        expect(c3.value).toBe(c1.value);
        expect(page.url()).toBe(address + '/document/' + c1.value);
    });

    test('open documents from the list', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.clickDocument(page, 'document_1');
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        const c2 = await utils.getCookie(context, 'document_id');
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        const c3 = await utils.getCookie(context, 'document_id');
        await utils.clickDocument(page, 'document_3');
        await page.waitForTimeout(1000);
        expect(page.url()).toBe(address + '/document/' + c3.value);

        await utils.clickDocument(page, 'document_3');
        await page.waitForTimeout(1000);
        const c = await utils.getCookie(context, 'document_id');
        expect(c.value).toBe(c3.value);
        expect(page.url()).toBe(address + '/document/' + c3.value);
    });

    test('save a document from the list', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        const c2 = await utils.getCookie(context, 'document_id');
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        const c3 = await utils.getCookie(context, 'document_id');

        await page.waitForSelector('#canvas', { timeout: 2000 });
        await page.keyboard.type('12345');
        await page.waitForTimeout(1000);
        await utils.save(page);
        await page.waitForTimeout(1000);
        const c = await utils.getCookie(context, 'document_id');
        expect(c.value).toBe(c3.value);
        expect(page.url()).toBe(address + '/document/' + c3.value);
        expect(await utils.fileContains(conn, c.value, '12345')).toBe(true);
        expect(await utils.fileContains(conn, c2.value, '12345')).toBe(false);
        expect(await utils.fileContains(conn, c1.value, '12345')).toBe(false);
    });

    test('save a document from the list and delete it', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.newDoc(page);
        await page.waitForTimeout(1000);

        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.keyboard.type('12345');
        await page.waitForTimeout(1000);
        await utils.save(page);
        await page.waitForTimeout(1000);
        await utils.deleteDoc(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/document/' + c1.value);
    });

    test('create documents, reload page, delete the last document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        await utils.newDoc(page);
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        await page.goto(address);
        await page.waitForTimeout(2000);
        expect(page.url()).toBe(address + '/document/' + c1.value);

        await utils.deleteDoc(page);
        await page.waitForTimeout(2000);
        const c2 = await utils.getCookie(context, 'document_id');
        expect(c1.value).not.toBe(c2.value);
        expect(page.url()).not.toBe(address + '/document/' + c1.value);
    });

    test('check input text', async ({ page }) =>
    {
        await page.waitForSelector('#canvas', { timeout: 2000 });
        await page.waitForTimeout(2000);
        await page.keyboard.type('12345');
        await page.waitForTimeout(1000);
        const t = await page.evaluate(() => window.getText());
        expect(t).toBe('12345');
    });

    test('open a document by url at start', async ({ page, context, browser }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(5000);
        await utils.writeText(page, '12345');
        await utils.save(page);
        await page.waitForTimeout(1000);
        const c = await utils.getCookie(context, 'document_id');
        await context.close();
        await new Promise((r) => setTimeout(r, 1000));

        const newContext = await browser.newContext(
        {
            viewport: { width: 1100, height: 900 },
            ignoreHTTPSErrors: true,
        });
        const newPage = await newContext.newPage();
        await newPage.goto(address);
        await newPage.goto(address + '/document/' + c.value);
        await newPage.waitForTimeout(4000);
        expect(await utils.documentContains(newPage, '12345')).toBe(true);
        await newContext.close();
    });

    test('open the last document at start', async ({ page, context, browser }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await utils.writeText(page, '12345');
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, '12345')).toBe(true);
        await utils.save(page);
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');
        await context.close();

        const newContext = await browser.newContext(
        {
            viewport: { width: 1100, height: 900 },
            ignoreHTTPSErrors: true,
        });
        const newPage = await newContext.newPage();
        await newPage.goto(address);
        await newPage.waitForTimeout(1000);
        await newContext.addCookies([c1]);
        await newPage.reload();
        await newPage.waitForTimeout(1000);
        await newPage.goto(address);
        await newPage.waitForTimeout(4000);
        expect(newPage.url()).toBe(address + '/document/' + c1.value);
        expect(await utils.documentContains(newPage, '12345')).toBe(true);
        await newContext.close();
    });

    test('save a document with another name', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await utils.writeText(page, '12345');
        await utils.save(page);
        await page.waitForTimeout(2000);
        const c1 = await utils.getCookie(context, 'document_id');

        await utils.saveAs(page, 'new_name');
        await page.waitForTimeout(2000);
        const c2 = await utils.getCookie(context, 'document_id');
        expect(c1.value).not.toBe(c2.value);
        expect(page.url()).toBe(address + '/document/' + c2.value);
        expect(await utils.documentContains(page, '12345')).toBe(true);
    });

    test('save a changed document with another name', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await utils.writeText(page, '12345');
        await utils.save(page);
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.writeText(page, '777');
        await page.waitForTimeout(1000);
        await utils.saveAs(page, 'new_name');
        await page.waitForTimeout(1000);
        const c2 = await utils.getCookie(context, 'document_id');
        expect(c1.value).not.toBe(c2.value);
        await utils.clickDocument(page, 'new_name');
        await page.waitForTimeout(100);
        expect(page.url()).toBe(address + '/document/' + c2.value)
        expect(await utils.documentContains(page, '12345777')).toBe(true); //new document
        await utils.clickDocument(page, 'document_1');
        await page.waitForTimeout(100);
        expect(await utils.documentContains(page, '12345')).toBe(true); //old document
    });

    test('rename a document', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(6000);
        await utils.writeText(page, '12345');
        await utils.save(page);
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');

        await utils.rename(page, 'new_name');
        await page.waitForTimeout(2000);
        const c2 = await utils.getCookie(context, 'document_id');
        expect(c1.value).toBe(c2.value);
        expect(page.url()).toBe(address + '/document/' + c2.value);
        expect(await utils.documentContains(page, '12345')).toBe(true);
    });

    test('change language and add a variable', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await utils.writeText(page, '12345');
        await utils.insertCode(page);
        await page.waitForTimeout(1000);
        await utils.setLanguage(page, 'English');
        await page.waitForTimeout(3000);
        await utils.clickIdentifier(page, 'Functions/arccos');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: '/tmp/arccos-test.png' });
        expect(await utils.documentContains(page, 'arccos')).toBe(true);
        await utils.clickIdentifier(page, 'Functions');
        await page.waitForTimeout(1000);

        await utils.setSettingsLanguage(page, 'Russian');
        await page.waitForTimeout(1000);
        await utils.setLanguage(page, 'Русский');
        await page.waitForTimeout(3000);
        await utils.clickIdentifier(page, 'Размерности/СИ/время/с (секунда)');
        await page.waitForTimeout(2000);
        expect(await utils.documentContains(page, 'с')).toBe(true);
    });

    test('check document not found', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);

        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
            page.goto(address + '/document/99999'),
        ]);
        expect(dialog.message()).toBe('Document not found');
        await dialog.accept();
        await page.waitForTimeout(4000);
    });

    test('save a document of another user as an own one', async ({ page, context }) =>
    {
        await page.waitForTimeout(1000);
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(2000);
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_1');
        await page.waitForTimeout(1000);
        await utils.save(page);
        const docCookie = await utils.getCookie(context, 'document_id');
        await utils.logout(page);
        await page.waitForTimeout(1000);

        await utils.login(page, 'test2', '11');
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(1000);
        if (docCookie)
        {
            await context.addCookies([docCookie]);
            await page.reload();
            await page.waitForTimeout(4000);
        }
        await utils.saveAs(page, 'new_document');
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'document_test_1')).toBe(true);
        await utils.clickDocument(page, 'new_document');
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'document_test_1')).toBe(true);
    });

    test('change language and add a variable (calculate)', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await utils.setLanguage(page, 'Русский');
        await utils.insertCode(page);
        await utils.writeText(page, '1.23');
        await utils.writeText(page, '+');
        await utils.writeText(page, '3.5');
        await utils.writeText(page, '=');
        await page.waitForTimeout(3000);
        expect(await utils.documentContains(page, '4.73')).toBe(true);
    });

    test('add documents and remove them one by one', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_1');
        await utils.save(page);
        await page.waitForTimeout(1000);

        await utils.newDoc(page);
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_2');
        await utils.save(page);
        await page.waitForTimeout(1000);

        await utils.newDoc(page);
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_3');
        await utils.save(page);
        await page.waitForTimeout(1000);

        await utils.deleteDoc(page);
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'document_test_2')).toBe(true);
        await utils.deleteDoc(page);
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'document_test_1')).toBe(true);
    });

    test('copy-paste test', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_1');

        for (let i = 0; i < 6; i++)
        {
            await page.keyboard.press('Shift+ArrowLeft');
        }
        await page.waitForTimeout(1000);
        await utils.copy(page);
        await page.waitForTimeout(1000);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(1000);
        await utils.paste(page);
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'document_test_1test_1')).toBe(true);
    });

    test('cut-paste test', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);

        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_1');

        for (let i = 0; i < 6; i++)
        {
            await page.keyboard.press('Shift+ArrowLeft');
        }
        await page.waitForTimeout(1000);
        await utils.cut(page);
        await page.waitForTimeout(1000);
        await page.keyboard.press('Home');
        await page.waitForTimeout(1000);
        await utils.paste(page);
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'test_1document_')).toBe(true);
    });

    test('context menu copy and paste items', async ({ page }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'context_menu_test');
        await page.waitForTimeout(1000);

        for (let i = 0; i < 17; i++)
            await page.keyboard.press('Shift+ArrowLeft');
        await page.waitForTimeout(500);

        const openContextMenu = async () =>
        {
            const box = await page.locator('#canvas').boundingBox();
            await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: 'right' });
        };

        await openContextMenu();
        await page.locator('#copy-menu').waitFor({ state: 'visible', timeout: 2000 });
        await expect(page.locator('#copy-menu')).not.toHaveClass(/disabled/);
        await expect(page.locator('#cut-menu')).not.toHaveClass(/disabled/);

        await page.locator('#copy-menu').click();
        await page.waitForTimeout(1000);

        await page.keyboard.press('End');
        await page.waitForTimeout(500);
        await openContextMenu();
        await page.locator('#paste-menu').waitFor({ state: 'visible', timeout: 2000 });
        await expect(page.locator('#paste-menu')).not.toHaveClass(/disabled/);

        await page.locator('#paste-menu').click();
        await page.waitForTimeout(1000);
        expect(await utils.documentContains(page, 'context_menu_testcontext_menu_test')).toBe(true);
    });

    test('open a document by url at start, save it and check it', async ({ page, context, browser }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(5000);
        await utils.writeText(page, '12345');
        await utils.save(page);
        await page.waitForTimeout(1000);
        const c = await utils.getCookie(context, 'document_id');
        const r = await utils.getCookie(context, 'refresh_token');
        await context.close();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const ctx1 = await browser.newContext(
        {
            viewport: { width: 1100, height: 900 },
            ignoreHTTPSErrors: true,
        });
        const p1 = await ctx1.newPage();
        await p1.goto(address);
        await p1.goto(address + '/document/' + c.value);
        await ctx1.addCookies([r]);
        await p1.reload();
        await p1.waitForTimeout(4000);
        expect(await utils.documentContains(p1, '12345')).toBe(true);

        await utils.writeText(p1, '555');
        await utils.save(p1);
        await p1.waitForTimeout(1000);
        const c2 = await utils.getCookie(ctx1, 'document_id');
        await ctx1.close();

        const ctx2 = await browser.newContext(
        {
            viewport: { width: 1100, height: 900 },
            ignoreHTTPSErrors: true,
        });
        const p2 = await ctx2.newPage();
        await p2.goto(address);
        await p2.goto(address + '/document/' + c2.value);
        await p2.waitForTimeout(4000);
        expect(await utils.documentContains(p2, '12345555')).toBe(true);
        await ctx2.close();
    });

    test('create documents and save them', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);

        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');
        await page.waitForSelector('#canvas', { timeout: 2000 });
        await page.keyboard.type('12345');
        await page.waitForTimeout(1000);
        await utils.save(page);
        await page.waitForTimeout(1000);

        const c2 = await utils.getCookie(context, 'document_id');
        expect(c1.value).toBe(c2.value);
        expect(page.url()).toBe(address + '/document/' + c2.value);
        expect(await utils.fileContains(conn, c2.value, '12345')).toBe(true);
    });

    test('check the save dialog', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');
        await page.waitForTimeout(1000);

        await utils.setLanguage(page, 'English');
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(1000);
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.writeText(page, 'document_test_1');
        await page.waitForTimeout(1000);
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        await utils.saveDialogClick(page, 'Yes');
        await page.waitForTimeout(2000);
        const c2 = await utils.getCookie(context, 'document_id');
        await page.goto(address + '/document/' + c1.value);
        await page.waitForTimeout(2000);
        expect(await utils.fileContains(conn, c1.value, 'document_test_1')).toBe(true);

        await page.goto(address + '/document/' + c2.value);
        await page.waitForTimeout(4000);
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await utils.writeText(page, 'document_test_2');
        await page.waitForTimeout(1000);
        await utils.newDoc(page);
        await page.waitForTimeout(1000);
        await utils.saveDialogClick(page, 'No');
        await page.goto(address + '/document/' + c2.value);
        await page.waitForTimeout(2000);
        expect(await utils.fileNotContains(conn, c2.value, 'document_test_2')).toBe(true);
    });

    test('change document after changing its content', async ({ page, context }) =>
    {
        await utils.login(page, 'test1', '11');

        await utils.setLanguage(page, 'English');
        await page.waitForSelector('#canvas', { timeout: 2000 });
        await page.waitForTimeout(1000);
        await utils.writeText(page, 'document_test_1');
        await utils.save(page);
        await page.waitForTimeout(4000);

        await utils.newDoc(page);
        await page.waitForSelector('#canvas', { timeout: 10000 });
        await page.waitForTimeout(2000);
        await utils.writeText(page, 'document_test_2');
        const c1 = await utils.getCookie(context, 'document_id');
        await utils.clickDocument(page, 'document_1');
        await utils.saveDialogClick(page, 'Yes');
        await page.waitForTimeout(3000);
        expect(await utils.fileContains(conn, c1.value, 'document_test_2')).toBe(true);
        expect(await utils.documentContains(page, 'document_test_1')).toBe(true);
    });
});
