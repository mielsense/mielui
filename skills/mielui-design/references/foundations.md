# Foundations

Read this before any layout work. It covers the base stylesheet, the scales, and the handful of classes that every Mielui page is built from.

## Base styles

`ui.css` brings Tailwind, the tokens, and the fonts. It does not style `body`, so an app that only imports it gets a white page in the browser's default font. Add the base once in `src/app.css`.

```css
@import '@mielui/svelte/ui.css';

@layer base {
    html {
        scrollbar-gutter: stable;
        -webkit-font-smoothing: antialiased;
    }

    body {
        margin: 0;
        background-color: var(--color-background);
        color: var(--color-foreground);
        font-family: var(--font-sans), sans-serif;
        font-size: var(--font-size-body);
        line-height: 1.5;
        font-synthesis-weight: none;
    }

    h1,
    h2,
    h3 {
        text-wrap: balance;
    }

    p {
        text-wrap: pretty;
    }
}
```

Dark mode is the `dark` class on `<html>`. Any toggler works. `mode-watcher` is the one the docs use: render `<ModeWatcher />` once in the root layout and call `toggleMode()` from a ghost icon Button. Render `<Toaster />` once in the root layout too.

The toggle shows the theme it switches to. Read `mode.current` from `mode-watcher` to choose between the sun and moon glyphs and to word the `aria-label`.

Use tokens for every color and both themes come for free. A `dark:` color class in your own markup is a sign that you picked a color by hand.

## The spacing unit is 3.6px

Mielui sets Tailwind's spacing unit to 3.6px, not 4px. `p-4` is 14.4px and `gap-6` is 21.6px. Everything is about ten percent tighter than stock Tailwind, which is part of why Mielui looks dense and calm. Do not compensate with arbitrary pixel values. Pick from this scale.

| Use | Class | Size |
| --- | --- | --- |
| Icon to its label, a dot to its text | `gap-2` | 7px |
| A title to its description | `gap-1` or `mt-1` | 4px |
| Controls in one row | `gap-2` | 7px |
| Fields in one form group | `gap-4` | 14px |
| Items in a card grid | `gap-4` to `gap-6` | 14 to 22px |
| Blocks inside one section | `gap-6` | 22px |
| Sections of an app page | `gap-10` to `gap-12` | 36 to 43px |
| Sections of a marketing page | `gap-24` to `gap-32` | 86 to 115px |
| Page gutter | `px-5 sm:px-8 lg:px-10` | 18, 29, 36px |
| Page top and bottom | `pt-8 pb-16` | 29, 58px |

Give each gap one owner. Put `flex flex-col gap-*` or `grid gap-*` on the parent and remove margins from the children. The ratio matters more than the numbers: the gap between sections should be at least twice the gap inside one.

Widths are in rem, so they are unaffected by the unit. Useful ones: `max-w-2xl` (42rem) for a form or settings column, `max-w-[60rem]` for an article, `max-w-[84rem]` for a marketing page, and no cap for a dashboard.

## The type scale

Body text is 14px. In this theme `text-sm` and `text-base` are both 14px, `text-xs` is 12px, `text-xl` is 20px, and `text-3xl` is 30px. Other sizes keep Tailwind's values.

| Role | Classes | Size |
| --- | --- | --- |
| Marketing headline | `text-5xl font-medium tracking-tight leading-[1.05]`, `text-4xl` on phones | 48px |
| Page title | `text-xl font-medium tracking-[var(--tracking-header)]` | 20px |
| Big number | `text-2xl font-medium tabular-nums` or `text-3xl` for the hero number | 24 or 30px |
| Section heading | `Typography.Title`, or `text-[length:var(--font-size-header)] font-medium` | 16px |
| Card title | `Card.Title` | 16px |
| Body, labels, table cells | `text-sm` | 14px |
| Sentence under a page title | `text-sm text-foreground-muted` in apps, `text-lg text-foreground-muted` under a marketing headline | 14 or 18px |
| Metadata, captions, axis labels | `text-xs text-foreground-muted` | 12px |
| Code, IDs, timestamps, key hints | `font-mono text-xs` | 12px |

Rules that keep type clean:

- Two text colors do almost all the work: `text-foreground` and `text-foreground-muted`. Do not invent a third grey with opacity.
- Sentence case everywhere, including buttons, tabs, and table headers.
- No uppercase labels and no wide tracking.
- Body copy runs 60 to 68 characters per line. Cap prose with `max-w-prose` or `max-w-xl`.
- Mono is for things a person might copy: IDs, commands, paths, hashes. It is not a style for labels.

The `Typography` components carry the right classes. `Typography.Title level={2}` is a section heading, `Typography.Description` is the muted sentence under it, and `Typography.Metadata` is 12px muted text. Passing `class` overrides their defaults, so `class="text-xl"` on a Title makes it a page title.

## Surfaces

There are five surfaces. Use the class or component, never rebuild one with borders and shadows.

| Surface | How | Use it for |
| --- | --- | --- |
| Stage | `bg-background` | The window behind everything |
| Plate | `mielui-plate`, or `Card.Root` | A resting group: a panel, a card, the page itself |
| Two-layer frame | `Card.Root variant="inset"`, or `mielui-inset-frame` holding `mielui-inset-surface` | A group with its own toolbar, tabs, or footer. Content sits in the recessed inset, chrome sits on the frame |
| Floating panel | `mielui-float-frame`, used by menus, popovers, selects | Anything anchored to a trigger. You rarely write this yourself |
| Modal | Dialog, Sheet, Drawer, Command | Tasks that take over |

Choosing between them:

- Start with no surface. A heading and its content on the plate or stage need nothing around them.
- Reach for a plain `Card.Root` when a group is a real object: something you could move, link to, or act on.
- Reach for `variant="inset"` when the group has a chart, a table, or a list plus actions. The footer strip takes the actions and the inset takes the content.
- Match the surface to what is behind it. An inset is the stage color. On a plate it reads as recessed. Directly on the stage it disappears, grey on grey. So when the page sits on the stage, as in the top bar shell or a marketing page, groups are plain `Card.Root` plates. When the page is itself a plate, groups inside it are inset cards or nothing at all.
- `DataTable` draws its rows on an inset. On the stage, put it in a plate: `<div class="mielui-plate p-4">`.
- On an inset Card, `Card.Header` sits inside the inset with the content and `Card.Footer` is the one strip on the frame. Do not add a second strip of your own above or below it.
- Fields inside an inset are white, so they read as raised. That is intended.

Borders use `border-border` with `border-[length:var(--border-size)]`. A hover or selected row uses `bg-[var(--color-wash)]`. A flat grey fill for a track or chip is `bg-secondary`.

## Color

| Token | Meaning |
| --- | --- |
| `bg-background` | The stage |
| `bg-card` | Plates and fields |
| `bg-secondary` | Tracks, chips, the selected row in a nav |
| `text-foreground`, `text-foreground-muted` | The two inks |
| `border-border`, `border-border-strong` | Hairlines |
| `bg-primary`, `text-[var(--color-on-primary)]` | The one accent and the text that sits on it |
| `text-[var(--mielui-success-text)]`, and the `warning`, `error`, `info` versions | Status as text, readable on any surface |
| `bg-success`, `bg-warning`, `bg-error`, `bg-info` | Status as a 6 to 8px dot |
| `var(--chart-1)` to `var(--chart-5)` | Data series, in order |

A delta such as "+12.4%" is `text-[var(--mielui-success-text)]` with `tabular-nums`. It is not a pill. A status in a table is a Badge with a status variant, or a dot and a word.

To rebrand, set `--color-primary` and `--color-on-primary` on `:root` and `.dark` after the import. Do not recolor individual components.

## Radius

You almost never write a radius. Components bring their own. When you build something custom:

- Pressable and row-like things: `rounded-[var(--radius-control)]`.
- A row inside a list or nav: `rounded-[var(--radius-md)]`.
- A plate: use `mielui-plate`, which also gives the squircle corner.
- A thing nested inside a rounded thing: inner radius = outer radius minus the gap between them. If a button sits 8px inside a panel corner, the panel's radius is the button's radius plus 8px. Change the outer radius or the gap, never hand-pick the inner one.
- Round by nature: avatars, dots, switch thumbs. Those keep `rounded-full`.

## Links and focus

`ui.css` does not style bare links or add a global focus ring. Components bring their own. For anything you write by hand:

- A text link is `text-foreground-muted hover:text-foreground transition-colors`. A link inside a sentence is `text-foreground underline underline-offset-4`.
- Every custom focusable element gets `rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]`. Use the control radius when it is a row or button.
- Prefer `Button` with `href` over a hand-styled link whenever the thing looks like a control.

## Fields

- `Input`, `Textarea`, `Switch`, `Checkbox`, `Slider`, and radio items take a `label` prop, and most take `description`. Use them instead of writing a label element.
- A control with no `label` prop, such as `Select`, goes in `Field.Root` with `Field.Label`, so the label is still wired to the control.
- Validation messages come from `Field.Root` with `issues` and `Field.Error`. Show them under the field when it is left or the form is submitted, not on every keystroke.
- A few tabs used as a switch with no panels, such as a range or a billing period, need a group name: wrap `Tabs.List` in `<div role="group" aria-label="Range">`.

## Brand mark

A product needs a mark in the header and a favicon. Make one small tile: `grid size-6 place-items-center rounded-[var(--radius-sm)] bg-primary text-[var(--color-on-primary)]` holding a simple inline SVG glyph or one letter. Reuse the same shape as `static/favicon.svg`. This is the only tinted tile on the page.

## Icons

Use Hugeicons through `HugeiconsIcon`, with glyphs from `@hugeicons/core-free-icons`.

```svelte
<script lang="ts">
    import { Search01Icon } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<HugeiconsIcon icon={Search01Icon} size={16} aria-hidden="true" />
```

- 16px in controls and nav rows, 14px in dense rows and menus, 20px at most for an empty state.
- Icons go on actions and navigation. They do not go in front of every heading, stat, or feature.
- An icon-only button needs `aria-label` and a Tooltip. Wrap menu and sheet triggers the same way: `Tooltip.Trigger` around the `DropdownMenu.Trigger`.
- Menu items are text. Add icons to a menu only when every item has one and they help people scan.
- Never put an icon on a tinted rounded tile to decorate a card. The only tile in Mielui is the brand mark.

## States

Every view that loads or lists data needs these four. Build them, do not describe them.

- **Empty.** `EmptyState` with a title, one sentence, and one action. Say what will appear here and how to make the first one.
- **Loading.** `Skeleton` blocks in the exact shape of the content that is coming, so nothing jumps. A button keeps its label and gains a spinner through `loading`.
- **Error.** `Alert variant="error"` next to the thing that failed, naming the cause and offering a retry. Not a toast.
- **Success.** A toast for a one-off outcome ("Invoice sent"). A changed label for a standing one ("Saved").

## Copy

- Buttons say what happens: "Create invoice", "Send reminder", "Export CSV". Not "Submit" or "OK".
- Headings describe the content: "Revenue by plan", not "Insights".
- One muted sentence explains a page or section. If it needs three, the layout is unclear.
- No exclamation marks, no "Welcome back!", no slogans as labels.
