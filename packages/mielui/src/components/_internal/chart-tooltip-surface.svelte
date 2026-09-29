<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import { overlaySurface } from './surface';

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        ref?: HTMLDivElement;
        width?: number;
        height?: number;
        children: Snippet;
    };

    let {
        ref = $bindable(),
        width = $bindable(0),
        height = $bindable(0),
        class: className,
        children,
        ...rest
    }: Props = $props();
</script>

<div
    {...rest}
    bind:this={ref}
    bind:clientWidth={width}
    bind:clientHeight={height}
    class={cn(
        className,
        overlaySurface(),
        'mielui-modal-frame [--mielui-border-inset-scale:0] pointer-events-none absolute z-10 min-w-40 max-w-[min(calc(var(--spacing)*80),calc(100%-var(--spacing)*4))] break-words text-xs text-foreground shadow-[var(--elevation-float)]'
    )}
>
    <div class="mielui-inset-surface p-3">
        {@render children()}
    </div>
</div>
