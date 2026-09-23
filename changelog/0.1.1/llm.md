
## Navigation and repository tooling

FullscreenNav and its component subpath are removed. Compose Sheet.Root, Sheet.Trigger, and Sheet.Content with a Sheet.Title, Sheet.Description, Sheet.Close, and ordinary navigation links. Keep the link list in a scrollable region and close the sheet when a link is selected.

The repository now uses pnpm with Node.js. Install with `pnpm install --frozen-lockfile` and run workspace commands with `pnpm --filter <workspace> run <script>`. Package and registry tests use Vitest. TypeScript tooling runs through tsx. Existing component imports still use `@mielui/svelte/components/<name>` even when the source lives in `blocks/` or `ai-components/`.

## Dialog naming

Replace `Modal` with `Dialog` in imports and composed parts. Use `@mielui/svelte/components/dialog` and `mielui add dialog`. Rename `ModalProps`, `ModalContentProps`, and the other component prop types to their `Dialog` equivalents. The composed parts and behavior remain the same. AlertDialog uses Dialog internally and remains the confirmation component. Modal is not retained as an alias.

## Toast composition

Toast is now a namespace with Root, Content, Footer, Title, Icon, Actions, Action, and Close. Replace `<Toast toast={item} />` with `<Toast.Root toast={item} />`. Toaster and toast.success() keep their existing imports and behavior. Root without children uses these public parts. With children, it renders only the supplied composition. Put description or custom content in Content and place Title and Actions inside Footer. Actions defaults to the toast actions; custom Action parts take an action object with label, callback, and optional variant. Close calls the toast exit callback. Root itself does not register a toast or create a portal. Use toast() and Toaster for timed, portaled notifications. Use persistent: true for a decision that must wait for a user. There is no progress bar. Hover and keyboard focus both pause timed notifications.

## Kbd and Show More

Replace Shortcut and ShortcutProps with Kbd and KbdProps. Import Kbd from @mielui/svelte/components/kbd or the package root. The shortcut string prop and ontrigger callback retain their behavior. The previous components/shortcut entry is removed. Show More is now grouped with Blocks in source and docs; its public import stays @mielui/svelte/components/show-more.

## Slider range and direction

Slider keeps a number value by default. With range enabled, bind a typed [number, number] pair; onValueChange receives the same pair shape. Optional thumbLabels supplies separate accessible names. Handles retain minimum and maximum identity and stop at each other. dir="rtl" reverses the visual direction without reversing the pair. Direction can also inherit from a parent. Keep state values ordered and within min/max; rendering normalizes invalid values without emitting a user change callback.

## Group composition

Import Group as a namespace and compose Root, Separator and Text. Put a Separator between adjacent controls, including outline buttons. Root is an accessible group with normal Tab navigation, not a toolbar or toggle-selection manager. Label it with aria-label or aria-labelledby. For vertical groups set Root orientation="vertical" and Separator orientation="horizontal". Text defaults to a div; use as="label" and for to name an input. Nested Roots retain their own corner rounding and receive a gap.

## Overlay surfaces and Alert layout

Set surface="glass" on the Content part of Dialog, AlertDialog, Sheet, Popover, HoverCard, Tooltip, Command, Select, Combobox, ColorPicker, DropdownMenu, and ContextMenu. Set it separately on SubContent for submenus. Solid remains the default. Toast.Root accepts surface, and toast options accept the same value. The shared glass treatment belongs on the overlay frame; its inset child must stay translucent so an opaque card does not hide the blur.

Alert keeps Root, Title, and Description. Description now occupies the upper inset and Title appears in the lower status row next to the icon. Do not add another opaque wrapper around these parts.

## Hugeicons

HugeiconsIcon is available from the package root or as the default export of @mielui/svelte/hugeicons-icon. Import icon data as named exports from @hugeicons/core-free-icons. Version 4.3.3 does not ship declarations for individual icon subpaths, so those paths fail strict TypeScript checks. The renderer emits SVG children during SSR. Icon data is not a Svelte component, so render it through HugeiconsIcon instead of passing it to component-valued icon slots. Copied components need the shared renderer as well as the icon-data dependency.

## Heatmap and Morph

