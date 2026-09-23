# Component and documentation review

Reviewed all 77 catalog components and six chart guides. Existing Components, Blocks, AI components, and Chart components categories remain appropriate. Chart types keep dedicated guides; small state or appearance variants remain on their parent page.

## 26 controls and foundational components

# Component review A

Scope: 26 assigned components. Reviewed docs, examples, implementation state/cleanup, exported parts and generated API records. Categories below are recommended navigation families; root owns shared navigation. Existing dirty-tree work preserved. No public exports or prop contracts changed.

| Component | Category | Docs and example evidence | Code review and changes | Subpage decision |
|---|---|---|---|---|
| accordion | Disclosure | Single/multiple examples and generated 4-part API; custom IDs now shown in single example. | Fixed Trigger/Content ARIA ID registration, reactive ID changes, and teardown of omitted Content. Added client/SSR regressions. | No; modes share one composition. |
| alert | Feedback | Four concrete status tones and explicit off/polite/assertive announcement guidance; 3-part API. | Checked semantic roles and optional icon rendering; no additional defect found. | No; variants fit one page. |
| alert-dialog | Overlay | Destructive, sign-out, glass and local deletion feedback; 9-part API. Moved Usage heading before prose. | Checked cancellation order, closeOnClick=false, default cancel focus and Dialog delegation. | No; one confirmation contract. |
| avatar | Data display | Sizes, shapes and failed-image fallback; 3-part API. Removed promotional metadata wording. | Checked source-keyed loading, cached image detection, event forwarding and removal cleanup. | No; image/fallback composition is small. |
| badge | Data display | Tones/shapes and link/static semantics; atomic API. Corrected false fixed 1px-border claim. | Checked href !== undefined and precise native attribute branches; static by default. | No; variants do not warrant routes. |
| breadcrumb | Navigation | Current-page, separators and home icon examples; 3-part API. | Checked native nav name, aria-current and decorative separator. | No; three-part composition. |
| button | Action | Variants/sizes/links/icons/disabled and loading; atomic API. Added controllable failure and working retry to loading example. | Checked pending and aria-disabled activation guards, width-preserving labels, bound elements and timer cleanup. | No; states remain one atomic control. |
| calendar | Date input | Constraints, navigation and composition guidance; generated 15-part API. | Checked same Month parts in default/custom paths, date keys, locale/UTC formatting, disabled cues. | No; RangeCalendar is already separate. |
| card | Layout | Full/content-only/header-footer/panel/inset examples; 6-part API and one-footer inset constraint. | Checked footer registration/cleanup, variants and native heading levels. | No; variants share the same parts. |
| checkbox | Selection input | Sizes, disabled/checked/description and bound checklist; atomic API. | Checked native input naming/descriptions, checked callback flow and shared press styling. | No; one native selection control. |
| collapsible | Disclosure | Controlled hero and basic example; 3-part API, reduced motion documented. | Checked Bits open binding, native disabled trigger and shared reversible slide. | No; single-panel counterpart to Accordion. |
| combobox | Selection input | Trigger/menu search, long lists, empty result and glass; 6-part API. Rewrote run-together inline-code prose and added disabled selected input example. | Removed console dump of panel HTML and computed-style work; disabled clear action now uses native disabled. Checked search, selection, hover timer teardown and mounted item registration. | No; presentation/search modes share one value model. |
| context-menu | Overlay menu | File/image/task actions and glass; 9-part API. Keyboard/cancel guidance present. | Checked item callback delegation, check-state persistence, submenu and shared panel/highlight composition. | No; trigger differences do not need subpages. |
| date-picker | Date input | Localized/disabled/form-reset and custom composition guidance; 21-part generated API. | Checked native form validation bridge, observer teardown, root reset and locale propagation. | No; range already separate. |
| date-range-picker | Date input | Two months, constraints, disabled and form-reset; 21-part generated API. | Checked start/end bindings, root reset and reused form validation bridge. | No; coherent range workflow. |
| dialog | Overlay | Sizes/nested/select/glass examples; 10-part API. Moved Usage heading before prose. | Checked focus-return guard, scroll/inert teardown, shared transition and close cancellation contracts. | No; each is same dialog task structure. |
| drawer | Overlay | Live basic/nested examples; 12-part API and unsupported snap points stated. Simplified malformed inline-code prose. | Checked dismissal, explicit close for nondismissible state, pointer cancellation and motion token use. | No; nested composition fits one section. |
| dropdown-menu | Overlay menu | Action/grouped/row/share/sort/submenu/dynamic-width/glass examples; 12-part API. Removed unused title constant. | Checked item event composition and cancellation, checkbox/radio binding, native disabled, shared highlight. | No; all examples use same menu contract. |
| empty-state | Feedback | No-results action, completed-work omission and API accessibility prose; 7-part API. | Checked independent semantic parts and explicit announcement/focus ownership. | No; small optional composition. |
| field | Form structure | Validation/horizontal/composite/SSR guidance; 7-part API. | Checked generated IDs, attachment/native attribute composition and observer cleanup/external description preservation. | No; SSR metadata is necessary core guidance. |
| fieldset | Form structure | Named/disabled groups with working unlock; 3-part API. | Checked native fieldset/legend semantics and element forwarding; no extra state introduced. | No; native group wrapper. |
| file-upload | File input | Failure/retry/remove/progress simulation and reordered compact parts; 11-part API. | Checked AbortController lifecycle, real-progress clamping, selection validation, same public parts, object URL cleanup. | No; upload contract belongs with composition. |
| form | Form structure | Native/remote/basic remote/multiple submitter/reset/SSR errors and 5-part API. | Checked submission capture teardown, pending derivation, scoped error focus and native submit forwarding. | Keep one page for now; remote forms are a coherent integration section, not another component API. |
| group | Layout | Horizontal/vertical/text/input/menu/popup/nested examples; 3-part API. Fixed With input heading case. | Checked single-seam selector ownership, native role group, orientation and plain text/label composition. | No; joined controls share one layout contract. |
| hover-card | Overlay | User/link/definition/glass examples and 5-part API. Fixed joined prose/code words; removed dead title constant. | Checked trigger link/button behavior, title/description registration and shared panel transitions. | No; previews use the same composition. |
| input | Text input | Variants/adornments/native validation examples; atomic generated API and native radio/file caveats. | Checked file/checkbox/radio branches, form-specific radio synchronization and listener/reset timer cleanup. | No; specialized controls have their own component pages. |

