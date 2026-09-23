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

1. Create or obtain access to the `mielui` organization on npm.
2. Add a publishing token as the GitHub Actions secret `NPM_TOKEN`.
3. Configure the GitHub `npm` environment and any desired reviewer protection.
4. Update the package version and lockfile, run `pnpm run release-gate`, and merge the change.
5. Create a matching `v<version>` tag and publish its GitHub release. The publish workflow rechecks and publishes the verified tarball.

The publish workflow uses npm provenance. Confirm registry and source visibility requirements before publishing from a private repository.

## Optional theme registry

The CLI installs component source from the package's bundled registry. Built-in themes also ship in the package. The separate `apps/registry` service stores shared themes and requires PostgreSQL.

For shared themes, copy `apps/registry/.env.example` to `.env`, set `DATABASE_URL` and `DIRECT_URL`, run migrations, and deploy the registry service with the included Docker setup. The default endpoint is `https://registry.ui.miel.my`; configure that domain when deploying the service. It is not deployed with the Vercel docs.