Heatmap's default rendering uses the same exported parts as custom compositions. Root children receive computed days and total. Grid children receive the computed day list; pass one of those days to Cell. Counts and levels use only visible dates, dates use UTC, duplicate dates use the final input entry, and missing dates become zero. Explicit endDate avoids a moving empty-data range.

Morph is a Svelte action imported from @mielui/svelte/actions/morph. Apply use:morph={{ key, duration: 220 }} to a visual span inside an existing control. It samples SVG geometry with matching viewBox values and crossfades text or incompatible SVGs. Keep interactive controls and their accessible names outside the animated wrapper.

## Heatmap entrance direction

Heatmap.Root accepts animation="rows" | "columns" | "none", defaulting to rows. Reduced-motion preferences disable the entrance regardless of this value. Remount the example to replay; changing the animation selection in the docs also remounts the chart.

## Glass inset contrast

Glass overlays retain a darker translucent inset inside the frosted outer frame. Do not clear the inner panel background when composing Dialog, Command, Sheet, Toast, or Popover surfaces.

## Documentation access

Use /llms.txt to discover component, action, skill, and release-note Markdown. /llms-full.txt combines these references. The rendered component API tables and Markdown prop tables are extracted from component source types; regenerate them with the docs generate:api script when changing a contract.

## Table, Native Select, and Skeleton

Compose Table with Root, Header, Body, Footer, Row, Head, Cell, Caption, and an optional ScrollArea around Root. Root's inset variant changes presentation only. Use native scope and aria-sort attributes and compose sorting, selection, and pagination with existing controls. Table does not own those states.

NativeSelect.Root wraps a real select element. Bind a string for a single selection and a string array when multiple is true. Its size prop is the native visible-row count, not a visual size name. Compose Option and OptGroup inside Root.

Skeleton accepts variant="default" or variant="shimmer". The default remains static. The standalone shimmer action takes no options; apply it to a non-void visual container. It owns and removes an inert visual overlay, respects reduced motion, and stops its animation on destroy. Mielui now requires Svelte 5.29 or newer because Skeleton uses an attachment internally.

Composer.Root also accepts surface="solid" or surface="glass". Keep Input and Toolbar as public parts; the glass frame retains the darker inset. Shimmer also detects plain-text containers and clips the moving highlight to their letters.

Gauge preserves any positive finite max, including fractions. An invalid max falls back to 100; a non-finite value falls back to zero. Values are clamped to the effective range.

## Bits UI interaction ownership

Mielui wrappers now depend on Bits UI 2.19.2, requiring Svelte 5.33 or newer. Source-copy manifests include Bits UI and the shared transition/surface helpers. Keep importing Mielui parts; do not replace them with styled upstream examples or add a second focus trap, Escape listener, or outside-click controller around a Bits-backed overlay. Mielui still owns styling, inset surfaces, and motion tokens. Combobox and Slider now also use direct Bits primitives. Combobox retains a private fuzzy-search registry. Slider retains a narrow pointer adapter for grab offset, crossing clamps, and stable minimum/maximum handle identity; do not replace that adapter with upstream auto-sorting.

Menus use Bits collection navigation, including arrows, typeahead, disabled items, submenus, and Context Menu long press. Consumer click handlers run before internal activation where supported, and preventDefault cancels that activation. Conditional overlay titles, descriptions, and footers release their registrations when removed. Select keeps its closed item tree inert to register labels before first opening; do not put unbounded background work in option snippets.

## Lifecycle and accessibility corrections

A replaced or unmounted Response Stream cannot complete a later run. Reorder cancellation preserves the latest item payloads and membership instead of restoring an obsolete array. Toast updates reconcile persistence and duration and preserve interaction pauses. Composer and Question catch rejected submission handlers, retain the current draft/answer, display their error message, and allow retry. Use onError for application reporting; controlled error status still belongs to the application.

Input and Textarea descriptions merge with external aria-describedby references. Tag Input excludes disabled hidden fields from form data and ignores IME confirmation while composing. Tooltip descriptions attach to focusable descendants and the moving shared bubble is decorative. Kbd ignores consumed/composing events and inactive owners. Progress supports native naming attributes and finite fractional ranges. Docs previews remain mounted while their source is shown, so consumers of preview examples should still clean up timers and observers normally.

## Static semantics and composition boundaries

