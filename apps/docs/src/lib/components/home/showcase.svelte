<script lang="ts">
    import { ArrowRight02Icon, Attachment01Icon } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
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

    let demo = $state('composer');
    let prompt = $state('Make room for a good idea.');
    let sent = $state(false);
    let notifications = $state(true);
    let strength = $state(64);
    let reviewed = $state(true);
    let tested = $state(false);
    const chartData = [
        { day: 'Mon', visits: 24 },
        { day: 'Tue', visits: 42 },
        { day: 'Wed', visits: 36 },
        { day: 'Thu', visits: 58 },
        { day: 'Fri', visits: 48 },
        { day: 'Sat', visits: 76 }
    ];
    const chartConfig = { visits: { label: 'Visits', color: 'var(--chart-1)' } };
</script>

<div
    data-home-showcase
    class="relative isolate mx-auto min-h-[27rem] w-full max-w-[42rem] min-w-0 @4xl:min-h-[30rem] @6xl:h-full [--color-card:color-mix(in_oklab,var(--color-primary)_3%,white)] [--color-background:color-mix(in_oklab,var(--color-primary)_8%,white)] [--color-secondary:color-mix(in_oklab,var(--color-primary)_12%,white)] [--color-foreground:color-mix(in_oklab,var(--color-primary)_15%,#242424)] [--color-foreground-muted:color-mix(in_oklab,var(--color-primary)_20%,#737373)] [--color-border:color-mix(in_oklab,var(--color-primary)_18%,white)] [--color-primary-foreground:#ffffff] [--color-primary-stroke:transparent] [--color-input:color-mix(in_oklab,var(--color-primary)_18%,white)] [--color-field:#ffffff] [--color-field-foreground:var(--color-foreground)] [--color-field-hover:#f3f5fb] [--color-button-foreground:var(--color-foreground)] [--chart-1:var(--color-primary)] [--mielui-inset-position:bottom]"
