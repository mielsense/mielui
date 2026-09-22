<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import { Button } from '../../components/button';
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
<Button
    {...buttonAttributes(rest)}
    type="button"
    variant="ghost"
    size="icon"
    aria-label={label}
    data-ui="notch-close"
    class={cn(className, 'absolute right-5 top-3 size-7')}
    onclick={(event) => {
        buttonAttributes({ onclick }).onclick?.(event);
        if (!event.defaultPrevented) { context.open = false; }
    }}
>
    {#if children}
        {@render children()}
    {:else}
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
        >
            <path d="m6 6 12 12M18 6 6 18" />
        </svg>
    {/if}
</Button>