Badge no longer announces every instance as a status region. Set role="status" explicitly for a changing status badge that should be announced. Message.Actions is a group with ordinary Tab navigation. Toolbar implements roving keyboard focus, including orientation, RTL, Home, and End, and leaves text-editing keys to nested fields.

An inset Card accepts one Footer at a time. Multiple Footer instances now throw a clear composition error instead of silently replacing content. Conditionally remove the previous Footer before mounting another. Avatar resets loaded/error state when its source changes and ignores late events from previous images. Skeleton placeholders are inert, including delayed placeholders. Pagination normalizes invalid counts/pages and bounds the sibling window.


## Remaining audit contracts

Card.Title defaults to h2 and accepts level from 1 through 6. Set level=1 only when the card title is the page heading. Alert.Root announcement defaults to off; choose polite for background status and assertive for urgent interruption, independently of the visual variant. icon=false omits the icon and an icon snippet replaces it. Breadcrumb.Item requires current=true for aria-current; it no longer imports router state. Button and Badge use href to select their native attribute branch, including empty-string links. A disabled Button link drops href and leaves sequential focus; loading stays focusable unless the caller explicitly sets tabindex=-1.

Input file mode binds files rather than value. Checkbox and radio modes preserve value for form submission and expose checked; same-name radio checked bindings synchronize within their native form and tree. Text/numeric values are strings or numbers. Question single/text modes use a string answer; multiple uses string[]. Accordion and ToggleGroup likewise require value/callback shape to match type. Do not carry broad union bindings into a fixed mode.

Slider name submits a scalar or repeated minimum/maximum values; use FormData.getAll for range mode. Disabled values are omitted, form can target an external form, and reset restores the initial value. Root id and element identify the wrapper; ARIA naming reaches its handles. Keep values ordered and use thumbLabels to distinguish range handles. Select and Combobox click callbacks receive the native event before click activation; preventDefault cancels that activation. Input-style Combobox may open on focus separately.

TaskSteps retains its default export and data-driven form. Import the namespace from the component subpath for Root, List, Item, Indicator, Label, Meta, and Summary. Root children receive the same rows and completed/total state as the default form. Put row parts inside Item; Summary's default text is debounced, while custom summary snippets own their announcement timing. ReorderList similarly retains its callable export, but rows now use Item/Handle/Content. Use its row(item) snippet to compose those parts. Drag starts only on Handle, keeping links and controls inside Content usable.

Message.Root layout replaces the default layout; compose Avatar, Body, Metadata, Name, Time, Status, Content, and Actions there. Name/time/avatar/status use Root fallbacks. Tool.Root composed=true renders the supplied Trigger and Content directly; omit composed for the existing automatic header/content. Both paths use the same public parts and disclosure lifecycle. ColorPicker.Content children replace the default Plane/Hue/Preview/HexInput/Channels/Presets layout, sharing Root's color state. ShowMore preview hides and inerts full content while collapsed; its trigger snippet must spread the supplied button props.

Toast removal immediately leaves active state; the mounted Toaster owns the only visual exit. Do not add a second removal timer or global outro. ResponseStream uses rolling character presentation only below 4,000 UTF-16 code units and uses plain text for longer responses or reduced motion. This bounds rendering work without delaying incoming text. Its private run controller ignores obsolete iterator completions and callbacks after disposal.

Command mounts panel and scrim immediately while retaining Bits Dialog focus and dismissal. Search icon/count/announcement and Results empty slots customize presentation without replacing the search controller. Tabs can use manual activation so arrows move focus and Enter/Space select. Removed or disabled active tabs select the first enabled trigger. ContextMenu supports bind:open and onOpenChange. Sheet.Header close=false lets a composed Sheet.Close own the close position; all overlay action elements are bindable and their click handlers can cancel dismissal.

The shared utility implementation now lives in private actions, overlays, and positioning modules. Public utils imports remain unchanged. Copied installations must include the _internal/utils dependency as well as field metadata, submission, disclosure, and other helper files declared by component manifests. Do not copy a lone wrapper file or add a second overlay manager around Bits-owned behavior.


## Tooltip scope and rich content

Tooltip.Provider owns an isolated moving bubble and disposes its listeners and surfaces. Omit Provider to retain the shared default. Content rich=true preserves passive formatting and basic SVG in the visual bubble; descriptions remain hidden source nodes linked from the actual trigger. Cloned visuals are inert and aria-hidden, discard duplicate IDs and form/event behavior, and do not instantiate custom elements again. Interactive content belongs in Popover. Plain Content retains the existing text roller and shared motion.

