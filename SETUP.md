# Setup

## Local development

Use Node.js 22.18 or newer. Enable Corepack with `corepack enable`; the root package pins pnpm 10.34.5.

```sh
pnpm install --frozen-lockfile
pnpm --filter=docs run dev
```

The docs run at `http://localhost:5173`.

## GitHub

The repository uses `main` and short-lived feature branches. Pull requests squash into one commit, using their Conventional Commit title. CI runs on pull requests and pushes to `main`. Version tags mark package releases; there is no separate development branch to keep in sync.

## Vercel docs

1. Import `mielsense/mielui` into Vercel.
2. Set the root directory to `apps/docs` and enable access to files outside the root directory.
3. Select SvelteKit and Node 22. The app's `vercel.json` installs from the workspace root and builds the docs and its package dependencies.
4. Use `main` as the production branch.
5. Add `ui.miel.my` in the project's domain settings and create the DNS record Vercel shows.

No database or secret is required for the docs. Leave `DOCS_ADAPTER` unset so the Vercel adapter is used. GitHub star counts fall back to a link while this repository is private.

## npm publishing

The package is `@mielui/svelte`, with the `mielui` executable. Package versions and releases are managed independently of Sivir UI.

### One-time npm authorization

Your local `npm login` authenticates your computer. GitHub Actions needs its own publishing authorization.

For a package that already exists on npm, configure a **Trusted Publisher** in its npm package settings:

- Provider: GitHub Actions
- Organization or user: `mielsense`
- Repository: `mielui`
- Workflow filename: `publish.yml`
- Environment: `npm`
- Allow direct publishing with `npm publish`.

The workflow uses OpenID Connect and npm 11.20.0. Once trusted publishing is configured, it does not need an `NPM_TOKEN` secret. See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

If npm requires an initial publication before you can configure the package's trusted publisher, create a short-lived granular npm token with read/write access to the `mielui` scope and permission to publish from CI. Add it as `NPM_TOKEN` in [the GitHub `npm` environment](https://github.com/mielsense/mielui/settings/environments). The workflow accepts this token for the first release. After publishing, configure the trusted publisher, remove the GitHub secret, and revoke the bootstrap token on npm. Never put the token in a commit or release notes.

### Release a version

1. Update `packages/mielui/package.json` to the version you intend to publish, update the lockfile if needed, and finish that version's notes under `changelog/<version>/`.
2. Run `pnpm run release-gate`, let the pull request checks pass, and merge the release changes into `main`. The existing `v0.1.1` release work is in [PR #2](https://github.com/mielsense/mielui/pull/2).
3. From an up-to-date checkout of `main`, create an annotated tag matching the package version. For `0.1.1`:

   ```sh
   git switch main
   git pull --ff-only
   git tag -a v0.1.1 -m "Release v0.1.1"
   git push origin v0.1.1
   ```

   Use a new version for every subsequent release. Never move or reuse a published version tag.

4. Open [GitHub Releases](https://github.com/mielsense/mielui/releases/new), select the existing `v0.1.1` tag, set the title to `v0.1.1`, and add release notes.
5. Click **Publish release**. This is the action that tells GitHub to run the npm publishing workflow. Saving a draft or pushing a tag alone does not publish the package.
6. Watch [the Publish workflow](https://github.com/mielsense/mielui/actions/workflows/publish.yml). It checks that the tag matches the package version, runs the complete CI suite, and publishes that run's verified tarball to npm with provenance.

For a later release, replace `0.1.1` with the new package version throughout these steps. Editing a GitHub release title does not change the npm version.

The current workflow publishes to npm's `latest` channel, including when a GitHub release is marked as a prerelease. Use this procedure for stable releases only until a separate prerelease channel is configured.

## Optional theme registry

The CLI installs component source from the package's bundled registry. Built-in themes also ship in the package. The separate `apps/registry` service stores shared themes and requires PostgreSQL.

For shared themes, copy `apps/registry/.env.example` to `.env`, set `DATABASE_URL` and `DIRECT_URL`, run migrations, and deploy the registry service with the included Docker setup. The default endpoint is `https://registry.ui.miel.my`; configure that domain when deploying the service. It is not deployed with the Vercel docs.
