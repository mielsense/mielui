<script lang="ts">
    import {
        Wrench01Icon as Command,
        File01Icon as Document,
        Search01Icon as Magnifer
    } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ToolItemProps } from '.';

    let { name, detail, kind = 'command', class: className, ...rest }: ToolItemProps = $props();

    const Icon = $derived(kind === 'search' ? Magnifer : kind === 'read' ? Document : Command);
    const color = $derived(
        kind === 'search' ? 'text-primary' : kind === 'read' ? 'text-success' : 'text-foreground'
    );
</script>

<div
    data-ui="tool-item"
    data-kind={kind}
    class={cn(className, 'flex min-w-0 items-center gap-2')}
    {...rest}
>
    <HugeiconsIcon
        icon={Icon}
        size={14}
        aria-hidden="true"
        class="shrink-0 text-foreground-muted"
    />
    <span class={`shrink-0 font-[var(--font-weight-label)] ${color}`}>{name}</span>
    {#if detail}
        <span class="min-w-0 truncate font-mono text-xs text-foreground-muted">{detail}</span>
    {/if}
</div>
