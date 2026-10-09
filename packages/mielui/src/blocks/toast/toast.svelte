<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { insetLayout } from '../../components/_internal/inset-layout';
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
    $effect(() => {
        if (!element) {
            return;
        }
        const layout = insetLayout(element);
        return () => {
            layout.destroy();
        };
    });
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
    style={rest.style ?? undefined}
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
        'mielui-inset-frame relative ml-auto flex w-full flex-col text-foreground shadow-[var(--elevation-float)] [--mielui-plate-radius:calc(var(--radius-xl)*var(--mielui-squircle,1))] has-[[data-ui=toast-close]]:[&_[data-ui=toast-content]]:pr-11 has-[[data-ui=toast-close]]:[&>[data-ui=toast-footer][data-inset-position=top]]:pr-10'
    )}
    onmouseenter={(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
        hovered = true;
        syncTimer();
        onmouseenter?.(event);
    }}
    onmouseleave={(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
        hovered = false;
        syncTimer();
        onmouseleave?.(event);
    }}
    onfocusin={(event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
        focused = true;
        syncTimer();
        onfocusin?.(event);
    }}
    onfocusout={(event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
        focused = event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget);
        syncTimer();
        onfocusout?.(event);
    }}
>
    {#if children}
        {@render children()}
    {:else}
        {#if toast.description}
            <Content class="gap-1">
                <div class="flex min-w-0 items-center gap-2">
                    <Icon />
                    <Title />
                </div>
                <span>{toast.description}</span>
            </Content>
        {:else}
            <Content class="min-h-0 flex-row items-center justify-start gap-2">
                <Icon />
                <Title />
            </Content>
        {/if}
        {#if toast.actions?.length}
            <Footer>
                <Actions />
            </Footer>
        {/if}
        {#if toast.exitable}
            <Close />
        {/if}
    {/if}
</motion.div>

<style>
    :global {
        @media (prefers-reduced-motion: no-preference) {
            [data-ui='toast'][data-type='success']:not([data-ui='notch-body'] *) {
                animation: mielui-toast-success calc(var(--motion-duration-toast-in) * 0.82)
                    cubic-bezier(0.5, 1, 0.89, 1) calc(var(--motion-duration-toast-in) * 0.5) both;
            }

            [data-ui='toast'][data-type='error']:not([data-ui='notch-body'] *) {
                animation: mielui-toast-error calc(var(--motion-duration-toast-in) * 0.72)
                    cubic-bezier(0.5, 1, 0.89, 1) calc(var(--motion-duration-toast-in) * 0.5) both;
            }
        }

        @keyframes mielui-toast-success {
            0% {
                scale: 1;
            }

            30% {
                scale: 1.025;
            }

            60% {
                scale: 0.99;
            }

            100% {
                scale: 1;
            }
        }

        @keyframes mielui-toast-error {
            0% {
                translate: 0 0;
            }

            25% {
                translate: -3px 0;
            }

            50% {
                translate: 3px 0;
            }

            75% {
                translate: -3px 0;
            }

            100% {
                translate: 0 0;
            }
        }
    }
</style>
