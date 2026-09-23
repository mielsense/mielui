# Contributing

Branch from `main` using `feat/<description>`, `fix/<description>`, or `chore/<description>`. Open a pull request to `main` and squash merge after CI passes. Vercel uses `main` for production and pull requests for previews.

Use Conventional Commits with a scope for commits and pull request titles:

```text
feat(button): add loading state
fix(dialog): restore focus on close
chore(repo): initialize mielui from sivir ui
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Use `!` before the colon for a breaking change.

Run `pnpm run format:check` and `pnpm run lint` before committing. CI also checks types, tests, builds, and package installation. Add a changelog entry for user-visible changes.

Release tags use `v<package version>`. Mielui versions releases independently of Sivir UI. Creating a tag does not publish to npm. For each release, update the package version, finish its changelog, and follow SETUP.md.
