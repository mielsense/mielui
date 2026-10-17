# App layouts

An app is a shell that stays put and one region that scrolls. Pick the shell first, then lay out the page inside it.

The skeletons here are layout only. Check each component's page through the `mielui` skill before relying on a prop.

## Three shells

| Shell | Use it when | Navigation |
| --- | --- | --- |
| Sidebar shell | The default. Anything people work in all day: admin, records, a chat workspace | A labelled sidebar on the stage, one plate for the page |
| Rail shell | Several top-level areas that each have their own sub-navigation | An icon rail on the stage, a plate that holds a secondary sidebar and the page |
| Top bar shell | A small tool or a read-mostly dashboard with two to four views | A single header row, the page in a centered column |

All three share the same rules.

- The shell is fixed to the viewport with `fixed inset-0`. The document never scrolls. Only the page region does, with `overflow-y-auto overscroll-contain`.
- Navigation sits directly on the stage. It has no card, no border of its own, and no background.
- The page is one plate, inset two spacing units from the window edge. Its hairline and corner are the only frame on screen.
- At most one hairline divides regions inside the plate, such as a secondary sidebar from the page.
- Below `lg` the sidebar or rail is replaced by a slim header with a menu button that opens the same navigation in a `Sheet` from the left. Rows in that sheet are taller for touch: `h-11` instead of `h-9`.

## Sidebar shell

```svelte
<script lang="ts">
    import { page } from '$app/state';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let { children } = $props();

    const row =
        'flex h-9 items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 text-sm text-foreground-muted transition-colors hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=page]:bg-secondary aria-[current=page]:text-foreground';
</script>

<div class="fixed inset-0 flex bg-background text-foreground">
    <aside class="hidden w-60 shrink-0 flex-col lg:flex">
        <div class="flex h-14 shrink-0 items-center px-3">
            <!-- Workspace switcher: DropdownMenu.Trigger variant="quiet", full width -->
        </div>
        <nav aria-label="Main" class="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3">
            {#each links as link (link.href)}
                <a
                    href={link.href}
                    aria-current={page.url.pathname === link.href ? 'page' : undefined}
                    class={row}
                >
                    <HugeiconsIcon icon={link.icon} size={16} aria-hidden="true" />
                    <span class="min-w-0 flex-1 truncate">{link.label}</span>
                </a>
            {/each}
        </nav>
        <div class="shrink-0 p-3">
            <!-- Account menu: DropdownMenu.Trigger variant="quiet" with an Avatar and a name -->
        </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col p-2 lg:ps-0">
        <header class="flex h-12 shrink-0 items-center gap-2 px-2 lg:hidden">
            <!-- Sheet.Trigger (ghost, icon) with the same nav, then the brand, then search -->
        </header>
        <main class="mielui-plate @container flex min-h-0 flex-1 flex-col overflow-clip">
            <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {@render children()}
            </div>
        </main>
    </div>
</div>
```

Details that make it look right:

- The sidebar is 15rem (`w-60`). Rows are 9 units tall with a 16px icon and 14px muted text. The current row is `bg-secondary` with full-color text. Hover is the wash.
- Group long navigation under small labels: `px-2.5 pt-4 pb-1 text-xs font-medium text-foreground-muted`. No dividers between groups.
- A count beside a row is plain muted `font-mono text-xs tabular-nums`, not a badge.
- The workspace switcher and the account menu are `quiet` dropdown triggers that fill the sidebar's width. A square Avatar marks the workspace, a round one marks the person. With only one workspace, show the brand and name as plain text. Do not build a switcher that switches nothing.
- Put search in the sidebar's top or the page header as an outline `Command.Trigger` with a `Kbd` hint. Open it from a `keydown` listener on `<svelte:window>` that checks for K with `metaKey` or `ctrlKey`, so the shortcut works on every platform and while the trigger is hidden.
- Keep the theme toggle in the account menu or as one ghost icon button at the bottom of the sidebar.

## Rail shell

The rail is 17 units wide (`w-17`) and holds icons only, each with a Tooltip on its right. It has three groups: the brand and the sidebar toggle at the top, the primary areas in the middle, and search, theme, and account at the bottom. Use `justify-between` so the groups spread evenly.

