# Controls component audit

Scope: accordion through input, 26 component families. Svelte 5.57.1 / Kit 2.70.3 baseline provided by root. Audit uses runes, snippets, declaration-tags, attachments, motion and best-practices references. No public API changes. Static source review and targeted lint; no claim that every runtime state or browser combination was exercised.

Checks: modern syntax patterns, state locality, DOM/request/timer teardown, forwarding/disabled behavior, file size/composition, docs example references. Existing simple public actions intentionally remain per skill interop allowance. Apparent unimported variant example files are consumed by llms.ts eager raw glob, so are not dead code.

## accordion

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/accordion/accordion-content.svelte
- packages/mielui/src/components/accordion/accordion-item.svelte
- packages/mielui/src/components/accordion/accordion-trigger.svelte
- packages/mielui/src/components/accordion/accordion.svelte
- packages/mielui/src/components/accordion/index.ts
- packages/mielui/src/components/accordion/item-context.ts
- packages/mielui/src/components/accordion/manifest.ts
- apps/docs/src/routes/docs/components/accordion/+page.svelte
- apps/docs/src/routes/docs/components/accordion/examples/hero.svelte
- apps/docs/src/routes/docs/components/accordion/examples/multiple-mode.svelte
- apps/docs/src/routes/docs/components/accordion/examples/single-mode.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## alert

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/alert/alert-description.svelte
- packages/mielui/src/components/alert/alert-title.svelte
- packages/mielui/src/components/alert/alert.svelte
- packages/mielui/src/components/alert/index.ts
- packages/mielui/src/components/alert/manifest.ts
- packages/mielui/src/components/alert/variants.ts
- apps/docs/src/routes/docs/components/alert/+page.svelte
- apps/docs/src/routes/docs/components/alert/examples/hero.svelte
- apps/docs/src/routes/docs/components/alert/examples/variant-error.svelte
- apps/docs/src/routes/docs/components/alert/examples/variant-info.svelte
- apps/docs/src/routes/docs/components/alert/examples/variant-success.svelte
- apps/docs/src/routes/docs/components/alert/examples/variant-warning.svelte
- apps/docs/src/routes/docs/components/alert/examples/variants.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## alert-dialog

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/alert-dialog/alert-dialog-confirm.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-content.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-description.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-exit.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-footer.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-header.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-title.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog-trigger.svelte
- packages/mielui/src/components/alert-dialog/alert-dialog.svelte
- packages/mielui/src/components/alert-dialog/index.ts
- packages/mielui/src/components/alert-dialog/manifest.ts
- apps/docs/src/routes/docs/components/alert-dialog/+page.svelte
- apps/docs/src/routes/docs/components/alert-dialog/examples/destructive.svelte
- apps/docs/src/routes/docs/components/alert-dialog/examples/glass.svelte
- apps/docs/src/routes/docs/components/alert-dialog/examples/hero.svelte
- apps/docs/src/routes/docs/components/alert-dialog/examples/sign-out.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## avatar

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/avatar/avatar-fallback.svelte
- packages/mielui/src/components/avatar/avatar-image.svelte
- packages/mielui/src/components/avatar/avatar.svelte
- packages/mielui/src/components/avatar/context.svelte.ts
- packages/mielui/src/components/avatar/index.ts
- packages/mielui/src/components/avatar/manifest.ts
- packages/mielui/src/components/avatar/variants.ts
- apps/docs/src/routes/docs/components/avatar/+page.svelte
- apps/docs/src/routes/docs/components/avatar/examples/hero.svelte
- apps/docs/src/routes/docs/components/avatar/examples/shapes.svelte
- apps/docs/src/routes/docs/components/avatar/examples/sizes.svelte
- apps/docs/src/routes/docs/components/avatar/examples/with-image.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## badge

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/badge/badge.svelte
- packages/mielui/src/components/badge/index.ts
- packages/mielui/src/components/badge/manifest.ts
- packages/mielui/src/components/badge/variants.ts
- apps/docs/src/routes/docs/components/badge/+page.svelte
- apps/docs/src/routes/docs/components/badge/examples/hero.svelte
- apps/docs/src/routes/docs/components/badge/examples/shapes.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-destructive.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-error.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-ghost.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-info.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-outline.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-primary.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-secondary.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-success.svelte
- apps/docs/src/routes/docs/components/badge/examples/variant-warning.svelte
- apps/docs/src/routes/docs/components/badge/examples/variants.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## breadcrumb

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/breadcrumb/breadcrumb-item.svelte
- packages/mielui/src/components/breadcrumb/breadcrumb-separator.svelte
- packages/mielui/src/components/breadcrumb/breadcrumb.svelte
- packages/mielui/src/components/breadcrumb/index.ts
- packages/mielui/src/components/breadcrumb/manifest.ts
- apps/docs/src/routes/docs/components/breadcrumb/+page.svelte
- apps/docs/src/routes/docs/components/breadcrumb/examples/hero.svelte
- apps/docs/src/routes/docs/components/breadcrumb/examples/separators.svelte
- apps/docs/src/routes/docs/components/breadcrumb/examples/with-icon.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## button

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/button/button.svelte
- packages/mielui/src/components/button/index.ts
- packages/mielui/src/components/button/manifest.ts
- packages/mielui/src/components/button/variants.ts
- apps/docs/src/routes/docs/components/button/+page.svelte
- apps/docs/src/routes/docs/components/button/examples/as-link.svelte
- apps/docs/src/routes/docs/components/button/examples/disabled.svelte
- apps/docs/src/routes/docs/components/button/examples/hero.svelte
- apps/docs/src/routes/docs/components/button/examples/icon-group.svelte
- apps/docs/src/routes/docs/components/button/examples/leading-icon.svelte
- apps/docs/src/routes/docs/components/button/examples/loading.svelte
- apps/docs/src/routes/docs/components/button/examples/sizes.svelte
- apps/docs/src/routes/docs/components/button/examples/trailing-icon.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-destructive.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-ghost.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-outline.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-panel.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-primary.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-quiet.svelte
- apps/docs/src/routes/docs/components/button/examples/variant-secondary.svelte
- apps/docs/src/routes/docs/components/button/examples/variants.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## calendar

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/calendar/calendar-cell.svelte
- packages/mielui/src/components/calendar/calendar-day.svelte
- packages/mielui/src/components/calendar/calendar-grid-body.svelte
- packages/mielui/src/components/calendar/calendar-grid-head.svelte
- packages/mielui/src/components/calendar/calendar-grid-row.svelte
- packages/mielui/src/components/calendar/calendar-grid.svelte
- packages/mielui/src/components/calendar/calendar-head-cell.svelte
- packages/mielui/src/components/calendar/calendar-header.svelte
- packages/mielui/src/components/calendar/calendar-heading.svelte
- packages/mielui/src/components/calendar/calendar-month-select.svelte
- packages/mielui/src/components/calendar/calendar-month.svelte
- packages/mielui/src/components/calendar/calendar-next-button.svelte
- packages/mielui/src/components/calendar/calendar-prev-button.svelte
- packages/mielui/src/components/calendar/calendar-year-select.svelte
- packages/mielui/src/components/calendar/calendar.svelte
- packages/mielui/src/components/calendar/index.ts
- packages/mielui/src/components/calendar/manifest.ts
- apps/docs/src/routes/docs/components/calendar/+page.svelte
- apps/docs/src/routes/docs/components/calendar/examples/constraints.svelte
- apps/docs/src/routes/docs/components/calendar/examples/hero.svelte
- apps/docs/src/routes/docs/components/calendar/examples/navigation.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## card

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/card/card-content.svelte
- packages/mielui/src/components/card/card-description.svelte
- packages/mielui/src/components/card/card-footer.svelte
- packages/mielui/src/components/card/card-header.svelte
- packages/mielui/src/components/card/card-title.svelte
- packages/mielui/src/components/card/card.svelte
- packages/mielui/src/components/card/context.svelte.ts
- packages/mielui/src/components/card/index.ts
- packages/mielui/src/components/card/manifest.ts
- apps/docs/src/routes/docs/components/card/+page.svelte
- apps/docs/src/routes/docs/components/card/examples/content-only.svelte
- apps/docs/src/routes/docs/components/card/examples/full.svelte
- apps/docs/src/routes/docs/components/card/examples/header-footer.svelte
- apps/docs/src/routes/docs/components/card/examples/hero.svelte
- apps/docs/src/routes/docs/components/card/examples/inset.svelte
- apps/docs/src/routes/docs/components/card/examples/panel.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## checkbox

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/checkbox/checkbox.svelte
- packages/mielui/src/components/checkbox/index.ts
- packages/mielui/src/components/checkbox/manifest.ts
- packages/mielui/src/components/checkbox/variants.ts
- apps/docs/src/routes/docs/components/checkbox/+page.svelte
- apps/docs/src/routes/docs/components/checkbox/examples/checked.svelte
- apps/docs/src/routes/docs/components/checkbox/examples/disabled.svelte
- apps/docs/src/routes/docs/components/checkbox/examples/hero.svelte
- apps/docs/src/routes/docs/components/checkbox/examples/label-only.svelte
- apps/docs/src/routes/docs/components/checkbox/examples/sizes.svelte
- apps/docs/src/routes/docs/components/checkbox/examples/with-description.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## collapsible

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/collapsible/collapsible-content.svelte
- packages/mielui/src/components/collapsible/collapsible-trigger.svelte
- packages/mielui/src/components/collapsible/collapsible.svelte
- packages/mielui/src/components/collapsible/context.svelte.ts
- packages/mielui/src/components/collapsible/index.ts
- packages/mielui/src/components/collapsible/manifest.ts
- apps/docs/src/routes/docs/components/collapsible/+page.svelte
- apps/docs/src/routes/docs/components/collapsible/examples/default.svelte
- apps/docs/src/routes/docs/components/collapsible/examples/hero.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## combobox

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/combobox/combobox-content.svelte
- packages/mielui/src/components/combobox/combobox-item.svelte
- packages/mielui/src/components/combobox/combobox-label.svelte
- packages/mielui/src/components/combobox/combobox-results.svelte
- packages/mielui/src/components/combobox/combobox-search.svelte
- packages/mielui/src/components/combobox/combobox-trigger.svelte
- packages/mielui/src/components/combobox/combobox.svelte
- packages/mielui/src/components/combobox/context.svelte.ts
- packages/mielui/src/components/combobox/controller.svelte.ts
- packages/mielui/src/components/combobox/index.ts
- packages/mielui/src/components/combobox/manifest.ts
- apps/docs/src/routes/docs/components/combobox/+page.svelte
- apps/docs/src/routes/docs/components/combobox/examples/basic.svelte
- apps/docs/src/routes/docs/components/combobox/examples/glass.svelte
- apps/docs/src/routes/docs/components/combobox/examples/hero.svelte
- apps/docs/src/routes/docs/components/combobox/examples/input-search.svelte
- apps/docs/src/routes/docs/components/combobox/examples/menu-search.svelte
- apps/docs/src/routes/docs/components/combobox/examples/multiple.svelte
- apps/docs/src/routes/docs/components/combobox/examples/scrollable.svelte

