const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1100, height: 900 } });
  const page = await context.newPage();
  await page.goto('https://www.yutovo.ru');
  await page.waitForTimeout(2000);
  await page.locator("xpath=//*[contains(text(), 'Login')] | //*[contains(text(), 'Войти')]").first().evaluate(el => el.click());
  await page.waitForTimeout(500);
  await page.locator("xpath=//input[contains(@class, 'login-username')]").fill('test1');
  await page.locator("xpath=//input[contains(@class, 'login-password')]").fill('11');
  await page.locator('#submit').click();
  await page.waitForTimeout(2000);
  const cookies = await context.cookies();
  console.log('cookies', cookies.map(c => ({name: c.name, value: c.value.slice(0,20), domain: c.domain, path: c.path, httpOnly: c.httpOnly, sameSite: c.sameSite})));
  const storageState = await context.storageState();
  console.log('storageState cookies', storageState.cookies.map(c => ({name: c.name, value: c.value.slice(0,20), domain: c.domain, path: c.path})));
  await browser.close();
})();
