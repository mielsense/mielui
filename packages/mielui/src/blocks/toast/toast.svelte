<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
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
        surface = toast.surface,
        children,
        class: className,
        onmouseenter,
        onmouseleave,
        onfocusin,
        onfocusout,
        ...rest
    }: HTMLAttributes<HTMLDivElement> & {
        toast: Toast;
        surface?: 'solid' | 'glass';
    } = $props();

    let element = $state<HTMLElement | null>(null);
    const reduced = useReducedMotion();
    let duration = $state(0);
    $effect.pre(() => {
        void toast.title;
        void toast.description;
        if (element) {
            duration =
                Math.min(50, getCssDuration(element, '--motion-duration-toast-in', 50)) / 1000;
        }
    });
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

<motion.div
    {...rest}
    bind:ref={element}
    layout
    layoutDependency={`${toast.type}:${toast.title}:${toast.description}`}
    initial={false}
    transition={{ duration: reduced.current ? 0 : duration, ease: [0.22, 1, 0.36, 1] }}
    data-ui="toast"
    data-surface={surface}
    data-type={toast.type ?? 'default'}
    role="status"
    aria-live="polite"
    aria-atomic="true"
    class={cn(
        className,
        overlaySurface(surface),
        !toast.description && !toast.actions?.length && 'w-fit max-w-full',
        'mielui-inset-frame relative ml-auto flex w-full flex-col text-foreground shadow-[var(--elevation-float)] has-[[data-ui=toast-close]]:[&_[data-ui=toast-content]]:pr-11'
    )}
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
            <Footer>
                <Icon />
                <Title />
                <Actions />
            </Footer>
        {:else}
            <Content class="flex min-h-14 flex-row items-center gap-2 px-4 py-4">
                <Icon />
                <Title />
            </Content>
            {#if toast.actions?.length}
                <Footer><Actions /></Footer>
            {/if}
        {/if}
        {#if toast.exitable}
            <Close />
        {/if}
    {/if}
</motion.div>
