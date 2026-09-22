<script lang="ts">
    import type { InputProps } from '@mielui/svelte/components/input';
    import Input from '@mielui/svelte/components/input/input.svelte';

    let {
        type = 'text',
        class: classProp
    }: {
        type?: Exclude<InputProps['type'], 'file' | 'checkbox' | 'radio'>;
        class?: string;
    } = $props();
</script>

<Input aria-label="Amount" value="120" {type} class={classProp}>
    {#snippet leading()}
        <span data-testid="leading">$</span>
    {/snippet}
    {#snippet trailing()}
        <span data-testid="trailing">USD</span>
    {/snippet}
</Input>
