<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { page } from '$app/state';
    import { allDocPages } from '$lib/docs-pages';

    const SEGMENTS = 24;
    const total = allDocPages.length;
    const position = $derived(
        allDocPages.findIndex((entry) => entry.href === page.url.pathname) + 1
    );
    const filled = $derived(
        position > 0 ? Math.max(1, Math.round((position / total) * SEGMENTS)) : 0
    );
</script>

<div class="flex h-10 shrink-0 items-center gap-3 px-[calc(var(--spacing)*4+var(--spacing)*2.5)]">
    <div aria-hidden="true" class="flex h-3 min-w-0 flex-1 items-stretch gap-[3px]">
        {#each { length: SEGMENTS } as _, index (index)}
            <span
                class={`min-w-0 flex-1 rounded-[1.5px] transition-colors [transition-duration:var(--motion-duration-panel)] motion-reduce:transition-none ${index < filled ? 'bg-primary' : 'bg-primary/15'}`}
            ></span>
        {/each}
    </div>
    <span class="flex shrink-0 items-baseline gap-1 text-xs tabular-nums">
        <span class="sr-only">Page</span>
        <span
            class="min-w-[3ch] text-end font-medium text-foreground"
            use:numberShuffle={{ value: position, format: (value) => String(value) }}
        >
            {position}
        </span>
        <span class="text-foreground-muted">/</span>
        <span class="text-foreground-muted">{total}</span>
    </span>
</div>
