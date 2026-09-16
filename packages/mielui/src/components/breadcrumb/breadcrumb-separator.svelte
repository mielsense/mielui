<script lang="ts">
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import ChevronRight from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import { cn } from '@mielui/svelte/utils';
    import type { BreadcrumbSeparatorProps } from '.';

    let { class: className, children, ...rest }: BreadcrumbSeparatorProps = $props();
</script>

{#if children}
    {@render children?.()}
{:else}
    <HugeiconsIcon
        icon={ChevronRight}
        {...rest}
        size={14}
        class={cn(className, `text-foreground-muted`)}
    />
{/if}
