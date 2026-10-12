<script lang="ts">
    import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { button } from '../button/variants';

    let {
        class: className,
        children,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.NextButtonProps> = $props();
</script>

<CalendarPrimitive.NextButton
    {...rest}
    bind:ref={element}
    data-ui="calendar-next-button"
    class={cn(className, button({ variant: 'ghost', size: 'icon' }), 'rtl:rotate-180')}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden="true" />
    {/if}
</CalendarPrimitive.NextButton>
