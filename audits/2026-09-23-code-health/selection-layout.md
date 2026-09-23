# Selection and layout component audit

Scope: static code review of all component directories below, matching docs pages and examples. Svelte 5.57.1 / Kit 2.70.3. Read svelte-edge runes, snippets, attachments, motion, declaration-tags, best-practices and DESIGN.md. Existing simple shared actions retained per attachment guidance. This is not a claim of exhaustive runtime proof. Root owns integrated typechecks/tests/browser verification.

## kbd
- Component paths: packages/mielui/src/components/kbd/
- Docs/examples: apps/docs/src/routes/docs/components/kbd/
- Result: Shortcut listener cleanup and editable/overlay guards are present. Changed hero actions from global toast notifications to local live status feedback.

## label
- Component paths: packages/mielui/src/components/label/
- Docs/examples: apps/docs/src/routes/docs/components/label/
- Result: Small semantic label wrapper with forwarded native attributes; no actionable issue.

## native-select
- Component paths: packages/mielui/src/components/native-select/
- Docs/examples: apps/docs/src/routes/docs/components/native-select/
- Result: Native single/multiple branches preserve browser form behavior and typed value shapes; no actionable issue.

## number-field
- Component paths: packages/mielui/src/components/number-field/
- Docs/examples: apps/docs/src/routes/docs/components/number-field/
- Result: Context-scoped value and stepper behavior uses native stepping, honors disabled/read-only bounds; no actionable issue.

## otp-field
- Component paths: packages/mielui/src/components/otp-field/
- Docs/examples: apps/docs/src/routes/docs/components/otp-field/
- Result: Normalized derived value and form-reset timer cleanup retained; no actionable issue.

## pagination
- Component paths: packages/mielui/src/components/pagination/
- Docs/examples: apps/docs/src/routes/docs/components/pagination/
- Result: Finite/clamped total/page/sibling calculations bound rendered list size; no actionable issue.

## popover
- Component paths: packages/mielui/src/components/popover/
- Docs/examples: apps/docs/src/routes/docs/components/popover/
- Result: Removed redundant document scroll registration (window capture already covers it) and duplicate refElement positioning effect. Existing open effect synchronously reads refElement through updatePosition.

## progress
- Component paths: packages/mielui/src/components/progress/
- Docs/examples: apps/docs/src/routes/docs/components/progress/
- Result: Fixed continuous indeterminate animation ignoring zero theme motion duration. Shared private motion-loop attachment now also pauses hidden/offscreen loops; docs updated.

## radio-group
- Component paths: packages/mielui/src/components/radio-group/
- Docs/examples: apps/docs/src/routes/docs/components/radio-group/
- Result: Native radio semantics, contextual names and disabled guards retained; expanded compressed event branch.

## range-calendar
- Component paths: packages/mielui/src/components/range-calendar/
- Docs/examples: apps/docs/src/routes/docs/components/range-calendar/
- Result: Default and composed views reuse calendar subparts and Bits range state; stable keyed date rendering; no actionable issue.

## scroll-area
- Component paths: packages/mielui/src/components/scroll-area/
- Docs/examples: apps/docs/src/routes/docs/components/scroll-area/
- Result: Observers clean up and track direct child geometry and subtree mutations; no actionable issue.

## select
- Component paths: packages/mielui/src/components/select/
- Docs/examples: apps/docs/src/routes/docs/components/select/
- Result: Discriminated single/multiple values, scoped label map, item observers and force-mounted closed inert content reviewed; no actionable issue.

## separator
- Component paths: packages/mielui/src/components/separator/
- Docs/examples: apps/docs/src/routes/docs/components/separator/
- Result: Small native semantic/decorative divider wrapper; no actionable issue.

## sheet
- Component paths: packages/mielui/src/components/sheet/
- Docs/examples: apps/docs/src/routes/docs/components/sheet/
- Result: Context-scoped overlay state, inert/scroll teardown and close focus restoration retained; no actionable issue.

## skeleton
- Component paths: packages/mielui/src/components/skeleton/
- Docs/examples: apps/docs/src/routes/docs/components/skeleton/
- Result: Delayed presence already isolated in .svelte.ts; cancellable timers and observers, inert hidden content; no actionable issue.

## slider
- Component paths: packages/mielui/src/components/slider/
- Docs/examples: apps/docs/src/routes/docs/components/slider/
- Result: Moved tick/focus work from each pointermove into drag start, preserving value calculation and pointer cancellation while avoiding repeated focus/microtasks.

## spinner
- Component paths: packages/mielui/src/components/spinner/
- Docs/examples: apps/docs/src/routes/docs/components/spinner/
- Result: Fixed continuous rotation ignoring zero theme motion duration with same private loop attachment; existing success and exit timer cleanup retained; docs updated.

## switch
- Component paths: packages/mielui/src/components/switch/
- Docs/examples: apps/docs/src/routes/docs/components/switch/
- Result: Scoped checked/switched binding compatibility, Bits primitive and metadata semantics retained; no actionable issue.

## table
- Component paths: packages/mielui/src/components/table/
- Docs/examples: apps/docs/src/routes/docs/components/table/
- Result: Added shared hover duration/easing token to Row; other semantic subparts remain independently composable.

## tabs
- Component paths: packages/mielui/src/components/tabs/
- Docs/examples: apps/docs/src/routes/docs/components/tabs/
- Result: Extracted measurement/observer state from List into private indicators.svelte.ts; clear obsolete hover highlights when trigger is removed or disabled; manifest and docs updated.

## tag-input
- Component paths: packages/mielui/src/components/tag-input/
- Docs/examples: apps/docs/src/routes/docs/components/tag-input/
- Result: Scoped context, derived limits, validation announcements, IME guard, input attachment, normalized additions and removals reviewed; no actionable issue.