- id: CTRL-01
- file: controller.svelte.ts
- category: modernization
- severity: medium
- confidence: high
- evidence: Selection labels and commits repeatedly used entries.find and array.includes.
- why_it_matters: Large multi-selection values performed repeated linear scans.
- recommended_change: Use derived entriesByValue Map and selectedValueSet plus nextValues Set.
- version_or_flag_blocker: none
- patch_scope: controller.svelte.ts
- canonical_owner: runes.md
- outcome: implemented

## context-menu

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/context-menu/context-menu-checkbox-item.svelte
- packages/mielui/src/components/context-menu/context-menu-content.svelte
- packages/mielui/src/components/context-menu/context-menu-item.svelte
- packages/mielui/src/components/context-menu/context-menu-separator.svelte
- packages/mielui/src/components/context-menu/context-menu-sub-content.svelte
- packages/mielui/src/components/context-menu/context-menu-sub-trigger.svelte
- packages/mielui/src/components/context-menu/context-menu-sub.svelte
- packages/mielui/src/components/context-menu/context-menu-trigger.svelte
- packages/mielui/src/components/context-menu/context-menu.svelte
- packages/mielui/src/components/context-menu/context.svelte.ts
- packages/mielui/src/components/context-menu/index.ts
- packages/mielui/src/components/context-menu/manifest.ts
- apps/docs/src/routes/docs/components/context-menu/+page.svelte
- apps/docs/src/routes/docs/components/context-menu/examples/file-row.svelte
- apps/docs/src/routes/docs/components/context-menu/examples/glass.svelte
- apps/docs/src/routes/docs/components/context-menu/examples/hero.svelte
- apps/docs/src/routes/docs/components/context-menu/examples/image.svelte
- apps/docs/src/routes/docs/components/context-menu/examples/task-card.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## date-picker

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/date-picker/context.svelte.ts
- packages/mielui/src/components/date-picker/date-picker-calendar.svelte
- packages/mielui/src/components/date-picker/date-picker-content.svelte
- packages/mielui/src/components/date-picker/date-picker-form-field.svelte
- packages/mielui/src/components/date-picker/date-picker-input.svelte
- packages/mielui/src/components/date-picker/date-picker-label.svelte
- packages/mielui/src/components/date-picker/date-picker-segment.svelte
- packages/mielui/src/components/date-picker/date-picker-trigger.svelte
- packages/mielui/src/components/date-picker/date-picker.svelte
- packages/mielui/src/components/date-picker/index.ts
- packages/mielui/src/components/date-picker/manifest.ts
- apps/docs/src/routes/docs/components/date-picker/+page.svelte
- apps/docs/src/routes/docs/components/date-picker/examples/disabled.svelte
- apps/docs/src/routes/docs/components/date-picker/examples/form.svelte
- apps/docs/src/routes/docs/components/date-picker/examples/hero.svelte
- apps/docs/src/routes/docs/components/date-picker/examples/localized.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## date-range-picker

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/date-range-picker/date-range-picker-calendar.svelte
- packages/mielui/src/components/date-range-picker/date-range-picker-input.svelte
- packages/mielui/src/components/date-range-picker/date-range-picker-label.svelte
- packages/mielui/src/components/date-range-picker/date-range-picker-trigger.svelte
- packages/mielui/src/components/date-range-picker/date-range-picker.svelte
- packages/mielui/src/components/date-range-picker/index.ts
- packages/mielui/src/components/date-range-picker/manifest.ts
- apps/docs/src/routes/docs/components/date-range-picker/+page.svelte
- apps/docs/src/routes/docs/components/date-range-picker/examples/disabled.svelte
- apps/docs/src/routes/docs/components/date-range-picker/examples/form.svelte
- apps/docs/src/routes/docs/components/date-range-picker/examples/hero.svelte
- apps/docs/src/routes/docs/components/date-range-picker/examples/two-months.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## dialog

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/dialog/context.svelte.ts
- packages/mielui/src/components/dialog/dialog-body.svelte
- packages/mielui/src/components/dialog/dialog-close.svelte
- packages/mielui/src/components/dialog/dialog-confirm.svelte
- packages/mielui/src/components/dialog/dialog-content.svelte
- packages/mielui/src/components/dialog/dialog-description.svelte
- packages/mielui/src/components/dialog/dialog-footer.svelte
- packages/mielui/src/components/dialog/dialog-header.svelte
- packages/mielui/src/components/dialog/dialog-title.svelte
- packages/mielui/src/components/dialog/dialog-trigger.svelte
- packages/mielui/src/components/dialog/dialog.svelte
- packages/mielui/src/components/dialog/index.ts
- packages/mielui/src/components/dialog/manifest.ts
- apps/docs/src/routes/docs/components/dialog/+page.svelte
- apps/docs/src/routes/docs/components/dialog/examples/basic.svelte
- apps/docs/src/routes/docs/components/dialog/examples/glass.svelte
- apps/docs/src/routes/docs/components/dialog/examples/hero.svelte
- apps/docs/src/routes/docs/components/dialog/examples/nested.svelte
- apps/docs/src/routes/docs/components/dialog/examples/size-compact.svelte
- apps/docs/src/routes/docs/components/dialog/examples/size-large.svelte
- apps/docs/src/routes/docs/components/dialog/examples/size-wide.svelte
- apps/docs/src/routes/docs/components/dialog/examples/with-select.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## drawer

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/drawer/context.ts
- packages/mielui/src/components/drawer/drawer-body.svelte
- packages/mielui/src/components/drawer/drawer-close.svelte
- packages/mielui/src/components/drawer/drawer-content.svelte
- packages/mielui/src/components/drawer/drawer-description.svelte
- packages/mielui/src/components/drawer/drawer-footer.svelte
- packages/mielui/src/components/drawer/drawer-handle.svelte
- packages/mielui/src/components/drawer/drawer-header.svelte
- packages/mielui/src/components/drawer/drawer-overlay.svelte
- packages/mielui/src/components/drawer/drawer-portal.svelte
- packages/mielui/src/components/drawer/drawer-root.svelte
- packages/mielui/src/components/drawer/drawer-title.svelte
- packages/mielui/src/components/drawer/drawer-trigger.svelte
- packages/mielui/src/components/drawer/index.ts
- packages/mielui/src/components/drawer/manifest.ts
- apps/docs/src/routes/docs/components/drawer/+page.svelte
- apps/docs/src/routes/docs/components/drawer/examples/hero.svelte
- apps/docs/src/routes/docs/components/drawer/examples/nested.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## dropdown-menu

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/dropdown-menu/context.svelte.ts
- packages/mielui/src/components/dropdown-menu/dropdown-menu-checkbox-item.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-content.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-item.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-label.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-radio-group.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-radio-item.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-separator.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-sub-content.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-sub-trigger.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-sub.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu-trigger.svelte
- packages/mielui/src/components/dropdown-menu/dropdown-menu.svelte
- packages/mielui/src/components/dropdown-menu/index.ts
- packages/mielui/src/components/dropdown-menu/manifest.ts
- packages/mielui/src/components/dropdown-menu/radio-group-context.svelte.ts
- apps/docs/src/routes/docs/components/dropdown-menu/+page.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/basic-menu.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/configuration.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/dynamic-width.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/glass.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/hero.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/row-actions.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/share-menu.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/sort-menu.svelte
- apps/docs/src/routes/docs/components/dropdown-menu/examples/user-menu.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## empty-state

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/empty-state/empty-state-actions.svelte
- packages/mielui/src/components/empty-state/empty-state-content.svelte
- packages/mielui/src/components/empty-state/empty-state-description.svelte
- packages/mielui/src/components/empty-state/empty-state-header.svelte
- packages/mielui/src/components/empty-state/empty-state-media.svelte
- packages/mielui/src/components/empty-state/empty-state-title.svelte
- packages/mielui/src/components/empty-state/empty-state.svelte
- packages/mielui/src/components/empty-state/index.ts
- packages/mielui/src/components/empty-state/manifest.ts
- apps/docs/src/routes/docs/components/empty-state/+page.svelte
- apps/docs/src/routes/docs/components/empty-state/examples/hero.svelte
- apps/docs/src/routes/docs/components/empty-state/examples/inbox.svelte
- apps/docs/src/routes/docs/components/empty-state/examples/search.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## field

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/field/context.svelte.ts
- packages/mielui/src/components/field/field-content.svelte
- packages/mielui/src/components/field/field-control.svelte
- packages/mielui/src/components/field/field-description.svelte
- packages/mielui/src/components/field/field-error.svelte
- packages/mielui/src/components/field/field-group.svelte
- packages/mielui/src/components/field/field-label.svelte
- packages/mielui/src/components/field/field.svelte
- packages/mielui/src/components/field/index.ts
- packages/mielui/src/components/field/manifest.ts
- packages/mielui/src/components/field/metadata.ts
- apps/docs/src/routes/docs/components/field/+page.svelte
- apps/docs/src/routes/docs/components/field/examples/composite.svelte
- apps/docs/src/routes/docs/components/field/examples/hero.svelte
- apps/docs/src/routes/docs/components/field/examples/horizontal.svelte
- apps/docs/src/routes/docs/components/field/examples/validation.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## fieldset

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/fieldset/fieldset-description.svelte
- packages/mielui/src/components/fieldset/fieldset-legend.svelte
- packages/mielui/src/components/fieldset/fieldset.svelte
- packages/mielui/src/components/fieldset/index.ts
- packages/mielui/src/components/fieldset/manifest.ts
- apps/docs/src/routes/docs/components/fieldset/+page.svelte
- apps/docs/src/routes/docs/components/fieldset/examples/disabled.svelte
- apps/docs/src/routes/docs/components/fieldset/examples/hero.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## file-upload

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/file-upload/context.svelte.ts
- packages/mielui/src/components/file-upload/controller.svelte.ts
- packages/mielui/src/components/file-upload/file-upload-details.svelte
- packages/mielui/src/components/file-upload/file-upload-dropzone.svelte
- packages/mielui/src/components/file-upload/file-upload-item.svelte
- packages/mielui/src/components/file-upload/file-upload-list.svelte
- packages/mielui/src/components/file-upload/file-upload-preview.svelte
- packages/mielui/src/components/file-upload/file-upload-progress.svelte
- packages/mielui/src/components/file-upload/file-upload-remove.svelte
- packages/mielui/src/components/file-upload/file-upload-retry.svelte
- packages/mielui/src/components/file-upload/file-upload-status.svelte
- packages/mielui/src/components/file-upload/file-upload-trigger.svelte
- packages/mielui/src/components/file-upload/file-upload.svelte
- packages/mielui/src/components/file-upload/index.ts
- packages/mielui/src/components/file-upload/manifest.ts
- apps/docs/src/routes/docs/components/file-upload/+page.svelte
- apps/docs/src/routes/docs/components/file-upload/examples/hero.svelte
- apps/docs/src/routes/docs/components/file-upload/examples/single.svelte

