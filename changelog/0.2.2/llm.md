## Composer.Footer

Composer has a sixth part, `Composer.Footer`. Put it last inside `Composer.Root`, after the toolbar. It renders on the frame under the writing surface, so the input and the default joined toolbar keep sharing one surface above it. Use it for a hint, connected apps, or a setting that applies to the whole message.

Do not build this strip yourself. A sibling `div` under `Composer.Root`, or a tinted wrapper around the whole composer, sits outside the form frame and breaks the theme's single and double border modes and the glass surface. `Composer.Footer` is hidden while it has no child elements, so it is safe to render with conditional content.

Text inside is muted at the label size, and buttons inside take the small control height on their own. Use ghost buttons there and in `Composer.Toolbar`; outline controls in the toolbar still work and render as flat pills.

```svelte
<Composer.Root bind:value onSubmit={send}>
  <Composer.Input />
  <Composer.Toolbar>
    <Composer.Actions><!-- ghost controls --></Composer.Actions>
    <Composer.Submit />
  </Composer.Toolbar>
  <Composer.Footer>
    <Button variant="ghost">Connect apps</Button>
  </Composer.Footer>
</Composer.Root>
```

The input and joined toolbar also have slightly more padding than before. Do not add padding classes to restore the old spacing or to imitate the new one.

## Button glow variant

`<Button variant="glow">` is a lit version of the primary action. Use it for the single headline call to action on a landing or marketing surface. Do not use it for routine controls, toolbars, or several buttons in one view; those stay `primary`.

The look lives in the shared `.mielui-glow` class in `ui.css`, so it needs the package stylesheet. Do not rebuild it with local gradients, borders, or a drop shadow. It is a pill, filled by default with a light tint of the primary color under dark text. Recolor it with two custom properties and a matching text color class:

```svelte
<Button
  variant="glow"
  class="text-background [--mielui-glow-color:var(--color-foreground)] [--mielui-glow-light:0.3]"
>
  Get started
</Button>
```

`--mielui-glow-color` is the fill. `--mielui-glow-light` scales the white light from 0 to 1 and defaults to 1. Lower it on dark fills, where full light reads as gloss. Prefer a bright fill: a mid-tone fill with reduced light looks flat. Do not set `background-color`, `border`, `rounded-*`, or `shadow-*` classes on a glow button: every edge is a `box-shadow`, and a shadow class would replace both the edges and the focus ring.
