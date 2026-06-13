# Agent Instructions

## Testing Rules

- **Never change test semantics.** Tests document expected behavior. If a test fails, fix the application code, not the test assertion.
- All Playwright tests run against `https://www.yutovo.ru` with Chrome `--host-resolver-rules=MAP www.yutovo.ru 127.0.0.1` so the browser resolves the domain to the local nginx instance.
- Do not replace assertions, expected values, or test URLs to make a test pass.

## URL Behavior

- Opening a library document must keep the URL as `/library/<lang>/<path>/<filename>.yut`.
- Saving a user document changes the URL to `/document/<id>`.

## JavaScript Code Style

- Opening braces `{` go on a new line.
- Indentation is 4 spaces everywhere.
- In `if` statements, the body must start on the next line, even for single-line bodies. For example:
  ```javascript
  if (conn)
      await conn.end();
  ```

## Branch Rules

- Do not switch git branches yourself.
- Leave uncommitted changes in the current branch; the user will handle commits and branch switching.
- If a commit is required, ask the user which branch to use.

## Test Environment

- The frontend must be built with `production: false` in `src/site/quasar.config.js` so that captcha fields are hidden and login/register flows work without manual captcha input.
- DB credentials are read from `yutovo-server.env`. Run tests with:
  ```bash
  cd src/site && set -a && source ../../yutovo-server.env && set +a && npx playwright test --workers=1
  ```
  Or for a specific file:
  ```bash
  cd src/site && set -a && source ../../yutovo-server.env && set +a && npx playwright test test/documents.spec.js --workers=1
  ```