## Findings fixed

- A1: accordion Trigger/Content; bug, medium, high confidence. Caller IDs overrode rendered id but aria-controls/aria-labelledby retained generated IDs. Private reactive ID registrations now share actual IDs and clear on part destruction. SSR omits forward relationships until the matching part exists rather than emitting an invalid reference. Canonical owner: runes.md and snippets.md. No version/flag blocker. Scope: accordion internals, manifest, docs/example, regression fixtures/tests.
- A2: combobox controller; bug, low, high confidence. synchronizeOpen logged input metadata and panel outerHTML and forced computed-style lookup. Removed debugging output. Canonical owner: best-practices.md. No version/flag blocker.
- A3: combobox trigger; bug, medium, high confidence. Disabled field wrapper used pointer-events only while the clear button remained keyboard-focusable. Forwarded existing disabled value to the clear button. Canonical owner: best-practices.md. No public API change.
- A4: Button docs; documentation-gap, medium, high confidence. Loading example only reached success despite documented error status. Added fail-next switch, persistent error and retry through the same handler; timer teardown retained.
- A5: docs text/layout; documentation-gap, low, high confidence. Fixed Usage heading order, run-together inline code in Combobox/Drawer/HoverCard, stale 1px Badge claim, heading case, two unused title constants and Avatar metadata.

## Verification

Source inspection and generated API presence/part inventory completed. New regression coverage added for custom/dynamic Accordion IDs, omitted/restored Content and SSR custom labels. Tests, typecheck, builds and artifact gates were not executed, per repository policy and parent instruction. Root owns final formatting/lint and browser verification. No claim of completed theme/reduced-motion/browser matrix.


## 26 controls and presentation components

# Group B component review

All 26 entries remain in `components` in `packages/mielui/component-categories.json`. Each has one bounded task; no subpage split is warranted. Generated API references remain supplied by the parent layout; no public exports or prop signatures changed. Existing dirty edits were preserved.

