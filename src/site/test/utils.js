const { Client } = require('pg');
const crypto = require('crypto');

async function jsClick(page, selector)
{
    await page.locator(selector).first().evaluate((el) => el.click());
}

async function registerUser(page, username, password, email)
{
    await jsClick(page, '#register');
    await page.waitForTimeout(1000);
    await page.locator("xpath=//input[@aria-label='login']").fill(username);
    await page.locator("xpath=//input[@aria-label='email']").fill(email);
    await page.locator("xpath=//input[@aria-label='password']").fill(password);
    await page.locator("xpath=//input[@aria-label='repeate password']").fill(password);
    await jsClick(page, '#submit');
}

async function login(page, username, password)
{
    await page.waitForTimeout(1000);
    await page.locator("xpath=//*[contains(text(), 'Login')] | //*[contains(text(), 'Войти')] | //*[contains(text(), 'Acceder')]").first().evaluate((el) => el.click());
    await page.waitForTimeout(1000);
    await page.locator("xpath=//input[contains(@class, 'login-username')]").fill(username);
    await page.locator("xpath=//input[contains(@class, 'login-password')]").fill(password);
    await jsClick(page, '#submit');
}

async function logout(page)
{
    await page.locator('#logout').scrollIntoViewIfNeeded();
    await jsClick(page, '#logout');
    await page.waitForTimeout(1000);
    await deleteCookies(page.context(), ['session_id', 'JSESSIONID']);
}

async function newDoc(page)
{
    await jsClick(page, '#new-button');
}

async function save(page)
{
    await jsClick(page, '#save-button');
}

async function saveAs(page, filename)
{
    await jsClick(page, '#save-as-button');
    await page.waitForTimeout(1000);
    const dialog = page.locator('.q-dialog');
    await dialog.waitFor({ state: 'visible', timeout: 5000 });
    const input = dialog.locator('input').first();
    await input.fill(filename);
    await page.waitForTimeout(1000);
    await jsClick(page, '#submit');
}

async function rename(page, filename)
{
    await jsClick(page, '#rename-button');
    const dialog = page.locator('.q-dialog');
    await dialog.waitFor({ state: 'visible', timeout: 2000 });
    const inp = dialog.locator("input[type='text']");
    await inp.clear();
    await inp.fill(filename);
    await jsClick(page, '#submit');
}

async function deleteDoc(page)
{
    await jsClick(page, '#delete-button');
    await page.waitForTimeout(1000);
    await clickOk(page, 'q-dialog-plugin');
}

async function copy(page)
{
    await jsClick(page, '#copy-button');
}

async function paste(page)
{
    await jsClick(page, '#paste-button');
}

async function cut(page)
{
    await jsClick(page, '#cut-button');
}

async function clickCategory(page, name)
{
    await page.locator(`xpath=//*[contains(text(), '${name}')]`).first().evaluate((el) => el.click());
}

async function clickLibrary(page, category1, category2, name)
{
    await page.locator(`xpath=//*[contains(text(), '${category1}')]`).first().evaluate((el) => el.click());
    await page.waitForTimeout(1000);
    await page.locator(`xpath=//*[contains(text(), '${category2}')]`).first().evaluate((el) => el.click());
    await page.waitForTimeout(1000);
    await page.locator(`xpath=//*[contains(text(), '${name}')]`).first().evaluate((el) => el.click());
}

async function clickDocument(page, text)
{
    await page.locator(`xpath=//span[contains(@class, 'documents-item') and contains(., '${text}')]`).first().click();
}

async function loginCaption(page)
{
    return await page.locator('#login').textContent({ timeout: 2000 });
}

async function writeText(page, text)
{
    await page.locator('#canvas').evaluate((el) => el.focus());
    await page.keyboard.type(text);
}

async function insertCode(page)
{
    await page.locator('#insert-calculator-button').click({ timeout: 2000, force: true });
}

async function clickIdentifier(page, category)
{
    const arr = category.split('/');
    for (let i = 0; i < arr.length; i++)
    {
        const text = arr[i];
        const header = page.locator(`#identifiers-tree .q-tree__node-header:has-text('${text}')`);
        if (i < arr.length - 1)
        {
            const arrow = header.locator('.q-tree__arrow');
            await arrow.first().evaluate((el) => el.click());
        }
        else
        {
            const content = header.locator('.q-tree__node-header-content');
            await content.first().evaluate((el) => el.click());
        }
        await page.waitForTimeout(1000);
    }
}

async function getDocumentName(page)
{
    return await page.locator('#document-name').textContent({ timeout: 2000 });
}

async function setLanguage(page, language)
{
    await jsClick(page, '#language');
    await page.waitForTimeout(2000);
    await page.locator(`xpath=//*[contains(text(), '${language}')]`).first().evaluate((el) => el.click());
}

async function getLanguage(page)
{
    return await page.locator('#language').textContent({ timeout: 2000 });
}

async function clickOk(page, id)
{
    try
    {
        const okXpath =
            "//div[@id='" +
            id +
            "']" +
            "//button" +
            "[contains(., 'OK') or contains(., 'Применить') or contains(., 'Aceptar') or @aria-label='OK']";
        await page.locator(`xpath=${okXpath}`).first().click({ timeout: 2000 });
    }
    catch
    {
        const okXpath =
            "//div[contains(@class, '" +
            id +
            "')]" +
            "//button" +
            "[" +
            "  contains(., 'OK') or " +
            "  contains(., 'Aceptar') or " +
            "  .//span[contains(., 'OK') or contains(., 'Aceptar')] " +
            "]" +
            "[not(@disabled)]";
        await page.locator(`xpath=${okXpath}`).first().click({ timeout: 2000 });
    }
}

