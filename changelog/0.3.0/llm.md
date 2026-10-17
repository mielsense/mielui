## Composer.Footer

Composer has a sixth part, `Composer.Footer`. Put it last inside `Composer.Root`, after the toolbar. It renders on the frame under the writing surface, so the input and the default joined toolbar keep sharing one surface above it. Use it for a hint, connected apps, or a setting that applies to the whole message.

Do not build this strip yourself. A sibling `div` under `Composer.Root`, or a tinted wrapper around the whole composer, sits outside the form frame and breaks the theme's single and double border modes and the glass surface. `Composer.Footer` is hidden while it has no child elements, so it is safe to render with conditional content.

Text inside is muted at the label size, and buttons inside take the small control height on their own. Use ghost buttons there and in `Composer.Toolbar`; outline controls in the toolbar still work and render flat, with a hairline and the control radius.

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

The look lives in the shared `.mielui-glow` class in `ui.css`, so it needs the package stylesheet. Do not rebuild it with local gradients, borders, or a drop shadow. It takes the control radius like every button and is filled by default with a light tint of the primary color under dark text. Recolor it with two custom properties and a matching text color class:

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

The two layers swapped. `mielui-inset-frame` and `mielui-modal-frame` are now the card color, and `mielui-inset-surface` is the stage color, with a hairline ring when the theme uses double borders. Put header, toolbar, and footer strips on the frame and content in the inset. Do not force `bg-card` onto an inset to get the old white surface back, and do not add a ring or border to it. Fields inside an inset are white through `--color-field`. `chrome.borders` still defaults to `single`, so the inset meets the frame's border unless a theme asks for `double`.

Controls share one radius through a token. Use `rounded-[var(--radius-control)]` on anything pressable and on single-line fields. It is 12px by default, 4px in the sharp scale, and a pill in the rounded scale. Do not write `rounded-full` or `rounded-[var(--radius-lg)]` on a control, because either one breaks in two of the three scales. Badges and menu rows take the control radius too. Multi-line fields use `--radius-xl`, list rows `--radius-md`, and plates `--radius-2xl`. Floating panels and two-layer frames compute their radius from the control radius; see the nested corner section below.

Filled actions are lit. `Button` variants `primary`, `secondary`, `destructive`, and `glow` all use the `mielui-glow` material, and each only sets its color and light. To make your own lit control, add `mielui-glow`, set `--mielui-glow-color`, set `--mielui-glow-light` between 0 and 1 (lower on dark fills), and pair it with `shadow-[var(--mielui-glow-shadow)]` and `focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]`. Set `--mielui-glow-ring` when the outer edge should be a hairline. Add `mielui-glow-neutral` for the white selected fill on a grey track; it handles dark mode itself. `outline`, `ghost`, and `quiet` are flat, and so are fields, triggers, tracks, and badges. Do not put the lit material on a card or a label.

The primary button's text is `--color-on-primary`, which is dark on the default brand in both themes. Do not hard-code white text on a primary fill.

Weight stops at 500. `font-semibold` and `font-bold` still compile but render at 500, so a heading that relied on them no longer stands out by weight. Use size and `text-foreground` against `text-foreground-muted`.

The default fonts are Inter Tight and Geist Mono, and the package no longer installs Manrope or JetBrains Mono. A project that wants to keep Manrope installs `@fontsource/manrope`, imports its CSS after `ui.css`, and sets `--font-sans: 'Manrope', sans-serif`. Do not import the old font packages from `@mielui/svelte`; they are gone.

Motion uses four springs exposed as easing tokens, and interface motion stays under 300ms. Keyboard-driven changes do not animate: the traveling highlight snaps for arrow keys and only glides for a pointer, on `--ease-out` for `--motion-duration-item`, so do not add a transition to a row's active state. Use `ease-[var(--ease-spring-layout)]` with `[transition-duration:var(--motion-duration-spring)]` for anything that slides or resizes, `ease-[var(--ease-spring-flick)]` with `[transition-duration:var(--motion-duration-flick)]` for a chevron or glyph swap, and the `panelIn`, `panelOut`, `dialogIn`, and `dialogOut` helpers from `@mielui/svelte/transition` for things that open. Do not write a local `cubic-bezier` or a literal duration, because the duration tokens are what collapse to zero under reduced motion and the none motion theme. Hover changes color only.