## Form and input families

Field is a composable accessibility/layout wrapper, not a form state manager. Spread the attributes from Field.Control onto the actual input (or NumberField.Input / OTPField.Root), keeping framework attachments intact. Use Field.Label, Description and Error as separate parts. Automatic metadata discovery handles optional parts after hydration; for SSR and no-JavaScript error relationships, give description/error parts explicit IDs and pass describedBy/errorId to Control. Fieldset.Root and Legend retain native grouping and disabling.

Form.Root forwards native form attributes and symbol-keyed attachments. Spread a SvelteKit remote form or enhance result directly onto it; do not add a competing preventDefault handler or serialize its fields a second time. Pass the remote pending count to Root; Form.Submit inherits it without removing submitter name/value. Keep schema validation, authentication, mutation, and resetting with the remote handler/application. Remote functions remain an explicit experimental SvelteKit opt-in; the component package does not require enabling them. ErrorSummary accepts message/controlId issues, including global messages without a target, and exposes a ref for deliberate focus. Field.Error reveals using the shared press duration and respects reduced motion. When focusing an error summary, disable individual error live announcements to avoid duplicate reading.

NumberField owns a number-or-undefined value and one native numeric input. Configure submission and bounds on Root, spread Field.Control on Input, and keep Root disabled/required state consistent with Field.Root. Root inputId customizes the default label/input relationship; overriding Input.id directly also requires Label.for. Typing retains native invalid values for validation rather than silently clamping them. OTPField uses Bits PinInput with one real input and decorative Cell parts. Keep the provided cells in order; reducing length truncates the bound and submitted value. Supply minlength with required to reject incomplete codes.

Calendar and RangeCalendar use @internationalized/date values, not JavaScript Date. Use DatePicker or DateRangePicker for segmented input plus popup composition. Their form adapters submit ISO values, omit disabled values, handle native reset, and focus visible segments on validation failure. Keep named inputs inside the picker composition and use stable date values for SSR.

Drawer uses the exact vaul-svelte prerelease pinned by this version together with Bits Dialog. This wrapper supports modal drag dismissal and nested drawers. Nonmodal mode and snap-point control are intentionally absent because they failed compatibility checks with the installed Bits version. Do not expose those upstream options through rest props. Compose Portal, Overlay, Content, Handle, and the region parts explicitly.

Toolbar's existing callable export remains. New compositions import the module namespace and use Root, Button, Link, Group, Item and Separator. Group's single/multiple mode determines its value type. Separator is also available as an independent component.

### Floating layers and nested drawers

Bits floating wrappers copy the computed z-index of their inner content node. Set the surface's z-index as well as the wrapper's; a wrapper class alone is overridden by Bits' inline style and can leave dismissal layers intercepting the whole menu. Mielui floating surfaces use 130. Menu surfaces consume the shared `--bits-floating-*` geometry variables because root menus and submenus expose different component-specific prefixes. Each Drawer Portal owns a stacking context for its content and backdrop. Nested portals paint above their parents while floating menus remain above every drawer level; do not increase modal z-index with nesting depth. Drawer nesting uses Vaul Root's nested mode without the upstream NestedRoot parent-scale mutation; focus and dismissal remain owned by Bits. Constrain Drawer regions for readable content rather than narrowing the top or bottom surface in standard examples.


### Data Table state and filters

DataTable.Filters accepts an optional children snippet. Place DataTable.Filter inside it to join the search input and filter picker with Group. Active facets and Reset render outside the joined control. Omit children when no joined input is needed. The picker stays visible but disabled when every available filter is shown. Filter, facet, reset, and sort controls use the normal control height.

Create the TanStack Table v9 instance in application code with explicit features and row models, then pass it to DataTable.Root and its parts. Use the same instance for Sort, ColumnHeader, Filter, Filters, Facet, View, Summary, and Pagination. Sorting menus set explicit field/direction choices rather than cycling on a header click. Filter is a plain string column search; Filters and Facet store discriminated clauses. Assign dataTableFilter as the filterFn for columns using the supplied facet editors, or provide a custom editor and matching application filterFn. Date facets use ISO calendar-date strings, not JavaScript Date objects. Manual server filtering and sorting remain application-owned; validate any persisted or remote filter input server-side. Supply stable getRowId values for selection across pages. The header selection control selects only the current page. Public snippets allow changing cell content, summaries, and empty states without replacing table state or writing a second rendering path.

