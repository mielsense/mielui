---
name: mielui-design
description: Designs whole pages, apps, and websites with Mielui. Covers app shells, dashboards, data tables, settings pages, AI workspaces, and marketing sites, with layout skeletons, the spacing and type scales, surface rules, and responsive behavior. Use when asked to build a dashboard, admin panel, SaaS app, landing page, or website with Mielui, to lay out a page, or to make an existing Mielui page look better. Pair it with the `mielui` skill, which covers installation and component APIs.
---

# Mielui design

The `mielui` skill tells you which component to use and what its props are. This skill tells you where things go: the shell around the page, the page header, the grid, the spacing between sections, and what to leave out.

A page built from correct Mielui components can still look generic. That happens when every metric gets its own card, every section gets a border, and the spacing is one gap repeated everywhere. The rules below are how Mielui's own docs, Studio, and demo apps avoid that.

## How to work

1. Load the `mielui` skill first if Mielui is not installed or you have not read the component pages you need. Never guess a prop.
2. Write down the job in one sentence: who uses this page and what they do on it. Then name the dominant object, the one thing the page exists to show or collect. A dashboard's dominant object is usually one chart or one table, not six tiles.
3. Pick the archetype from the table below and read its reference file before writing markup.
4. Write the content before the layout. Use real product names, plausible numbers, real dates, and labels a person would write. Lorem ipsum and "Feature one" hide every hierarchy problem until it is too late.
5. Build in this order: base styles, shell, page header, the dominant object, supporting content, then the empty, loading, and error states.
6. Look at it. Open the page at 1440px and 390px, in light and dark. Run the checklist at the end of this file and fix the first thing that fails.

## Pick the archetype

| You are building | Read | The shape |
| --- | --- | --- |
| Any Mielui page | `references/foundations.md` | Base styles, the spacing and type scales, surfaces, color, icons, states |
| An app with several sections | `references/app-layouts.md` | A shell that stays fixed while one panel scrolls |
| An overview, analytics, or reporting page | `references/dashboards.md` | Header, one strip of numbers, one dominant chart, then the table |
| A list of records with a detail view | `references/dashboards.md` | Data table with a toolbar, a sheet or split pane for the record |
| Settings or a long form | `references/app-layouts.md` | A narrow column of labelled groups, with no card around each field |
| A chat or agent workspace | `references/app-layouts.md` | Thread list, transcript column, composer pinned at the bottom |
| A landing page or product site | `references/marketing-sites.md` | Left-aligned copy beside the working product, then a few plain sections |

Read `references/foundations.md` for every task. It is short, and the other files assume it.

## The look

White plates rest on a quiet grey stage, drawn in one ink. Everything pressable shares one radius, filled actions are lit, and nothing moves unless a state changed.

Seven rules produce that look. Break one and the page stops reading as Mielui.

1. **Stage and plates.** The window is the stage, `bg-background`. Content sits on plates, `bg-card` with a hairline. In dark mode the plate is the darkest surface and the stage sits one step lighter around it. A page has few plates: often one for the whole page, or one per real group. A recessed inset is the stage color again, so it only reads inside a plate.
2. **Space divides, rules do not.** Sections are separated by a larger gap, not a horizontal line. A hairline is for rows inside one group, or for the one edge between a sidebar and its page.
3. **Never a card in a card.** If a card needs an inner region, use `Card.Root variant="inset"`, which is built for it. Do not wrap text, a list, or navigation in a card to make it look designed.
4. **Weight stops at 500.** `font-semibold` and `font-bold` both render at 500. Hierarchy comes from size, from `text-foreground` against `text-foreground-muted`, and from spacing.
5. **One accent, spent once.** The primary color belongs to the primary action on the page and the first data series. Status colors are text tints and small dots. A status never fills a panel.
6. **One radius for controls.** Buttons, fields, tabs, and chips already use `--radius-control`. A custom pressable element uses `rounded-[var(--radius-control)]`. Never write `rounded-full` or `rounded-lg` on a control.
7. **Hover changes color only.** Nothing lifts, scales, or glows on hover. Nothing fades in on scroll. Use the motion that components already have.

## What a finished page has

Agents tend to stop at the happy path with placeholder content. A page is finished when it has all of these.

- A page title and one muted sentence under it, with the page's main action at the end of the same row. A chat thread is the exception: it has a one-row title bar.
- One primary button in view at most. Every other action is `outline`, `ghost`, or `quiet`. A page with no main action has no primary button, and that is fine.
- Numbers in `tabular-nums`, formatted with `Intl.NumberFormat`, with their unit.
- Real interactions. Tabs switch, filters filter, the dialog opens and its form submits, the row menu does something and confirms it with a toast.
- An empty state with one action, a loading state that keeps the layout's shape, and an error that names the cause and the way out.
- A layout that recomposes at narrow widths: the sidebar becomes a sheet, grids drop to one column, and a wide table scrolls inside its own frame.
- Both themes. Use tokens for every color, so dark mode needs no extra work.

## Do not ship

- A centered hero with a gradient, followed by three cards with an icon tile each.
- A row of stat cards, each with its own border, icon, and a green percentage pill.
- All-caps tracked eyebrows above headings, or section numbers like "01".
- Badges for plain metadata. A Badge is for a state that matters, such as Overdue or Draft.
- Decorative gradients, blobs, glows, or hand-written `backdrop-blur`. Glass is a theme setting.
- Emoji as icons, mixed icon sets, or an icon in front of every label.
- Placeholder avatars from a photo service, stock imagery, or fake customer logos.
- A footer strip showing version numbers or status that nobody asked for.
- Raw hex colors, `shadow-lg`, or a grey picked by eye. Use the tokens.
- A link to a page that does not exist. If the brief has no sign-in or docs route, open a Dialog or leave the link out.

Avoiding these is not permission to ship an empty template. Commit to a composition: one dominant object, a clear grid, dense where people compare and loose where they read.

## Checklist before you call it done

1. Does the first screen show the task and the dominant object without scrolling?
2. Can you remove a border, card, icon, badge, or label without losing meaning? Then remove it.
3. Do peers match? Same size, weight, alignment, and number format for things of the same kind.
4. Is the gap between sections clearly larger than the gap inside a section?
5. Is there at most one primary button in view?
6. Does it hold at 390px wide with no horizontal page scroll?
7. Does dark mode look deliberate, with no white box or invisible border?
8. Do keyboard focus, Escape, and outside click work on every overlay you added?
9. Is the browser console free of errors and warnings from your code?

Report what you built, which archetype you used, and what you did not verify. If a Mielui component itself logs a warning or misbehaves, say which one and how to reproduce it. Do not hide it with a workaround you do not mention.
