<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import OverlayClose from '../../components/_internal/overlay-close.svelte';
    import type { NotchCloseProps } from '.';
    import { notchContext } from './context';

    let {
        children,
        class: className,
        onclick,
        'aria-label': label = 'Close notification',
        ...rest
    }: NotchCloseProps = $props();
    const context = notchContext.get();
</script>

<OverlayClose
    {...rest}
    {children}
    aria-label={label}
    data-ui="notch-close"
    class={cn(className, 'right-5')}
    onclick={(event) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            context.open = false;
        }
    }}
/>
