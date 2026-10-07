<script lang="ts">
    import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Composer from '@mielui/svelte/components/composer';
    import { Progress } from '@mielui/svelte/components/progress';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';

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

    let demo = $state('composer');
    let prompt = $state(prompts[0].text);
    let sent = $state('');
    let summary = $state(true);
    let volume = $state(64);
    let mentions = $state(true);
    let releases = $state(false);
</script>

<div
    data-home-showcase
    class="relative isolate mx-auto min-h-[27rem] w-full max-w-[42rem] min-w-0 @4xl:min-h-[30rem] @6xl:h-full [--color-card:color-mix(in_oklab,var(--color-primary)_3%,white)] [--color-background:color-mix(in_oklab,var(--color-primary)_8%,white)] [--color-secondary:color-mix(in_oklab,var(--color-primary)_12%,white)] [--color-foreground:color-mix(in_oklab,var(--color-primary)_15%,#242424)] [--color-foreground-muted:color-mix(in_oklab,var(--color-primary)_20%,#737373)] [--color-border:color-mix(in_oklab,var(--color-primary)_18%,white)] [--color-primary-foreground:#ffffff] [--color-primary-stroke:transparent] [--color-input:color-mix(in_oklab,var(--color-primary)_18%,white)] [--color-field:#ffffff] [--color-field-foreground:var(--color-foreground)] [--color-field-hover:#f3f5fb] [--color-button-foreground:var(--color-foreground)] [--chart-1:var(--color-primary)] [--mielui-inset-position:bottom] dark:[--color-card:color-mix(in_oklab,var(--color-primary)_6%,#161618)] dark:[--color-background:color-mix(in_oklab,var(--color-primary)_5%,#0e0e10)] dark:[--color-secondary:color-mix(in_oklab,var(--color-primary)_10%,#242427)] dark:[--color-foreground:#f2f2f3] dark:[--color-foreground-muted:#a3a3ab] dark:[--color-border:color-mix(in_oklab,var(--color-primary)_14%,#2d2d31)] dark:[--color-input:color-mix(in_oklab,var(--color-primary)_14%,#35353b)] dark:[--color-field:#1c1c1f] dark:[--color-field-hover:#232327]"
