// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig(
{
    testDir: './test',
    timeout: 120000,
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'list',
    use:
    {
        browserName: 'chromium',
        headless: true,
        viewport: { width: 1100, height: 900 },
        ignoreHTTPSErrors: true,
        launchOptions:
        {
            args: [
                '--disable-web-security',
                '--unsafely-treat-insecure-origin-as-secure=https://www.yutovo.ru',
                '--allow-insecure-localhost',
                '--enable-features=SharedArrayBuffer',
                '--host-resolver-rules=MAP yutovo.ru 127.0.0.1, MAP www.yutovo.ru 127.0.0.1',
            ],
        },
        trace: 'on-first-retry',
    },
});
