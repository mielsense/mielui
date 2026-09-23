<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getSelectContext } from './context.svelte';

    let {
        placeholder = 'Select',
        class: className
    }: {
        placeholder?: string;
        class?: string;
    } = $props();

    const { state } = getSelectContext();

    const hasValue = $derived(state.value.length > 0);
    const label = $derived(hasValue ? state.selectedLabel : '');
    const text = $derived(hasValue ? label : placeholder);
</script>

<span
    data-ui="select-value"
    data-placeholder={hasValue ? undefined : ''}
    class={cn(
        className,
        'min-w-0 truncate',
        hasValue ? 'text-foreground' : 'text-foreground-muted'
    )}
>
    {text}
</span>
