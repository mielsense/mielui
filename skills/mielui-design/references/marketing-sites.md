# Marketing and product sites

A Mielui marketing page shows the product working and says what it does in plain words. It has no gradient hero, no icon grid, and no invented testimonials. What makes it look good is a large calm headline, a real interactive demo beside it, and a few sections that share one set of edges.

Here the document scrolls normally. Do not use the fixed app shell.

## The page

```svelte
<div class="flex min-h-dvh flex-col bg-background text-foreground">
    <header class="mx-auto flex h-16 w-full max-w-[84rem] items-center gap-8 px-5 sm:px-8">
        <a href="/" class="flex items-center gap-2 text-sm font-medium">Relay</a>
        <nav aria-label="Main" class="hidden items-center gap-1 md:flex"><!-- three to five ghost Buttons with href --></nav>
        <div class="ms-auto flex items-center gap-2"><!-- theme toggle, then the call to action as an outline Button --></div>
    </header>

    <main class="mx-auto flex w-full max-w-[84rem] flex-col gap-24 px-5 pb-24 sm:px-8 lg:gap-32">
        <!-- hero, then sections -->
    </main>

    <footer class="mx-auto w-full max-w-[84rem] px-5 py-10 sm:px-8"><!-- link columns --></footer>
</div>
```

One column, at most 84rem wide, holds the header, every section, and the footer. Every section starts on the same left edge. That shared edge does more for the page than any decoration.

## Hero

Copy at the start, the product at the end.

```svelte
<section class="grid items-center gap-12 pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:pt-20">
    <div class="flex flex-col items-start gap-6">
        <h1 class="max-w-[14ch] text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
            Invoices that chase themselves
        </h1>
        <p class="max-w-xl text-lg text-foreground-muted">
            Relay sends reminders, matches bank payments, and tells you who is late.
        </p>
        <div class="flex flex-wrap items-center gap-2">
            <Button size="lg" onclick={openSignup}>Start free</Button>
            <Button size="lg" variant="outline" href="/pricing">See pricing</Button>
        </div>
    </div>
    <div class="min-w-0"><!-- the live demo --></div>
</section>
```

- The headline is left-aligned, 48px, medium weight, tight tracking, and short. Limit its width in characters (`max-w-[14ch]` to `max-w-[18ch]`) so it breaks into two or three even lines.
- The headline says what the product does. "Invoices that chase themselves" works. "The future of finance" does not.
- The lead is one or two sentences at 18px in the muted color.
- Two buttons at most: one primary, one outline. Both `size="lg"`. The hero's button is the page's primary action, so the copy of it in the header is `outline`. The closing section repeats the primary once the hero is out of view.
- The hero's main button may use `variant="glow"`, the lit version of primary made for one headline call to action. Use it once per page or not at all.
- Buttons go to routes that exist. With no sign-up page in the brief, "Start free" opens a `Dialog` with a short form that validates and confirms.
- One line of muted 14px text under the buttons can answer the obvious objection: "Free for one project. No card required.".
- No eyebrow above the headline, no badge announcing a release, no row of customer logos unless they are real.
- The hero may carry the one flat brand tint on the page: `bg-[color-mix(in_oklab,var(--color-primary)_7%,var(--color-background))]` on a full-width band or a rounded plate. A flat tint, not a gradient, and nowhere else on the page.

## The demo is the product

The hero's second column holds a small working piece of the product, built from real Mielui components, inside a frame. It is not a screenshot, an illustration, or a browser mockup.

```svelte
<Card.Root variant="inset" class="min-w-0">
    <Card.Header>
        <Card.Title>Overdue</Card.Title>
        <Card.Description>Three invoices need a reminder</Card.Description>
    </Card.Header>
    <Card.Content><!-- real rows, a real chart, a real composer --></Card.Content>
    <Card.Footer>
        <Button variant="outline">Send reminders</Button>
    </Card.Footer>
</Card.Root>
```

- Pick one small task the product does and make it work: toggling a setting, sending a reminder, filtering a table, asking a question.
- Clicking things in it changes state. A demo people can use sells the product better than a paragraph.
- Keep it one height. If it has tabs, each tab is the same size.
- Fill it with the same believable content as the rest of the site.

## Sections

Each section answers one question a visitor has: what it does, how it works, what it costs, how to start. Three to five sections is enough.