## Composer submit buttons

Composer.Submit now renders a round icon button by default. Send, queue, stop, and loading states keep their accessible action labels. Use the existing children snippet for custom content. The Root, Input, Toolbar, and Actions composition and Toolbar's chrome/inset variants are unchanged.

## Form validation summaries

Pass remote validation issues directly to Form.ErrorSummary. An issue path resolves to native field names, including dot-separated object paths and bracketed array indices. controlId remains available for explicit DOM links. Form-level issues have no target. Keep Root pending connected to the request state: ErrorSummary focuses after a submission settles with errors, once per submission, but does not steal focus for initial errors. Use focusOnError={false} to retain application-owned focus. Standalone summaries outside Form.Root do not automatically focus.

## Toast dismiss placement

Toast.Close defaults to absolute placement at the top-right of Toast.Root. The root reserves message space when Close is present, including custom compositions. Do not allocate a trailing footer column for Close; place it directly inside Root unless you intentionally override its position.

## File uploads

FileUpload.Root owns selection validation and per-file upload state. Supply an onUpload promise callback and pass its AbortSignal to the transport. Resolve only after the server accepts the file. Report actual progress through onProgress; omitting it leaves progress indeterminate. Remove aborts an active request and removes the local item, but does not delete server files. List exposes each entry; Item supplies context for Preview, Details, Progress, Status, Retry, and Remove. Rejected selections stay visible and cannot retry. Humanspeak Svelte Motion is a required dependency.

## Studio presets and inherited surfaces

Studio JSON now uses the public Theme format for all overrides. Run init --preset ./mielui-theme.json for a new setup and import the generated styles.css, which loads ui.css before theme.css. Existing setups use add theme with the same file and retain their stylesheet imports. The CLI validates local JSON before generating CSS; it does not execute the file's contents.

Omitting surface now inherits --mielui-surface through CSS style queries. Set the variable to glass on :root for global glass, including portals. Explicit surface="solid" opts out; explicit surface="glass" opts in. Browsers without style-query support retain solid defaults. Export the variable in Theme.tokens.shared.

Title-only toasts render Icon and Title inside Content. Description toasts keep Content above Footer. Use the same parts in custom compositions. Toast uses Humanspeak Svelte Motion for layout changes. Content and status icons update directly without Morph.

## Checkbox sizes

Checkbox now accepts size="sm" | "md" | "lg" for 14, 18, and 22px boxes. The default is md (18px); use sm explicitly for dense layouts. Size controls the visible box and indicator, while the label remains part of the click target. Native input size is no longer forwarded.

## Overlay state and nesting

Dialog, Sheet, and Popover context reads the bound open value directly. Internal interaction setters update the binding and call onOpenChange once. Do not mirror these props into a second state object with effects in both directions.

Bits UI owns focus trapping and dismissal. Dialog and Sheet use the internal overlay presentation helper for nesting order, parent recession, and one Escape dismissal per event. Background scroll locks are shared and reference counted with Popover. Keep Bits preventScroll disabled when using that shared lock, and restore trigger focus after the inert-background cleanup has finished. Do not attach a second focus trap or click-outside listener to these components.


## Charts and edge activities

Chart and PieChart are composable namespaces backed by LayerChart. Import them from the public `components/chart` and `components/pie-chart` paths. Place marks inside Plot and compose the Legend and Tooltip separately. A Cartesian mark's key identifies a configured data series; pie data uses category keys and numeric values. Use animation="live" for ongoing highlights on the actual geometry, "reveal" for entry and value updates, or "none" to disable animation. Live highlights do not change values.

Notch.Root owns controlled open state, side, and surface. It starts closed and is nonmodal. Place arbitrary content inside Notch.Content; Header, Title, Description, Actions, and Close remain optional. An omitted surface inherits the global surface setting. For notifications, replace the existing Toaster with `<Toaster variant="notch" side="top" />`; do not add a second host, since the first mounted host owns the shared notification store. Existing toast calls, promise updates, actions, and dismissal timers still apply.


