
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