- id: CTRL-02
- file: file-upload.svelte, controller.svelte.ts, manifest.ts
- category: modernization
- severity: medium
- confidence: high
- evidence: file-upload.svelte owned rendering, drag behavior, validation, progress updates, request cancellation and retry.
- why_it_matters: Unrelated concerns made request lifecycle changes harder to review.
- recommended_change: Move request/validation reactive state to per-instance private controller.svelte.ts; include it in CLI manifest.
- version_or_flag_blocker: none
- patch_scope: file-upload.svelte, controller.svelte.ts, manifest.ts
- canonical_owner: runes.md
- outcome: implemented

## form

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/form/context.svelte.ts
- packages/mielui/src/components/form/form-actions.svelte
- packages/mielui/src/components/form/form-error-summary.svelte
- packages/mielui/src/components/form/form-status.svelte
- packages/mielui/src/components/form/form-submit.svelte
- packages/mielui/src/components/form/form.svelte
- packages/mielui/src/components/form/index.ts
- packages/mielui/src/components/form/manifest.ts
- apps/docs/src/routes/docs/components/form/+page.svelte
- apps/docs/src/routes/docs/components/form/examples/hero.svelte
- apps/docs/src/routes/docs/components/form/examples/profile.remote.ts
- apps/docs/src/routes/docs/components/form/examples/remote-basic.svelte
- apps/docs/src/routes/docs/components/form/examples/remote.svelte