Notch's triggered mode auto-dismisses after 5000ms by default, pausing while hovered or focused. Set duration={0} for indefinite activities. In mode="peek", a collapsed edge handle stays visible and expands on hover, focus, or tap; optional Notch.Peek supplies its noninteractive content as a sibling of Content. Notch toasts disable the Notch timer and retain the existing toast timer policy, so loading promises remain persistent. Swipe toward the attached edge or use Escape to dismiss; Close is an optional part, not required structure. Compose narrow vertical content for side placements and horizontal content for top or bottom.

## Control and surface edges

Filled controls use `--elevation-control-edge` for a top highlight and lower inset shade. This token does not draw a perimeter border: keep the semantic border on outlined fields and controls, and keep primary buttons’ optional stroke tied to `--color-primary-stroke`. Compose the edge with `--focus-ring` during keyboard focus rather than replacing the edge or recoloring it. Ghost and quiet buttons remain flat. Do not use `--elevation-control` as a replacement for this edge on grouped controls: its full inset border would draw extra seams.

The shared surface elevations include `--elevation-surface-edge`, so popovers, menus, cards, and dialogs inherit the same subtle top light in both solid and glass modes. Continue using their existing elevation tokens instead of adding local white rings or pseudo-elements. The existing master, control, surface, and dialog shadow settings disable the relevant decoration.


## Gauge sizing

Gauge defaults to 120px rather than 28px. Set size explicitly for inline indicators and compact activity panels. When strokeWidth is omitted, the arc scales with size; explicit strokeWidth retains caller control. Existing value, max, tone, label, and children compositions remain available.

Disabled elevation tokens use a transparent zero-size shadow rather than `none`, so composed focus-ring shadows remain valid. Apply the control edge to the outer field wrapper only; nested inputs must use `shadow-none`. Flat ghost controls and unselected text tabs stay flat.

## Edge highlight strength

Theme JSON accepts `chrome.edgeHighlight`, a finite number from 0 to 1. Missing
values use 0.5, so existing themes get half-strength light-catching inset edges.
The generated CSS writes `--mielui-edge-highlight` and resolves the existing
control and surface elevation tokens in both modes. Keep composing those elevation
tokens rather than hardcoding white inset shadows. Kbd uses the same control edge.
This setting leaves border, focus, dark inset shading, and cast-shadow opacity
unchanged. The existing shadow switches take precedence over edge strength.


## Notch side actions and notification navigation

Compose `Notch.SideAction` beside `Notch.Content` under the same Root. `side="start"`
and `side="end"` place normal Button content left/right of a horizontal notch or
above/below a lateral notch. Icon-only actions need an accessible label. Actions
retract until the notch is hovered, focused, or tapped; keyboard focus can reach
and reveal them. Keep Content mounted so the measured geometry can position them.

The notch Toaster renders only the selected notification. New arrivals become
selected, and detached previous/next controls cycle existing active notifications.
Navigation does not recreate notifications or restart their timers. Hidden
notifications retain their original lifetime; persistent loading remains active.
Escape and swipe dismiss the selected item, then reveal another active notification.
Do not mount a separate Toast or live region for every hidden carousel item.

## Live chart motion

Live cartesian effects run inside unchanged data geometry: areas sweep their fill,
bars sweep within their clipped bounds, and lines carry a single highlight.
Visibility observers must target the stationary SVG viewport, not the moving
mark: observing a highlight outside its clip can pause it permanently before entry.
Pie segments brighten sequentially without rotation or angle changes. Pause the
effect when a segment is active so pointer and keyboard inspection remain stable. All loops honor reduced motion and the theme duration.

### Morphing wrapped notification content

Apply Morph separately to each title, description, and icon region. Do not apply it to a container containing interactive controls. Text morphs inherit the region’s whitespace rules so long descriptions wrap at the available width. Toast notification content and icons update directly. Do not apply Morph to stacked Notch notification content; the outer panel retains its size transition.

### Chart state surfaces

Cartesian and pie loading and empty messages use the shared inset Card, with the placeholder visualization behind the message. Compact Gauge states retain the meter footprint without a card wrapper. Keep live status announcements. Heatmap tooltips now use the same opaque inset frame as other chart tooltips. Gauge’s default track is 15% of its diameter; its colored arc is centered inside the track at 65% of that width. An explicit strokeWidth still sets the track width.
