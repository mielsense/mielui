<script lang="ts">
    import { heatmapCells, panel } from './shapes.svelte';

    let { slug }: { slug: string } = $props();
</script>
{#if slug === 'table' || slug === 'data-table'}
    <div class={`${panel} w-56 overflow-hidden text-[9px]`}>
        {#if slug === 'data-table'}
            <div class="border-b border-border p-2 text-foreground-muted">Search members…</div>
        {/if}
        <div
            class="grid grid-cols-[1fr_1fr_auto] gap-3 border-b border-border bg-secondary/60 px-3 py-2 text-foreground-muted"
        >
            <span>Name</span>
            <span>Status</span>
            <span>Role</span>
        </div>
        {#each ['Alex', 'Sam', 'Jordan'] as name}
            <div
                class="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-b border-border/60 px-3 py-2 last:border-0"
            >
                <span>{name}</span>
                <span class="w-fit rounded bg-primary/15 px-1.5 py-0.5 text-primary">Active</span>
                <span>Editor</span>
            </div>
        {/each}
    </div>
{:else if slug === 'chart'}
    <svg class="h-28 w-56" viewBox="0 0 224 112" fill="none">
        <path
            d="M10 16h204M10 48h204M10 80h204M10 108h204"
            stroke="currentColor"
            stroke-opacity=".08"
        />
        {#each [48, 30, 60, 42, 76, 63, 91] as height, index}
            <rect
                x={16 + index * 28}
                y={108-height}
                width="14"
                {height}
                rx="2"
                fill="var(--color-primary)"
                opacity={0.35 + index * .08}
            />
        {/each}
        <path
            d="m23 63 28-12 28 10 28-30 28 8 28-19 28 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
{:else if slug === 'gauge'}
    <div class="relative">
        <svg width="148" height="100" viewBox="0 0 148 100" fill="none">
            <path
                d="M14 78a60 60 0 0 1 120 0"
                stroke="currentColor"
                stroke-opacity=".1"
                stroke-width="10"
                stroke-linecap="round"
            />
            <path
                d="M14 78a60 60 0 0 1 104-41"
                stroke="var(--color-primary)"
                stroke-width="10"
                stroke-linecap="round"
            />
        </svg>
        <span class="absolute inset-x-0 bottom-5 text-center text-2xl font-medium tabular-nums">
            72<span class="ml-0.5 text-xs text-foreground-muted">%</span>
        </span>
    </div>
{:else if slug === 'heatmap'}
    <div class="grid grid-flow-col grid-rows-7 gap-1">
        {#each heatmapCells as level}
            <span
                class={`size-3 rounded-[2px] ${level === 0 ? 'bg-secondary' : level === 1 ? 'bg-primary/25' : level === 2 ? 'bg-primary/55' : 'bg-primary'}`}
            ></span>
        {/each}
    </div>
{:else if slug === 'pie-chart'}
    <div class="flex items-center gap-5">
        <svg width="94" height="94" viewBox="0 0 94 94" fill="none">
            <circle
                cx="47"
                cy="47"
                r="32"
                stroke="currentColor"
                stroke-opacity=".1"
                stroke-width="16"
            />
            <circle
                cx="47"
                cy="47"
                r="32"
                stroke="var(--color-primary)"
                stroke-width="16"
                stroke-dasharray="108 201"
                transform="rotate(-90 47 47)"
            />
            <circle
                cx="47"
                cy="47"
                r="32"
                stroke="var(--color-primary)"
                stroke-opacity=".4"
                stroke-width="16"
                stroke-dasharray="50 201"
                stroke-dashoffset="-112"
                transform="rotate(-90 47 47)"
            />
        </svg>
        <div class="flex flex-col gap-3 text-[9px]">
            {#each ['Direct', 'Search', 'Other'] as source, index}
                <span class="flex items-center gap-2">
                    <span
                        class={`size-1.5 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-primary/40' : 'bg-foreground/10'}`}
                    ></span>
                    {source}
                </span>
            {/each}
        </div>
    </div>
{/if}
