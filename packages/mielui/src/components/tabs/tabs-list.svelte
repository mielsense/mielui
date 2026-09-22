<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import { getContext, untrack } from 'svelte';
    import type { TabsListProps, TabsState } from '.';

    let { children, class: className, ...rest }: TabsListProps = $props();
    const tabsState = getContext<TabsState>('tabs');
    const select = getContext<(value: string) => void>('tabs-selection');

    type Rect = {
        left: number;
        top: number;
        width: number;
        height: number;
    };

    const variant = $derived(tabsState.variant);
    const vertical = $derived(tabsState.orientation === 'vertical');
    const showHover = $derived(variant !== 'segmented');

    let listEl = $state<HTMLDivElement | null>(null);
    let indicator = $state<Rect | null>(null);
    let hover = $state<Rect | null>(null);
    let hovering = $state(false);
    let ready = $state(false);
    let hoverTarget: HTMLElement | undefined;

    const ghostRect = $derived(hovering && hover ? hover : indicator);

    function rectOf(el: HTMLElement): Rect {
        const host = listEl;
        if (!host) {
            return {
                left: el.offsetLeft,
                top: el.offsetTop,
                width: el.offsetWidth,
                height: el.offsetHeight
            };
        }
        let left = el.offsetLeft;
        let top = el.offsetTop;
        let parent = el.offsetParent;
        while (parent instanceof HTMLElement && parent !== host) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left,
            top,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }

    function repairSelection() {
        if (!listEl || !tabsState.value) {
            return;
        }
        const enabled = Array.from(
            listEl.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        ).filter((trigger) => !trigger.disabled);
        if (!enabled.some((trigger) => trigger.dataset.value === tabsState.value)) {
            select(enabled[0]?.dataset.value ?? '');
        }
    }

    function measureIndicator() {
        if (!listEl) {
            return;
        }
        const active = listEl.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
        indicator = active ? rectOf(active) : null;
    }

    function measureHover() {
        if (!listEl || !hoverTarget || !listEl.contains(hoverTarget)) {
            return;
        }
        hover = rectOf(hoverTarget);
    }

    function handleMouseOver(event: Event) {
        if (!showHover || !listEl) {
            return;
        }
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
        if (!target || target.hasAttribute('disabled') || !listEl.contains(target)) {
            return;
        }
        hoverTarget = target;
        hover = rectOf(target);
        hovering = true;
    }

    function handleMouseLeave() {
        hoverTarget = undefined;
        hovering = false;
    }

    $effect(() => {
        const _value = tabsState.value;
        const _orientation = tabsState.orientation;
        let disposed = false;
        untrack(() => {
            queueMicrotask(() => {
                if (disposed) {
                    return;
                }
                repairSelection();
                measureIndicator();
                measureHover();
                ready = true;
            });
        });
        return () => {
            disposed = true;
        };
    });

    $effect(() => {
        if (!listEl) {
            return;
        }
        const ro = new ResizeObserver(() => {
            measureIndicator();
            measureHover();
        });
        const host = listEl;
        const observed = new Set<HTMLElement>();
        ro.observe(host);
        function syncTriggers() {
            const triggers = new Set(host.querySelectorAll<HTMLElement>('[role="tab"]'));
            for (const trigger of observed) {
                if (!triggers.has(trigger)) {
                    ro.unobserve(trigger);
                    observed.delete(trigger);
                }
            }
            for (const trigger of triggers) {
                if (!observed.has(trigger)) {
                    ro.observe(trigger);
                    observed.add(trigger);
                }
            }
            repairSelection();
            measureIndicator();
            measureHover();
        }
        syncTriggers();
        const mutations = new MutationObserver(syncTriggers);
        mutations.observe(host, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['disabled', 'data-value']
        });
        window.addEventListener('resize', measureIndicator);
        return () => {
            ro.disconnect();
            mutations.disconnect();
            window.removeEventListener('resize', measureIndicator);
        };
    });
</script>

<BitsTabs.List
    bind:ref={listEl}
    role="tablist"
    aria-orientation={tabsState.orientation}
    data-ui="tabs-list"
    data-variant={variant}
    class={cn(
        className,
        'relative inline-flex',
        vertical ? 'flex-col items-stretch' : 'items-center',
        variant === 'segmented' && 'rounded-[var(--radius-xl)] bg-secondary p-1',
        variant === 'ghost' && 'gap-1',
        variant === 'default' && (vertical ? 'gap-1 pe-1' : 'gap-1 pb-1')
    )}
    onmouseover={handleMouseOver}
    onfocusin={handleMouseOver}
    onmouseleave={handleMouseLeave}
    onfocusout={handleMouseLeave}
    {...rest}
>
    {#if variant === 'default' && hover}
        <div
            aria-hidden="true"
            class="pointer-events-none absolute rounded-[var(--radius-md)] bg-foreground/[0.06] transition-[left,top,width,height,opacity] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none"
            style:left={`${hover.left}px`}
            style:top={`${hover.top}px`}
            style:width={`${hover.width}px`}
            style:height={`${hover.height}px`}
            style:opacity={hovering ? 1 : 0}
        ></div>
    {/if}
    {#if variant === 'ghost' && ghostRect}
        <div
            aria-hidden="true"
            class="pointer-events-none absolute rounded-[var(--radius-md)] bg-secondary/70 transition-[left,top,width,height] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none"
            style:left={`${ghostRect.left}px`}
            style:top={`${ghostRect.top}px`}
            style:width={`${ghostRect.width}px`}
            style:height={`${ghostRect.height}px`}
            style:transition={ready ? undefined : 'none'}
        ></div>
    {/if}
    {#if indicator}
        {#if variant === 'default'}
            <div
                aria-hidden="true"
                class={cn(
                    'pointer-events-none absolute rounded-full bg-foreground [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none',
                    vertical
                        ? 'end-0 w-[var(--size-hairline)] transition-[top,height]'
                        : 'bottom-0 h-[var(--size-hairline)] transition-[left,width]'
                )}
                style:left={vertical ? undefined : `${indicator.left}px`}
                style:top={vertical ? `${indicator.top}px` : undefined}
                style:width={vertical ? undefined : `${indicator.width}px`}
                style:height={vertical ? `${indicator.height}px` : undefined}
                style:transition={ready ? undefined : 'none'}
            ></div>
        {:else if variant === 'segmented'}
            <div
                aria-hidden="true"
                class="pointer-events-none absolute rounded-[calc(var(--radius-xl)-var(--spacing))] bg-card ring-1 ring-border/50 transition-[left,top,width,height] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none"
                style:left={`${indicator.left}px`}
                style:top={`${indicator.top}px`}
                style:width={`${indicator.width}px`}
                style:height={`${indicator.height}px`}
                style:transition={ready ? undefined : 'none'}
            ></div>
        {/if}
    {/if}
    {@render children?.()}
</BitsTabs.List>
