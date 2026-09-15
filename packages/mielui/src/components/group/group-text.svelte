<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        as?: keyof HTMLElementTagNameMap;
        for?: string;
    };

    let { as = 'div', children, class: className, ...rest }: Props = $props();
</script>

<svelte:element
    this={as}
    {...rest}
    data-ui="group-text"
    class={cn(className, 'inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] bg-secondary px-3 text-label text-foreground-muted shadow-[var(--elevation-button-outline)]')}
>
    {@render children?.()}
</svelte:element>
