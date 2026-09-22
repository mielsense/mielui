<script lang="ts">
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const activity = Array.from({ length: 364 }, (_, index) => {
        const date = new Date(Date.UTC(2025, 8, 24 + index));
        return { date: date.toISOString().slice(0, 10), count: (index * 7 + (index % 3)) % 12 };
    });
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="@container w-full p-5 @min-[640px]:p-8">
        <header class="mb-8 border-b border-border pb-6">
            <h2 class="text-xl font-semibold">Charts</h2>
            <p class="mt-1 text-sm text-foreground-muted">
                Explore activity, usage, and completion in your theme.
            </p>
        </header>
        <section class="flex min-w-0 flex-col gap-5 @2xl:col-span-2">
            <div class="grid min-w-0 gap-6 @2xl:grid-cols-[1fr_auto]">
                <div class="min-w-0 overflow-x-auto">
                    <Heatmap.Root
                        days={activity}
                        weeks={52}
                        endDate="2026-09-22"
                        animation="none"
                    />
                </div>
                <div class="flex items-center gap-6">
                    <div class="flex flex-col items-center gap-2">
                        <Gauge value={72} label="Monthly usage" size={64} />
                        <span class="text-sm text-foreground-muted">Monthly usage</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <Gauge value={94} label="Success rate" size={64} tone="success" />
                        <span class="text-sm text-foreground-muted">Success rate</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</ScrollArea>
