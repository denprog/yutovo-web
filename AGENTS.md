# Agent Instructions

## Agent Rules

- **Never commit without explicit user permission.** Do not run `git commit`, `git push`, `git reset`, `git rebase`, or any other git mutations unless explicitly asked to do so. Ask for confirmation each time when git mutations are needed.

## Testing Rules

- **Never change test semantics.** Tests document expected behavior. If a test fails, fix the application code, not the test assertion.
- All Playwright tests run against `https://www.yutovo.ru` with Chrome `--host-resolver-rules=MAP www.yutovo.ru 127.0.0.1` so the browser resolves the domain to the local nginx instance.
- Do not replace assertions, expected values, or test URLs to make a test pass.
- **Do not create a new spec file per feature or task.** Add new tests to the existing topical spec file (`graph.spec.js` for graphs, `solve.spec.js` for solving, `documents.spec.js` for documents, and so on). Create a new spec file only for a genuinely new test area.

## URL Behavior

- Opening a library document must keep the URL as `/library/<lang>/<path>/<filename>.yut`.
- Saving a user document changes the URL to `/document/<id>`.

## Nginx Configuration

- The canonical nginx config lives in the server project: `../yutovo-server/src/nginx.conf`. `deploy/bin/nginx.conf` is only a deployed copy — make changes in the canonical file and sync the copy, not the other way round.
- `/etc/nginx/nginx.conf` is the local test instance; it differs from the canonical config (active COOP/COEP/CORP headers, `www.yutovo.ru` server name) and is managed manually — do not edit it unless explicitly asked.

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

## Build Rules

- **Build only with `make`, never `ninja`** — even if a `build.ninja` exists in a build directory, do not run ninja.
- Limit parallel jobs to the number of **physical** cores, not `nproc` (which counts hyperthreads and makes the build slower and the machine unresponsive):
  ```bash
  make -j$(lscpu -p=Core,Socket | grep -v '^#' | sort -u | wc -l) <target>
  ```
  (16 on this machine, where `nproc` says 32.)
- Export `YUTOVO_DEPLOY` (the **native** deploy root, `/home/denis/programs/Math/yutovo/deploy`) for every cmake/make invocation, including wasm builds: headers come from `deploy/include`, the wasm packages from `deploy/wasm/cmake`.
- Native projects (yutovo-editor) are built and tested in `build/debug/`; wasm builds live in `build_web/release` (emcmake; a debug wasm exceeds Chrome's maximum module size).
- Run editor tests from `build/debug`, not from `build/debug/test` (`./test/yutovo-editor_tests --gtest_filter=...`) — tests load documents by paths relative to the build dir.
- After `make install` of a library (calculator/solver/editor), delete the dependant build artifacts to force relinking (stale links show up as `Syntax error`/`Parser error` results).

## Test Environment

- The frontend must be built for tests with `YUTOVO_PRODUCTION=false npx quasar build` (or `npm run build:test`) in `src/site` so that captcha fields are hidden and login/register flows work without manual captcha input. Do not edit `production` in `quasar.config.js`: a plain build is a production build with captcha enabled.
- DB credentials are read from `yutovo-server.env`. Run tests with:
  ```bash
  cd src/site && set -a && source ../../yutovo-server.env && set +a && npx playwright test --workers=1
  ```
  Or for a specific file:
  ```bash
  cd src/site && set -a && source ../../yutovo-server.env && set +a && npx playwright test test/documents.spec.js --workers=1
  ```
