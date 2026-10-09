<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ScrollAreaProps } from '.';

    let {
        class: className,
        children,
        orientation = 'vertical',
        showCues = true,
        blur = true,
        element = $bindable(),
        onscroll,
        ...rest
    }: ScrollAreaProps = $props();

    let scrollTop = $state(0);
    let scrollHeight = $state(0);
    let clientHeight = $state(0);
    let scrollWidth = $state(0);
    let clientWidth = $state(0);
    let scrolling = $state(false);
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;

    const atTop = $derived(scrollTop <= 1);
    const atBottom = $derived(scrollTop + clientHeight >= scrollHeight - 1);
    const overflows = $derived(scrollHeight - clientHeight > 1);
    const overflowsInline = $derived(scrollWidth - clientWidth > 1);
    const scrollable = $derived(
        (orientation !== 'horizontal' && overflows) ||
            (orientation !== 'vertical' && overflowsInline)
    );
    const cuesVisible = $derived(showCues && orientation === 'vertical' && overflows);
    const blurClass = $derived(blur ? 'backdrop-blur-sm' : undefined);

    function markScrolling() {
        scrolling = true;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            scrolling = false;
        }, 800);
    }

    function measure() {
        if (!element) {
            return;
        }
        scrollTop = element.scrollTop;
        scrollHeight = element.scrollHeight;
        clientHeight = element.clientHeight;
        scrollWidth = element.scrollWidth;
        clientWidth = element.clientWidth;
    }

    $effect(() => {
        const viewport = element;
        if (!viewport) {
            return;
        }
        const observed = new Set<Element>();
        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(viewport);

        const syncChildren = () => {
            for (const child of observed) {
                if (child.parentElement !== viewport) {
                    resizeObserver.unobserve(child);
                    observed.delete(child);
                }
            }
            for (const child of Array.from(viewport.children)) {
                if (!observed.has(child)) {
                    observed.add(child);
                    resizeObserver.observe(child);
                }
            }
            measure();
        };

        const mutationObserver = new MutationObserver(syncChildren);
        mutationObserver.observe(viewport, { childList: true, subtree: true, characterData: true });
        syncChildren();
        return () => {
            clearTimeout(scrollTimer);
            mutationObserver.disconnect();
            resizeObserver.disconnect();
        };
    });
</script>

<div
    data-ui="scroll-area"
    data-orientation={orientation}
    class={cn(className, 'relative flex min-h-0 min-w-0 flex-col overflow-hidden max-h-[inherit] max-w-[inherit]')}
>
    <div
        bind:this={element}
        data-ui="scroll-area-viewport"
        data-scrolling={scrolling || undefined}
        class={cn(
            'relative min-h-0 min-w-0 w-full flex-1 rounded-[inherit] [scrollbar-color:transparent_transparent] [scrollbar-width:thin] hover:[scrollbar-color:var(--color-border-strong)_transparent] focus-visible:[scrollbar-color:var(--color-border-strong)_transparent] data-scrolling:[scrollbar-color:var(--color-border-strong)_transparent]',
            '[&::-webkit-scrollbar]:size-2.5 [&::-webkit-scrollbar-track]:bg-transparent',
            '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--color-border-strong)] [&::-webkit-scrollbar-thumb]:bg-clip-padding',
            cuesVisible &&
                '[--scroll-area-fade:calc(var(--spacing)*9)] [mask-image:linear-gradient(to_bottom,transparent,black_var(--scroll-area-fade)),linear-gradient(to_top,transparent,black_var(--scroll-area-fade))] [mask-composite:intersect] [mask-repeat:no-repeat] [mask-size:100%_calc(100%+var(--scroll-area-fade))] [mask-position:0_var(--scroll-area-fade-top),0_var(--scroll-area-fade-bottom)] transition-[mask-position] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none',
            cuesVisible &&
                (atTop
                    ? '[--scroll-area-fade-top:calc(var(--scroll-area-fade)*-1)]'
                    : '[--scroll-area-fade-top:0]'),
            cuesVisible &&
                (atBottom
                    ? '[--scroll-area-fade-bottom:0]'
                    : '[--scroll-area-fade-bottom:calc(var(--scroll-area-fade)*-1)]'),
            orientation === 'horizontal'
                ? 'max-w-[inherit] overflow-x-auto overflow-y-hidden'
                : orientation === 'vertical'
                  ? 'max-h-[inherit] overflow-y-auto overflow-x-hidden'
                  : 'max-h-[inherit] max-w-[inherit] overflow-auto',
            scrollable && 'overscroll-contain'
        )}
        onscroll={(event) => {
            measure();
            markScrolling();
            onscroll?.(event);
        }}
        {...rest}
    >
        {#if cuesVisible}
            <div aria-hidden="true" class="sticky top-0 z-10 h-0">
                <div
                    class={cn(
                        'pointer-events-none absolute inset-x-0 -top-px h-9 rounded-t-[inherit] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)] transition-opacity [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none',
                        blurClass,
                        atTop ? 'opacity-0' : 'opacity-100'
                    )}
                ></div>
            </div>
        {/if}

        {@render children?.()}

        {#if cuesVisible}
            <div aria-hidden="true" class="sticky bottom-0 z-10 h-0">
                <div
                    class={cn(
                        'pointer-events-none absolute inset-x-0 -bottom-px h-9 rounded-b-[inherit] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_40%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,black_40%,transparent_100%)] transition-opacity [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none',
                        blurClass,
                        atBottom ? 'opacity-0' : 'opacity-100'
                    )}
                ></div>
            </div>
        {/if}
    </div>
</div>
