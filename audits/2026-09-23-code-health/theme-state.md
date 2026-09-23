# Shared theme/Studio audit

Reviewed theme.ts, builtin-presets.ts, live.ts, shared _internal/utils/actions.ts, and Studio editor controller/state/persistence/tokens plus editor file inventory. Public API names preserved. Theme files are package runtime modules, not CLI-copy manifest entries; build-registry imports public facade to emit preset CSS. New sibling modules are covered by svelte package build and themes wildcard export.

Existing live runtime storage handles inaccessible storage; per-instance editor state remains .svelte.ts. No additional dead state safely identified. Root-owned advanced token parser/dialog and invoice files were not edited.

## SHARED-01
- id: SHARED-01
- file: apps/docs/src/routes/studio/editor/controller.svelte.ts; persistence.ts
- category: bug
- severity: high
- confidence: high
- evidence: headerSliderProps exposed min16/max48 while theme parser accepts 10–32.
- why_it_matters: Choosing 33–48 throws during generatedCss derivation and can break Studio rendering.
- recommended_change: Align slider to10–32 and clamp finite persisted sizes into accepted bounds.
- version_or_flag_blocker: none
- patch_scope: controller.svelte.ts, persistence.ts
- canonical_owner: runes.md
- outcome: implemented

## SHARED-02
- id: SHARED-02
- file: packages/mielui/src/themes/theme.ts (now theme-parse.ts)
- category: bug
- severity: high
- confidence: high
- evidence: fontSans/fontMono/fontHeader used requiredString instead of cssValue despite generated CSS interpolation.
- why_it_matters: Untrusted theme JSON could inject CSS declaration/selector boundaries via font strings.
- recommended_change: Use same bounded CSS value validation applied to foundation and token values.
- version_or_flag_blocker: none
- patch_scope: theme-parse.ts
- canonical_owner: best-practices.md; input boundary validation
- outcome: implemented

## SHARED-03
- id: SHARED-03
- file: packages/mielui/src/themes/theme.ts
- category: modernization
- severity: medium
- confidence: high
- evidence: 820 lines combined public contracts, lookup data, CSS generation and JSON validation.
- why_it_matters: Unrelated responsibilities made validation and runtime changes harder to scan.
- recommended_change: Preserve original module exports with facade and move contracts/generation/parsing into focused sibling modules.
- version_or_flag_blocker: none
- patch_scope: theme.ts, theme-contract.ts, theme-css.ts, theme-parse.ts
- canonical_owner: runes.md architecture boundaries
- outcome: implemented

## SHARED-04
- id: SHARED-04
- file: packages/mielui/src/components/_internal/utils/actions.ts
- category: bug
- severity: medium
- confidence: high
- evidence: travelingHighlight captured theme toggle at initialization; resting targets ignored aria-disabled.
- why_it_matters: Mounted highlights could continue animating after theme toggle and target disabled selected items.
- recommended_change: Read theme toggle per measurement before geometry updates; reuse usableItem for resting selection; observe aria-disabled.
- version_or_flag_blocker: none
- patch_scope: actions.ts
- canonical_owner: attachments.md; motion.md
- outcome: implemented

## SHARED-05
- id: SHARED-05
- file: packages/mielui/src/components/_internal/utils/actions.ts
- category: modernization
- severity: low
- confidence: high
- evidence: dynamicWidth observer sync used items.includes for each previously observed item.
- why_it_matters: Repeated membership checks added quadratic work for long menus.
- recommended_change: Construct Set once per synchronization.
- version_or_flag_blocker: none
- patch_scope: actions.ts
- canonical_owner: best-practices.md
- outcome: implemented

Verification: scoped Biome lint and formatting passed. Root owns integration gates; no tests/builds run here.
