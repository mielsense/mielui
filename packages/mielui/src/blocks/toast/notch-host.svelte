<script lang="ts">
    import { tick, untrack } from 'svelte';
    import * as Notch from '../notch/index';
    import { pauseToast, resumeToast, type Toast as ToastType, toast } from './lib.svelte';
    import Toast from './toast.svelte';
    import Actions from './toast-actions.svelte';
    import Icon from './toast-icon.svelte';
    import Title from './toast-title.svelte';

    let { toasts, side }: { toasts: ToastType[]; side: 'top' | 'bottom' | 'left' | 'right' } =
        $props();
    let selectedId = $state<number>();
    let displayed = $state<ToastType>();
    let previousIds: (number | undefined)[] = [];
    let hovered = $state(false);
    let focused = $state(false);
    const selected = $derived(toasts.find((item) => item.id === selectedId));
    const index = $derived(toasts.findIndex((item) => item.id === selectedId));
    const lateral = $derived(side === 'left' || side === 'right');
    const surface = $derived(selected?.surface ?? displayed?.surface);

    $effect(() => {
        const ids = toasts.map((item) => item.id);
        const incoming = toasts.filter((item) => !previousIds.includes(item.id)).at(-1);
        if (incoming) {
            selectedId = incoming.id;
        } else if (!toasts.some((item) => item.id === selectedId) && toasts.length > 0) {
            const oldIndex = Math.max(0, previousIds.indexOf(selectedId));
            selectedId = toasts[Math.min(oldIndex, toasts.length - 1)].id;
        }
        previousIds = ids;
    });
    $effect(() => {
        if (selected) {
            displayed = selected;
        }
    });
    $effect(() => {
        const id = selected?.id;
        if (id === undefined) {
            return;
        }
        const paused = hovered || focused;
        untrack(() => {
            if (paused) {
                pauseToast(id);
            } else {
                resumeToast(id);
            }
        });
        return () => {
            untrack(() => {
                resumeToast(id);
            });
        };
    });

    function previous() {
        selectedId = toasts[(index - 1 + toasts.length) % toasts.length]?.id;
    }
    function next() {
        selectedId = toasts[(index + 1) % toasts.length]?.id;
    }
    function setOpen(value: boolean) {
        if (!value && selectedId !== undefined) {
            toast.dismiss(selectedId);
        }
    }
    function pointerEnter() {
        hovered = true;
    }
    function pointerLeave() {
        hovered = false;
    }
    function focusIn() {
        focused = true;
    }
    async function focusOut() {
        await tick();
        const active = document.activeElement;
        focused =
            active instanceof Element &&
            !!active.closest(
                '[data-ui="notch-content"], [data-ui="notch-side-action"], [data-ui="notch-accessory"]'
            );
    }
    function preservePause() {
        if ((hovered || focused) && selectedId !== undefined) {
            pauseToast(selectedId);
        }
    }
</script>

<Notch.Root bind:open={() => toasts.length > 0, setOpen} {side} duration={0} {surface}>
    {#if toasts.length > 1}
        <Notch.SideAction
            side="start"
            aria-label="Previous notification"
            onclick={previous}
            onpointerenter={pointerEnter}
            onpointerleave={pointerLeave}
            onfocusin={focusIn}
            onfocusout={focusOut}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="size-4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d={lateral ? 'm6 15 6-6 6 6' : 'm15 6-6 6 6 6'} />
            </svg>
        </Notch.SideAction>
        <Notch.SideAction
            side="end"
            aria-label="Next notification"
            onclick={next}
            onpointerenter={pointerEnter}
            onpointerleave={pointerLeave}
            onfocusin={focusIn}
            onfocusout={focusOut}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="size-4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d={lateral ? 'm6 9 6 6 6-6' : 'm9 6 6 6-6 6'} />
            </svg>
        </Notch.SideAction>
    {/if}
    <Notch.Content
        class={lateral ? 'w-48 min-h-56 justify-center px-6 py-7 text-center' : 'w-80 px-7 py-5 text-center'}
        role="region"
        tabindex={0}
        aria-label="Notifications"
        onpointerenter={pointerEnter}
        onpointerleave={pointerLeave}
        onfocusin={focusIn}
        onfocusout={focusOut}
    >
        <div>
            {#if displayed}
                <Toast
                    toast={displayed}
                    surface="solid"
                    class="m-0 w-full max-w-none rounded-none border-0 bg-transparent p-0 shadow-none"
                    onmouseleave={preservePause}
                    onfocusout={preservePause}
                >
                    <div class="flex min-w-0 items-center justify-center gap-2">
                        <Icon />
                        <Title class="flex-none">
                            <span class="inline-block">
                                {displayed.title}
                            </span>
                        </Title>
                    </div>
                    {#if displayed.description}
                        <p class="mt-2 text-sm leading-relaxed text-foreground-muted">
                            {displayed.description}
                        </p>
                    {/if}
                    {#if displayed.actions?.length}
                        <Actions class="ml-0 mt-3 justify-center" />
                    {/if}
                </Toast>
            {/if}
        </div>
    </Notch.Content>
    {#if toasts.length > 1}
        <Notch.Accessory
            class="rounded-full bg-card px-2 py-1 text-xs tabular-nums text-foreground-muted"
            aria-label={`Notification ${index + 1} of ${toasts.length}`}
            onpointerenter={pointerEnter}
            onpointerleave={pointerLeave}
            onfocusin={focusIn}
            onfocusout={focusOut}
        >
            {`${index + 1} of ${toasts.length}`}
        </Notch.Accessory>
    {/if}
</Notch.Root>