- id: CTRL-03
- file: apps/docs/src/routes/docs/components/form/examples/hero.svelte
- category: bug
- severity: medium
- confidence: high
- evidence: hero.svelte used toast.promise for feedback and no pending submission guard.
- why_it_matters: Example feedback escaped its preview; overlapping submissions could overwrite timer ownership.
- recommended_change: Use a local role=status and guard repeat submissions while pending.
- version_or_flag_blocker: none
- patch_scope: apps/docs/src/routes/docs/components/form/examples/hero.svelte
- canonical_owner: runes.md; DESIGN.md preview isolation
- outcome: implemented

## group

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/group/group-separator.svelte
- packages/mielui/src/components/group/group-text.svelte
- packages/mielui/src/components/group/group.svelte
- packages/mielui/src/components/group/index.ts
- packages/mielui/src/components/group/manifest.ts
- apps/docs/src/routes/docs/components/group/+page.svelte
- apps/docs/src/routes/docs/components/group/examples/basic.svelte
- apps/docs/src/routes/docs/components/group/examples/input.svelte
- apps/docs/src/routes/docs/components/group/examples/menu.svelte
- apps/docs/src/routes/docs/components/group/examples/nested.svelte
- apps/docs/src/routes/docs/components/group/examples/popup.svelte
- apps/docs/src/routes/docs/components/group/examples/text.svelte
- apps/docs/src/routes/docs/components/group/examples/vertical.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## hover-card

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/hover-card/hover-card-content.svelte
- packages/mielui/src/components/hover-card/hover-card-description.svelte
- packages/mielui/src/components/hover-card/hover-card-title.svelte
- packages/mielui/src/components/hover-card/hover-card-trigger.svelte
- packages/mielui/src/components/hover-card/hover-card.svelte
- packages/mielui/src/components/hover-card/index.ts
- packages/mielui/src/components/hover-card/manifest.ts
- apps/docs/src/routes/docs/components/hover-card/+page.svelte
- apps/docs/src/routes/docs/components/hover-card/examples/definition.svelte
- apps/docs/src/routes/docs/components/hover-card/examples/glass.svelte
- apps/docs/src/routes/docs/components/hover-card/examples/link-preview.svelte
- apps/docs/src/routes/docs/components/hover-card/examples/user-preview.svelte

