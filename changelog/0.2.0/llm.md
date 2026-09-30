## Borders

Themes accept `chrome.borders: 'single' | 'double'`. Omitted values use the
single frame. Theme parsing preserves the setting and rejects unsupported
values. Studio saves and exports it under Appearance as Borders.

All double-frame surfaces honor `--mielui-border-inset-scale`, which defaults to
zero without generated theme CSS. Single sets the scale to zero; double sets it
to one. This includes cards, dialogs, sheets, drawers, toasts, Notch, code blocks,
diffs, inset tables, and composers. Small floating panels and chart tooltips
remain single-border regardless of the theme setting. Shared modal and inset frames
scale only their decorative inset. Panel cards also scale the inner border ring.
Notch keeps its outer SVG outline, hides the inner outline, and expands the fill
to the outer clip in single mode.

Keep inset variants, their content padding, footers, and subpart composition.
The setting changes the double-frame treatment, not the component variant.
Existing single-border surfaces stay single. Glass, shadows, focus rings, and
edge highlights remain independent. New double-frame implementations must follow
this token rather than introduce fixed inset padding or a fixed inner ring.

## Toolbar depth exploration

Toolbar.Root stays flat by default (`variant="default"`). Set `variant="depth"`
on Root to enable the floating shell. Its Button, Link, and Item inherit the
variant reactively, including through wrapper elements, and use the shared
`--mielui-toolbar-raised` elevation, while selected Items use
`--mielui-toolbar-pressed`. These theme-owned tokens include a contact shadow or
inward shade and flatten with controlShadows: false. Compose
focus rings with the appropriate elevation. Keep these treatments tied to theme
shadow tokens; do not add fixed shadows to toolbar examples. The callable Toolbar
used by composers retains its flat layout. The only public addition is Root's optional `variant: "default" | "depth"` prop.

Tooltip.Content keeps the dedicated tooltip color pair in both solid and glass
modes. Rich shortcut content should inherit the tooltip foreground, so it stays
readable with both treatments.

## Changing numeric readouts

Use `numberShuffle` from the existing action subpath for changing HTML numeric
readouts. Give it a text-only span with the current value as source text. Pass
the raw number as `value` and format its numeric argument for currencies, units,
or decimals; a formatter returning a captured display string will not animate.
Leave native editable inputs, SVG labels, and static identifiers unchanged.
Custom render snippets should compose the same action. Never attach it to hidden
tooltip sources that get cloned, because cloned DOM does not retain the action.
Source-copy manifests that include these parts must also include both the action
index and its render module. The action owns reduced-motion behavior and cleanup.

## Chart tooltip surfaces

Chart tooltips use the private shared `ChartTooltipSurface`, `overlaySurface()`,
and the shared inset frame with the border inset scale fixed to zero. Keep the
inner surface translucent in glass mode and opaque in solid mode. Heatmap
tooltips render inside Heatmap.Root, which owns their positioning; do not
clone their content into a second tooltip bubble.

## Chart palette and rounder defaults

Default chart colors are `--chart-1` through `--chart-5`, ordered purple, blue,
red, green, yellow. Use `var(--chart-N)` in series config instead of hardcoded
example colors. Explicit colors still override the fallback. Heatmaps use the
first color for intensity and gauges use it for the primary tone; status tones
keep their semantic colors. Studio saves palette edits in the active mode's
theme tokens. The default radius scale is now 8/10/14/20px. Custom tokens and
other radius presets remain available.

## Inset layout and glass

Studio exports `--mielui-inset-position` as `top` or `bottom`. The shared internal
`insetLayout` action moves exposed chrome strips and restores authored order
when the token is absent. Consumers may pin an individual frame with
`class="[--mielui-inset-position:top]"`. Use this for headers whose meaning
depends on staying above content, such as package-manager tabs. Do not force
a global preference onto both regions of a data table. Single-border mode removes decorative inset spacing on cards and ordinary
overlays. Inset DataTable, Composer, CodeBlock, and documentation preview
panels and Toast retain their structural gutter in both modes. Set the frame inset locally
for those layouts; do not change the global border scale or ordinary cards.

`DataTable.Root variant="inset"` is opt-in. Compose `Toolbar`, `View`, then a
footer wrapper marked `data-ui="data-table-footer"` containing `Summary` and
`Pagination`. These are the same parts used by the default high-level rendering.
Omit or replace regions through the existing children snippet. The footer
marker applies compact strip styling without introducing a new subcomponent.
Known page counts use Mielui Pagination; unknown counts retain previous/next
controls.

Glass uses a translucent outer chrome and a separate translucent card fill
inside. Do not make composer input panels fully transparent or opaque: both
destroy either inset contrast or the backdrop. Preserve the shared surface
helper, reduced-transparency fallback, and single-border geometry.

