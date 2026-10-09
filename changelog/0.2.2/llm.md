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

## The default look: plates, pills, and lit actions

The default theme changed its whole visual language. Old call sites still type-check, but hand-written styling that copied the previous look now reads as foreign. When you build or restyle with Mielui, follow these rules instead of the ones in earlier changelogs.

Neutrals are derived, not picked. `--color-border` is the foreground at 12% (14% in dark), `--color-input` at 14% (16%), and `--color-wash` at 5% (6%). They are translucent, so they agree on any surface. Use `bg-[var(--color-wash)]` for every hover and selected-row fill. Stop writing `bg-foreground/[0.06]`, `hover:bg-secondary` on rows, or a grey hex.

Surfaces have three roles. `--color-background` is the grey stage, `--color-card` is the white plate, and `--color-panel` is the floating panel. Use the class contracts rather than rebuilding them: `mielui-plate` is a resting plate with its hairline, radius, and shadow; `mielui-float-frame` is a floating panel; `mielui-inset-frame` with a `mielui-inset-surface` child is the two-layer surface.

The two layers swapped. `mielui-inset-frame` and `mielui-modal-frame` are now the card color, and `mielui-inset-surface` is the stage color with a hairline ring. Put header, toolbar, and footer strips on the frame and content in the inset. Do not force `bg-card` onto an inset to get the old white surface back, and do not add a ring or border to it. Fields inside an inset are white through `--color-field`. `chrome.borders` now defaults to `double`, so the gutter shows unless a theme asks for `single`.

Controls are pills through a token. Use `rounded-[var(--radius-control)]` on anything pressable and on single-line fields. Do not write `rounded-full` on a control, because sharp themes set `--radius-control` to a few pixels, and do not write `rounded-[var(--radius-lg)]` on a button, which is now the wrong shape. Multi-line fields use `--radius-xl`, rows inside panels `--radius-md`, floating panels `--radius-xl`, and plates `--radius-2xl`.

Filled actions are lit. `Button` variants `primary`, `secondary`, `destructive`, and `glow` all use the `mielui-glow` material, and each only sets its color and light. To make your own lit pill, add `mielui-glow`, set `--mielui-glow-color`, set `--mielui-glow-light` between 0 and 1 (lower on dark fills), and pair it with `shadow-[var(--mielui-glow-shadow)]` and `focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]`. Set `--mielui-glow-ring` when the outer edge should be a hairline. Add `mielui-glow-neutral` for the white selected pill on a grey track; it handles dark mode itself. `outline`, `ghost`, and `quiet` are flat, and so are fields, triggers, tracks, and badges. Do not put the lit material on a card or a label.

The primary button's text is `--color-on-primary`, which is dark on the default brand in both themes. Do not hard-code white text on a primary fill.

Weight stops at 500. `font-semibold` and `font-bold` still compile but render at 500, so a heading that relied on them no longer stands out by weight. Use size and `text-foreground` against `text-foreground-muted`.

Motion uses four springs exposed as easing tokens. Use `ease-[var(--ease-spring-layout)]` with `[transition-duration:var(--motion-duration-spring)]` for anything that slides or resizes, `ease-[var(--ease-spring-flick)]` with `[transition-duration:var(--motion-duration-flick)]` for a chevron or glyph swap, and the `panelIn`, `panelOut`, `dialogIn`, and `dialogOut` helpers from `@mielui/svelte/transition` for things that open. Do not write a local `cubic-bezier` or a literal duration, because the duration tokens are what collapse to zero under reduced motion and the none motion theme. Hover changes color only.

Menu separators are inset. `mielui-menu-separator` no longer cancels the panel padding, so do not add negative margins to stretch it.

Elevation is binary. Use `shadow-[var(--elevation-1)]` for a resting plate and `shadow-[var(--elevation-float)]` for anything floating. Dialogs use `--elevation-modal`. Do not compose another shadow.

Exported component names, props, and variants are unchanged. `springEase(stiffness, damping)` is new in `@mielui/svelte/transition`.
