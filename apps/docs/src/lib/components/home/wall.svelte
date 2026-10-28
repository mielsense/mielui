<script lang="ts">
    import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import * as Card from '@mielui/svelte/components/card';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Composer from '@mielui/svelte/components/composer';
    import { Input } from '@mielui/svelte/components/input';
    import { Progress } from '@mielui/svelte/components/progress';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import { fromAction } from 'svelte/attachments';
    import { loadGoogleFonts } from '#lib/fonts.svelte.js';
    import { handOffTheme } from '#lib/studio/handoff.js';
    import { resolve } from '$app/paths';
    import { scopedThemeCss } from './scoped-theme';

    const scope = '[data-home-wall]';
    const lift = 'shadow-[0_24px_60px_-24px_rgb(0_0_0/0.35)]';
    const defaultSlug = builtInThemePresets[0].slug;

    const prompts = [
        {
            label: 'Release notes',
            text: 'Write release notes for version 0.4.0.'
        },
        {
            label: 'Name a color',
            text: 'Suggest five names for a dusty pink brand color.'
        }
    ];

    const chartData = [
        {
            day: 'Mon',
            visits: 24
        },
        {
            day: 'Tue',
            visits: 42
        },
        {
            day: 'Wed',
            visits: 36
        },
        {
            day: 'Thu',
            visits: 58
        },
        {
            day: 'Fri',
            visits: 48
        },
        {
            day: 'Sat',
            visits: 76
        },
        {
            day: 'Sun',
            visits: 64
        }
    ];
    const chartConfig = {
        visits: {
            label: 'Visits',
            color: 'var(--color-primary)'
        }
    };
    const visits = chartData.reduce((total, entry) => total + entry.visits, 0);

    const team = [
        {
            name: 'Alex Morgan',
            initials: 'AM'
        },
        {
            name: 'Sam Rivera',
            initials: 'SR'
        },
        {
            name: 'Kai Chen',
            initials: 'KC'
        }
    ];

    let presetSlug = $state(defaultSlug);
    let hoveredSlug = $state<string | null>(null);
    const preset = $derived(
        builtInThemePresets.find((entry) => entry.slug === presetSlug) ?? builtInThemePresets[0]
    );
    const shown = $derived(
        builtInThemePresets.find((entry) => entry.slug === hoveredSlug) ?? preset
    );
    const themeCss = $derived(presetSlug === defaultSlug ? '' : scopedThemeCss(preset, scope));

    let summary = $state(true);
    let volume = $state(64);
    let mentions = $state(true);
    let releases = $state(false);
    let access = $state('team');
    let prompt = $state(prompts[0].text);
    let sent = $state('');

    function pick(slug: string) {
        presetSlug = slug;
        if (slug !== defaultSlug) {
            loadGoogleFonts();
        }
    }
</script>

<!--
    @component
    The homepage's centerpiece: real components on a brand-tinted mesh, with the built-in
    themes above them. Picking a theme restyles only the components inside the wall.
-->