A section puts a heading and one sentence at the start and the evidence beside it.

```svelte
<section class="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
    <div class="flex flex-col gap-3">
        <h2 class="text-2xl font-medium tracking-tight">Reminders on your schedule</h2>
        <p class="max-w-md text-foreground-muted">
            Choose when Relay follows up. It stops the moment a payment lands.
        </p>
    </div>
    <div class="min-w-0"><!-- the evidence --></div>
</section>
```

The sentence under a section heading is 16px, `text-[length:var(--font-size-header)]`. Body text at 14px looks small beside a 24px heading on a marketing page.

When the evidence is much taller than the heading, keep the heading in view with `lg:sticky lg:top-8 lg:self-start`, or put the heading above the evidence at full width. Do not leave a tall empty column under a two-line heading.

The evidence is something concrete, and it changes from section to section:

- A working component, such as a settings group, a table, or a chart.
- A `CodeBlock` with the real install command or a real API call. Use `lang="console"` for terminal output, so words in the output are not colored as shell keywords.
- A row group of facts, shown below.
- A short numbered sequence written as an `ol`, for how it works.

Do not give every section the same silhouette. If three sections in a row are a heading over three boxes, merge them or change their evidence.

## Feature lists

A list of features is rows, not a grid of cards with icons.

```svelte
<div class="mielui-inset-frame">
    <dl class="mielui-inset-surface divide-y divide-border overflow-hidden">
        {#each features as feature (feature.name)}
            <div class="grid gap-x-8 gap-y-1 px-5 py-4 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
                <dt class="font-medium">{feature.name}</dt>
                <dd class="text-foreground-muted">{feature.summary}</dd>
            </div>
        {/each}
    </dl>
</div>
```

The name sits in a fixed column and the sentence beside it, so every row aligns. Six to eight rows read faster than six cards, and nobody misses the icons.

## Pricing

Plans are aligned columns, so people can compare across them.

- Two or three plans in one grid with equal columns: `grid gap-4 lg:grid-cols-3`. Three columns need about 18rem each, so they stack below `lg`. Each plan is a plain `Card.Root`.
- Inside each: the plan name, the price as `text-3xl font-medium tabular-nums` with a muted "per month" beside it, one sentence on who it is for, the button, then the feature list.
- Feature lines sit at the same height in every column. Write the same number of lines per plan, or use a comparison `Table` under the plans.
- The recommended plan has the only primary button. The others use `outline`. No ribbon, no scaled-up middle card, no "Most popular" badge.
- A monthly and yearly switch is `Tabs variant="segmented"` at the end of the title row, inside a `role="group"` wrapper with a label. It changes every price and the billing note under it.
- State what happens after the trial and whether a card is required, in muted text under the grid.

## Questions, closing, footer

- Questions are an `Accordion` in a `max-w-2xl` column under a plain heading. Five to seven real questions, with answers that include numbers.
- The closing section is a heading, one sentence, and the primary button, left-aligned like everything else. It is not a tinted band with centered text.
- The footer is muted 14px links in three or four columns under small medium labels, with one line for the company name and year. No oversized wordmark and no newsletter form unless there is a newsletter.

## Inner pages

Pricing, changelog, about, and docs pages share the header and footer. Each starts with a `text-4xl font-medium tracking-tight` title and a muted `text-lg` lead, then content in the same column. A text-heavy page caps its prose at `max-w-[60rem]` or narrower.

A changelog is a list of dated entries, not cards. Each entry is a two-column row: the date in a fixed column at the start, in muted mono, and the title, a type word, and the body beside it. Entries are separated by space. A filter by type is ghost `Tabs` at the end of the title row, and older entries sit behind a ghost "Show older updates" button.

## Proof without invention

Never invent customers, quotes, star counts, or usage numbers. If the brief gives real ones, show them as plain text or a `dl` of figures. If it gives none, the working demo is the proof.

## Narrow screens

- The hero stacks, copy first, demo second. The headline drops to `text-4xl`.
- Header links collapse into a `Sheet` or `DropdownMenu` behind a ghost icon button. The primary button stays visible.
- Two-column sections stack with the heading above its evidence.
- Pricing columns stack in order, recommended plan first if it is not already.
- The page scrolls normally. Never clip the hero to the viewport height.
