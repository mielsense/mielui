<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { overlaySurface } from '../../components/_internal/surface';
    import { setToastContext } from './context.svelte';
    import { pauseToast, resumeToast, type Toast } from './lib.svelte';
    import Actions from './toast-actions.svelte';
    import Close from './toast-close.svelte';
    import Content from './toast-content.svelte';
    import Footer from './toast-footer.svelte';
    import Icon from './toast-icon.svelte';
    import Title from './toast-title.svelte';

    let {
        toast,
        surface = toast.surface ?? 'solid',
        children,
        class: className,
        onmouseenter,
        onmouseleave,
        onfocusin,
        onfocusout,
        ...rest
    }: HTMLAttributes<HTMLDivElement> & { toast: Toast; surface?: 'solid' | 'glass' } = $props();

    let hovered = false;
    let focused = false;

    setToastContext({
        get toast() {
            return toast;
        }
    });

    onDestroy(() => {
        if (toast.id !== undefined && (hovered || focused)) {
            resumeToast(toast.id);
        }
    });

    function syncTimer() {
        if (toast.id === undefined) {
            return;
        }
        if (hovered || focused) {
            pauseToast(toast.id);
        } else {
            resumeToast(toast.id);
        }
    }
</script>

<div
    {...rest}
    data-ui="toast"
    data-surface={surface}
    data-type={toast.type ?? 'default'}
    role="status"
    aria-live="polite"
    aria-atomic="true"
    class={cn(className, overlaySurface(surface), 'mielui-inset-frame relative flex w-full flex-col text-foreground shadow-[var(--elevation-float)]')}
    onmouseenter={(event) => {
        hovered = true;
        syncTimer();
        onmouseenter?.(event);
    }}
    onmouseleave={(event) => {
        hovered = false;
        syncTimer();
        onmouseleave?.(event);
    }}
    onfocusin={(event) => {
        focused = true;
        syncTimer();
        onfocusin?.(event);
    }}
    onfocusout={(event) => {
        focused = event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget);
        syncTimer();
        onfocusout?.(event);
    }}
>
    {#if children}
        {@render children()}
    {:else}
        {#if toast.description}
            <Content />
        {/if}
        <Footer>
            <Icon />
            <Title />
            <Actions />
            {#if toast.exitable}
                <Close />
            {/if}
        </Footer>
    {/if}
</div>