>
    <div
        aria-hidden="true"
        inert
        class="pointer-events-none absolute -inset-x-8 -inset-y-10 grid grid-cols-2 content-center items-start gap-4 opacity-15 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] @4xl:-inset-x-4 @6xl:-inset-y-28"
    >
        <div class="flex flex-col gap-5 -translate-y-12">
            <div
                class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3 dark:border-white/10 dark:bg-black/25"
            >
                <p class="px-2 pb-3 font-mono text-sm text-white">Cards</p>
                <div
                    class="space-y-5 rounded-[var(--radius-lg)] bg-white/80 dark:bg-black/50 p-6 text-foreground"
                >
                    <p class="text-lg font-medium">Ready for the next release</p>
                    <Checkbox checked label="Thoughtful defaults" />
                    <Checkbox checked label="Make it your own" />
                    <Progress value={72} aria-label="Release progress" />
                </div>
            </div>
            <div
                class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3 dark:border-white/10 dark:bg-black/25"
            >
                <p class="px-2 pb-3 font-mono text-sm text-white">Charts</p>
                <div class="rounded-[var(--radius-lg)] bg-white/75 dark:bg-black/50 px-3 py-8">
                    <Chart.Root
                        data={chartData}
                        config={chartConfig}
                        x="day"
                        aria-label="Sample visits"
                        class="h-40 w-full"
                    >
                        <Chart.Plot class="h-40"><Chart.Area key="visits" /></Chart.Plot>
                    </Chart.Root>
                </div>
            </div>
            <div
                class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3 dark:border-white/10 dark:bg-black/25"
            >
                <p class="px-2 pb-3 font-mono text-sm text-white">Progress</p>
                <div
                    class="space-y-5 rounded-[var(--radius-lg)] bg-white/75 dark:bg-black/50 px-6 py-10"
                >
                    <Progress value={38} aria-label="Upload progress" />
                    <Progress value={78} aria-label="Processing progress" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-5 translate-y-10">
            <div
                class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3 dark:border-white/10 dark:bg-black/25"
            >
                <p class="px-2 pb-3 font-mono text-sm text-white">Buttons</p>
                <div
                    class="flex min-h-32 items-center justify-center rounded-[var(--radius-lg)] bg-white/75 dark:bg-black/50 p-5"
                >
                    <Button>Save changes</Button>
                </div>
            </div>
            <div
                class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3 dark:border-white/10 dark:bg-black/25"
            >
                <p class="px-2 pb-3 font-mono text-sm text-white">Switch</p>
                <div
                    class="flex min-h-40 items-center justify-center rounded-[var(--radius-lg)] bg-white/75 dark:bg-black/50 p-5"
                >
                    <Switch checked label="A little motion" />
                </div>
            </div>
            <div
                class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3 dark:border-white/10 dark:bg-black/25"
            >
                <p class="px-2 pb-3 font-mono text-sm text-white">Slider</p>
                <div class="rounded-[var(--radius-lg)] bg-white/75 dark:bg-black/50 px-6 py-10">
                    <Slider value={64} label="Find your balance" />
                </div>
            </div>
        </div>
    </div>

    <section
        aria-label="Try Mielui components"
        class="absolute inset-x-0 top-1/2 z-10 mx-auto w-full max-w-[24rem] -translate-y-1/2 rounded-[calc(var(--radius-xl)+var(--spacing)*2)] border border-white/40 bg-white/15 p-2 shadow-[0_20px_48px_-20px_#1d112b80,inset_0_1px_0_#ffffff66] backdrop-blur-xl dark:border-white/15 dark:bg-black/40 dark:shadow-[0_20px_48px_-20px_#00000099,inset_0_1px_0_#ffffff1f] @6xl:-translate-x-6"
    >
        <div class="flex items-center justify-between px-3 pt-2 pb-4 text-white">
            <span class="font-mono text-sm">
                {demo === 'composer' ? 'Composer' : demo === 'controls' ? 'Controls' : 'Charts'}
            </span>
        </div>
        <div class="rounded-[var(--radius-xl)] bg-card text-foreground">
            <Tabs.Root bind:value={demo} variant="ghost" class="flex flex-col">
                <div class="flex h-[17rem] items-center px-4 py-5 @lg:px-5">
                    <Tabs.Content value="composer" class="flex w-full flex-col gap-3">
                        <div
                            role="group"
                            aria-label="Example prompts"
                            class="flex flex-wrap gap-1.5"
                        >
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
                                    <span class="px-2 text-xs text-foreground-muted"
                                        >Mielui 3.1</span
                                    >
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
                    <Tabs.Content value="charts" class="flex w-full flex-col gap-3">
                        <div class="flex items-end justify-between gap-3">
                            <div class="flex flex-col gap-0.5">
                                <span class="text-sm text-foreground-muted">Visits this week</span>
                                <span class="text-2xl font-semibold">{visits}</span>
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
                <div
                    class="flex items-center justify-between gap-2 border-t border-border/70 px-3 py-3 @lg:px-4"
                >
                    <div role="group" aria-label="Component preview">
                        <Tabs.List>
                            <Tabs.Trigger value="composer">Composer</Tabs.Trigger>
                            <Tabs.Trigger value="controls">Controls</Tabs.Trigger>
                            <Tabs.Trigger value="charts">Charts</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                    <a
                        href={resolve('/studio')}
                        aria-label="Open Theme Studio"
                        class="inline-flex size-8 items-center justify-center rounded-[var(--radius-md)] text-foreground-muted transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                    >
                        <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                    </a>
                </div>
            </Tabs.Root>
        </div>
    </section>
</div>
