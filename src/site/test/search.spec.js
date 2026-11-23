const { test, expect } = require('@playwright/test');
const utils = require('./utils.js');

const address = 'https://www.yutovo.ru';

test.describe('Search', () =>
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

    test('the counter reports matches and the buttons navigate', async ({ page }) =>
    {
        await utils.writeText(page, 'abab');
        await page.waitForTimeout(500);

        await utils.openFind(page);
        await page.locator('#find-input').fill('ab');
        await expect(page.locator('#find-count')).toHaveText('1/2');

        //Enter and the next button step through the matches
        await page.locator('#find-input').press('Enter');
        await expect(page.locator('#find-count')).toHaveText('2/2');

        await page.locator('#find-next').click();
        await expect(page.locator('#find-count')).toHaveText('1/2');

        //backward goes to the previous match without reselecting the current one
        await page.locator('#find-prev').click();
        await expect(page.locator('#find-count')).toHaveText('2/2');

        //the document is not modified by the search
        await utils.documentContains(page, 'abab');
    });

    test('ctrl+f opens the panel, a missing substring is reported, escape closes', async ({ page }) =>
    {
        await utils.writeText(page, 'abc');
        await page.waitForTimeout(500);

        await page.keyboard.press('Control+f');
        await expect(page.locator('#find-input')).toBeVisible();

        await page.locator('#find-input').fill('zz');
        await expect(page.locator('#find-count')).toHaveText('Not found');

        await page.locator('#find-input').fill('abc');
        await expect(page.locator('#find-count')).toHaveText('1/1');

        await page.keyboard.press('Escape');
        await expect(page.locator('#find-input')).toBeHidden();
    });

    test('the match case checkbox switches the search mode', async ({ page }) =>
    {
        await utils.writeText(page, 'Ab');
        await page.waitForTimeout(500);

        await utils.openFind(page);
        await page.locator('#find-input').fill('ab');
        await expect(page.locator('#find-count')).toHaveText('1/1');

        await page.locator('#match-case').check();
        await expect(page.locator('#find-count')).toHaveText('Not found');

        await page.locator('#match-case').uncheck();
        await expect(page.locator('#find-count')).toHaveText('1/1');
    });

    test('text inside a code block is found', async ({ page }) =>
    {
        await utils.insertCode(page);
        await page.waitForTimeout(500);
        await utils.writeText(page, 'ab');
        await page.waitForTimeout(500);

        //dismiss the autocomplete prompt - its overlay covers the toolbar buttons
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);

        await utils.openFind(page);
        await page.locator('#find-input').fill('ab');
        await expect(page.locator('#find-count')).toHaveText('1/1');
    });

    test('Enter and Shift+Enter navigate from the keyboard', async ({ page }) =>
    {
        await utils.writeText(page, 'abab');
        await page.waitForTimeout(500);

        await utils.openFind(page);
        await page.locator('#find-input').fill('ab');
        await expect(page.locator('#find-count')).toHaveText('1/2');

        //Enter goes to the next match, Shift+Enter back to the previous one
        await page.locator('#find-input').press('Enter');
        await expect(page.locator('#find-count')).toHaveText('2/2');
        await page.locator('#find-input').press('Shift+Enter');
        await expect(page.locator('#find-count')).toHaveText('1/2');
    });

    test('Enter in the replace field replaces the current match', async ({ page }) =>
    {
        await utils.writeText(page, 'abab');
        await page.waitForTimeout(500);

        await utils.openReplace(page);
        await page.locator('#find-input').fill('ab');
        await expect(page.locator('#find-count')).toHaveText('1/2');
        await page.locator('#replace-input').fill('xy');

        await page.locator('#replace-input').press('Enter');
        await expect(page.locator('#find-count')).toHaveText('1/1');
        await expect.poll(() => utils.documentContains(page, 'xyab')).toBe(true);
    });

    test('the find panel contains no replace row; the replace button turns it into the replace panel', async ({ page }) =>
    {
        await utils.openFind(page);
        await expect(page.locator('#find-input')).toBeVisible();
        await expect(page.locator('#replace-input')).toBeHidden();

        //the panel keeps the minimal height of its single row (a plain div - not resizable, no window buttons)
        const find_height = (await page.locator('.find-panel').boundingBox()).height;

        //the toolbar Replace button replaces the find panel with the replace panel
        await page.locator('#replace-button').click();
        await expect(page.locator('#replace-input')).toBeVisible();
        const replace_height = (await page.locator('.find-panel').boundingBox()).height;
        expect(replace_height).toBeGreaterThan(find_height);

        //Ctrl+F switches the panel back to the find mode
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.keyboard.press('Control+f');
        await expect(page.locator('#replace-input')).toBeHidden();

        //Ctrl+H opens the replace mode again (the input keeps the focus after the Ctrl+F switch - move it away first)
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.keyboard.press('Control+h');
        await expect(page.locator('#replace-input')).toBeVisible();
    });

    test('the whole word checkbox skips matches inside words', async ({ page }) =>
    {
        //paragraph bounds are word bounds: the first line is a standalone word, the second is not
        await utils.writeText(page, 'cat');
        await page.keyboard.press('Enter');
        await utils.writeText(page, 'catcat');
        await page.waitForTimeout(500);

        await utils.openFind(page);
        await page.locator('#find-input').fill('cat');
        await expect(page.locator('#find-count')).toHaveText(/\/3$/);

        //only the standalone occurrence stays a whole word
        await page.locator('#match-word').check();
        await expect(page.locator('#find-count')).toHaveText('1/1');

        await page.locator('#match-word').uncheck();
        await expect(page.locator('#find-count')).toHaveText(/\/3$/);
    });

    test('showing the search or replace panel focuses the find input', async ({ page }) =>
    {
        //the toolbar Find button
        await utils.openFind(page);
        await expect(page.locator('#find-input')).toBeFocused();

        //switching the open panel to the replace mode returns the focus to the input
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.locator('#replace-button').click();
        await expect(page.locator('#replace-input')).toBeVisible();
        await expect(page.locator('#find-input')).toBeFocused();

        //Ctrl+H opens the replace panel with the focus in the input
        await page.keyboard.press('Escape');
        await expect(page.locator('#find-input')).toBeHidden();
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.keyboard.press('Control+h');
        await expect(page.locator('#find-input')).toBeVisible();
        await expect(page.locator('#find-input')).toBeFocused();

        //Ctrl+F switches back to the find mode and focuses the input again
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.keyboard.press('Control+f');
        await expect(page.locator('#replace-input')).toBeHidden();
        await expect(page.locator('#find-input')).toBeFocused();
    });

    test('clicking the input focuses it', async ({ page }) =>
    {
        await utils.openFind(page);
        //click the canvas first so the focus is elsewhere
        await page.locator('#scroll-container').click({ position: { x: 100, y: 200 } });
        await page.locator('#find-input').click();
        await page.keyboard.type('ab');
        await expect(page.locator('#find-input')).toHaveValue('ab');
    });

    test('the selected text prefills the find input', async ({ page }) =>
    {
        await utils.writeText(page, 'catcat');
        await page.waitForTimeout(500);

        //select the typed line (Shift+Home) - the optimized whole-string selection resolves to its text
        await page.keyboard.press('Shift+Home');
        await page.waitForTimeout(300);

        await utils.openFind(page);
        await expect(page.locator('#find-input')).toHaveValue('catcat');
        await expect(page.locator('#find-count')).toHaveText('1/1');

        //typing the search keeps the focus in the input - the editor must not steal it
        //for the selected match (the selection change fires the prompt update)
        await page.locator('#find-input').fill('at');
        await expect(page.locator('#find-count')).toHaveText(/\/2$/);
        await expect(page.locator('#find-input')).toBeFocused();

        //close the panel and clear the selection with a caret move
        await page.keyboard.press('Escape');
        await expect(page.locator('#find-input')).toBeHidden();
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.keyboard.press('End');

        //reopening without a selection starts with an empty input
        await page.keyboard.press('Control+f');
        await expect(page.locator('#find-input')).toHaveValue('');
        await expect(page.locator('#find-input')).toBeFocused();
    });

    test('the panel is dragged by its title bar and closed by its button', async ({ page }) =>
    {
        await utils.writeText(page, 'abab');
        await page.waitForTimeout(300);

        await utils.openFind(page);
        const panel = page.locator('.find-panel');
        await expect(page.locator('.find-title-text')).toHaveText('Find');
        const before = await panel.boundingBox();

        //drag the panel by the title bar (the default placement hugs the top-right corner,
        //so there is room to the left and below only)
        const title = await page.locator('.find-title').boundingBox();
        await page.mouse.move(title.x + title.width / 2, title.y + title.height / 2);
        await page.mouse.down();
        await page.mouse.move(title.x + title.width / 2 - 150, title.y + title.height / 2 + 90, { steps: 5 });
        await page.mouse.up();
        const after = await panel.boundingBox();
        expect(after.x).toBeLessThan(before.x - 50);
        expect(after.y).toBeGreaterThan(before.y + 50);

        //the replace mode relabels the title and keeps the dragged position
        await page.locator('#replace-button').click();
        await expect(page.locator('.find-title-text')).toHaveText('Replace');
        const switched = await panel.boundingBox();
        expect(Math.abs(switched.x - after.x)).toBeLessThan(2);

        //the close button of the title bar closes the panel and deactivates the search
        await page.locator('#find-close').click();
        await expect(page.locator('#find-input')).toBeHidden();
    });

    test('replace and replace all', async ({ page }) =>
    {
        await utils.writeText(page, 'abab');
        await page.waitForTimeout(500);

        await utils.openReplace(page);
        await expect(page.locator('#replace-input')).toBeVisible();
        await page.locator('#find-input').fill('ab');
        await expect(page.locator('#find-count')).toHaveText('1/2');
        await page.locator('#replace-input').fill('xy');

        //replace works on the current match and selects the next one
        await page.locator('#replace-one-button').click();
        await expect(page.locator('#find-count')).toHaveText('1/1');
        await expect.poll(() => utils.documentContains(page, 'xyab')).toBe(true);

        //replace all covers the remaining match
        await page.locator('#replace-all-button').click();
        await expect(page.locator('#find-count')).toHaveText('Not found');
        await expect.poll(() => utils.documentContains(page, 'xyxy')).toBe(true);

        //each replace operation is one undo step
        await page.locator('#canvas').evaluate((el) => el.focus());
        await page.keyboard.press('Control+z');
        await expect.poll(() => utils.documentContains(page, 'xyab')).toBe(true);
        await page.keyboard.press('Control+z');
        await expect.poll(() => utils.documentContains(page, 'abab')).toBe(true);
    });
});
