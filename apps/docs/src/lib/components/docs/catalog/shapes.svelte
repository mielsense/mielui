<script module lang="ts">
    const calendarDays = Array.from({ length: 28 }, (_, index) => index + 1);
    export const heatmapCells = Array.from(
        { length: 56 },
        (_, index) => (index * 7 + (index % 5)) % 4
    );
    export const panel = 'rounded-lg border border-border bg-background shadow-sm';
    export const field =
        'flex h-8 items-center rounded-md border border-border bg-secondary/50 px-3';
    export { calendar, check, chevron, lines };
</script>
{#snippet lines(count = 3)}
    <div class="flex min-w-0 flex-1 flex-col gap-2">
        {#each Array.from({ length: count }) as _, index}
            <span
                class={`h-1.5 rounded-full bg-foreground/15 ${index === count - 1 ? 'w-2/3' : 'w-full'}`}
            ></span>
        {/each}
    </div>
{/snippet}

{#snippet chevron()}
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
            d="m3 4.5 3 3 3-3"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
{/snippet}

{#snippet check()}
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
            d="m2.5 6 2.3 2.3 4.7-4.6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
{/snippet}

{#snippet calendar(range = false)}
    <div class={`${panel} w-44 p-3`}>
        <div class="mb-3 flex items-center justify-between text-[10px] font-medium">
            <span>September</span>
            <span class="text-foreground-muted">‹ &nbsp; ›</span>
        </div>
        <div
            class="grid grid-cols-7 gap-y-1 text-center text-[8px] leading-4 text-foreground-muted"
        >
            {#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as day}
                <span>{day}</span>
            {/each}
            {#each calendarDays as day}
                <span
                    class={day === 16 || (range && day === 19) ? 'rounded-sm bg-primary text-[var(--color-on-primary)]' : range && day > 16 && day < 19 ? 'bg-primary/15 text-foreground' : ''}
                >
                    {day}
                </span>
            {/each}
        </div>
    </div>
{/snippet}