## textarea
- Component paths: packages/mielui/src/components/textarea/
- Docs/examples: apps/docs/src/routes/docs/components/textarea/
- Result: Autoresize value/width effects, restored inline height, shared input variants and composer boundary reviewed; no actionable issue.

## toggle
- Component paths: packages/mielui/src/components/toggle/
- Docs/examples: apps/docs/src/routes/docs/components/toggle/
- Result: Bits toggle wrapper with bindable pressed state, shared pressable action and variants; no actionable issue.

## toggle-group
- Component paths: packages/mielui/src/components/toggle-group/
- Docs/examples: apps/docs/src/routes/docs/components/toggle-group/
- Result: Single/multiple controlled shape, scoped context and shared traveling highlight reviewed; no actionable issue.

## tooltip
- Component paths: packages/mielui/src/components/tooltip/
- Docs/examples: apps/docs/src/routes/docs/components/tooltip/
- Result: Extracted passive rich-content DOM cloning into private clone-visual.ts, removing unrelated 90-line implementation from manager. Preserved manager lifetime/timer/observer teardown and CLI file coverage.

## typography
- Component paths: packages/mielui/src/components/typography/
- Docs/examples: apps/docs/src/routes/docs/components/typography/
- Result: Atomic semantic headings/text/code parts reuse variants with typed snippet children; no actionable issue.

# Findings

## SEL-01
- id: SEL-01
- file: apps/docs/src/routes/docs/components/kbd/examples/hero.svelte
- category: documentation-gap
- severity: medium
- confidence: high
- evidence: toast(...) in each hero shortcut callback
- why_it_matters: Global notifications escaped the documentation preview.
- recommended_change: Use local role=status feedback.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: One example; fixed.
- canonical_owner: DESIGN.md; references/best-practices.md

## SEL-02
- id: SEL-02
- file: packages/mielui/src/components/tabs/tabs-list.svelte
- category: modernization
- severity: medium
- confidence: high
- evidence: Measurement, observers and indicator state occupied ~200 lines of List.
- why_it_matters: DOM lifecycle and render structure obscured one another.
- recommended_change: Extract scoped reactive helper in .svelte.ts.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: List, private helper and manifest; fixed.
- canonical_owner: references/runes.md

## SEL-03
- id: SEL-03
- file: packages/mielui/src/components/tabs/indicators.svelte.ts
- category: bug
- severity: medium
- confidence: high
- evidence: measureHover returned without clearing hover state when target disappeared.
- why_it_matters: Removed/disabled triggers could leave a floating stale hover marker.
- recommended_change: Clear hover target, rect and active flag.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: Private helper and docs; fixed.
- canonical_owner: references/runes.md; references/motion.md

## SEL-04
- id: SEL-04
- file: packages/mielui/src/components/slider/slider.svelte
- category: modernization
- severity: low
- confidence: high
- evidence: updatePointerPosition scheduled tick().then(...focus) on every move.
- why_it_matters: High-frequency drag events repeated unnecessary microtasks and focus calls.
- recommended_change: Focus once after drag start.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: Slider internal handler only; fixed.
- canonical_owner: references/runes.md

## SEL-05
- id: SEL-05
- file: packages/mielui/src/components/popover/popover-content.svelte
- category: modernization
- severity: low
- confidence: high
- evidence: Both document scroll and window capture scroll called schedulePosition; two effects invoked updatePosition for refElement.
- why_it_matters: Duplicate listener and reactive scheduling served the same positioning lifecycle.
- recommended_change: Keep capture listener and one dependency-tracking positioning effect.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: Popover internals only; fixed.
- canonical_owner: references/runes.md

## SEL-06
- id: SEL-06
- file: packages/mielui/src/components/tooltip/shared-tooltip.ts
- category: modernization
- severity: low
- confidence: high
- evidence: cloneVisual nested inside 540-line manager.
- why_it_matters: Passive DOM clone policy was buried among tooltip timers/positioning.
- recommended_change: Extract private helper and list it in CLI manifest.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: Manager, helper, manifest; fixed.
- canonical_owner: references/best-practices.md

## SEL-07
- id: SEL-07
- file: packages/mielui/src/components/progress/progress.svelte; packages/mielui/src/components/spinner/spinner.svelte
- category: bug
- severity: medium
- confidence: high
- evidence: Continuous loops used fixed 1.4s / 850ms speed while zero theme motion only affected transitions.
- why_it_matters: Theme motion disabled still left animated indicators running.
- recommended_change: Shared private attachment controls animation-play-state on theme, preference, document visibility and intersection changes.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: Two components, private motion-loop.ts, manifests, docs, focused regression tests; fixed.
- canonical_owner: references/attachments.md; references/motion.md

## SEL-08
- id: SEL-08
- file: packages/mielui/src/components/table/table-row.svelte
- category: bug
- severity: low
- confidence: high
- evidence: transition-colors had no duration/easing theme token.
- why_it_matters: Row hover did not follow theme hover timing.
- recommended_change: Use --motion-duration-hover and --ease-out.
- version_or_flag_blocker: none at installed versions; no experimental flags added
- patch_scope: One class list; fixed.
- canonical_owner: references/motion.md; DESIGN.md

# Verification handoff

Scoped Biome formatting completed. Added apps/docs/tests/unit/mielui/motion-loop.test.ts for dynamic motion token, reduced preference and teardown. Root should run integrated tests including tabs, slider, tooltip and popover suites; browser coverage should include tabs-geometry, tabs, tooltip-swap and indicator motion. No commits or pushes performed by this agent.