## Composer attachments

Attach files to a composer by wrapping `Composer.Root` in `Attachment.Root`,
so dropping anywhere on the composer adds files. Put
`<Attachment.List variant="chip" />` before `Composer.Root`, within the same
`Attachment.Root`, with a small gap above the frame. The list hides when empty.
Keep attachments outside the writing surface and bottom action strip. Use the
shared chip rather than a local replacement: `Attachment.Item variant="chip"`
handles image thumbnails, file-type icons, upload spinners, error edges, and
screen-reader status. `Composer.Header` remains an optional slot for context
inside the form; it requires Composer.Root context and cannot be moved outside it.
Use `Composer.Toolbar` for actions on the frame below the input, or
`variant="inset"` when actions should share the input surface.

Tooltips no longer share the overlay glass fill. They keep the
`--color-tooltip` and `--color-tooltip-foreground` pair in glass mode, made
slightly translucent by the private `tooltipSurface` helper, plus a hairline
edge. Do not reapply `overlaySurface` to tooltip content or swap the pair for
card or foreground colors.

## Control geometry and flat fields

`--size-control-lg` is now twelve spacing units, and `--size-icon-md` equals a
medium button, so `size="icon"` buttons line up with `size="md"` text buttons.
Stop sizing controls with raw `h-8`, `size-9`, or `h-10`; use the size tokens.
The focus ring is 2px at 80% of the primary color; compose it with existing
edges and never replace it with an outline.

Only filled buttons and moving thumbs keep `--elevation-control-edge`. Text
fields, selection triggers, checkboxes, and radios are flat with one hairline.
Do not add the control edge back to a field wrapper. Unchecked checkboxes and
radios use the private `--mielui-control-border` token, and status text uses
`--mielui-{success,warning,error,info}-text`. Keep the raw `--color-*` status
tokens for fills and chart tones.

Menu items are laid out from the start with a gap. A trailing element such as a
checkmark or shortcut needs `ms-auto`; a `<kbd>` direct child gets it
automatically. Code that relied on `justify-content: space-between` to push a
second child to the end must add `ms-auto` to that child.

## Single-border floating panels and the composer toolbar default

Menus, selects, comboboxes, popovers, hover cards, date-picker panels, and chart
tooltips set `[--mielui-border-inset-scale:0]` on their frame, so they stay
single even when the theme uses double borders. Do not re-enable double framing
on them. Dialogs, sheets, drawers, toasts, code blocks, diffs, inset tables,
alerts, and composers still follow the theme setting.

`Composer.Toolbar` retains `variant="chrome"` as its default: actions sit on the
frame below the input. Use `variant="inset"` explicitly to join them to the input
surface. The input starts at a compact height and grows with its content. Inside the toolbar, use
`variant="outline"` for Select, DropdownMenu, and Attachment triggers. The
toolbar turns them into flat pills at the medium control height, matching
`Composer.Submit`.

## FolderCard

Compose `FolderCard.Root` with `Cover`, `Tab` (holding `Title` and
`Description`), and `Footer` (holding `Index` and `Count`). Omit any part you
do not need; the folder silhouette comes from the Root grid and the Tab, so do
not wrap the card in `Card` or add your own border. Set `tone` (1–5) on Root to
pick the `--chart-N` cover wash, or pass `src` to `Cover` for an image. Give
Root an `href` to render a link with the shared focus ring and hover; without
it the card is an `<article>`. `Count` formats and animates `value` and does not
pluralize, so pass `unit="file"` for a single file. Lay several cards out with
your own list or grid.

## Toast content order

Toast now renders the icon and title above the description inside the inset
content surface. The frame footer appears only when there are actions. Do not
put `Toast.Title` in the footer to reproduce the old layout; keep the title and
description together in `Toast.Content` and reserve the footer for actions.

## Overlay footers, close buttons, and Drawer frames

`Sheet.Footer` and `Drawer.Footer` render on the frame outside the inner
surface, wherever they appear in Content, like `Dialog.Footer`. Content that
relied on the footer scrolling with the surface or using `mt-auto` now sees it
pinned below. The footer is a row: Close gets `mr-auto`, so put the confirming
action after it and do not add `justify-end`. Add `flex-col items-stretch` only
if you need the old stacked layout. `Sheet.Close` defaults to ghost; pass
`variant="outline"` to keep the old look. `Drawer.Close` is always ghost.

`Drawer.Content` is now the shared modal frame with an inner surface and
accepts `surface` like Sheet and Dialog. Classes that set a background or
padding on `Drawer.Content` style the gray frame, not the white surface. Do
not hand-roll close buttons or title sizes for overlays; they come from shared
internals.

