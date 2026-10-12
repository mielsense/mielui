<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import * as Select from '@mielui/svelte/components/select';
    import { Switch } from '@mielui/svelte/components/switch';
    import { optionLabel, type PlaygroundControl, type PlaygroundValue } from './playground';

    let {
        control,
        value,
        onchange,
        labelledby,
        variant = 'outline'
    }: {
        control: PlaygroundControl;
        value: PlaygroundValue;
        onchange: (next: PlaygroundValue) => void;
        labelledby?: string;
        variant?: 'ghost' | 'outline';
    } = $props();

    function changeNumber(next: string | number) {
        const parsed = Number(next);

        if (Number.isFinite(parsed)) {
            onchange(parsed);
        }
    }
</script>

{#if control.kind === 'toggle'}
    <Switch aria-labelledby={labelledby} bind:checked={() => value === true, onchange} />
{:else if control.kind === 'text'}
    <Input aria-labelledby={labelledby} class="w-36" bind:value={() => String(value), onchange} />
{:else if control.kind === 'number'}
    <Input
        type="number"
        aria-labelledby={labelledby}
        class="w-24"
        min={control.min}
        max={control.max}
        step={control.step}
        bind:value={() => Number(value), changeNumber}
    />
{:else}
    <Select.Root value={String(value)} onValueChange={onchange}>
        <Select.Trigger {variant} size="sm" aria-label={control.label} class="shrink-0" />
        <Select.Content>
            {#each control.options as option (option)}
                <Select.Item value={option}>{optionLabel(option)}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
{/if}