```svelte
<div class="fixed inset-0 flex bg-background text-foreground">
    <nav aria-label="Primary" class="hidden w-17 shrink-0 flex-col items-center justify-between py-3 lg:flex">
        <div class="flex flex-col items-center gap-1"><!-- brand, sidebar toggle --></div>
        <div class="flex flex-col items-center gap-1"><!-- areas: ghost icon buttons --></div>
        <div class="flex flex-col items-center gap-1"><!-- search, theme, account --></div>
    </nav>
    <div class="flex min-w-0 flex-1 p-2 lg:ps-0">
        <div class="mielui-plate flex min-h-0 min-w-0 flex-1 overflow-clip">
            <aside class="hidden w-60 shrink-0 flex-col border-e-[length:var(--border-size)] border-border pt-3 lg:flex">
                <!-- The current area's own navigation: plain text rows, no icons -->
            </aside>
            <main class="@container min-w-0 flex-1 overflow-y-auto overscroll-contain">
                <!-- page -->
            </main>
        </div>
    </div>
</div>
```

- A rail item is a ghost icon Button. The current one is marked with `bg-secondary text-foreground`, the rest are `text-foreground-muted`.
- Controls keep their position on every page. If an area has no secondary sidebar, disable the sidebar toggle. Do not remove it.
- For a stronger frame, the docs paint the stage near-black in both themes: put the `dark` class on the rail so its tokens resolve dark, and set the outer background to `bg-[#060606]`. This is the one raw hex the system allows. Use it only when the product wants heavy chrome. The default is the grey stage.

## Top bar shell

```svelte
<div class="flex min-h-dvh flex-col bg-background text-foreground">
    <header class="sticky top-0 z-20 bg-background">
        <div class="mx-auto flex h-14 w-full max-w-[84rem] items-center gap-6 px-5 sm:px-8">
            <a href="/" class="text-sm font-medium">Product</a>
            <nav aria-label="Main" class="hidden items-center gap-1 md:flex"><!-- ghost Buttons with href --></nav>
            <div class="ms-auto flex items-center gap-1"><!-- search, theme, account --></div>
        </div>
    </header>
    <main class="@container mx-auto w-full max-w-[84rem] flex-1 px-5 pt-6 pb-16 sm:px-8">
        <!-- page -->
    </main>
</div>
```

Here the document scrolls and the page sits on the stage, with plates only around real groups.

- The header's content and the page share one max width, so the brand lines up with the page title. Use `max-w-[84rem]` for a dashboard and narrower for a tool with one form.
- Groups are plain `Card.Root` plates, not inset cards. An inset on the stage disappears.
- The current section's link is `bg-secondary text-foreground`. The others are ghost.
- Below `md` the links move into a second row under the header that scrolls sideways, or into a `Sheet` when there are more than four.

## Inside the plate

Every page opens the same way: a header row, then content.

```svelte
<div class="flex flex-col gap-10 px-5 pt-8 pb-16 sm:px-8 lg:px-10">
    <header class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex min-w-0 flex-col gap-1">
            <h1 class="text-xl font-medium tracking-[var(--tracking-header)]">Invoices</h1>
            <p class="text-sm text-foreground-muted">Review, remind, and record payment.</p>
        </div>
        <div class="flex items-center gap-2">
            <Button variant="outline">Export CSV</Button>
            <Button>New invoice</Button>
        </div>
    </header>

    <section class="flex flex-col gap-4">
        <!-- the dominant object -->
    </section>
</div>
```

- The title is 20px and the sentence under it is muted 14px. Actions sit at the end of the same row. On a narrow screen they wrap under the title. With more than two, the main one stays and the rest move into a `DropdownMenu`.
- The page's main action, if it has one, is the only primary button. A page that only shows things has none.
- A page deeper than one level gets a `Breadcrumb` above the title. A record's title can carry one status Badge beside it.
- Views of the same page are `Tabs` with `variant="ghost"` under the header. Filters and ranges are ghost Tabs or a `Select` at the end of the header row.
- Size the content to its job: a dashboard fills the plate, a form is `max-w-2xl`, and an article is `max-w-[60rem]`. Do not center a dashboard in a narrow column.
- Use container variants (`@2xl:`, `@4xl:`) on content, not viewport ones. The plate changes width when the sidebar opens, and container queries follow it.

## Settings and long forms

A settings page is a column of groups. Each group has a title and a sentence at the start and its controls beside them.

```svelte
<div class="@container flex max-w-4xl flex-col gap-12">
    <section class="grid gap-x-12 gap-y-4 @3xl:grid-cols-[16rem_minmax(0,1fr)]">
        <div class="flex flex-col gap-1">
            <h2 class="text-[length:var(--font-size-header)] font-medium">Workspace</h2>
            <p class="text-sm text-foreground-muted">Shown on invoices and receipts.</p>
        </div>
        <div class="flex flex-col gap-4">
            <Input label="Workspace name" bind:value={name} />
            <Switch
                bind:checked={autoReconcile}
                label="Auto-reconcile"
                description="Match confirmed bank payments as they arrive."
            />
            <div><Button>Save changes</Button></div>
        </div>
    </section>
</div>
```

