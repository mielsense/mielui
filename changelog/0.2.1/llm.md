## Drawer is a floating panel

Drawer no longer spans the viewport or sits flush against its edge. `Drawer.Content`
now renders two elements: the positioned dialog element, which owns dragging,
focus, and `bind:element`, and a visible panel inside it marked
`data-ui="drawer-panel"`. The `class` and `surface` props apply to the panel.

Top and bottom drawers are centered, 36rem wide, and never wider than the viewport
minus the gap. Left and right drawers are 24rem wide and fill the height. Change
the size with a width class on `Drawer.Content`, for example `class="w-3xl"`, or
`class="w-screen"` for the widest panel the viewport allows. Do not use
`max-w-none` to widen it; the panel has a fixed width, not a fluid one.

Stop constraining regions yourself. Older call sites put
`class="mx-auto w-full max-w-xl"` on `Drawer.Header`, `Drawer.Body`, and
`Drawer.Footer` to keep content readable inside a full-width sheet. Those classes
still type-check but are now redundant, and `mx-auto max-w-xl` without `w-full` on
the footer misaligned its actions. Remove them.

Opening a drawer focuses the dialog element rather than the first tabbable
control. Pass `onOpenAutoFocus` to `Drawer.Content`, call `event.preventDefault()`,
and focus your own element when a field should receive focus on open.

`Drawer.Handle` positions itself from the drawer direction. Keep it as the first
child of `Drawer.Content` in every direction; do not reorder or rotate it by hand.

Exported names and prop types are unchanged.

## Slider has a field variant for settings panels

`<Slider variant="field" label="Opacity" format={(value) => `${value}%`} />`
renders one bar with the label at the start and the formatted value at the end.
The whole bar is the drag target, a thin tick marks the value, and the fill
behind it shows the amount. Reach for it when a panel stacks many numeric
settings, and stack the fields with a small gap so they read as one column.

In the field variant `label` is visible as well as naming the handle, so do not
add a separate label element beside it. `format` supplies both the readout and
`aria-valuetext`; it also sets `aria-valuetext` on the default variant. The
field variant holds a single value. Combining it with `range` is a type error,
so keep the default variant for two-handle ranges. Do not rebuild this control
from a native range input or a custom pointer handler.

## Menu rows and options do not take `href`

`DropdownMenu.Item`, `ContextMenu.Item`, `ContextMenu.CheckboxItem`,
`Select.Item` and `Combobox.Item` always render a `<button>`. Their prop types
used to include `href` because they extended the Button props, but the value was
dropped before rendering, so a row with `href` type-checked and then did
nothing when chosen. The types now leave `href` out, and passing it is a type
error.

To navigate from a menu, call your router in `callback`, for example
`callback={() => goto('/settings')}` in SvelteKit. Do not wrap a row in an
anchor, which breaks the menu's keyboard handling. Triggers and the action
buttons of Dialog, Alert Dialog and Sheet are unaffected and still accept
`href`.

## The default font is Manrope

`DEFAULT_THEME.fontSans` and the `--font-sans` token in `ui.css` are now
`'Manrope', sans-serif`. The stylesheet imports the Latin 400, 500, 600 and 700
files from `@fontsource/manrope`, which is a runtime dependency of the package,
and `mielui init` installs it in place of `@fontsource/inter`. JetBrains Mono is
unchanged.

Nothing is needed to get the new default. A project that wants Inter back
installs `@fontsource/inter` itself, imports the weights it uses, and sets
`--font-sans: 'Inter', sans-serif` after importing `ui.css`. The built-in
presets that name Inter, such as Magic and Functional, still expect the project
to load it. Do not add a `<link>` to a font CDN for the default font.

