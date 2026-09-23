# Blocks, AI, charts and actions audit

Audit mode; installed Svelte 5.57.1 / Kit 2.70.3, stable runes and snippets. Read svelte-edge canonical runes, snippets, declaration-tags, attachments, motion and best-practices; DESIGN.md and repository instructions. State stays instance/context-scoped except deliberately browser-only toast runtime. Existing public actions remain compatible actions; no new exported package API.

## Coverage and limits

All 329 Svelte files in these library families and their matching docs/example directories were compiled with the installed compiler: zero errors, one existing Question.Content dynamic tabindex warning. Focused manual review covered state, cleanup, composition, HTML safety, motion and large-input hot paths. This is not a proof of zero bugs. Root owns full integration checks. No unrelated public API changes.

## Findings and patches

- **id**: BC01
- **file**: packages/mielui/src/blocks/notch/notch-content.svelte
- **category**: bug
- **severity**: medium
- **confidence**: high
- **evidence**: moveSwipe retained the previous drag when movement returned within the initial threshold, and cross-axis cancellation dropped pointer without clearing drag.
- **why_it_matters**: An aborted or reversed swipe could dismiss a panel or leave it visually displaced.
- **recommended_change**: Extracted private swipe.svelte.ts; clear offset and release pointer capture on cancellation, close, destruction and capture loss.
- **version_or_flag_blocker**: None
- **patch_scope**: Notch content, private swipe controller, manifest, docs and browser regression
- **canonical_owner**: references/runes.md; references/motion.md

- **id**: BC02
- **file**: packages/mielui/src/chart-components/chart/root.svelte
- **category**: bug
- **severity**: medium
- **confidence**: high
- **evidence**: Math.min(0, ...extents), Math.max(0, ...extents), Math.min(...gaps)
- **why_it_matters**: Large datasets exceed the JS argument limit and throw rather than render. Repeated indexOf also scales with rows times series.
- **recommended_change**: Extracted pure domains.ts using loops; precompute visible/bar column indices once per derived evaluation.
- **version_or_flag_blocker**: None
- **patch_scope**: Chart private domain helper, manifest, unit regression
- **canonical_owner**: references/best-practices.md

- **id**: BC03
- **file**: packages/mielui/src/chart-components/chart/axis.svelte
- **category**: modernization
- **severity**: low
- **confidence**: high
- **evidence**: new Intl.NumberFormat constructed inside every tick template; equivalent formatter construction in Chart and PieChart format callbacks.
- **why_it_matters**: Repeated expensive formatter setup occurs during pointer updates and animated rendering.
- **recommended_change**: Create Intl formatters once per component instance; preserve invalid-date fallback.
- **version_or_flag_blocker**: None
- **patch_scope**: Chart root, axis, PieChart root
- **canonical_owner**: references/runes.md

- **id**: BC04
- **file**: packages/mielui/src/ai-components/attachment/attachment-item.svelte
- **category**: bug
- **severity**: medium
- **confidence**: high
- **evidence**: Math.min(100, Math.max(0, progress)) accepted NaN.
- **why_it_matters**: Could produce aria-valuenow=NaN and width:NaN%, invalid progress semantics.
- **recommended_change**: Treat nonfinite numbers as indeterminate, preserving clamping for finite values.
- **version_or_flag_blocker**: None
- **patch_scope**: Attachment item and docs
- **canonical_owner**: references/best-practices.md

- **id**: BC05
- **file**: packages/mielui/src/actions/shimmer/index.ts
- **category**: modernization
- **severity**: low
- **confidence**: high
- **evidence**: Infinite Web Animation had no viewport/document visibility lifecycle.
- **why_it_matters**: Offscreen loading highlights continued animation work.
- **recommended_change**: Pause when offscreen or document hidden, clean up observer/listener.
- **version_or_flag_blocker**: None
- **patch_scope**: Shimmer action and docs
- **canonical_owner**: references/motion.md

- **id**: BC06
- **file**: packages/mielui/src/actions/morph/index.ts
- **category**: bug
- **severity**: medium
- **confidence**: high
- **evidence**: Theme observer refreshed only if motion-duration-panel changed; text overlay cached computed color.
- **why_it_matters**: Switching color theme without changing motion could leave animated text in the old color.
- **recommended_change**: Refresh text overlay color on external theme changes, excluding self-generated style writes to avoid a mutation loop.
- **version_or_flag_blocker**: None
- **patch_scope**: Morph action
- **canonical_owner**: references/motion.md

- **id**: BC07
- **file**: apps/docs/src/routes/docs/components/toast/examples/promise.svelte
- **category**: bug
- **severity**: medium
- **confidence**: high
- **evidence**: onDestroy cleared request timeout but did not dismiss persistent loading toast.
- **why_it_matters**: Leaving an unfinished example could strand its loading notification across route changes.
- **recommended_change**: Retain notification handle and dismiss on destruction.
- **version_or_flag_blocker**: None
- **patch_scope**: Toast promise example
- **canonical_owner**: references/runes.md