## Disclosure rows and Tool content

Reasoning, Tool, Accordion, and Collapsible triggers share one private row
recipe: small control height, ghost hover fill, rounded focus ring, and a
trailing 14px chevron. `Collapsible.Trigger` now has padding, a hover fill, and
a radius by default but still no chevron; inside a wrapper that owns its hover,
add `enabled:hover:bg-transparent`. The Accordion trigger is much shorter than
before, so do not add height back with padding on the trigger.

`Tool.Content` indents with `ps-*`; use `ps-0` to remove the indent, since the
old `ml-0 px-0` override no longer applies. `Tool.Output` directly after
`Tool.Input` joins it with a hairline seam that assumes the default content gap.

## Alert, chart tooltips, inset tables, and badges

Alert now renders frame → `[data-ui=alert-surface]` → the icon wrapper
`[data-alert-icon]` → your children. Classes that relied on the old
`row-start-*` or `col-span-2` grid placement no longer apply; style the title
and description parts instead.

Chart, pie, and heatmap tooltips render one private shared surface. A `class`
passed to their `Tooltip` now wins over library classes. `Heatmap.Tooltip`
renders in place inside `Heatmap.Root` rather than in a body-level bubble, so
an ancestor with `overflow: hidden` can clip it. Do not copy the old
`bg-transparent!` inset.

Inset table cells no longer paint `bg-card`; hover and selection come from
`Table.Row`, so a hand-written `<tr>` gets no hover unless it adds one. Badges
are hairline pills by default; change the radius with `class`.

### Menu highlight geometry

Menu items and traveling highlights use the same shared radius, capped at the medium radius and bounded by the outer panel radius after its border and row inset. Keep both on the shared stylesheet contract; do not apply a rounded-full utility to ordinary rows or create a separate highlight radius.

## Default appearance

The baked stylesheet, DEFAULT_THEME, generated CSS, and Studio now share the
same defaults: single borders, bottom inset strips, glass surfaces, edge highlight
0.5, primary button stroke enabled, surface shadows disabled, and control/dialog
shadows enabled. Omitted chrome fields inherit these defaults individually;
explicit false values, saved settings, and raw surface/inset tokens still apply.
To retain the previous treatment, explicitly choose double borders, solid surfaces,
surface shadows enabled, and primaryStroke false. The legacy master shadows false
still disables every shadow category. Chart 2 now defaults to pink #f49d9d and
Chart 3 to blue #8bc7f5; explicit chart token overrides keep their colors.

## File Diff header placement

FileDiff.Root now defaults its local inset-position token to top so the filename
and change counts remain above the patch when the surrounding theme uses bottom
inset strips. This applies to both the diff prop and composed TopBar/Content
parts. Compose TopBar before Content; no extra wrapper or CSS order rule is needed.
An explicit inset-position token on Root can still override this default.

## Sidebar composition

Import the Sidebar namespace from `@mielui/svelte/components/sidebar`. Wrap panels
and content in Root. Each Panel needs a stable, nonempty id unique in that Root
and an accessible label. Place start panels before Main and end panels after it;
Main is a div, so the app owns its main landmark. Header, scrolling Content, and
Footer are independent regions. Content uses the shared inset surface when its
Panel uses inset or floating framing; do not put another Card around navigation.

Panels start expanded and pinned on desktop. Bind open, pinned, and width for
application-owned state; mobileOpen is separate. Controls outside a Panel target
its id with `panel`. `getSidebar(id?)` must run during component initialization,
then its getters remain reactive and its setters share the controls' callbacks.
Navigation uses native Link anchors with aria-current, or Button for in-place
actions. Supply label for accessible names and collapsed tooltips, and leading
and trailing snippets for icons or supporting values. Sidebar.Label hides custom
text in a rail. Do not put arbitrary form fields in a collapsed default rail;
provide a rail snippet when the full panel contains more than navigation.

Root measures its own container, not the viewport. Below breakpoint panels use
Sheet's existing modal mechanics. Mobile drawers start closed and only one may
open in a Root. Desktop state survives; child DOM remounts across the responsive
boundary, so keep important form data above Panel. Desktop collapse, custom rail
swaps, and pin changes retain the full panel's DOM. Routing, persistence,
permissions, and global shortcuts belong to the consuming app.

Add ResizeHandle inside Panel for bounded pointer and keyboard resizing. Widths
are CSS pixels; Home and End select limits, Left and Right respect logical sides
and RTL, and Shift uses larger increments. Cancellation restores the starting
width. Offcanvas needs an external Trigger; none stays expanded on desktop.
