<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import { cn } from '@mielui/svelte/utils';
    import { findTabsContext } from '../../components/tabs/context.svelte';
    import type { CodeBlockCopyProps } from '.';
    import { findCodeBlockLabels, findCodeBlockRegistry } from './context.svelte';

    let { label, copiedLabel, class: className, ...rest }: CodeBlockCopyProps = $props();
    const labels = findCodeBlockLabels();

    const registry = findCodeBlockRegistry();
    const tabs = findTabsContext();

    /** Copy the active tab's raw, un-highlighted source. */
    const text = $derived(tabs ? (registry?.codes[tabs.value] ?? '') : '');
</script>

<CopyButton
    {text}
    label={label ?? labels?.()?.copy ?? 'Copy code'}
    copiedLabel={copiedLabel ?? labels?.()?.copied ?? 'Copied'}
    class={cn(
        className,
        'size-[var(--size-control-sm)] min-w-[var(--size-control-sm)]'
    )}
    {...rest}
/>
