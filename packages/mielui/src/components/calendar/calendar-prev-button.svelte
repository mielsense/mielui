<script lang="ts">
    import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { button } from '../button/variants';

    let {
        class: className,
        children,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.PrevButtonProps = $props();
</script>

<CalendarPrimitive.PrevButton
    {...rest}
    bind:ref
    data-ui="calendar-prev-button"
    class={cn(className, button({ variant: 'ghost', size: 'icon' }), 'size-8 min-w-8 rtl:rotate-180')}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} aria-hidden="true" />
    {/if}
</CalendarPrimitive.PrevButton>