- **id**: BC08
- **file**: multiple (see modernized files below)
- **category**: modernization
- **severity**: medium
- **confidence**: high
- **evidence**: Legacy {@const} remained in seven runes components.
- **why_it_matters**: Current skill requires Svelte 5.56 declaration syntax; plain const replacement would lose reactive updates.
- **recommended_change**: Migrated via compiler AST to {const value = $derived(expression)} and compiled each replacement.
- **version_or_flag_blocker**: Requires Svelte 5.56; root owns coordinated dependency-floor updates.
- **patch_scope**: DataTable, Markdown, ReorderList, Chart templates
- **canonical_owner**: references/declaration-tags.md

- **id**: BC09
- **file**: packages/mielui/src/ai-components/response-stream/stream.svelte.ts
- **category**: modernization
- **severity**: low
- **confidence**: high
- **evidence**: Both startsWith branches called applySnapshot(textStream), one additionally returned just before function return.
- **why_it_matters**: Redundant branching implied a difference in behavior that did not exist.
- **recommended_change**: Removed redundant branch.
- **version_or_flag_blocker**: None
- **patch_scope**: Response stream controller
- **canonical_owner**: references/best-practices.md

- **id**: BC10
- **file**: packages/mielui/src/actions/number-shuffle/index.ts
- **category**: modernization
- **severity**: low
- **confidence**: high
- **evidence**: synchronizeSurface called getComputedStyle three times.
- **why_it_matters**: Repeated style resolution while synchronizing animated values was unnecessary.
- **recommended_change**: Reuse the computed appearance object.
- **version_or_flag_blocker**: None
- **patch_scope**: Number Shuffle action
- **canonical_owner**: references/motion.md

- **id**: BC11
- **file**: packages/mielui/src/chart-components/gauge/gauge.svelte
- **category**: modernization
- **severity**: low
- **confidence**: high
- **evidence**: arcStrokeWidth was a derived alias of safeStrokeWidth with no distinction.
- **why_it_matters**: Unnecessary reactive indirection made arc geometry harder to follow.
- **recommended_change**: Use safeStrokeWidth directly.
- **version_or_flag_blocker**: None
- **patch_scope**: Gauge
- **canonical_owner**: references/runes.md

## Component-by-component inventory

### code-block

Reviewed shared escaped highlighting, registry registration/disposal, tab and copy composition; no additional actionable issue.