<svelte:head>
    {#if themeCss}
        <!-- Trusted: built from the bundled theme presets, never from user input. -->
        {@html `<style id="home-wall-theme">${themeCss}</style>`}
    {/if}
</svelte:head>

<div class="flex flex-col gap-4">
    <div class="flex min-w-0 flex-col items-center gap-3">
        <div
            role="group"
            aria-label="Built-in themes"
            class="hide-scrollbar-all flex max-w-full gap-1.5 overflow-x-auto px-4 py-2 max-lg:[mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)]"
        >
            {#each builtInThemePresets as entry (entry.slug)}
                <button
                    type="button"
                    aria-label={entry.name}
                    aria-pressed={entry.slug === presetSlug}
                    class="press size-6 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12),0_1px_2px_rgb(0_0_0/0.12)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none aria-pressed:shadow-[0_0_0_2px_var(--color-background),0_0_0_3.5px_var(--color-foreground)] motion-reduce:transition-none dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16)]"
                    style:background={entry.brand}
                    onclick={() => {
                        pick(entry.slug);
                    }}
                    onpointerenter={() => {
                        hoveredSlug = entry.slug;
                    }}
                    onpointerleave={() => {
                        hoveredSlug = null;
                    }}
                    onfocus={() => {
                        hoveredSlug = entry.slug;
                    }}
                    onblur={() => {
                        hoveredSlug = null;
                    }}
                ></button>
            {/each}
        </div>
        <p
            aria-live="polite"
            class="m-0 flex min-h-5 flex-wrap items-baseline justify-center gap-x-2 px-4 text-center text-sm"
        >
            <span class="font-medium text-foreground">{shown.name}</span>
            <span class="text-foreground-muted">{shown.description}</span>
        </p>
    </div>

    <div
        data-home-wall
        class="grain wall rounded-[28px] p-2 font-[family-name:var(--font-sans)] text-[length:var(--font-size-body,14px)] text-foreground sm:p-6 lg:p-10"
        style:--wall-tint={preset.brand}
    >
        <div
            class="mx-auto max-w-[76rem] columns-1 gap-3 md:columns-2 lg:columns-3 sm:gap-4 [&>*]:mb-3 [&>*]:break-inside-avoid sm:[&>*]:mb-4"
        >
            <Card.Root class={lift}>
                <Card.Header>
                    <Card.Title level={3}>Notifications</Card.Title>
                    <Card.Description>Choose what reaches your inbox.</Card.Description>
                </Card.Header>
                <Card.Content class="flex flex-col gap-5">
                    <Switch
                        bind:checked={summary}
                        label="Weekly summary"
                        description="Every Monday at 9:00."
                    />
                    <div class="flex flex-col gap-3">
                        <div class="flex items-baseline justify-between text-sm">
                            <span>Alert volume</span>
                            <span
                                class="text-foreground-muted tabular-nums"
                                {@attach fromAction(numberShuffle, () => ({
                                    value: volume,
                                    format: (value: number) => `${Math.round(value)}%`
                                }))}
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
                </Card.Content>
            </Card.Root>

            <Card.Root class="{lift} max-md:hidden">
                <Card.Header>
                    <Card.Title level={3}>Invite to project</Card.Title>
                    <Card.Description>Teammates get an email with a link.</Card.Description>
                </Card.Header>
                <Card.Content class="flex flex-col gap-4">
                    <Input label="Email" type="email" placeholder="name@company.com" />
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-foreground-muted">Access</span>
                        <ToggleGroup.Root type="single" bind:value={access} aria-label="Access">
                            <ToggleGroup.Item value="view">View</ToggleGroup.Item>
                            <ToggleGroup.Item value="team">Edit</ToggleGroup.Item>
                            <ToggleGroup.Item value="admin">Admin</ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                </Card.Content>
                <Card.Footer class="justify-between">
                    <div class="flex -space-x-2">
                        {#each team as member (member.initials)}
                            <Avatar.Root class="ring-2 ring-card">
                                <Avatar.Fallback>{member.initials}</Avatar.Fallback>
                            </Avatar.Root>
                        {/each}
                    </div>
                    <Button>Send invite</Button>
                </Card.Footer>
            </Card.Root>

            <Card.Root class="{lift} flex flex-col max-md:hidden">
                <Card.Content class="flex flex-1 items-center justify-center py-5">
                    <Calendar.Root calendarLabel="Release date" class="mx-auto w-fit p-0" />
                </Card.Content>
            </Card.Root>

            <Card.Root class={lift}>
                <Card.Content class="flex flex-col gap-3 pt-5">
                    <div class="flex flex-wrap gap-1.5" role="group" aria-label="Example prompts">
                        {#each prompts as example (example.label)}
                            <Button
                                variant="outline"
                                size="sm"
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
                        class="m-0 min-h-4 truncate text-xs text-nowrap! text-foreground-muted"
                    >
                        {sent ? `Sent in this preview: ${sent}` : 'Pick a prompt or write your own.'}
                    </p>
                </Card.Content>
            </Card.Root>

            <Card.Root class={lift}>
                <Card.Header class="gap-0.5">
                    <Card.Description>Visits this week, sample data</Card.Description>
                    <Card.Title level={3} class="text-2xl tabular-nums">{visits}</Card.Title>
                </Card.Header>
                <Card.Content>
                    <Chart.Root
                        data={chartData}
                        config={chartConfig}
                        x="day"
                        aria-label="Sample visits per day"
                        class="w-full"
                    >
                        <Chart.Plot class="h-36">
                            <Chart.Grid />
                            <Chart.XAxis />
                            <Chart.Area key="visits" />
                        </Chart.Plot>
                        <Chart.Tooltip />
                    </Chart.Root>
                </Card.Content>
            </Card.Root>

            <Card.Root class="{lift} flex flex-col max-lg:hidden">
                <Card.Content class="flex flex-1 flex-col items-center justify-center gap-3 py-5">
                    <div class="flex flex-wrap justify-center gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                    </div>
                    <div class="flex flex-wrap justify-center gap-2">
                        <Button variant="ghost">Ghost</Button>
                        <Button loading labels={{ loading: 'Saving' }}>Save</Button>
                        <Button disabled>Unavailable</Button>
                    </div>
                </Card.Content>
            </Card.Root>

            <Card.Root class="{lift} max-md:hidden">
                <Card.Header>
                    <Card.Title level={3}>Release 0.4</Card.Title>
                    <Card.Description>7 of 10 tasks done</Card.Description>
                </Card.Header>
                <Card.Content class="flex flex-col gap-4">
                    <Progress value={70} aria-label="Release progress" />
                    <div class="flex flex-wrap gap-1.5">
                        <Badge variant="success">Shipped</Badge>
                        <Badge variant="info">In review</Badge>
                        <Badge variant="warning">Blocked</Badge>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button variant="ghost">Later</Button>
                    <Button variant="secondary">Open board</Button>
                </Card.Footer>
            </Card.Root>
        </div>
    </div>

    <div class="flex justify-center">
        <a
            href={resolve('/studio')}
            class="group inline-flex items-center gap-1 text-sm text-foreground"
            onclick={() => {
                if (presetSlug !== defaultSlug) {
                    handOffTheme(preset);
                }
            }}
        >
            <span
                class="underline decoration-border-strong decoration-1 underline-offset-4 group-hover:decoration-current"
            >
                Edit {preset.name} in Theme Studio
            </span>
            <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={13}
                class="transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
        </a>
    </div>
</div>
