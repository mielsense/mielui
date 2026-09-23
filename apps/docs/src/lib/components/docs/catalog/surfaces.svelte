<script lang="ts">
    import { check, chevron, lines, panel } from './shapes.svelte';

    let { slug }: { slug: string } = $props();
</script>
{#if slug === 'accordion' || slug === 'collapsible'}
    <div class={`${panel} w-52 divide-y divide-border`}>
        <div class="flex items-center gap-5 px-3 py-3">
            {@render lines(1)}
            {@render chevron()}
        </div>
        <div class="flex flex-col gap-3 px-3 py-3">
            <div class="flex items-center gap-5">
                {@render lines(1)}
                <span class="rotate-180">{@render chevron()}</span>
            </div>
            {@render lines(slug === 'accordion' ? 2 : 3)}
        </div>
        {#if slug === 'accordion'}
            <div class="flex items-center gap-5 px-3 py-3">
                {@render lines(1)}
                {@render chevron()}
            </div>
        {/if}
    </div>
{:else if slug === 'alert' || slug === 'toast'}
    <div class={`${panel} flex w-56 items-start gap-3 p-4`}>
        <span
            class="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary"
        >
            {#if slug === 'toast'}
                {@render check()}
            {:else}
                !
            {/if}
        </span>
        <div class="flex flex-1 flex-col gap-3">
            <span class="font-medium">
                {slug === 'toast' ? 'Changes saved' : 'A quick reminder'}
            </span>
            {@render lines(2)}
        </div>
        {#if slug === 'toast'}
            <span class="text-foreground-muted">×</span>
        {/if}
    </div>
{:else if slug === 'alert-dialog' || slug === 'dialog'}
    <div class={`${panel} w-52 p-4`}>
        <div class="mb-3 flex justify-between font-medium">
            <span>{slug === 'alert-dialog' ? 'Discard changes?' : 'Edit profile'}</span>
            <span class="text-foreground-muted">×</span>
        </div>
        {@render lines(2)}
        <div class="mt-4 flex justify-end gap-2">
            <span class="rounded border border-border px-2 py-1 text-[10px]">Cancel</span>
            <span class="rounded bg-primary px-2 py-1 text-[10px] text-primary-foreground">
                {slug === 'alert-dialog' ? 'Discard' : 'Save'}
            </span>
        </div>
    </div>
{:else if slug === 'card'}
    <div class={`${panel} w-52 p-4`}>
        <span class="font-medium">Workspace</span>
        <div class="my-3">{@render lines(3)}</div>
        <div class="border-t border-border pt-3 text-[10px] text-foreground-muted">
            Updated just now
        </div>
    </div>
{:else if slug === 'empty-state'}
    <div class="flex flex-col items-center gap-2">
        <svg
            class="mb-1 text-foreground-muted"
            width="36"
            height="30"
            viewBox="0 0 36 30"
            fill="none"
        >
            <path
                d="M3 9h12l3-5h12v21H3V9Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
            />
            <path d="M3 13h27" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <span class="font-medium">No projects yet</span>
        <span class="text-[10px] text-foreground-muted">Your next idea starts here.</span>
        <span class="mt-1 rounded bg-secondary px-3 py-1.5 text-[10px]">Create project</span>
    </div>
{:else if slug === 'hover-card' || slug === 'popover' || slug === 'tooltip'}
    <div class="flex w-48 flex-col items-center gap-3">
        <div class={`${panel} w-full p-3`}>
            {#if slug === 'tooltip'}
                <span class="block text-center text-[10px]">Copy to clipboard</span>
            {:else}
                <div class="flex gap-3">
                    <span
                        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px]"
                    >
                        AM
                    </span>
                    {@render lines(2)}
                </div>
            {/if}
        </div>
        <span class="rounded-md bg-secondary px-3 py-1.5 text-[10px]">
            {slug === 'tooltip' ? 'Copy' : 'Alex Morgan'}
        </span>
    </div>
{:else if slug === 'scroll-area'}
    <div class={`${panel} relative flex h-28 w-48 flex-col gap-3 overflow-hidden p-4 pr-6`}>
        {@render lines(7)}
        <span class="absolute top-2 right-1.5 bottom-2 w-1 rounded-full bg-secondary">
            <span class="block h-8 rounded-full bg-foreground/25"></span>
        </span>
    </div>
{:else if slug === 'sheet' || slug === 'drawer'}
    <div class="relative h-28 w-56 overflow-hidden rounded-lg border border-border bg-secondary/40">
        <div
            class={`${panel} absolute flex flex-col gap-3 p-3 ${slug === 'sheet' ? 'inset-y-0 right-0 w-36 rounded-r-none' : 'inset-x-0 bottom-0 h-20 rounded-b-none'}`}
        >
            {#if slug === 'drawer'}
                <span class="mx-auto h-1 w-7 rounded-full bg-foreground/20"></span>
            {/if}
            {@render lines(3)}
        </div>
    </div>
{:else if slug === 'notch'}
    <div class="relative h-24 w-full max-w-60 border-t border-border">
        <div
            class="mx-auto flex w-40 items-center gap-3 rounded-b-2xl border border-t-0 border-border bg-secondary px-4 py-3"
        >
            <span
                class="flex size-7 items-center justify-center rounded-full border-2 border-primary"
            >
                {@render check()}
            </span>
            <div>
                <span class="text-[10px] font-medium">All synced</span>
                <p class="mt-1 text-[8px] text-foreground-muted">Just now</p>
            </div>
        </div>
        <span class="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-foreground-muted">
            2 of 4
        </span>
    </div>
{/if}
