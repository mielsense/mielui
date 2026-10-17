<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import { cn } from '@mielui/svelte/utils';
    import { findTabsContext } from '../../components/tabs/context';
    import type { CodeBlockCopyProps } from '.';
    import { findCodeBlockLabels, findCodeBlockRegistry } from './context';

    let { class: className, ...rest }: CodeBlockCopyProps = $props();
    const labels = findCodeBlockLabels();

    const registry = findCodeBlockRegistry();
    const tabs = findTabsContext();

    /** Copy the active tab's raw, un-highlighted source. */
    const text = $derived(tabs ? (registry?.codes[tabs.value] ?? '') : '');
</script>

<CopyButton
    {text}
    labels={{
        copy: labels?.()?.copy ?? 'Copy code',
        copied: labels?.()?.copied ?? 'Copied'
    }}
    class={cn(
        className,
        'size-[var(--size-control-sm)] min-w-[var(--size-control-sm)]'
    )}
    {...rest}
/>
