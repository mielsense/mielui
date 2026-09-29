<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { BreadcrumbSeparatorProps } from '.';

    let { class: className, children, ...rest }: BreadcrumbSeparatorProps = $props();
</script>

<li role="presentation" aria-hidden="true" class="flex shrink-0 items-center">
    {#if children}
        <span class={className} {...rest}>{@render children?.()}</span>
    {:else}
        <HugeiconsIcon
            icon={ChevronRight}
            {...rest}
            size={14}
            class={cn(className, 'text-foreground-muted')}
        />
    {/if}
</li>