- The two-column form is at most `max-w-4xl`. A single column of fields, with each group's title above its controls, is `max-w-2xl`. Use the single column in a Dialog or Sheet, where there is no room for the title column.
- No card around a group and none around a field. The gap between groups is the divider.
- Use each field's own `label` and `description` props. A control without them goes in `Field.Root` with `Field.Label`. Validation shows through `Field.Error`.
- Buttons keep their natural width at the start of the group. Never stretch a button across the column.
- One Save for the page, at the end of the page header, disabled until something changed, with a ghost Discard beside it. Keep that header row in view with `sticky top-0 z-10` and the background of the surface it sits on. When groups save on their own, each gets an `outline` Save and the page has no primary button.
- A destructive group goes last, with a `destructive` button that opens an `AlertDialog`.
- With more than six groups, add a section list at the start: vertical `Tabs`, or a small nav using the sidebar row style.

## Record detail

```svelte
<div class="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
    <div class="flex min-w-0 flex-col gap-10"><!-- timeline, line items, notes --></div>
    <dl class="flex flex-col self-start">
        <div class="flex justify-between gap-4 border-b border-border py-3 text-sm">
            <dt class="text-foreground-muted">Due</dt>
            <dd class="tabular-nums">14 Nov 2026</dd>
        </div>
    </dl>
</div>
```

Facts are a `dl` of rows divided by hairlines, with the muted label first. Open a record from a table in a `Sheet` when people return to the list often, and on its own page when they stay and edit.

Drive the sheet from the URL, such as `?order=KLN-2318`, so a record can be linked and the back button closes it. Widen `Sheet.Content` with a width class when the record has line items. The default width suits a short list of facts.

## Chat and agent workspaces

Use the sidebar shell, with the thread list as its navigation. The threads sit on the stage like any other nav. The plate holds the transcript, the composer under it, and at most one side pane.

```svelte
<main class="mielui-plate flex min-h-0 flex-1 overflow-clip">
    <div class="flex min-w-0 flex-1 flex-col">
        <header class="flex h-14 shrink-0 items-center justify-between gap-3 px-5">
            <h1 class="min-w-0 truncate text-[length:var(--font-size-header)] font-medium">{thread.title}</h1>
            <div class="flex items-center gap-1"><!-- sources toggle, thread menu --></div>
        </header>
        <div class="min-h-0 flex-1"><!-- Conversation.Root fills this --></div>
        <div class="mx-auto w-full max-w-2xl shrink-0 px-4 pb-4 sm:px-6"><!-- Composer.Root --></div>
    </div>
    <aside class="hidden w-[22rem] shrink-0 flex-col border-s-[length:var(--border-size)] border-border xl:flex">
        <!-- sources or an artifact -->
    </aside>
</main>
```

- The sidebar holds a New thread row, a search row with a `Kbd` hint, then threads under small muted date labels. A thread row is one line of truncated text. The current thread uses `bg-secondary`. The account menu sits at the bottom.
- A thread has a one-row title bar, not a page header with a sentence. The title is 16px and truncates. Its actions are icon buttons at the end.
- The transcript and the composer share one centered column, at most 42rem (`max-w-2xl`), with the same side padding, so their edges line up. Check the `Conversation` page for how its content is already capped and padded before adding your own wrapper.
- Use `Conversation`, `Message`, `Reasoning`, `Tool`, `Markdown`, and `Composer`. The `mielui` skill's component selection guide shows how they nest. Do not draw chat bubbles by hand.
- User messages are short and sit at the end of the row. Assistant output is plain text on the plate with no bubble.
- Tools and reasoning are quieter than the answer. Give them labels that say what happened, such as "Searched 2 queries", and collapse them once the answer starts.
- One failure gets one error mark. Put an `Alert variant="error"` with a retry where the answer would be, and do not also mark the message and the tool row in red.
- Attachments are chips in a row directly above the composer.
- A new thread centers one group in the plate: a short heading, one sentence, three or four example prompts as outline Buttons, and the composer under them. Clicking a prompt fills the composer. After the first message the composer moves to the bottom.
- The side pane is the plate's one hairline. Below `xl` it opens as a `Sheet` from the end instead.

## Narrow screens

Decide what happens below `lg` and below `sm` for every region. The defaults:

- Sidebar or rail: hidden, replaced by a header with a menu button and a left `Sheet`.
- Multi-column grids: one column, in reading order. The dominant object comes first.
- Header actions: the primary button stays, the rest move into a `DropdownMenu` behind a ghost icon button.
- Tables: scroll inside their own frame, with the first column kept readable. Or switch to a list of rows showing the two fields that matter.
- Do not shrink controls to fit. Use the default control height or larger, and `h-11` rows in sheets.