Library: `packages/mielui/src/blocks/code-block` (10 files). Docs/examples: `apps/docs/src/routes/docs/components/code-block` (11 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/code-block/code-block-actions.svelte`
- `packages/mielui/src/blocks/code-block/code-block-content.svelte`
- `packages/mielui/src/blocks/code-block/code-block-copy.svelte`
- `packages/mielui/src/blocks/code-block/code-block-header.svelte`
- `packages/mielui/src/blocks/code-block/code-block-list.svelte`
- `packages/mielui/src/blocks/code-block/code-block-trigger.svelte`
- `packages/mielui/src/blocks/code-block/code-block.svelte`
- `packages/mielui/src/blocks/code-block/highlight.ts`
- `packages/mielui/src/blocks/code-block/index.ts`
- `packages/mielui/src/blocks/code-block/manifest.ts`
- `apps/docs/src/routes/docs/components/code-block/+page.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/compound.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/copy-inline.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/copy-overlay.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/custom-actions.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/custom-theme-stylesheet.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/custom-theme-variables.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/line-numbers.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/multi-language.svelte`
- `apps/docs/src/routes/docs/components/code-block/examples/single.svelte`

</details>

### color-picker

Reviewed private controller, bounded channels, external-value synchronization, pointer helper; no additional actionable issue.

Library: `packages/mielui/src/blocks/color-picker` (15 files). Docs/examples: `apps/docs/src/routes/docs/components/color-picker` (7 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/color-picker/color-picker-channels.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-content.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-hex-input.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-hue.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-plane.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-presets.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-preview.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-root.svelte`
- `packages/mielui/src/blocks/color-picker/color-picker-trigger.svelte`
- `packages/mielui/src/blocks/color-picker/context.ts`
- `packages/mielui/src/blocks/color-picker/controller.svelte.ts`
- `packages/mielui/src/blocks/color-picker/conversions.ts`
- `packages/mielui/src/blocks/color-picker/index.ts`
- `packages/mielui/src/blocks/color-picker/manifest.ts`
- `packages/mielui/src/blocks/color-picker/pointer.ts`
- `apps/docs/src/routes/docs/components/color-picker/+page.svelte`
- `apps/docs/src/routes/docs/components/color-picker/examples/composition.svelte`
- `apps/docs/src/routes/docs/components/color-picker/examples/default.svelte`
- `apps/docs/src/routes/docs/components/color-picker/examples/formats.svelte`
- `apps/docs/src/routes/docs/components/color-picker/examples/glass.svelte`
- `apps/docs/src/routes/docs/components/color-picker/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/color-picker/examples/with-presets.svelte`

</details>

### command

Reviewed scoped controller, search reconciliation, IME guards, announcement timeout cleanup; no additional actionable issue.

Library: `packages/mielui/src/blocks/command` (14 files). Docs/examples: `apps/docs/src/routes/docs/components/command` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/command/command-content.svelte`
- `packages/mielui/src/blocks/command/command-group.svelte`
- `packages/mielui/src/blocks/command/command-header.svelte`
- `packages/mielui/src/blocks/command/command-item.svelte`
- `packages/mielui/src/blocks/command/command-results.svelte`
- `packages/mielui/src/blocks/command/command-search.svelte`
- `packages/mielui/src/blocks/command/command-separator.svelte`
- `packages/mielui/src/blocks/command/command-trigger.svelte`
- `packages/mielui/src/blocks/command/command.svelte`
- `packages/mielui/src/blocks/command/context.svelte.ts`
- `packages/mielui/src/blocks/command/controller.svelte.ts`
- `packages/mielui/src/blocks/command/index.ts`
- `packages/mielui/src/blocks/command/manifest.ts`
- `packages/mielui/src/blocks/command/search.ts`
- `apps/docs/src/routes/docs/components/command/+page.svelte`
- `apps/docs/src/routes/docs/components/command/examples/glass.svelte`
- `apps/docs/src/routes/docs/components/command/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/command/examples/with-groups.svelte`

</details>

### copy-button

Reviewed clipboard fallback focus restoration, pending request revision, timer teardown; no additional actionable issue.

Library: `packages/mielui/src/blocks/copy-button` (3 files). Docs/examples: `apps/docs/src/routes/docs/components/copy-button` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/copy-button/copy-button.svelte`
- `packages/mielui/src/blocks/copy-button/index.ts`
- `packages/mielui/src/blocks/copy-button/manifest.ts`
- `apps/docs/src/routes/docs/components/copy-button/+page.svelte`
- `apps/docs/src/routes/docs/components/copy-button/examples/basic.svelte`
- `apps/docs/src/routes/docs/components/copy-button/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/copy-button/examples/variants.svelte`

</details>

### data-table

BC08; reviewed feature adapters, selection/pagination, typed filter parsing and optional feature support.

Library: `packages/mielui/src/blocks/data-table` (18 files). Docs/examples: `apps/docs/src/routes/docs/components/data-table` (5 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/data-table/data-table-body.svelte`
- `packages/mielui/src/blocks/data-table/data-table-column-header.svelte`
- `packages/mielui/src/blocks/data-table/data-table-empty.svelte`
- `packages/mielui/src/blocks/data-table/data-table-facet.svelte`
- `packages/mielui/src/blocks/data-table/data-table-filter.svelte`
- `packages/mielui/src/blocks/data-table/data-table-filters.svelte`
- `packages/mielui/src/blocks/data-table/data-table-header.svelte`
- `packages/mielui/src/blocks/data-table/data-table-pagination.svelte`
- `packages/mielui/src/blocks/data-table/data-table-selection.svelte`
- `packages/mielui/src/blocks/data-table/data-table-sort.svelte`
- `packages/mielui/src/blocks/data-table/data-table-summary.svelte`
- `packages/mielui/src/blocks/data-table/data-table-toolbar.svelte`
- `packages/mielui/src/blocks/data-table/data-table-view.svelte`
- `packages/mielui/src/blocks/data-table/data-table.svelte`
- `packages/mielui/src/blocks/data-table/features.ts`
- `packages/mielui/src/blocks/data-table/filter.ts`
- `packages/mielui/src/blocks/data-table/index.ts`
- `packages/mielui/src/blocks/data-table/manifest.ts`
- `apps/docs/src/routes/docs/components/data-table/+page.svelte`
- `apps/docs/src/routes/docs/components/data-table/examples/controlled.svelte`
- `apps/docs/src/routes/docs/components/data-table/examples/data.ts`
- `apps/docs/src/routes/docs/components/data-table/examples/empty.svelte`
- `apps/docs/src/routes/docs/components/data-table/examples/hero.svelte`

</details>

### file-diff

Reviewed derived totals, subpart rendering, shared escaped highlighter; no additional actionable issue.

Library: `packages/mielui/src/blocks/file-diff` (10 files). Docs/examples: `apps/docs/src/routes/docs/components/file-diff` (6 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/file-diff/file-diff-content.svelte`
- `packages/mielui/src/blocks/file-diff/file-diff-filename.svelte`
- `packages/mielui/src/blocks/file-diff/file-diff-line-number.svelte`
- `packages/mielui/src/blocks/file-diff/file-diff-plus-minus.svelte`
- `packages/mielui/src/blocks/file-diff/file-diff-row.svelte`
- `packages/mielui/src/blocks/file-diff/file-diff-top-bar.svelte`
- `packages/mielui/src/blocks/file-diff/file-diff.svelte`
- `packages/mielui/src/blocks/file-diff/highlight.ts`
- `packages/mielui/src/blocks/file-diff/index.ts`
- `packages/mielui/src/blocks/file-diff/manifest.ts`
- `apps/docs/src/routes/docs/components/file-diff/+page.svelte`
- `apps/docs/src/routes/docs/components/file-diff/examples/compound.svelte`
- `apps/docs/src/routes/docs/components/file-diff/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/file-diff/examples/live.svelte`
- `apps/docs/src/routes/docs/components/file-diff/examples/stacked.svelte`
- `apps/docs/src/routes/docs/components/file-diff/examples/without-line-numbers.svelte`

</details>

### markdown

BC08; inspected token rendering and URL guards; raw HTML is rendered as text and highlighting uses shared escaping.

Library: `packages/mielui/src/blocks/markdown` (5 files). Docs/examples: `apps/docs/src/routes/docs/components/markdown` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/markdown/_types.ts`
- `packages/mielui/src/blocks/markdown/index.ts`
- `packages/mielui/src/blocks/markdown/manifest.ts`
- `packages/mielui/src/blocks/markdown/markdown-token.svelte`
- `packages/mielui/src/blocks/markdown/markdown.svelte`
- `apps/docs/src/routes/docs/components/markdown/+page.svelte`
- `apps/docs/src/routes/docs/components/markdown/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/markdown/examples/safe-html.svelte`
- `apps/docs/src/routes/docs/components/markdown/examples/streaming.svelte`

</details>

### notch

BC01: extracted gesture lifecycle; remaining content file combines its existing clipping/motion composition, no new public parts.

Library: `packages/mielui/src/blocks/notch` (15 files). Docs/examples: `apps/docs/src/routes/docs/components/notch` (5 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/notch/context.ts`
- `packages/mielui/src/blocks/notch/index.ts`
- `packages/mielui/src/blocks/notch/manifest.ts`
- `packages/mielui/src/blocks/notch/notch-accessory.svelte`
- `packages/mielui/src/blocks/notch/notch-actions.svelte`
- `packages/mielui/src/blocks/notch/notch-close.svelte`
- `packages/mielui/src/blocks/notch/notch-content.svelte`
- `packages/mielui/src/blocks/notch/notch-description.svelte`
- `packages/mielui/src/blocks/notch/notch-header.svelte`
- `packages/mielui/src/blocks/notch/notch-peek.svelte`
- `packages/mielui/src/blocks/notch/notch-side-action.svelte`
- `packages/mielui/src/blocks/notch/notch-title.svelte`
- `packages/mielui/src/blocks/notch/notch.svelte`
- `packages/mielui/src/blocks/notch/shape.ts`
- `packages/mielui/src/blocks/notch/swipe.svelte.ts`
- `apps/docs/src/routes/docs/components/notch/+page.svelte`
- `apps/docs/src/routes/docs/components/notch/examples/activity.svelte`
- `apps/docs/src/routes/docs/components/notch/examples/glass.svelte`
- `apps/docs/src/routes/docs/components/notch/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/notch/examples/peek.svelte`

</details>

### reorder-list

BC08; reviewed existing separate gesture controller, snapshots, list-change cancellation and pointer cleanup.

Library: `packages/mielui/src/blocks/reorder-list` (8 files). Docs/examples: `apps/docs/src/routes/docs/components/reorder-list` (3 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/reorder-list/context.svelte.ts`
- `packages/mielui/src/blocks/reorder-list/gesture.svelte.ts`
- `packages/mielui/src/blocks/reorder-list/index.ts`
- `packages/mielui/src/blocks/reorder-list/manifest.ts`
- `packages/mielui/src/blocks/reorder-list/reorder-list-content.svelte`
- `packages/mielui/src/blocks/reorder-list/reorder-list-handle.svelte`
- `packages/mielui/src/blocks/reorder-list/reorder-list-item.svelte`
- `packages/mielui/src/blocks/reorder-list/reorder-list.svelte`
- `apps/docs/src/routes/docs/components/reorder-list/+page.svelte`
- `apps/docs/src/routes/docs/components/reorder-list/examples/handles.svelte`
- `apps/docs/src/routes/docs/components/reorder-list/examples/hero.svelte`

</details>

### show-more

Reviewed measurement attachment, resize observer disposal, focus restoration, derived height bounds; no additional actionable issue.

Library: `packages/mielui/src/blocks/show-more` (3 files). Docs/examples: `apps/docs/src/routes/docs/components/show-more` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/show-more/index.ts`
- `packages/mielui/src/blocks/show-more/manifest.ts`
- `packages/mielui/src/blocks/show-more/show-more.svelte`
- `apps/docs/src/routes/docs/components/show-more/+page.svelte`
- `apps/docs/src/routes/docs/components/show-more/examples/capped.svelte`
- `apps/docs/src/routes/docs/components/show-more/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/show-more/examples/interactive.svelte`

</details>

### task-steps

Reviewed pure state derivation, shared summary context, keyed rows and demo timer cleanup; no additional actionable issue.

Library: `packages/mielui/src/blocks/task-steps` (11 files). Docs/examples: `apps/docs/src/routes/docs/components/task-steps` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/task-steps/context.svelte.ts`
- `packages/mielui/src/blocks/task-steps/index.ts`
- `packages/mielui/src/blocks/task-steps/manifest.ts`
- `packages/mielui/src/blocks/task-steps/state.ts`
- `packages/mielui/src/blocks/task-steps/task-steps-indicator.svelte`
- `packages/mielui/src/blocks/task-steps/task-steps-item.svelte`
- `packages/mielui/src/blocks/task-steps/task-steps-label.svelte`
- `packages/mielui/src/blocks/task-steps/task-steps-list.svelte`
- `packages/mielui/src/blocks/task-steps/task-steps-meta.svelte`
- `packages/mielui/src/blocks/task-steps/task-steps-summary.svelte`
- `packages/mielui/src/blocks/task-steps/task-steps.svelte`
- `apps/docs/src/routes/docs/components/task-steps/+page.svelte`
- `apps/docs/src/routes/docs/components/task-steps/examples/bare.svelte`
- `apps/docs/src/routes/docs/components/task-steps/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/task-steps/examples/retry.svelte`

</details>

### toast

BC07; reviewed browser-only shared runtime, isolated SSR state, timer pause/resume, host lifecycle.

Library: `packages/mielui/src/blocks/toast` (16 files). Docs/examples: `apps/docs/src/routes/docs/components/toast` (8 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/toast/context.svelte.ts`
- `packages/mielui/src/blocks/toast/index.ts`
- `packages/mielui/src/blocks/toast/lib.svelte.ts`
- `packages/mielui/src/blocks/toast/manifest.ts`
- `packages/mielui/src/blocks/toast/notch-host.svelte`
- `packages/mielui/src/blocks/toast/parts.ts`
- `packages/mielui/src/blocks/toast/toast-action.svelte`
- `packages/mielui/src/blocks/toast/toast-actions.svelte`
- `packages/mielui/src/blocks/toast/toast-close.svelte`
- `packages/mielui/src/blocks/toast/toast-content.svelte`
- `packages/mielui/src/blocks/toast/toast-footer.svelte`
- `packages/mielui/src/blocks/toast/toast-icon.svelte`
- `packages/mielui/src/blocks/toast/toast-title.svelte`
- `packages/mielui/src/blocks/toast/toast.svelte`
- `packages/mielui/src/blocks/toast/toaster.svelte`
- `packages/mielui/src/blocks/toast/variants.ts`
- `apps/docs/src/routes/docs/components/toast/+page.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/actions.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/all-types.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/composition.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/glass.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/notch.svelte`
- `apps/docs/src/routes/docs/components/toast/examples/promise.svelte`

</details>

### toolbar

Reviewed roving focus, disabled/inert filtering, nested toolbar exclusion and original tabindex restoration; no additional actionable issue.

Library: `packages/mielui/src/blocks/toolbar` (11 files). Docs/examples: `apps/docs/src/routes/docs/components/toolbar` (5 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/blocks/toolbar/context.ts`
- `packages/mielui/src/blocks/toolbar/index.ts`
- `packages/mielui/src/blocks/toolbar/manifest.ts`
- `packages/mielui/src/blocks/toolbar/navigation.ts`
- `packages/mielui/src/blocks/toolbar/toolbar-button.svelte`
- `packages/mielui/src/blocks/toolbar/toolbar-group.svelte`
- `packages/mielui/src/blocks/toolbar/toolbar-item.svelte`
- `packages/mielui/src/blocks/toolbar/toolbar-link.svelte`
- `packages/mielui/src/blocks/toolbar/toolbar-root.svelte`
- `packages/mielui/src/blocks/toolbar/toolbar-separator.svelte`
- `packages/mielui/src/blocks/toolbar/toolbar.svelte`
- `apps/docs/src/routes/docs/components/toolbar/+page.svelte`
- `apps/docs/src/routes/docs/components/toolbar/examples/formatting.svelte`
- `apps/docs/src/routes/docs/components/toolbar/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/toolbar/examples/reply.svelte`
- `apps/docs/src/routes/docs/components/toolbar/examples/support-note.svelte`

</details>

### attachment

BC04; reviewed validation, object URL attachment lifecycle, drag state and local ownership.

Library: `packages/mielui/src/ai-components/attachment` (8 files). Docs/examples: `apps/docs/src/routes/docs/components/attachment` (3 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/attachment/attachment-item.svelte`
- `packages/mielui/src/ai-components/attachment/attachment-list.svelte`
- `packages/mielui/src/ai-components/attachment/attachment-trigger.svelte`
- `packages/mielui/src/ai-components/attachment/attachment.svelte`
- `packages/mielui/src/ai-components/attachment/context.svelte.ts`
- `packages/mielui/src/ai-components/attachment/index.ts`
- `packages/mielui/src/ai-components/attachment/manifest.ts`
- `packages/mielui/src/ai-components/attachment/validation.ts`
- `apps/docs/src/routes/docs/components/attachment/+page.svelte`
- `apps/docs/src/routes/docs/components/attachment/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/attachment/examples/status-variants.svelte`

</details>

### composer

Reviewed submission helper boundaries, disabled/pending guards, IME composition, autosize observer; no additional actionable issue.

Library: `packages/mielui/src/ai-components/composer` (8 files). Docs/examples: `apps/docs/src/routes/docs/components/composer` (7 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/composer/composer-actions.svelte`
- `packages/mielui/src/ai-components/composer/composer-input.svelte`
- `packages/mielui/src/ai-components/composer/composer-submit.svelte`
- `packages/mielui/src/ai-components/composer/composer-toolbar.svelte`
- `packages/mielui/src/ai-components/composer/composer.svelte`
- `packages/mielui/src/ai-components/composer/context.svelte.ts`
- `packages/mielui/src/ai-components/composer/index.ts`
- `packages/mielui/src/ai-components/composer/manifest.ts`
- `apps/docs/src/routes/docs/components/composer/+page.svelte`
- `apps/docs/src/routes/docs/components/composer/examples/glass.svelte`
- `apps/docs/src/routes/docs/components/composer/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/composer/examples/idle.svelte`
- `apps/docs/src/routes/docs/components/composer/examples/state-error.svelte`
- `apps/docs/src/routes/docs/components/composer/examples/submitting.svelte`
- `apps/docs/src/routes/docs/components/composer/examples/toolbar-inset.svelte`

</details>

### conversation

Reviewed follow controller, user scroll intent, bottom threshold and ResizeObserver teardown; no additional actionable issue.

Library: `packages/mielui/src/ai-components/conversation` (8 files). Docs/examples: `apps/docs/src/routes/docs/components/conversation` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/conversation/context.svelte.ts`
- `packages/mielui/src/ai-components/conversation/conversation-content.svelte`
- `packages/mielui/src/ai-components/conversation/conversation-empty.svelte`
- `packages/mielui/src/ai-components/conversation/conversation-scroll-button.svelte`
- `packages/mielui/src/ai-components/conversation/conversation.svelte`
- `packages/mielui/src/ai-components/conversation/follow.svelte.ts`
- `packages/mielui/src/ai-components/conversation/index.ts`
- `packages/mielui/src/ai-components/conversation/manifest.ts`
- `apps/docs/src/routes/docs/components/conversation/+page.svelte`
- `apps/docs/src/routes/docs/components/conversation/examples/empty-state.svelte`
- `apps/docs/src/routes/docs/components/conversation/examples/follow-output.svelte`
- `apps/docs/src/routes/docs/components/conversation/examples/hero.svelte`

</details>

### message

Reviewed typed context, high-level rendering through public parts, role/status and metadata composition; no additional actionable issue.

Library: `packages/mielui/src/ai-components/message` (12 files). Docs/examples: `apps/docs/src/routes/docs/components/message` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/message/context.svelte.ts`
- `packages/mielui/src/ai-components/message/index.ts`
- `packages/mielui/src/ai-components/message/manifest.ts`
- `packages/mielui/src/ai-components/message/message-actions.svelte`
- `packages/mielui/src/ai-components/message/message-avatar.svelte`
- `packages/mielui/src/ai-components/message/message-body.svelte`
- `packages/mielui/src/ai-components/message/message-content.svelte`
- `packages/mielui/src/ai-components/message/message-metadata.svelte`
- `packages/mielui/src/ai-components/message/message-name.svelte`
- `packages/mielui/src/ai-components/message/message-status.svelte`
- `packages/mielui/src/ai-components/message/message-time.svelte`
- `packages/mielui/src/ai-components/message/message.svelte`
- `apps/docs/src/routes/docs/components/message/+page.svelte`
- `apps/docs/src/routes/docs/components/message/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/message/examples/role-variants.svelte`
- `apps/docs/src/routes/docs/components/message/examples/states.svelte`

</details>

### question

Reviewed discriminated answer modes, normalization, submit validation, autofocus observer cleanup. Existing dynamic fieldset tabindex compiler warning remains (not suppressed).

Library: `packages/mielui/src/ai-components/question` (13 files). Docs/examples: `apps/docs/src/routes/docs/components/question` (5 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/question/context.svelte.ts`
- `packages/mielui/src/ai-components/question/index.ts`
- `packages/mielui/src/ai-components/question/manifest.ts`
- `packages/mielui/src/ai-components/question/question-actions.svelte`
- `packages/mielui/src/ai-components/question/question-cancel.svelte`
- `packages/mielui/src/ai-components/question/question-content.svelte`
- `packages/mielui/src/ai-components/question/question-description.svelte`
- `packages/mielui/src/ai-components/question/question-input.svelte`
- `packages/mielui/src/ai-components/question/question-option.svelte`
- `packages/mielui/src/ai-components/question/question-options.svelte`
- `packages/mielui/src/ai-components/question/question-submit.svelte`
- `packages/mielui/src/ai-components/question/question-title.svelte`
- `packages/mielui/src/ai-components/question/question.svelte`
- `apps/docs/src/routes/docs/components/question/+page.svelte`
- `apps/docs/src/routes/docs/components/question/examples/composer-takeover.svelte`
- `apps/docs/src/routes/docs/components/question/examples/free-text.svelte`
- `apps/docs/src/routes/docs/components/question/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/question/examples/multiple-choice.svelte`

</details>

### reasoning

Reviewed shared disclosure lifecycle and snippets; no additional actionable issue.

Library: `packages/mielui/src/ai-components/reasoning` (6 files). Docs/examples: `apps/docs/src/routes/docs/components/reasoning` (3 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/reasoning/context.svelte.ts`
- `packages/mielui/src/ai-components/reasoning/index.ts`
- `packages/mielui/src/ai-components/reasoning/manifest.ts`
- `packages/mielui/src/ai-components/reasoning/reasoning-content.svelte`
- `packages/mielui/src/ai-components/reasoning/reasoning-trigger.svelte`
- `packages/mielui/src/ai-components/reasoning/reasoning.svelte`
- `apps/docs/src/routes/docs/components/reasoning/+page.svelte`
- `apps/docs/src/routes/docs/components/reasoning/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/reasoning/examples/streaming.svelte`

</details>

### response-stream

BC09; reviewed async iterator cancellation, revision checks, grapheme boundaries and frame cleanup.

Library: `packages/mielui/src/ai-components/response-stream` (5 files). Docs/examples: `apps/docs/src/routes/docs/components/response-stream` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/response-stream/index.ts`
- `packages/mielui/src/ai-components/response-stream/manifest.ts`
- `packages/mielui/src/ai-components/response-stream/response-stream.svelte`
- `packages/mielui/src/ai-components/response-stream/stream-utils.ts`
- `packages/mielui/src/ai-components/response-stream/stream.svelte.ts`
- `apps/docs/src/routes/docs/components/response-stream/+page.svelte`
- `apps/docs/src/routes/docs/components/response-stream/examples/complete.svelte`
- `apps/docs/src/routes/docs/components/response-stream/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/response-stream/examples/lifecycle.svelte`

</details>

### tool

Reviewed shared disclosure lifecycle, composed/high-level rendering, state/metadata subparts; no additional actionable issue.

Library: `packages/mielui/src/ai-components/tool` (9 files). Docs/examples: `apps/docs/src/routes/docs/components/tool` (5 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/ai-components/tool/context.svelte.ts`
- `packages/mielui/src/ai-components/tool/index.ts`
- `packages/mielui/src/ai-components/tool/manifest.ts`
- `packages/mielui/src/ai-components/tool/tool-content.svelte`
- `packages/mielui/src/ai-components/tool/tool-input.svelte`
- `packages/mielui/src/ai-components/tool/tool-item.svelte`
- `packages/mielui/src/ai-components/tool/tool-output.svelte`
- `packages/mielui/src/ai-components/tool/tool-trigger.svelte`
- `packages/mielui/src/ai-components/tool/tool.svelte`
- `apps/docs/src/routes/docs/components/tool/+page.svelte`
- `apps/docs/src/routes/docs/components/tool/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/tool/examples/quiet.svelte`
- `apps/docs/src/routes/docs/components/tool/examples/retry.svelte`
- `apps/docs/src/routes/docs/components/tool/examples/tool-states.svelte`

</details>

### chart

BC02/BC03/BC08; reviewed registered marks, keyed identity interpolation, reduced-motion/theme cleanup, stationary viewport visibility.

Library: `packages/mielui/src/chart-components/chart` (20 files). Docs/examples: `apps/docs/src/routes/docs/components/chart` (27 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/chart-components/chart/area.svelte`
- `packages/mielui/src/chart-components/chart/axis.svelte`
- `packages/mielui/src/chart-components/chart/bar.svelte`
- `packages/mielui/src/chart-components/chart/context.svelte.ts`
- `packages/mielui/src/chart-components/chart/domains.ts`
- `packages/mielui/src/chart-components/chart/grid.svelte`
- `packages/mielui/src/chart-components/chart/index.ts`
- `packages/mielui/src/chart-components/chart/interaction.svelte`
- `packages/mielui/src/chart-components/chart/legend.svelte`
- `packages/mielui/src/chart-components/chart/line.svelte`
- `packages/mielui/src/chart-components/chart/manifest.ts`
- `packages/mielui/src/chart-components/chart/motion.ts`
- `packages/mielui/src/chart-components/chart/path.svelte`
- `packages/mielui/src/chart-components/chart/placeholder.svelte`
- `packages/mielui/src/chart-components/chart/plot.svelte`
- `packages/mielui/src/chart-components/chart/root.svelte`
- `packages/mielui/src/chart-components/chart/ticks.ts`
- `packages/mielui/src/chart-components/chart/tooltip.svelte`
- `packages/mielui/src/chart-components/chart/x-axis.svelte`
- `packages/mielui/src/chart-components/chart/y-axis.svelte`
- `apps/docs/src/routes/docs/components/chart/+page.svelte`
- `apps/docs/src/routes/docs/components/chart/area/+page.svelte`
- `apps/docs/src/routes/docs/components/chart/bar/+page.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/area-comparison.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/area-live.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/area-states.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/area-updates.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/area.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/bar-negative.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/bar-states.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/composition.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/grouped.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/horizontal.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/line-dates.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/line-gaps.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/line-states.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/line.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/live-bars.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/live-mixed.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/live.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/mixed-states.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/mixed.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/states.svelte`
- `apps/docs/src/routes/docs/components/chart/examples/updates.svelte`
- `apps/docs/src/routes/docs/components/chart/line/+page.svelte`
- `apps/docs/src/routes/docs/components/chart/mixed/+page.svelte`

</details>

### gauge

BC11; reviewed invalid data bounds, Tween lifecycle, loading/empty ARIA, NumberShuffle integration.

Library: `packages/mielui/src/chart-components/gauge` (5 files). Docs/examples: `apps/docs/src/routes/docs/components/gauge` (6 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/chart-components/gauge/arc-path.ts`
- `packages/mielui/src/chart-components/gauge/gauge.svelte`
- `packages/mielui/src/chart-components/gauge/index.ts`
- `packages/mielui/src/chart-components/gauge/live-motion.ts`
- `packages/mielui/src/chart-components/gauge/manifest.ts`
- `apps/docs/src/routes/docs/components/gauge/+page.svelte`
- `apps/docs/src/routes/docs/components/gauge/examples/context-window.svelte`
- `apps/docs/src/routes/docs/components/gauge/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/gauge/examples/interactive.svelte`
- `apps/docs/src/routes/docs/components/gauge/examples/states.svelte`
- `apps/docs/src/routes/docs/components/gauge/examples/usage-limit.svelte`

</details>

### heatmap

Reviewed calendar model separation, cell keyboard navigation, tooltip context and live-motion viewport lifecycle; no additional actionable issue.

Library: `packages/mielui/src/chart-components/heatmap` (18 files). Docs/examples: `apps/docs/src/routes/docs/components/heatmap` (6 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/chart-components/heatmap/calendar.test.ts`
- `packages/mielui/src/chart-components/heatmap/calendar.ts`
- `packages/mielui/src/chart-components/heatmap/context.svelte.ts`
- `packages/mielui/src/chart-components/heatmap/heatmap-calendar.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-cell.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-detail.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-footer.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-grid.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-header.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-legend.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-month-labels.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-summary.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-tooltip.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap-weekday-labels.svelte`
- `packages/mielui/src/chart-components/heatmap/heatmap.svelte`
- `packages/mielui/src/chart-components/heatmap/index.ts`
- `packages/mielui/src/chart-components/heatmap/live.ts`
- `packages/mielui/src/chart-components/heatmap/manifest.ts`
- `apps/docs/src/routes/docs/components/heatmap/+page.svelte`
- `apps/docs/src/routes/docs/components/heatmap/examples/composed.svelte`
- `apps/docs/src/routes/docs/components/heatmap/examples/data.ts`
- `apps/docs/src/routes/docs/components/heatmap/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/heatmap/examples/range.svelte`
- `apps/docs/src/routes/docs/components/heatmap/examples/states.svelte`

</details>

### pie-chart

BC03; reviewed valid-data filtering, context, visibility, accessibility table and motion state.

Library: `packages/mielui/src/chart-components/pie-chart` (10 files). Docs/examples: `apps/docs/src/routes/docs/components/pie-chart` (12 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/chart-components/pie-chart/context.ts`
- `packages/mielui/src/chart-components/pie-chart/index.ts`
- `packages/mielui/src/chart-components/pie-chart/manifest.ts`
- `packages/mielui/src/chart-components/pie-chart/pie-chart-arc.svelte`
- `packages/mielui/src/chart-components/pie-chart/pie-chart-label.svelte`
- `packages/mielui/src/chart-components/pie-chart/pie-chart-legend.svelte`
- `packages/mielui/src/chart-components/pie-chart/pie-chart-plot.svelte`
- `packages/mielui/src/chart-components/pie-chart/pie-chart-tooltip.svelte`
- `packages/mielui/src/chart-components/pie-chart/pie-chart.svelte`
- `packages/mielui/src/chart-components/pie-chart/slice.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/+page.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/donut/+page.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/composition.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/donut-states.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/hero.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/live-pie.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/live.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/pie-selection.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/pie-states.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/pie.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/examples/states.svelte`
- `apps/docs/src/routes/docs/components/pie-chart/pie/+page.svelte`

</details>

### morph

BC06; reviewed interrupted transition revision, SVG cleanup, reduced motion and visual-copy accessibility.

Library: `packages/mielui/src/actions/morph` (2 files). Docs/examples: `apps/docs/src/routes/docs/actions/morph` (3 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/actions/morph/geometry.ts`
- `packages/mielui/src/actions/morph/index.ts`
- `apps/docs/src/routes/docs/actions/morph/+page.svelte`
- `apps/docs/src/routes/docs/actions/morph/count-example.svelte`
- `apps/docs/src/routes/docs/actions/morph/example.svelte`

</details>

### number-shuffle

BC10; reviewed numeric bounds, text accessibility, frame revisions, resize/theme observers and style restoration.

Library: `packages/mielui/src/actions/number-shuffle` (2 files). Docs/examples: `apps/docs/src/routes/docs/actions/number-shuffle` (3 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/actions/number-shuffle/index.ts`
- `packages/mielui/src/actions/number-shuffle/render.ts`
- `apps/docs/src/routes/docs/actions/number-shuffle/+page.svelte`
- `apps/docs/src/routes/docs/actions/number-shuffle/example.svelte`
- `apps/docs/src/routes/docs/actions/number-shuffle/formatted.svelte`

</details>

### shimmer

BC05; reviewed visual text copying, zero-motion teardown and mutation observer self-write guards.

Library: `packages/mielui/src/actions/shimmer` (1 files). Docs/examples: `apps/docs/src/routes/docs/actions/shimmer` (4 files).

<details><summary>Reviewed inventory / compiler coverage</summary>

- `packages/mielui/src/actions/shimmer/index.ts`
- `apps/docs/src/routes/docs/actions/shimmer/+page.svelte`
- `apps/docs/src/routes/docs/actions/shimmer/complete-example.svelte`
- `apps/docs/src/routes/docs/actions/shimmer/example.svelte`
- `apps/docs/src/routes/docs/actions/shimmer/text-example.svelte`

</details>

## Verification

- Installed Svelte compiler: 329 Svelte files compiled, zero errors.
- Targeted chart domain unit regression: 3 passed, includes 200,000 rows.
- Added Notch browser regression for reverse-before-release; root to run with integration suite.
- Touched files formatted with repository Biome.
- Root owns changelog, registry generation, compatibility floor, integration checks and commits/push.
