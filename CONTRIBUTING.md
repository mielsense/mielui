# Contributing

Branch from `main` using `feat/<description>`, `fix/<description>`, or `chore/<description>`. Open a pull request to `main` and squash merge after CI passes. Vercel uses `main` for production and pull requests for previews.

Use Conventional Commits with a scope for commits and pull request titles:

```text
feat(button): add loading state
fix(dialog): restore focus on close
chore(repo): initialize mielui from sivir ui
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Use `!` before the colon for a breaking change.

Run `bun run format:check` and `bun run lint` before committing. CI also checks types, tests, builds, and package installation. Add a changelog entry for user-visible changes.

Release tags use `v<package version>`. Mielui starts at `v0.1.0` and versions releases independently of Sivir UI. Creating a tag does not publish to npm. Before the first npm release, choose the next package version and follow SETUP.md.
