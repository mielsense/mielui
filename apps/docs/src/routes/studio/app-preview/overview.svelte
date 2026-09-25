<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { TaskSteps } from '@mielui/svelte/components/task-steps';
    import * as Typography from '@mielui/svelte/components/typography';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<Tabs.Content value="overview" class="flex flex-col gap-8 px-6 py-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
            <Typography.Title level={2} class="text-lg">Collection overview</Typography.Title>
            <Typography.Description>
                Track unpaid invoices and upcoming collections.
            </Typography.Description>
        </div>
        <Tabs.Root bind:value={model.dashboardRange} variant="ghost">
            <Tabs.List>
                <Tabs.Trigger value="7d">7 days</Tabs.Trigger>
                <Tabs.Trigger value="30d">30 days</Tabs.Trigger>
                <Tabs.Trigger value="Quarter">Quarter</Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
    </div>
    <dl class="grid grid-cols-2 gap-6 border-y border-border py-6 @2xl:grid-cols-3">
        <div>
            <dt class="text-sm text-foreground-muted">Outstanding</dt>
            <dd class="mt-2 text-2xl font-semibold tabular-nums">
                $<span
                    use:numberShuffle={{ value: model.outstandingTotal, format: (value) => value.toLocaleString('en-US') }}
                >
                    {model.outstandingTotal.toLocaleString('en-US')}
                </span>
            </dd>
        </div>
        <div>
            <dt class="text-sm text-foreground-muted">Overdue invoices</dt>
            <dd class="mt-2 text-2xl font-semibold tabular-nums">
                <span use:numberShuffle={{ value: model.overdueCount }}>{model.overdueCount}</span>
            </dd>
        </div>
        <div>
            <dt class="text-sm text-foreground-muted">Cash coverage</dt>
            <dd class="mt-2 text-2xl font-semibold tabular-nums">
                <span use:numberShuffle={{ value: model.coverageValue }}>
                    {model.coverageValue}
                </span>
                %
            </dd>
        </div>
    </dl>
    <div class="grid gap-8 @2xl:grid-cols-[1fr_18rem]">
        <section class="min-w-0">
            <h2 class="mb-4 text-base font-semibold">Needs attention</h2>
            {#each model.overdueInvoices as invoice (invoice.reference)}
                <div
                    class="flex flex-wrap items-center justify-between gap-3 border-b border-border py-4"
                >
                    <div>
                        <p class="text-sm font-medium">{invoice.client}</p>
                        <p class="mt-1 text-sm text-foreground-muted">
                            {invoice.reference} ·{invoice.amount}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onclick={() => {
            model.markInvoicePaid(invoice.reference);
        }}
                    >
                        Record payment
                    </Button>
                </div>
            {:else}
                <p class="text-sm text-foreground-muted">No overdue invoices.</p>
            {/each}
        </section>
        <section class="flex flex-col gap-5 rounded-[var(--radius-lg)] bg-card p-5">
            <h2 class="text-base font-semibold">Collection run</h2>
            <TaskSteps
                label="Collection run"
                steps={model.collectionSteps}
                current={model.collectionStep}
            />
            <Switch bind:checked={model.autoReconcile} label="Auto-reconcile" />
        </section>
    </div>
</Tabs.Content>
