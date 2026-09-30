<script lang="ts">
    import { useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { createRegistry, setSidebarRoot } from './context.svelte';
    import { finiteSize } from './geometry';
    import type { SidebarRootProps } from './types';

    let {
        breakpoint = 768,
        children,
        class: className,
        element = $bindable(),
        ...rest
    }: SidebarRootProps = $props();
    const id = $props.id();
    const panels = createRegistry();
    const reduced = useReducedMotion();
    let containerWidth = $state<number>();
    let direction = $state<'ltr' | 'rtl'>('ltr');
    let duration = $state(0);
    let themeStyle = $state('');
    let ease = $state<[number, number, number, number]>([0.23, 1, 0.32, 1]);
    const mobile = $derived(
        containerWidth !== undefined && containerWidth < finiteSize(breakpoint, 768)
    );
    setSidebarRoot({
        id,
        panels,
        get mobile() {
            return mobile;
        },
        get themeStyle() {
            return themeStyle;
        },
        get ready() {
            return containerWidth !== undefined;
        },
        get direction() {
            return direction;
        },
        get transition() {
            return { duration: reduced.current ? 0 : duration, ease };
        },
        openMobile(panelId) {
            for (const panel of panels.values()) {
                if (panel.id !== panelId) {
                    panel.setMobileOpen(false);
                }
            }
        }
    });

    function observe(node: HTMLDivElement) {
        function update() {
            containerWidth = node.getBoundingClientRect().width;
            const style = getComputedStyle(node);
            const properties = [...style].filter(
                (name) => name.startsWith('--') && !name.startsWith('--mielui-viewport-')
            );
            themeStyle = properties
                .map((name) => `${name}:${style.getPropertyValue(name)};`)
                .join('');
            direction = style.direction === 'rtl' ? 'rtl' : 'ltr';
            duration = getCssDuration(node, '--motion-duration-panel', 180) / 1000;
            const curve = style.getPropertyValue('--ease-out').match(/cubic-bezier\(([^)]+)\)/);
            const points = curve?.[1].split(',').map(Number);
            if (points?.length === 4 && points.every(Number.isFinite)) {
                ease = [points[0], points[1], points[2], points[3]];
            }
        }
        update();
        const resize = new ResizeObserver(update);
        resize.observe(node);
        const styles = new MutationObserver(update);
        for (let ancestor: HTMLElement | null = node; ancestor; ancestor = ancestor.parentElement) {
            styles.observe(ancestor, {
                attributes: true,
                attributeFilter: ['class', 'style', 'dir']
            });
        }
        styles.observe(document.head, { childList: true, subtree: true, characterData: true });
        return () => {
            resize.disconnect();
            styles.disconnect();
        };
    }
</script>

<div
    {...rest}
    bind:this={element}
    {@attach observe}
    data-ui="sidebar-root"
    data-mobile={mobile}
    class={cn(className, 'relative isolate flex min-h-0 w-full text-foreground')}
>
    {@render children?.()}
</div>
