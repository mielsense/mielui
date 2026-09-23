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

### Plan a release across multiple pull requests

Group release work in a GitHub milestone, with one issue per feature or fix.
Link each focused pull request to its issue and assign it to the same milestone.
Use short-lived branches from current `main` and merge completed pull requests
into `main` as they pass review and required checks. Prefer one focused change per
pull request, usually linked to one issue. Combine issues only when they describe
one inseparable change; split large issues when separate changes can be reviewed
and delivered independently.

Use a stack only for a real dependency on an unmerged pull request. Its bottom PR
targets `main`; each later PR targets the branch below it. State the dependency
in each description, merge from the bottom up, and update the remaining branches
as needed. Independent work should target `main` directly, even within one release.
Squash each PR using its Conventional Commit title.

The next planned release is `v0.2.0`. Collect its release notes under
`changelog/0.2.0/` as each change lands. Keep the package version at its published
version until a final release preparation pull request updates it. That pull
request follows the full npm publishing procedure below after the milestone's
scope is complete. Merging feature pull requests deploys the docs through Vercel;
npm publication happens only when the GitHub Release is published.

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

### First publication: bootstrap, then trusted publishing

An unpublished package has no trusted-publisher configuration. A `404 Not Found` from `POST /-/package/@mielui%2fsvelte/trust` after authentication means the package must be published first. Repeating `npm login` or `npm trust` will not create it.

To make the first publication through GitHub Actions:

1. In [npm access-token settings](https://www.npmjs.com/settings/honeycallme/tokens), create a short-lived granular token. Under **Packages and scopes**, grant **Read and write** to the `@mielui` scope, including creation of new packages. Enable **Bypass two-factor authentication** for CI publishing. Organization-management permissions alone do not grant package publishing access. See [npm's token instructions](https://docs.npmjs.com/creating-and-viewing-access-tokens).
2. Store it as `NPM_TOKEN` in the GitHub `npm` environment. This command prompts for the value without placing it in shell history:

   ```sh
   gh secret set NPM_TOKEN --env npm --repo mielsense/mielui
   ```

   Alternatively, use [GitHub environment settings](https://github.com/mielsense/mielui/settings/environments). Do not paste the token into chat, a commit, or release notes.

3. Follow **Release a version** below. The workflow uses the bootstrap token to publish its verified tarball.
4. Once `@mielui/svelte` exists on npm, configure the trusted publisher from its package settings or run this command in an interactive terminal and complete npm's browser/2FA approval:

   ```sh
   npx --yes npm@11.20.0 trust github @mielui/svelte \
     --file publish.yml \
     --repo mielsense/mielui \
     --env npm \
     --allow-publish \
     --yes
   ```

5. Confirm the trusted-publisher settings, delete `NPM_TOKEN` from GitHub's `npm` environment, and revoke the bootstrap token on npm. Later releases use OpenID Connect without a stored npm publishing token.

### Release a version

1. Update `packages/mielui/package.json` to the version you intend to publish, update the lockfile if needed, and finish that version's notes under `changelog/<version>/`.
2. Run `pnpm run release-gate`, let the pull request checks pass, and merge the release changes into `main`. Read the current package version and existing tags/releases; the version below is an example, not a value to reuse.
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

7. Confirm the workflow succeeded and verify the published version with `npm view @mielui/svelte@0.1.1 version` and the channel with `npm view @mielui/svelte dist-tags --json`. Report the GitHub release URL and `npm install @mielui/svelte@0.1.1`. If publishing fails, check whether npm already contains that version before retrying the workflow.

For a later release, replace `0.1.1` with the new package version throughout these steps. Editing a GitHub release title does not change the npm version.

The current workflow publishes to npm's `latest` channel, including when a GitHub release is marked as a prerelease. Use this procedure for stable releases only until a separate prerelease channel is configured.

## Optional theme registry

The CLI installs component source from the package's bundled registry. Built-in themes also ship in the package. The separate `apps/registry` service stores shared themes and requires PostgreSQL.

For shared themes, copy `apps/registry/.env.example` to `.env`, set `DATABASE_URL` and `DIRECT_URL`, run migrations, and deploy the registry service with the included Docker setup. The default endpoint is `https://registry.ui.miel.my`; configure that domain when deploying the service. It is not deployed with the Vercel docs.
