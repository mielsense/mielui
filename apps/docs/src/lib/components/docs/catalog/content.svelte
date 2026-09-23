<script lang="ts">
    import { check, chevron, lines, panel } from './shapes.svelte';

    let { slug }: { slug: string } = $props();
</script>
{#if slug === 'avatar'}
    <div class="flex -space-x-3">
        {#each ['AM', 'SR', 'JL'] as initials, index}
            <span
                class={`flex size-12 items-center justify-center rounded-full border-4 border-background font-medium ${index === 1 ? 'bg-primary/25' : 'bg-secondary'}`}
            >
                {initials}
            </span>
        {/each}
        <span
            class="flex size-12 items-center justify-center rounded-full border-4 border-background bg-background text-foreground-muted"
        >
            +4
        </span>
    </div>
{:else if slug === 'badge'}
    <div class="flex flex-wrap items-center justify-center gap-2">
        <span class="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">New</span>
        <span class="rounded-md bg-secondary px-2.5 py-1">Draft</span>
        <span class="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1">
            <span class="size-1.5 rounded-full bg-primary"></span>
            Live
        </span>
    </div>
{:else if slug === 'breadcrumb'}
    <div class="flex items-center gap-3">
        <span class="text-foreground-muted">Home</span>
        <span class="text-foreground-muted">/</span>
        <span class="text-foreground-muted">Projects</span>
        <span class="text-foreground-muted">/</span>
        <span>Design</span>
    </div>
{:else if slug === 'kbd'}
    <div class="flex items-center gap-2">
        {#each ['⌘', '⇧', 'K'] as key}
            <span
                class="flex size-9 items-center justify-center rounded-md border border-border bg-background font-mono text-sm shadow-[0_2px_0_var(--color-border)]"
            >
                {key}
            </span>
        {/each}
    </div>
{:else if slug === 'pagination'}
    <div class="flex items-center gap-1.5">
        {#each ['‹', '1', '2', '3', '…', '9', '›'] as page}
            <span
                class={`flex size-7 items-center justify-center rounded ${page === '2' ? 'bg-secondary font-medium' : 'text-foreground-muted'}`}
            >
                {page}
            </span>
        {/each}
    </div>
{:else if slug === 'separator'}
    <div class="flex w-48 flex-col gap-4">
        {@render lines(2)}
        <span class="h-px w-full bg-border"></span>
        <div class="flex justify-between text-[10px] text-foreground-muted">
            <span>Profile</span>
            <span class="w-px bg-border"></span>
            <span>Settings</span>
            <span class="w-px bg-border"></span>
            <span>Help</span>
        </div>
    </div>
{:else if slug === 'skeleton'}
    <div class="flex w-48 items-center gap-3">
        <span class="size-10 shrink-0 rounded-full bg-foreground/10"></span>
        {@render lines(3)}
    </div>
{:else if slug === 'spinner'}
    <div class="flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                stroke-opacity=".12"
                stroke-width="2"
            />
            <path
                d="M12 3a9 9 0 0 1 9 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
        <span class="text-foreground-muted">Loading…</span>
    </div>
{:else if slug === 'tabs'}
    <div class="w-52">
        <div class="mb-4 flex gap-1 rounded-lg bg-secondary p-1">
            <span class="flex-1 rounded-md bg-background px-3 py-1.5 text-center shadow-sm">
                Overview
            </span>
            <span class="px-3 py-1.5 text-foreground-muted">Activity</span>
        </div>
        {@render lines(3)}
    </div>
{:else if slug === 'typography' || slug === 'markdown'}
    <div class="w-48">
        <span class="text-xl font-semibold tracking-tight">
            {slug === 'markdown' ? 'Getting started' : 'A clear hierarchy'}
        </span>
        <div class="mt-3">{@render lines(3)}</div>
        {#if slug === 'markdown'}
            <span class="mt-3 inline-block rounded bg-secondary px-2 py-1 font-mono text-[9px]">
                npm install
            </span>
        {/if}
    </div>
{:else if slug === 'code-block' || slug === 'file-diff'}
    <div class={`${panel} w-56 overflow-hidden font-mono text-[9px]`}>
        <div class="border-b border-border px-3 py-2 text-foreground-muted">
            {slug === 'file-diff' ? 'theme.ts' : 'app.svelte'}
        </div>
        {#if slug === 'file-diff'}
            <div class="bg-destructive/10 px-3 py-1.5 text-destructive">− radius: 4,</div>
            <div class="bg-primary/15 px-3 py-1.5 text-primary">+ radius: 8,</div>
            <div class="px-3 py-1.5">&nbsp; spacing: 16</div>
        {:else}
            <div class="space-y-1.5 p-3">
                <p><span class="text-primary">import</span> &#123; Button &#125;</p>
                <p class="text-foreground-muted">from '@mielui/svelte';</p>
                <p class="pt-1">&lt;Button&gt;Save&lt;/Button&gt;</p>
            </div>
        {/if}
    </div>
{:else if slug === 'reorder-list' || slug === 'task-steps'}
    <div class="flex w-48 flex-col gap-2">
        {#each ['Plan', 'Build', 'Review'] as step, index}
            <div
                class="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2"
            >
                <span class="text-primary">
                    {#if slug === 'reorder-list'}
                        ⠿
                    {:else if index === 0}
                        {@render check()}
                    {:else}
                        {index + 1}
                    {/if}
                </span>
                <span class={index === 2 ? 'text-foreground-muted' : ''}>{step}</span>
            </div>
        {/each}
    </div>
{:else if slug === 'show-more'}
    <div class="flex w-48 flex-col gap-3">
        <div class="[mask-image:linear-gradient(black,transparent)]">{@render lines(4)}</div>
        <span class="flex items-center gap-1 text-[10px] text-foreground-muted">
            Show more{@render chevron()}
        </span>
    </div>
{:else if slug === 'attachment'}
    <div class={`${panel} flex items-center gap-3 p-3`}>
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path d="M4 2h10l6 6v18H4V2Z" stroke="currentColor" />
            <path d="M14 2v7h6M8 15h8M8 19h6" stroke="currentColor" />
        </svg>
        <div>
            <span>Report.pdf</span>
            <p class="mt-1 text-[9px] text-foreground-muted">PDF · 156 KB</p>
        </div>
        <span class="ml-3 text-foreground-muted">×</span>
    </div>
{:else if slug === 'composer'}
    <div class={`${panel} w-56 p-3`}>
        <p class="pb-6 text-foreground-muted">Ask a question…</p>
        <div class="flex items-center justify-between">
            <span class="text-base text-foreground-muted">+</span>
            <span
                class="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
                ↑
            </span>
        </div>
    </div>
{:else if slug === 'conversation' || slug === 'message'}
    <div class="flex w-52 flex-col gap-3">
        <span class="ml-auto rounded-xl rounded-br-sm bg-secondary px-3 py-2 text-[10px]">
            Summarize this report.
        </span>
        <div class="flex items-start gap-2">
            <span class="mt-1 size-4 shrink-0 rounded-full bg-primary/25"></span>
            <div class="flex flex-1 flex-col gap-2 pt-1">
                {@render lines(slug === 'message' ? 4 : 2)}
            </div>
        </div>
        {#if slug === 'conversation'}
            <span class="ml-auto rounded-xl rounded-br-sm bg-secondary px-3 py-2 text-[10px]">
                Thanks, that helps.
            </span>
        {/if}
    </div>
{:else if slug === 'question'}
    <div class={`${panel} w-52 p-3`}>
        <p class="mb-3 font-medium">Which format?</p>
        <div class="flex gap-2">
            <span class="rounded border border-primary/40 bg-primary/10 px-3 py-1.5">PDF</span>
            <span class="rounded border border-border px-3 py-1.5">Markdown</span>
        </div>
    </div>
{:else if slug === 'reasoning'}
    <div class="w-52">
        <div class="mb-3 flex items-center gap-2 text-[10px] text-foreground-muted">
            Thought for 4 seconds{@render chevron()}
        </div>
        <div class="border-l border-border pl-3">{@render lines(4)}</div>
    </div>
{:else if slug === 'response-stream'}
    <div class="w-52">
        <p class="leading-6">
            Here are the main changes in this release<span
                class="ml-1 inline-block h-3 w-1.5 bg-primary"
            ></span>
        </p>
        <div class="mt-3">{@render lines(2)}</div>
    </div>
{:else if slug === 'tool'}
    <div class={`${panel} w-52 p-3`}>
        <div class="flex items-center gap-2">
            <span class="text-primary">{@render check()}</span>
            <span class="font-mono text-[10px]">search_documents</span>
        </div>
        <div class="mt-3 border-t border-border pt-3 text-[9px] text-foreground-muted">
            Found 3 matching documents
        </div>
    </div>
{:else if slug === 'morph'}
    <div class="flex items-center gap-5">
        <span class="size-9 rounded-md border border-border bg-secondary"></span>
        <span class="text-foreground-muted">→</span>
        <span class="size-12 rounded-full bg-primary/35"></span>
    </div>
{:else if slug === 'shimmer'}
    <span
        class="text-lg font-medium text-transparent bg-clip-text bg-linear-to-r from-foreground/30 via-foreground to-foreground/30"
    >
        Making progress
    </span>
{/if}
