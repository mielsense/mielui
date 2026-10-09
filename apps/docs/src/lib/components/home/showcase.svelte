<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Composer from '@mielui/svelte/components/composer';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';

    const prompts = [
        { label: 'Release notes', text: 'Write release notes for version 0.2.1.' },
        {
            label: 'Debug',
            text: 'Explain this error: cannot read properties of undefined.'
        },
        { label: 'Name a color', text: 'Suggest five names for a dusty pink brand color.' }
    ];
    const chartData = [
        { day: 'Mon', visits: 24 },
        { day: 'Tue', visits: 42 },
        { day: 'Wed', visits: 36 },
        { day: 'Thu', visits: 58 },
        { day: 'Fri', visits: 48 },
        { day: 'Sat', visits: 76 },
        { day: 'Sun', visits: 64 }
    ];
    const chartConfig = { visits: { label: 'Visits', color: 'var(--chart-1)' } };
    const visits = chartData.reduce((total, entry) => total + entry.visits, 0);
    const previousVisits = 295;
    const growth = Math.round(((visits - previousVisits) / previousVisits) * 100);

    let demo = $state('controls');
    let prompt = $state(prompts[0].text);
    let sent = $state('');
    let summary = $state(true);
    let volume = $state(64);
    let mentions = $state(true);
    let releases = $state(false);
</script>

<!--
    @component
    The landing page's small live card: three real tasks behind tabs, on the shared two-layer frame.
-->

<section
    aria-label="Try Mielui components"
    data-home-showcase
    class="mielui-inset-frame mx-auto flex w-full max-w-[26rem] min-w-0 flex-col shadow-[var(--elevation-float)]"
>
    <Tabs.Root bind:value={demo} variant="segmented" class="flex min-w-0 flex-col gap-[inherit]">
        <div class="flex items-center justify-center px-1 pt-1 pb-0.5">
            <div role="group" aria-label="Component preview">
                <Tabs.List>
                    <Tabs.Trigger value="controls">Controls</Tabs.Trigger>
                    <Tabs.Trigger value="composer">Composer</Tabs.Trigger>
                    <Tabs.Trigger value="charts">Charts</Tabs.Trigger>
                </Tabs.List>
            </div>
        </div>
        <div class="mielui-inset-surface flex h-[19rem] items-center px-5 py-5 text-foreground">
            <Tabs.Content value="controls" class="flex w-full flex-col gap-5">
                <Switch
                    bind:checked={summary}
                    label="Weekly summary"
                    description="Every Monday at 9:00."
                />
                <div class="flex flex-col gap-3">
                    <div class="flex items-baseline justify-between text-sm">
                        <span>Alert volume</span>
                        <span
                            class="tabular-nums text-foreground-muted"
                            use:numberShuffle={{
                                        value: volume,
                                        format: (value) => `${Math.round(value)}%`
                                    }}
                        >
                            {volume}%
                        </span>
                    </div>
                    <Slider bind:value={volume} aria-label="Alert volume" />
                </div>
                <fieldset class="m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0">
                    <legend class="mb-2.5 p-0 text-sm text-foreground-muted">
                        Notify me about
                    </legend>
                    <Checkbox bind:checked={mentions} label="Mentions" />
                    <Checkbox bind:checked={releases} label="New releases" />
                </fieldset>
            </Tabs.Content>
            <Tabs.Content value="composer" class="flex w-full flex-col gap-3">
                <div role="group" aria-label="Example prompts" class="flex flex-wrap gap-1.5">
                    {#each prompts as example (example.label)}
                        <Button
                            variant="outline"
                            size="sm"
                            class="rounded-full"
                            onclick={() => {
                                        prompt = example.text;
                                        sent = '';
                                    }}
                        >
                            {example.label}
                        </Button>
                    {/each}
                </div>
                <Composer.Root
                    bind:value={prompt}
                    surface="solid"
                    onSubmit={(value) => {
                                sent = value;
                                prompt = '';
                            }}
                >
                    <Composer.Input
                        aria-label="Try the composer"
                        placeholder="Ask for anything"
                        class="min-h-16"
                    />
                    <Composer.Toolbar>
                        <Composer.Actions>
                            <span class="px-2 text-xs text-foreground-muted">Mielui 3.1</span>
                        </Composer.Actions>
                        <Composer.Submit />
                    </Composer.Toolbar>
                </Composer.Root>
                <p
                    aria-live="polite"
                    class="m-0 min-h-4 truncate text-nowrap! text-xs text-foreground-muted"
                >
                    {sent ? `Sent in this preview: ${sent}` : 'Pick a prompt or write your own.'}
                </p>
            </Tabs.Content>
            <Tabs.Content value="charts" class="flex w-full flex-col gap-3">
                <div class="flex items-end justify-between gap-3">
                    <div class="flex flex-col gap-0.5">
                        <span class="text-sm text-foreground-muted">Visits this week</span>
                        <span class="text-2xl font-medium">{visits}</span>
                    </div>
                    <Badge variant="success">+{growth}%</Badge>
                </div>
                <Chart.Root
                    data={chartData}
                    config={chartConfig}
                    x="day"
                    aria-label="Visits per day this week"
                    class="w-full [--mielui-surface:solid]"
                >
                    <Chart.Plot class="h-36">
                        <Chart.Grid />
                        <Chart.XAxis />
                        <Chart.Area key="visits" />
                    </Chart.Plot>
                    <Chart.Tooltip />
                </Chart.Root>
            </Tabs.Content>
        </div>
    </Tabs.Root>
</section>