>
    <div
        aria-hidden="true"
        inert
        class="pointer-events-none absolute -inset-x-8 -inset-y-10 grid grid-cols-2 content-center items-start gap-4 opacity-15 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] @4xl:-inset-x-4 @6xl:-inset-y-28"
    >
        <div class="flex flex-col gap-5 -translate-y-12">
            <div class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3">
                <p class="px-2 pb-3 font-mono text-sm text-white">Cards</p>
                <div class="space-y-5 rounded-[var(--radius-lg)] bg-white/80 p-6 text-foreground">
                    <p class="text-lg font-medium">Ready for the next release</p>
                    <Checkbox checked label="Thoughtful defaults" />
                    <Checkbox checked label="Make it your own" />
                    <Progress value={72} aria-label="Release progress" />
                </div>
            </div>
            <div class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3">
                <p class="px-2 pb-3 font-mono text-sm text-white">Charts</p>
                <div class="rounded-[var(--radius-lg)] bg-white/75 px-3 py-8">
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
            <div class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3">
                <p class="px-2 pb-3 font-mono text-sm text-white">Progress</p>
                <div class="space-y-5 rounded-[var(--radius-lg)] bg-white/75 px-6 py-10">
                    <Progress value={38} aria-label="Upload progress" />
                    <Progress value={78} aria-label="Processing progress" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-5 translate-y-10">
            <div class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3">
                <p class="px-2 pb-3 font-mono text-sm text-white">Buttons</p>
                <div
                    class="flex min-h-32 items-center justify-center rounded-[var(--radius-lg)] bg-white/75 p-5"
                >
                    <Button>Save changes</Button>
                </div>
            </div>
            <div class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3">
                <p class="px-2 pb-3 font-mono text-sm text-white">Switch</p>
                <div
                    class="flex min-h-40 items-center justify-center rounded-[var(--radius-lg)] bg-white/75 p-5"
                >
                    <Switch checked label="A little motion" />
                </div>
            </div>
            <div class="rounded-[var(--radius-xl)] border border-white/30 bg-white/5 p-3">
                <p class="px-2 pb-3 font-mono text-sm text-white">Slider</p>
                <div class="rounded-[var(--radius-lg)] bg-white/75 px-6 py-10">
                    <Slider value={64} label="Find your balance" />
                </div>
            </div>
        </div>
    </div>

    <section
        aria-label="Try Mielui components"
        class="absolute inset-x-0 top-1/2 z-10 mx-auto w-full max-w-[24rem] -translate-y-1/2 rounded-[calc(var(--radius-xl)+var(--spacing)*2)] border border-white/40 bg-white/15 p-2 shadow-[0_20px_48px_-20px_#1d112b80,inset_0_1px_0_#ffffff66] backdrop-blur-xl @6xl:-translate-x-6"
    >
        <div class="flex items-center justify-between px-3 pt-2 pb-4 text-white">
            <span class="font-mono text-sm">
                {demo === 'composer' ? 'Composer' : demo === 'controls' ? 'Controls' : 'Charts'}
            </span>
        </div>
        <div class="rounded-[var(--radius-xl)] bg-card text-foreground">
            <Tabs.Root bind:value={demo} variant="ghost" class="flex flex-col">
                <div class="flex min-h-56 items-center px-4 py-7 @lg:px-5">
                    <Tabs.Content value="composer" class="w-full">
                        <Composer.Root
                            bind:value={prompt}
                            surface="solid"
                            onSubmit={() => { sent = true; prompt = ''; }}
                        >
                            <Composer.Input
                                aria-label="Try the composer"
                                placeholder="A good idea starts here…"
                                class="min-h-24"
                            />
                            <Composer.Toolbar>
                                <Composer.Actions>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onclick={() => { prompt = 'Build a little something that feels like me.'; sent = false; }}
                                    >
                                        <HugeiconsIcon icon={Attachment01Icon} size={14} />
                                        Example
                                    </Button>
                                </Composer.Actions>
                                <Composer.Submit />
                            </Composer.Toolbar>
                        </Composer.Root>
                        <p aria-live="polite" class="mt-3 min-h-5 text-xs text-foreground-muted">
                            {sent ? 'Sent in this preview.' : ''}
                        </p>
                    </Tabs.Content>
                    <Tabs.Content value="controls" class="w-full space-y-6">
                        <Switch bind:checked={notifications} label="Keep me in the loop" />
                        <div class="space-y-3">
                            <div class="flex justify-between text-sm">
                                <span>Find your balance</span>
                                <span
                                    use:numberShuffle={{value: strength, format: (value) => `${Math.round(value)}%`}}
                                >
                                    {strength}
                                    %
                                </span>
                            </div>
                            <Slider bind:value={strength} aria-label="Find your balance" />
                        </div>
                        <Checkbox bind:checked={reviewed} label="Make it feel right" />
                        <Checkbox bind:checked={tested} label="Check the little details" />
                    </Tabs.Content>
                    <Tabs.Content value="charts" class="w-full space-y-5">
                        <Chart.Root
                            data={chartData}
                            config={chartConfig}
                            x="day"
                            aria-label="Sample weekly visits"
                            class="w-full"
                        >
                            <Chart.Plot class="h-44">
                                <Chart.Grid />
                                <Chart.XAxis />
                                <Chart.Area key="visits" />
                            </Chart.Plot>
                            <Chart.Tooltip surface="solid" />
                        </Chart.Root>
                    </Tabs.Content>
                </div>
                <div
                    class="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 px-4 py-3"
                >
                    <Tabs.List aria-label="Component preview">
                        <Tabs.Trigger value="composer">Composer</Tabs.Trigger>
                        <Tabs.Trigger value="controls">Controls</Tabs.Trigger>
                        <Tabs.Trigger value="charts">Charts</Tabs.Trigger>
                    </Tabs.List>
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