| Component | Docs/examples evidence and action | Code evidence and action |
|---|---|---|
| kbd | Basic/modifiers/action examples; accessible key names and owned shortcuts documented. | Reviewed parseShortcut modifier matching, editable/hidden/inert guards, listener cleanup. No edit needed. |
| label | Corrected disabled-style claim; required example now requires input; disabled label explicitly dims. | Atomic native label; for and native attributes forward unchanged. |
| native-select | Single/grouped/multiple/required/disabled-option demos cover native behavior. | Reviewed discriminated single/multiple types and native binding; no custom selection loop. |
| number-field | Bounds, decimals, reordered controls, disabled, submission/reset covered. | Reviewed deduplicated setValue, finite steps, native stepping, input context lifecycle; no code change. |
| otp-field | Grouped cells, alphabet, paste normalization, disabled, submission/reset covered. | Reviewed single accessible input, finite length, reset cancellation/timer cleanup, decorative cells. |
| pagination | Results demo responds to page; narrow footer now stacks; siblings demo retained. | Buttons now use shared pressable, focus ring and motion/reduced-motion tokens; installer manifest includes pressable. |
| popover | Named all dialogs; use Title in hero/glass; named copyable usage; placement examples remain one page. | Fixed disabled hover opening and competing open/close timers; custom Title id now updates accessible naming. |
| progress | Determinate/indeterminate/completion controls covered; usage now names both bars. | Reviewed finite bounds, absent aria-valuenow when indeterminate, reduced-motion classes. |
| radio-group | Selection/descriptions/disabled examples; removed unused page constant. | Reviewed native radio grouping, unique IDs, descriptions, disabled state and callback cancellation. |
| range-calendar | Corrected endpoint serialization; added bounded custom composition omitting navigation. | Reviewed shared calendar subparts, date identity keys, locale forwarding, ref bindings; no code change. |
| scroll-area | Removed false no-measurement claim; hero fits narrow screens and exposes pressed selection; removed all-caps heading. | Reviewed mutation/resize/scroll measurement and observer disposal, cue settings, viewport prop forwarding. |
| select | Copyable usage now uses Value; examples name controls; dynamic/scrollable/glass demos remain. | Preserves caller aria-labelledby instead of overriding it with value ID; reviewed label observer disposal and disabled items. |
| separator | Semantic/decorative and both orientation examples documented. | Reviewed Bits ref/native forwarding and size/orientation mapping; atomic divider requires no extra parts. |
| sheet | Fixed invalid JSX comment and missing Button import in Svelte snippet; side/glass forms remain. | Custom title/description IDs now synchronize dialog naming; reviewed scroll/inert cleanup and focus restoration. |
| skeleton | Swap lifecycle and static/shimmer/card shapes covered. | Reviewed delayedPresence cancellation/minimum visibility, inert placeholders, reserved dimensions and ResizeObserver teardown. |
| slider | Single/range/steps/RTL/disabled/forms documented. | Reviewed normalized values, pointer capture/cancellation, thumb naming, native hidden form values and reset; no source change. |
| spinner | Loading/pace/completion demos and two-second success dwell documented. | Nonfinite speed now falls back to normal pace; timers and RAF are cleaned up by effects. |
| switch | Bound checked/switched state, label/description and disabled examples. | Reviewed alias arbitration, field metadata, Bits binding/native form props and RTL thumb; no code edit. |
| table | Semantic invoice, inset, sorting/selection/empty examples. | Reviewed Table parts, column/row scopes, native prop forwarding and local horizontal scroll; no source change. |
| tabs | Added manual activation + disabled tab + retained input state example. | Fixed Content forceMount not reaching BitsTabs.Content; reviewed dynamic selection repair and resize/mutation disposal. |
| tag-input | Validation wording simplified; callbacks/max/controlled demos remain. | Root disabled can no longer be bypassed with Input disabled=false; input now exposes required/error state to assistive tech via private context. |
| textarea | Added autoresizing composer with native submit/reset of value; hero now uses actual message copy. | Reviewed field metadata, width/value resize and observer cleanup; no source change needed. |
| toggle | All icon-only disabled/size demos now have accessible names. | Reviewed Bits pressed binding and shared press/variants; atomic toggle retained. |
| toggle-group | Single/multiple, controlled alignment and clear-state contracts documented. | Reviewed discriminated value mode, disabled inheritance, keyboard delegation and traveling highlight; no change needed. |
| tooltip | Usage heading/order fixed; clone details shortened; hero/glass use Buttons, expose pressed state and fit narrow screens. | Empty active text now dismisses stale bubble; reviewed shared/provider teardown, passive clone allowlist and accessible-description merging. |
| typography | Hero now demonstrates project notes instead of stale release/marketing copy; semantic/role/numeric examples retained. | Reviewed native heading selection, finite level type and token mapping; no source change. |

