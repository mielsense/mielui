# Upstream attribution

Mielui is an independently maintained Svelte component library derived from [Sivir UI](https://github.com/aidan-neel/sivir-ui) by Aidan Neel. Sivir UI provided the initial source foundation. Mielui now maintains its own component APIs, interactions, motion, theme system, CLI, documentation, and release history.

Use Mielui's source and documentation as the reference for this package. Sivir UI examples and release versions do not describe Mielui's current APIs. Upstream changes are reviewed individually rather than mirrored automatically.

## Sivir UI foundation

- Imported commit: `1b71c2a5d00c46a9b74508d08f836fc0e913858c`.
- Imported package version: `0.3.3`.
- Mielui's release sequence began at `0.1.0`; this release is `0.1.1`.
- License: MIT. Aidan Neel's copyright and permission notice remain in `LICENSE`, alongside the notice for Mielui modifications.

The original import renamed the project, package, CLI, configuration, and documentation links. Subsequent Mielui work includes component composition changes, form and upload behavior, chart components, shared interaction and motion rules, Theme Studio, and documentation. These changes do not remove the attribution or license requirements for inherited code.

The inherited changelog is archived in the repository's `docs/upstream-changelog/` directory. It describes Sivir UI work, not original Mielui contributions. Mielui changes are recorded separately in `changelog/` and the documentation changelog.

## COSS for Svelte

The SSR-safe Hugeicons renderer is adapted from [COSS for Svelte](https://github.com/mielsense/coss-sv), `packages/ui/src/lib/hugeicons-icon.svelte`. Its MIT notice is retained in `LICENSE-COSS` in the npm package and in `packages/mielui/LICENSE-COSS` in this repository. Group composition follows that project's documented pattern, adapted to Mielui controls.

## Documentation artwork and dependencies

The sleeping-cat ASCII animation comes from the owner's `www` project. It is documentation artwork, separate from the Sivir UI import.

Third-party runtime packages and fonts retain their own licenses. Mielui's MIT license covers Mielui and inherited MIT-licensed source, not a replacement license for those dependencies.

## Redistributing source

Keep the applicable copyright and permission notices when copying or redistributing component source. The npm package includes `LICENSE`, `LICENSE-COSS`, and this attribution file. The CLI also copies them into `notices/mielui/` inside the configured Mielui source directory, leaving the application's root license untouched. Mielui's independent development does not waive those notices.
