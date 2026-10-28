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
    import type { Snippet } from 'svelte';
    import { resolve } from '$app/paths';

    const prompts = [
        { label: 'Release notes', text: 'Write release notes for version 0.3.0.' },
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

    const DEMO_LABELS: Record<string, string> = {
        controls: 'Controls',
        composer: 'Composer',
        charts: 'Charts'
    };

    let demo = $state('controls');
    let prompt = $state(prompts[0].text);
    let sent = $state('');
    let summary = $state(true);
    let volume = $state(64);
    let mentions = $state(true);
    let releases = $state(false);
</script>

<div
    data-home-showcase
    class="relative isolate min-h-[28rem] w-full min-w-0 @4xl:min-h-[34rem] [--color-card:color-mix(in_oklab,var(--color-primary)_3%,white)] [--color-background:color-mix(in_oklab,var(--color-primary)_8%,white)] [--color-secondary:color-mix(in_oklab,var(--color-primary)_12%,white)] [--color-foreground:color-mix(in_oklab,var(--color-primary)_15%,#242424)] [--color-foreground-muted:color-mix(in_oklab,var(--color-primary)_20%,#737373)] [--color-border:color-mix(in_oklab,var(--color-primary)_18%,white)] [--color-primary-foreground:#ffffff] [--color-primary-stroke:transparent] [--color-input:color-mix(in_oklab,var(--color-primary)_18%,white)] [--color-field:#ffffff] [--color-field-foreground:var(--color-foreground)] [--color-field-hover:#f3f5fb] [--color-button-foreground:var(--color-foreground)] [--chart-1:var(--color-primary)] [--mielui-inset-position:bottom] dark:[--color-card:color-mix(in_oklab,var(--color-primary)_6%,#161618)] dark:[--color-background:color-mix(in_oklab,var(--color-primary)_5%,#0e0e10)] dark:[--color-secondary:color-mix(in_oklab,var(--color-primary)_10%,#242427)] dark:[--color-foreground:#f2f2f3] dark:[--color-foreground-muted:#a3a3ab] dark:[--color-border:color-mix(in_oklab,var(--color-primary)_14%,#2d2d31)] dark:[--color-input:color-mix(in_oklab,var(--color-primary)_14%,#35353b)] dark:[--color-field:#1c1c1f] dark:[--color-field-hover:#232327]"
>
    {#snippet sample(label: string, body: Snippet)}
        <div
            class="rounded-[var(--radius-xl)] bg-white/30 p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.4)] dark:bg-black/20 dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]"
        >
            <p class="m-0 px-2 pt-1 pb-2.5 font-mono text-xs text-[#2a1a4a]/70 dark:text-white/70">
                {label}
            </p>
            <div class="rounded-[var(--radius-lg)] bg-card text-foreground">
                {@render body()}
            </div>
        </div>
    {/snippet}

    {#snippet cards()}
        <div class="space-y-5 p-6">
            <p class="m-0 text-lg font-medium">Ready for the next release</p>
            <Checkbox checked label="Thoughtful defaults" />
            <Checkbox checked label="Make it your own" />
            <Progress value={72} aria-label="Release progress" />
        </div>
    {/snippet}

    {#snippet chart()}
        <div class="px-3 py-8">
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
    {/snippet}

    {#snippet progress()}
        <div class="space-y-5 px-6 py-10">
            <Progress value={38} aria-label="Upload progress" />
            <Progress value={78} aria-label="Processing progress" />
        </div>
    {/snippet}

    {#snippet buttons()}
        <div class="flex min-h-32 items-center justify-center gap-2 p-5">
            <Button variant="secondary">Cancel</Button>
            <Button>Save changes</Button>
        </div>
    {/snippet}

    {#snippet toggle()}
        <div class="flex min-h-40 items-center justify-center p-5">
            <Switch checked label="A little motion" />
        </div>
    {/snippet}

    {#snippet slider()}
        <div class="px-6 py-10">
            <Slider value={64} label="Find your balance" />
        </div>
    {/snippet}

    {#snippet badges()}
        <div class="flex min-h-32 flex-wrap items-center justify-center gap-2 p-5">
            <Badge variant="success">Shipped</Badge>
            <Badge variant="info">In review</Badge>
            <Badge variant="warning">Blocked</Badge>
        </div>
    {/snippet}

    <div
        aria-hidden="true"
        inert
        class="pointer-events-none absolute -inset-x-2 -inset-y-6 grid grid-cols-2 content-center items-start gap-4 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)] @4xl:grid-cols-4 @4xl:-inset-y-12"
    >
        <div class="flex -translate-y-10 flex-col gap-4">
            {@render sample('Cards', cards)}
            {@render sample('Progress', progress)}
        </div>
        <div class="flex translate-y-8 flex-col gap-4">
            {@render sample('Buttons', buttons)}
            {@render sample('Switch', toggle)}
        </div>
        <div class="hidden -translate-y-4 flex-col gap-4 @4xl:flex">
            {@render sample('Charts', chart)}
            {@render sample('Slider', slider)}
        </div>
        <div class="hidden translate-y-14 flex-col gap-4 @4xl:flex">
            {@render sample('Badges', badges)}
            {@render sample('Cards', cards)}
        </div>
    </div>

    <section
        aria-label="Try Mielui components"
        class="absolute inset-x-0 top-1/2 z-10 mx-auto w-[calc(100%-1rem)] max-w-[24rem] -translate-y-1/2 rounded-[calc(var(--radius-xl)+var(--spacing)*2)] bg-white/35 p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.55),0_30px_70px_-20px_rgb(20_10_80/0.55)] backdrop-blur-xl dark:bg-black/45 dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14),0_30px_70px_-20px_rgb(0_0_0/0.7)] [@media(prefers-reduced-transparency:reduce)]:bg-white/80 dark:[@media(prefers-reduced-transparency:reduce)]:bg-black/80"
    >
        <div
            class="flex items-center justify-between px-3 pt-2 pb-3 text-[#2a1a4a] dark:text-white"
        >
            <span class="font-mono text-sm">
                {DEMO_LABELS[demo]}
            </span>
        </div>
        <div class="rounded-[var(--radius-xl)] bg-card text-foreground">
            <Tabs.Root bind:value={demo} variant="ghost" class="flex flex-col">
                <div class="flex h-[17rem] items-center px-4 py-5 @lg:px-5">
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
                            <Tabs.Trigger value="controls">Controls</Tabs.Trigger>
                            <Tabs.Trigger value="composer">Composer</Tabs.Trigger>
                            <Tabs.Trigger value="charts">Charts</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                    <a
                        href={resolve('/studio')}
                        aria-label="Open Theme Studio"
                        class="inline-flex size-8 items-center justify-center rounded-[var(--radius-md)] text-foreground-muted hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                    >
                        <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                    </a>
                </div>
            </Tabs.Root>
        </div>
    </section>
</div>