## Concrete findings fixed

| ID | File | Category / severity / confidence | Evidence, consequence, patch | Canonical owner |
|---|---|---|---|---|
| B1 | tabs/tabs-content.svelte | bug / medium / high | forceMount was destructured but not sent to Bits, so hidden content lost state. Forward existing prop. | snippets.md / runes.md |
| B2 | select/select-trigger.svelte | bug / medium / high | Generated aria-labelledby always replaced caller value. Preserve explicit name reference. | best-practices.md |
| B3 | tag-input/tag-input-input.svelte | bug / medium / high | disabledProp ?? context.disabled allowed false to enable a disabled field. Root disabled now wins; internal context forwards required/invalid to input. | runes.md / best-practices.md |
| B4 | popover/popover-trigger.svelte | bug / medium / high | Mouse enter did not check disabled and focus/hover could leave competing timers. Guard and cancel before scheduling. | runes.md |
| B5 | sheet title/description and popover title | bug / medium / high | Native custom id replaced DOM id while context still referenced generated id. Derive and register the same effective ID. | runes.md / best-practices.md |
| B6 | tooltip/shared-tooltip.ts | bug / medium / high | Empty text update returned early and left obsolete help visible. Dismiss active bubble. | best-practices.md |
| B7 | spinner/spinner.svelte | bug / low / high | Infinity passed positive-speed guard and produced zero-duration animation. Guard finiteness. | motion.md |
| B8 | pagination/pagination.svelte | modernization / low / high | Local default transitions/rings omitted shared press and reduced-motion contract. Use shared action/tokens and declare registry dependency. | motion.md / DESIGN.md |
| B9 | owned docs and examples | documentation-gap / medium / high | Invalid Sheet snippet, static Select value, unnamed controls, no forceMount/autoresize/composition examples, incorrect date serialization and measurement claim corrected. | snippets.md / best-practices.md / unslop |

All patches use the existing Svelte generation and dependencies. No new version or experimental-flag blocker. Source state remains instance-local; private context additions introduce no public API.

## Verification

Targeted Biome format and lint passed for all 47 edited files. Svelte compiler parsed all 44 edited Svelte files without syntax errors after fixing a component-class directive caught by that check. Root is responsible for repository-level gates, browser validation, and shared changelog. Full tests, type checks, builds, and artifact verification were not run.

Changed-file list: `/tmp/mielui-b-changed.txt`.


## 21 blocks and AI components

# Blocks and AI review

Scope: 13 blocks and 8 AI components. Existing categories remain appropriate. No new subpages were needed. All21 routes returned HTTP200, rendered an API reference and produced no browser page errors. API references remain generated from source rather than hand copied.

Read unslop and svelte-edge runes/snippets/motion/best-practices references. Preserved the package peer floor and existing runes generation; did not introduce newer declaration-tag syntax. Installed version supplied by root is5.57.1. package peer currently reads^5.33.0.

This is source review of docs, root/state/lifecycle paths and examples plus route smoke checks. It is not an exhaustive browser exercise of every prop/state in every example.

## code-block

Reviewed single/tabbed composition, dynamic trigger reconciliation, highlighted HTML owner, copy placement and ten examples. Removed duplicated fallback prose and fixed custom-theme grammar; usage now starts with code/tabs. No new implementation defect established.

## color-picker

Reviewed channel controller, invalid hex handling, hue preservation and pointer capture cleanup. Six examples cover composition, formats, presets and glass. Split accessibility/hue guidance and lead with composition. No API expansion or new subpage needed.

## command

Reviewed registration reconciliation, current-query result updates, disabled result selection and search timeout cleanup. Three examples cover grouped commands and glass. Replaced internal animation narration with composition/focus guidance.

## copy-button

