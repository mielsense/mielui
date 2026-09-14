# mielui

Svelte 5 components, built on [Sivir UI](https://github.com/aidan-neel/sivir-ui) by Aidan Neel. Package: `@mielui/svelte`. CLI: `mielui`.

![Components](https://img.shields.io/badge/Components-57-1f9be6)

Documentation will live at [ui.miel.my](https://ui.miel.my).

## Local development

Use Bun 1.3.11 or newer and Node 22.

```sh
bun install --frozen-lockfile
bun --filter=docs run dev
```

The docs run at `http://localhost:5173`. The workspace includes the component package, docs, theme registry, installer lab, tests, Docker setup, and agent skill.

```sh
bun run format:check
bun run lint
bun run check
bun run test
bun run build
```

See [SETUP.md](SETUP.md) for deployment and releases, and [CONTRIBUTING.md](CONTRIBUTING.md) for branch and commit conventions.

## Attribution

The original MIT copyright and permission notice are retained in [LICENSE](LICENSE) and the published package. [UPSTREAM.md](UPSTREAM.md) records the source commit and inherited history.
