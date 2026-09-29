<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import type { TabsState } from '@mielui/svelte/components/tabs';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { CodeBlockCopyProps, CodeBlockRegistry } from '.';

    let {
        label = 'Copy code',
        copiedLabel = 'Copied',
        class: className,
        ...rest
    }: CodeBlockCopyProps = $props();

    const registry = getContext<CodeBlockRegistry>('code-block');
    const tabs = getContext<TabsState>('tabs');

    /** Copy the active tab's raw, un-highlighted source. */
    const text = $derived(registry?.codes[tabs?.value] ?? '');
</script>

<CopyButton
    {text}
    {label}
    {copiedLabel}
    class={cn(
        className,
        'size-[var(--size-control-sm)] min-w-[var(--size-control-sm)]'
    )}
    {...rest}
/>