async function setSettingsLanguage(page, language)
{
    await jsClick(page, '#settings-button');
    await page.waitForTimeout(1000);
    await page.locator("[data-testid='tab-document']").first().evaluate((el) => el.click());
    await page.waitForTimeout(1000);

    await jsClick(page, '#config-language');
    await page.waitForTimeout(2000);

    const menuOptionXpath =
        "//div[contains(@class, 'q-menu')]//div[contains(@class, 'q-item')]" +
        `[contains(normalize-space(.), '${language}')]`;
    await page.locator(`xpath=${menuOptionXpath}`).first().evaluate((el) => el.click());
    await page.waitForTimeout(1000);
    await clickOk(page, 'config-dialog');
}

async function saveDialogClick(page, button)
{
    const xpath = `//div[@role='dialog']//button[contains(., '${button}')]`;
    await page.locator(`xpath=${xpath}`).first().evaluate((el) => el.click());
}

async function closeDialogIfPresent(page, button, timeout = 2)
{
    try
    {
        const xpath = `//div[@role='dialog']//button[contains(., '${button}')]`;
        await page.locator(`xpath=${xpath}`).first().click({ timeout: timeout * 1000 });
        return true;
    }
    catch
    {
        return false;
    }
}

async function getDbConnection()
{
    const client = new Client(
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
        database: process.env.DB_NAME || 'yutovo',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    await client.connect();
    return client;
}

async function deleteTestUser(client)
{
    for (const login of ['test1', 'test2'])
    {
        await client.query(
            'delete from user_sessions where user_id in (select user_id from users where login=$1)',
            [login]
        );
        await client.query(
            'delete from user_documents where user_id in (select user_id from users where login=$1)',
            [login]
        );
        await client.query('delete from users where login=$1', [login]);
    }
}

function _hashPassword(password)
{
    const salt = crypto.randomBytes(16).toString('hex');
    const h = crypto.createHash('md5').update(password + salt).digest('hex');
    return salt + h;
}

async function clearTestUser(client)
{
    await client.query(
        "delete from user_sessions where user_id in (select user_id from users where login='test1')"
    );
    await client.query(
        "delete from user_documents where user_id in (select user_id from users where login='test1')"
    );
    await client.query(
        "delete from user_sessions where user_id in (select user_id from users where login='test2')"
    );
    await client.query(
        "delete from user_documents where user_id in (select user_id from users where login='test2')"
    );
    await client.query("update users set language='' where login='test1'");
    await client.query("update users set language='' where login='test2'");
    for (const [login, email, name, pwd] of [
        ['test1', 'test1@mail.ru', 'test1', '11'],
        ['test2', 'test2@mail.ru', 'test2', '11'],
    ])
    {
        await client.query(
            `
      INSERT INTO users (login, password, email, name, plan_id)
      SELECT $1, $2, $3, $4, 1
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE login=$5)
    `,
            [login, _hashPassword(pwd), email, name, login]
        );
        await client.query('UPDATE users SET password=$1 WHERE login=$2', [
            _hashPassword(pwd),
            login,
        ]);
    }
}

async function fileContains(client, documentId, str)
{
    const res = await client.query(
        `select 1 from user_documents where document_id = $1 and jsonb_path_exists(document, '$.** ? (@.type() == "string" && @ like_regex "${str.replace(/"/g, '\\"')}")')`,
        [documentId]
    );
    return res.rowCount > 0;
}

async function fileNotContains(client, documentId, str)
{
    const res = await client.query(
        `select 1 from user_documents where document_id = $1 and not jsonb_path_exists(document, '$.** ? (@.type() == "string" && @ like_regex "${str.replace(/"/g, '\\"')}")')`,
        [documentId]
    );
    return res.rowCount > 0;
}

async function documentContains(page, str)
{
    const t = await page.evaluate(() => window.getText());
    return String(t).includes(str);
}

async function getCookie(context, name)
{
    const cookies = await context.cookies();
    return cookies.find((c) => c.name === name) || null;
}

async function deleteCookies(context, names)
{
    const cookies = await context.cookies();
    const remaining = cookies.filter((c) => !names.includes(c.name));
    await context.clearCookies();
    if (remaining.length > 0)
    {
        await context.addCookies(remaining);
    }
}

module.exports =
{
    registerUser,
    login,
    logout,
    newDoc,
    save,
    saveAs,
    rename,
    deleteDoc,
    copy,
    paste,
    cut,
    clickCategory,
    clickLibrary,
    clickDocument,
    loginCaption,
    writeText,
    insertCode,
    clickIdentifier,
    getDocumentName,
    setLanguage,
    getLanguage,
    clickOk,
    setSettingsLanguage,
    saveDialogClick,
    closeDialogIfPresent,
    getDbConnection,
    deleteTestUser,
    clearTestUser,
    fileContains,
    fileNotContains,
    documentContains,
    getCookie,
    deleteCookies,
};