Elevation is binary. Use `shadow-[var(--elevation-1)]` for a resting plate and `shadow-[var(--elevation-float)]` for anything floating. Both are off in the default theme, so cards and menus are held by their hairline; reference the tokens anyway so a theme can turn them on. Dialogs and sheets use `--elevation-modal`. Do not compose another shadow.

The restyle itself renames no component, prop, or variant. The API additions in this release are `Composer.Footer`, Button's `glow` variant, the `labels` props, and `springEase(stiffness, damping)` in `@mielui/svelte/transition`; the `bind:element` and context changes are below.

## Nested corner radii

Frames that hold controls near their corners no longer use the plate radius. `.mielui-modal-frame` and `.mielui-inset-frame` now resolve `--mielui-plate-radius` to the control radius plus two spacing units plus the border, capped at `--radius-2xl` (about 20px by default instead of 26px, before the squircle factor). `.mielui-float-frame` resolves it to the control radius plus one spacing unit plus the border, capped at `--radius-xl` (16.6px instead of 18px). `.mielui-plate` is unchanged.

The rule is inner radius = outer radius - border - gap. Compose with it instead of picking radii:

- A footer or header strip on a two-layer frame pads by two spacing units (`p-2`). Card, Dialog, Sheet, and Drawer footers already do. A custom strip with a smaller padding puts its buttons off-centre against the frame corner.
- Menu rows and `.mielui-item-highlight` use the control radius, not `--radius-md`. Do not override a row radius inside a floating panel.
- CodeBlock sets its own tighter `--mielui-plate-radius` and pads its header by one spacing unit.
- A custom track that pads control-radius items by one spacing unit uses `rounded-[calc(var(--radius-control)+var(--spacing))]`, as Toolbar does.

If you set `--mielui-plate-radius` on a frame yourself, keep the squircle factor: multiply by `var(--mielui-squircle, 1)` on frames that draw squircle corners.

## One name for the DOM node, one prop for built-in text

Every component part exposes its DOM node as a bindable `element`. Before 0.3.0 the Calendar, RangeCalendar, DatePicker, DateRangePicker, and OTPField parts used `ref`, and so did HugeiconsIcon. Replace `bind:ref` with `bind:element` on those. The old spelling still compiles in some setups because Svelte passes unknown props through, but nothing is bound and the variable stays empty. When you wrap a Bits UI primitive yourself, type the wrapper with `WithElement<PrimitiveProps>` from `@mielui/svelte/utils` and pass `bind:ref={element}` to the primitive.

Built-in text and accessible names are overridden with one `labels` object on the root, never with one prop per string. Every key is optional and English is the fallback. A key that inserts a value is a function, for example `position: (position, total) => string` on Toaster or `added: (tag, count) => string` on TagInput. In 0.3.0 Slider, NumberField, Dialog, Sheet, Notch, Toaster, Command, ColorPicker, Question, Gauge, Button, Kbd, `Form.ErrorSummary`, SkeletonSwap, CopyButton, ShowMore, TaskSteps, FolderCard, Composer, and Conversation gain the prop, and TagInput, FileUpload, DataTable, Chart, Heatmap, Reasoning, and Toaster gain keys.

`createContext(name)` from `@mielui/svelte/utils` now returns three helpers. `set` and `get` are unchanged, and `get` still throws `<Name> components must be used within <Name.Root>.` outside the root. `find` returns `undefined` there. Use `find` for a part that also renders on its own, the way Tabs, CodeBlock, and FileDiff parts do. Do not read library contexts with `getContext('tabs')` or another string key. Those keys are private symbols now and the call returns `undefined`.

## Single-string props removed

The one-prop-per-string props are gone. Old call sites still type-check in some setups because Svelte passes unknown props through to the element, but the text silently falls back to English. Move each one into `labels`:

- Button and every part built on it: `loadingLabel`, `successLabel`, `errorLabel` become `labels={{ loading, success, error }}`. This includes menu items, Select and Combobox items, Dialog, AlertDialog and Sheet buttons, `Form.Submit`, and `Command.Trigger`.
- CopyButton: `label` and `copiedLabel` become `labels={{ copy, copied }}`. On CodeBlock, set them on `CodeBlock.Root`, not on `CodeBlock.Copy`.
- ShowMore: `moreLabel`, `lessLabel`, `label` become `labels={{ more, less, region }}`.
- `Command.Content` `label` becomes `labels.palette` on `Command.Root`.
- TaskSteps `label` becomes `labels.list`.
- `FolderCard.Count` `unit` becomes `labels.count: (count, formatted) => string` on `FolderCard.Root`. Return the whole phrase, not just the unit.
- Composer: `errorMessage` on Root and `label`, `queueLabel`, `stopLabel`, `loadingLabel` on Submit become `labels` on `Composer.Root` (`error`, `send`, `queue`, `stop`, `sending`).
- Question: `errorMessage` on Root and `label`, `loadingLabel` on Submit become `labels.submitError`, `labels.submit`, `labels.submitting` on `Question.Root`.
- `Conversation.ScrollButton` `label` becomes `labels.scrollToBottom` on `Conversation.Root`.
- TagInput `requiredMessage` becomes `labels.required`.

Props that carry your own content stay props and win over `labels`: `placeholder` and `aria-label` on `Composer.Input` and `Question.Input`, `title` and `description` on `Conversation.Empty`, and SkeletonSwap's `label`.

DataTable's `labels.rows` and `labels.selected` changed shape. They used to return the noun next to an animated number; they now return the whole phrase: `rows: (count) => string` and `selected: (selected, total) => string`. A custom phrase renders as plain text, and only the English default keeps the rolling number. Reasoning's `labels.thoughtFor(duration)` now returns the whole status line, and `labels.thought` only applies when no `duration` is passed, so set both when translating.

Menu rows accept only `variant="destructive"`. `size`, `unstyled`, and other Button variants never applied to a row, and the types no longer offer them. Do not try to restyle a row through Button props; use `class`.

## Dialog width comes from `size` alone

`orientation` on `Dialog.Root` and `AlertDialog.Root` is gone. It never changed the layout; it only switched which width each `size` meant, so the same `size` gave different widths in Dialog and Alert Dialog. `size` on Content now maps to one scale everywhere: `xs` is `max-w-xs`, `sm` is `max-w-sm`, `md` is `max-w-md`, `lg` is `max-w-xl`, and `xl` is `max-w-2xl`. Dialog defaults to `lg` and Alert Dialog to `xs`, so neither default changed width.

Remove `orientation` from call sites. The new scale is the old horizontal one plus `xs`, so a horizontal dialog keeps its `size`. A vertical dialog keeps its width by stepping `size` down one: `sm` becomes `xs`, `md` becomes `sm`, `lg` becomes `md`, and `xl` becomes `lg`. A vertical Dialog without `size` was `max-w-sm`, so give it `size="sm"`. An Alert Dialog that passed `orientation="horizontal"` without `size` was `max-w-sm`, so give it `size="sm"`.

## Renamed props and parts

These names now match the components they sit beside. The old names are gone, and Svelte passes an unknown prop through to the element without an error, so a missed rename fails quietly.

- `AlertDialog.Exit` is `AlertDialog.Close`, the same name Dialog and Sheet use.
- `Sheet.Header` `close` is `showClose`, the same name `Dialog.Content` uses.
- TagInput `error="message"` is `issues={[{ message }]}`, the shape `Field.Root` takes. `invalid` marks the field without a message, and it defaults to true when there are issues. More than one issue renders as a list.
- Hover Card `side` and `align` on Content are one `placement` on Root, such as `bottom-start`, the same values Popover takes. `openDelay` is `delay`, as on Popover and Tooltip. `sideOffset` stays on Content.
- Checkbox `variant="primary"` is `variant="card"`. It frames the box and its text as a bordered row; it never meant the primary color.
- Spinner `curved` is `eased`. It varies the speed through each turn.

These props are removed because they did nothing useful from outside: `stateKey` and `state_key` on Popover and Combobox only prefixed DOM ids, `panelIdPrefix` on `Dialog.Content` did the same, `contentClass` landed on the same element as `class`, and `role` on `Dialog.Content` is what AlertDialog is for. Combobox Content ignored `focusTrap`, and `Select.Item` and `Combobox.Item` ignored `variant`, `size`, and `unstyled`, so they are no longer typed.
