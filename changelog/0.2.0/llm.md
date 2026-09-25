## Borders

Themes accept `chrome.borders: 'single' | 'double'`. Omitted values retain the
existing double frame. Theme parsing preserves the setting and rejects unsupported
values. Studio saves and exports it under Appearance as Borders.

All double-frame surfaces honor `--mielui-border-inset-scale`, which defaults to
one without generated theme CSS. Single sets the scale to zero; double sets it
to one. This includes cards, menus, dialogs, sheets, toasts, Notch, code blocks,
diffs, inset tables, composers, and chart tooltips. Shared modal and inset frames
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

Glass Tooltip.Content uses the ordinary theme foreground to match its card-based
translucent surface. Solid tooltips keep the dedicated tooltip color pair. Rich
shortcut content should inherit the tooltip foreground, not the page's muted
foreground, so it stays readable with both treatments.

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

Chart tooltips inherit `overlaySurface()` and the shared inset frame. Do not
override the frame padding with fixed spacing or add an inner border: its scaled
padding already follows single/double borders. Keep the inner surface translucent
in glass mode. Heatmap tooltip content is cloned into the shared tooltip bubble,
so its content stays transparent and the bubble owns the glass treatment.

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
panels retain their structural gutter in both modes. Set the frame inset locally
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