No actionable issue identified in this pass. Existing components are already split into composable parts; no extraction or API churn justified by file size alone.

## input

Reviewed inventory (structural/static scan, with behavioral logic reviewed where present):
- packages/mielui/src/components/input/index.ts
- packages/mielui/src/components/input/input.svelte
- packages/mielui/src/components/input/manifest.ts
- packages/mielui/src/components/input/radio.ts
- packages/mielui/src/components/input/variants.ts
- apps/docs/src/routes/docs/components/input/+page.svelte
- apps/docs/src/routes/docs/components/input/examples/adornments.svelte
- apps/docs/src/routes/docs/components/input/examples/hero.svelte
- apps/docs/src/routes/docs/components/input/examples/validation.svelte
- apps/docs/src/routes/docs/components/input/examples/variant-outline.svelte
- apps/docs/src/routes/docs/components/input/examples/variant-secondary.svelte

- id: CTRL-04
- file: radio.ts
- category: modernization
- severity: medium
- confidence: high
- evidence: Each radio registered root change/input listeners; each listener called syncGroup over every registered radio.
- why_it_matters: A group change could perform quadratic duplicate update callbacks.
- recommended_change: Each root listener synchronizes only its own radio; programmatic render synchronization still updates whole groups.
- version_or_flag_blocker: none
- patch_scope: radio.ts
- canonical_owner: runes.md
- outcome: implemented

## Verification

Scoped Biome format and lint passed. Root owns integration checks and release notes. No tests or builds run by this agent.
