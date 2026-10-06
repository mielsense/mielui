<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { page } from '$app/state';
    import { allDocPages } from '$lib/docs-pages';

    const SEGMENTS = 28;
    const total = allDocPages.length;
    const position = $derived(
        allDocPages.findIndex((entry) => entry.href === page.url.pathname) + 1
    );
    const filled = $derived(
        position > 0 ? Math.max(1, Math.round((position / total) * SEGMENTS)) : 0
    );
</script>

<div class="shrink-0 px-[17px] pt-2 pb-[17px]">
    <div
        class="flex flex-col gap-3.5 rounded-xl border-[length:var(--border-size)] border-[var(--docs-rule)] bg-card p-4 shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
    >
        <div class="flex items-center gap-2 text-[15px]">
            <span class="flex items-baseline gap-1.5 tabular-nums">
                <span class="sr-only">Page</span>
                <span
                    class="font-medium text-foreground"
                    use:numberShuffle={{ value: position, format: (value) => String(value) }}
                >
                    {position}
                </span>
                <span class="text-foreground-muted">/</span>
                <span class="text-foreground-muted">{total}</span>
            </span>
            <span class="ms-auto text-xs text-foreground-muted">pages</span>
        </div>
        <div aria-hidden="true" class="flex h-5 items-stretch gap-[3px]">
            {#each { length: SEGMENTS } as _, index (index)}
                <span
                    class={`min-w-0 flex-1 rounded-[2px] transition-colors [transition-duration:var(--motion-duration-panel)] motion-reduce:transition-none ${index < filled ? 'bg-primary' : 'bg-primary/15'}`}
                ></span>
            {/each}
        </div>
    </div>
</div>
