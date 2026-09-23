<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
    import { Input } from '@mielui/svelte/components/input';
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Typography from '@mielui/svelte/components/typography';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<Tabs.Content value="settings" class="flex flex-col gap-6 px-6 py-8">
    <div>
        <Typography.Title level={2} class="text-lg">Settings</Typography.Title>
        <Typography.Description>Collection defaults for this workspace.</Typography.Description>
    </div>
    <Accordion.Root type="multiple" bind:value={model.settingsSections}>
        <Accordion.Item value="workspace">
            <Accordion.Trigger>Workspace</Accordion.Trigger>
            <Accordion.Content>
                <div class="flex flex-col gap-4">
                    <Input bind:value={model.companyName} label="Workspace name" />
                    <Switch
                        bind:checked={model.autoReconcile}
                        label="Auto-reconcile"
                        description="Match confirmed bank payments as they arrive."
                    />
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="reminders">
            <Accordion.Trigger>Reminders</Accordion.Trigger>
            <Accordion.Content>
                <div class="flex flex-col gap-4">
                    <RadioGroup.Root bind:value={model.reminderCadence} name="reminder-cadence">
                        <RadioGroup.Item
                            value="off"
                            label="Off"
                            description="Send reminders yourself."
                        />
                        <RadioGroup.Item
                            value="weekly"
                            label="Weekly"
                            description="Every Monday for open invoices."
                        />
                        <RadioGroup.Item
                            value="due"
                            label="Before due"
                            description="Once, a few days before the due date."
                        />
                    </RadioGroup.Root>
                    {#if model.reminderCadence === 'due'}
                        <Slider
                            bind:value={model.reminderDays}
                            min={1}
                            max={14}
                            step={1}
                            label={`Remind ${model.reminderDays} days before due`}
                        />
                    {/if}
                </div>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</Tabs.Content>
