# Agent Instructions

## Testing Rules

- **Never change test semantics.** Tests document expected behavior. If a test fails, fix the application code, not the test assertion.
- All Selenium tests run against `https://www.yutovo.ru` with Chrome `--host-resolver-rules=MAP www.yutovo.ru 127.0.0.1` so the browser resolves the domain to the local nginx instance.
- Do not replace assertions, expected values, or test URLs to make a test pass.

## URL Behavior

- Opening a library document must keep the URL as `/library/<lang>/<path>/<filename>.yut`.
- Saving a user document changes the URL to `/document/<id>`.