Reviewed clipboard fallback, stale request invalidation, focus restoration and timer cleanup. Three examples cover field copy and variants. Added reduced-motion transition opt-out to both feedback icons. Usage now starts with text to copy.

## data-table

Reviewed Root composition, shared summary and pagination feature gating. Three larger examples cover interactive rows, controlled state and loading/empty behavior. Existing page documents TanStack9 ownership and all parts; no new subpage needed, no confirmed code defect.

## file-diff

Reviewed high-level rendering through public parts, derived counts and shared escaped highlighting. Five examples cover changed data, manual composition, gutters and multiple files. Usage now starts with diff/composition instead of implementation details.

## markdown

Reviewed lexer, token identity, HTML escaping, URL scheme allowlist and relative-image policy. Three examples cover streaming and unsafe HTML; timer cleanup present. Added documented image/link policy. Caret now scales with theme motion duration, including zero.

## notch

Reviewed Root dismissal/pause lifecycle, registered regions and triggered/peek timer cleanup. Four isolated examples cover edges, peek, outside controls and glass. Kept spring-backed size behavior; no API changes.

## reorder-list

Reviewed stable IDs, composed row parts, reduced-motion FLIP and gesture cancellation entry points. Two examples cover default and custom interactive rows. Lead usage with binding/onCommit; no additional category or subpage needed.

## show-more

Reviewed measurements, ResizeObserver cleanup, inert interactive preview, focus return and bounded overflow. Three examples cover prose, interactive content and capped height. Replaced redundant raw transition CSS with token-based Tailwind classes, preserving reduced motion.

## task-steps

Reviewed normalized index/failure derivation, empty state and summary debounce cleanup. Three examples cover composed rows and retry; timer cleanup present. Usage now starts with current and completion semantics.

## toast

Reviewed timer pause/resume, host ownership, SSR no-op, stale promise updates and notch selection. Seven examples include promise, actions, types and notch. Replaced local WAAPI fade with shared morph on title/description; Icon already morphs. Shared morph now inherits whitespace so descriptions wrap. Existing five browser tests plus new rapid-switch/wrapping regression pass.

## toolbar

Reviewed navigation exclusions, original tabindex restoration, observer teardown and public composition. Four example files demonstrate editing/selection. Existing docs sufficient; no public API change.

## attachment

Reviewed file validation, duplicate key, disabled drag cleanup and blob URL revocation. Two examples cover file selection/rejections and status. Usage now starts with local selection ownership and documents limits.

## composer

Reviewed submission helper integration, pending guards, retained prompt on rejection and stop callback. Six examples cover idle/submitting/error/glass/inset toolbar; simulated timers clean up. Existing docs sufficient; no confirmed code defect.

## conversation

Reviewed follow controller, user scroll intent, resize observation and viewport cleanup. Three examples cover empty state and following output. Lead usage with bounded height and follow binding.

## message

Reviewed context getters, default parts and status rendering. Three examples cover role variants and streaming/error with a working retry and timer cleanup. Usage now starts with role/status composition.

## question

Reviewed answer normalization, mode changes, submission invalidation, required-answer validation and autofocus observer. Four examples cover single/multiple/text/composer takeover. Corrected summary that implied inset is default; default is plain Card.

## reasoning

Reviewed disclosure state and trigger. Found overwritten native onclick and missing space before duration. Trigger now invokes handler, honors preventDefault, preserves formatted duration string, and opts chevron out of reduced-motion transitions. Added browser regression and handler docs. Two examples cover complete/live state.

## response-stream

Reviewed iterator cancellation, generation guards, grapheme boundaries, static/snapshot modes and renderer fallback. Three examples include stop/retry and clean timers. No confirmed implementation defect; current lifecycle detail retained.

## tool

Reviewed public automatic/composed trigger/content paths and shared disclosure lifecycle. Four examples cover states, quiet variant and retry with timer cleanup. Split dense composition paragraphs; no API change.

## Finding records

