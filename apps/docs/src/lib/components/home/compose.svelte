<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { mesh } from '#lib/components/shell/look.js';

    const chartData = [
        {
            month: 'May',
            downloads: 32
        },
        {
            month: 'Jun',
            downloads: 41
        },
        {
            month: 'Jul',
            downloads: 38
        },
        {
            month: 'Aug',
            downloads: 56
        },
        {
            month: 'Sep',
            downloads: 64
        },
        {
            month: 'Oct',
            downloads: 81
        }
    ];
    const chartConfig = {
        downloads: {
            label: 'Downloads',
            color: 'var(--chart-1)'
        }
    };

    const examples = [
        {
            value: 'card',
            label: 'Card',
            note: 'Header, content, and footer are parts. Leave the footer out and the card closes on its content.',
            background: mesh.indigo,
            code: `<Card.Root>
  <Card.Header>
    <Card.Title>Release checklist</Card.Title>
    <Card.Description>2 of 3 done</Card.Description>
  </Card.Header>
  <Card.Content>
    <Checkbox checked label="Review the notes" />
    <Checkbox checked label="Test the keyboard" />
    <Checkbox label="Tag the release" />
  </Card.Content>
  <Card.Footer>
    <Button>Publish</Button>
  </Card.Footer>
</Card.Root>`
        },
        {
            value: 'composer',
            label: 'Composer',
            note: 'The toolbar holds whatever you put in it. Swap the model label for attachments, or drop the toolbar.',
            background: mesh.violet,
            code: `<Composer.Root onSubmit={send}>
  <Composer.Input placeholder="Ask for anything" />
  <Composer.Toolbar>
    <Composer.Actions>
      <span>Mielui 3.1</span>
    </Composer.Actions>
    <Composer.Submit />
  </Composer.Toolbar>
</Composer.Root>`
        },
        {
            value: 'chart',
            label: 'Chart',
            note: 'Grid, axis, series, and tooltip stack inside one plot. Remove the grid or switch the bars for an area.',
            background: mesh.sky,
            code: `<Chart.Root {data} {config} x="month">
  <Chart.Plot>
    <Chart.Grid />
    <Chart.XAxis />
    <Chart.Bar key="downloads" radius={4} />
  </Chart.Plot>
  <Chart.Tooltip />
</Chart.Root>`
        }
    ];

    let current = $state(examples[0].value);
    let draft = $state('');

    const lift = 'shadow-[0_24px_60px_-24px_rgb(0_0_0/0.4)]';
</script>

<!--
    @component
    Homepage section body: tabs that pair a short snippet with the same markup rendered live.
    The page around it supplies the heading.
-->

<Tabs.Root bind:value={current} variant="ghost" class="flex min-w-0 flex-col gap-4">
    <Tabs.List aria-label="Examples" class="self-start">
        {#each examples as example (example.value)}
            <Tabs.Trigger value={example.value}>{example.label}</Tabs.Trigger>
        {/each}
    </Tabs.List>
    {#each examples as example (example.value)}
        <Tabs.Content value={example.value} class="flex min-w-0 flex-col gap-4">
            <p class="m-0 max-w-[40rem] text-sm text-foreground-muted">{example.note}</p>
            <div
                class="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
            >
                <div
                    class="min-w-0 rounded-[20px] bg-card p-2 shadow-[0_0_0_1px_var(--color-border)]"
                >
                    <CodeBlock code={example.code} lang="svelte" copy="overlay" />
                </div>
                <div
                    class="grain flex min-h-[20rem] items-center justify-center rounded-[20px] p-4 sm:p-8"
                    style:background={example.background}
                >
                    <div class="w-full max-w-[22rem] text-foreground">
                        {#if example.value === 'card'}
                            <Card.Root class={lift}>
                                <Card.Header>
                                    <Card.Title level={3}>Release checklist</Card.Title>
                                    <Card.Description>2 of 3 done</Card.Description>
                                </Card.Header>
                                <Card.Content class="flex flex-col gap-2.5">
                                    <Checkbox checked label="Review the notes" />
                                    <Checkbox checked label="Test the keyboard" />
                                    <Checkbox label="Tag the release" />
                                </Card.Content>
                                <Card.Footer>
                                    <Button>Publish</Button>
                                </Card.Footer>
                            </Card.Root>
                        {:else if example.value === 'composer'}
                            <div class="rounded-[var(--radius-xl)] bg-card p-2 {lift}">
                                <Composer.Root
                                    bind:value={draft}
                                    onSubmit={() => {
                                        draft = '';
                                    }}
                                >
                                    <Composer.Input
                                        aria-label="Example composer"
                                        placeholder="Ask for anything"
                                    />
                                    <Composer.Toolbar>
                                        <Composer.Actions>
                                            <span class="px-2 text-xs text-foreground-muted">
                                                Mielui 3.1
                                            </span>
                                        </Composer.Actions>
                                        <Composer.Submit />
                                    </Composer.Toolbar>
                                </Composer.Root>
                            </div>
                        {:else}
                            <div class="rounded-[var(--radius-xl)] bg-card p-4 {lift}">
                                <Chart.Root
                                    data={chartData}
                                    config={chartConfig}
                                    x="month"
                                    aria-label="Sample downloads per month"
                                    class="w-full"
                                >
                                    <Chart.Plot class="h-44">
                                        <Chart.Grid />
                                        <Chart.XAxis />
                                        <Chart.Bar key="downloads" radius={4} />
                                    </Chart.Plot>
                                    <Chart.Tooltip />
                                </Chart.Root>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </Tabs.Content>
    {/each}
</Tabs.Root>
