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