- C1, reasoning-trigger.svelte, bug, medium, high confidence. Evidence: local onclick replaced forwarded handler and duration text was `for{duration}` after formatting. User callbacks could not cancel expansion and visible duration lacked spacing. Fixed handler composition and template-string label. No version blocker. Scope: private implementation, docs and regression fixture. Canonical owner: runes.md, best-practices.md.
- C2, copy-button.svelte, bug, low, high confidence. Both opacity/scale transitions lacked reduced-motion opt-out. Added motion-reduce:transition-none. No version blocker. Scope: feedback styling. Canonical owner: motion.md.
- C3, toast/notch-host.svelte and actions/morph/index.ts, bug, medium, high confidence. Local fade contradicted requested shared morph, while shared text spans forced preformatted whitespace and would overflow descriptions. Removed fade and used morph separately on title and description. Shared text motion inherits whitespace. Preserves semantic controls and existing notch size animation. No API/version blocker. Scope: two implementations plus regression. Canonical owner: motion.md, best-practices.md.
- C4, markdown.svelte, bug, low, high confidence. Streaming caret used fixed1.1s animation despite zero-duration theme. Duration now derives from panel motion token; reduced motion still disables animation. No version blocker. Scope: CSS keyframe duration. Canonical owner: motion.md.
- C5, show-more.svelte, modernization, low, high confidence. Local CSS duplicated token transitions and data-state selectors available in Tailwind. Replaced with Tailwind classes and preserved semantic/inert/measurement logic. No version blocker. Scope: styling only. Canonical owner: best-practices.md plus DESIGN.md.
- C6, docs pages, documentation-gap, low, high confidence. Several Usage sections led with internal edge cases rather than composition; CodeBlock repeated fallback behavior; Question summary misstated default Card style. Reordered and edited prose. No version blocker. Scope: docs only. Canonical owner: unslop.

## Verification

- Live route smoke sweep: all21 HTTP200, API reference present, no pageerrors. Raw results /tmp/mielui-review-c-browser.json.
- Notch toast browser tests:6 passed, including rapid previous/next switching with wrapped text and one toast.
- Reasoning trigger browser regression:1 passed. Formatting initially removed a literal separating space; template-string fix survives formatter and test passes.
- Scoped Biome check on owned touched files. Root owns repository-wide gates and final release notes integration.
- No build or full test suite run by this agent. No commits.


## Shared documentation and Studio

All 83 component and chart-guide routes return HTTP 200 and include an API reference or link to the shared reference. Chart state controls were exercised in the browser. Studio live motion stops under reduced motion. Toast iframe wheel events reach the main documentation scroller.

Studio App preview and Theme Editor now use private views and per-instance reactive state. Unused theme-card and dotmatrix components were removed. Existing public compatibility utilities were retained.

Repository format and lint gates pass. Full build, typecheck, and full test suite were not run for this pass; targeted Notch, Reasoning, and font SSR regressions were run.

## Chart implementation review

# Final chart review

Source and matching parent docs reviewed for Chart, PieChart, Gauge, and Heatmap. No public API changes. Root owns browser verification of the six chart-type guides and repository gates.

- Chart: reviewed registration cleanup, series/data interpolation, finite-value handling, positive/negative stacked extents, keyboard/data-table accessibility, reveal/live lifecycle. Live animations pause by shared SVG visibility and document visibility; the last animation disconnects observers/listeners. Reduced motion/theme zero disable animation. Manifest includes private motion/path/placeholder/interaction helpers. No additional concrete defect found.
- PieChart: reviewed filtered nonnegative data, per-key slices, label/legend/tooltip composition, reveal/live cancellation and visibility. Corrected misleading docs: omitting Label does not make a solid pie; Arc innerRadius=0 does. Manifest includes slice/context helpers and Skeleton dependency.
- Gauge: reviewed finite/clamped value/max/size/stroke width, meter semantics, interrupted-animation retargeting, mount/media/theme observation cleanup. Theme duration and reduced motion already respected. Atomic meter API is appropriate. No concrete defect found.
- Heatmap: reviewed calendar context, per-instance tooltip count, cell keyboard navigation/click cancellation, default and custom composition, tooltip dependency, reveal cleanup. Fixed hardcoded reveal duration/stagger to scale with theme panel duration; zero and reduced motion skip animation. Corrected docs Home/End wording from selecting to focusing, documented motion timing. Manifest includes all private helpers and Tooltip dependency includes its manager.

Verification: scoped Biome check/write on modified source/docs; manifest source inventory checked. No new tests, full suite, or builds run for this bounded review.
