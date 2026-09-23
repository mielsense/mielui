<script lang="ts">
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';

    let {
        type = 'single',
        value = $bindable<string | string[] | undefined>(''),
        disabled = false
    }: {
        type?: 'single' | 'multiple';
        value?: string | string[] | undefined;
        disabled?: boolean;
    } = $props();
    function singleValue() {
        return typeof value === 'string' ? value : undefined;
    }

    function multipleValue() {
        return Array.isArray(value) ? value : [];
    }

    function updateValue(next: string | string[] | undefined) {
        value = next;
    }
</script>

{#snippet items()}
    <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
    <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
    <ToggleGroup.Item value="underline">U</ToggleGroup.Item>
{/snippet}

{#if type === 'multiple'}
    <ToggleGroup.Root type="multiple" bind:value={multipleValue, updateValue} {disabled}>
        {@render items()}
    </ToggleGroup.Root>
{:else}
    <ToggleGroup.Root type="single" bind:value={singleValue, updateValue} {disabled}>
        {@render items()}
    </ToggleGroup.Root>
{/if}
