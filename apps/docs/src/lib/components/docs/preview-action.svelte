<script lang="ts">
    import Button from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    let {
        label,
        tooltip = label,
        element = $bindable(),
        class: className,
        onclick,
        children,
        ...rest
    }: Pick<HTMLButtonAttributes, 'aria-pressed' | 'aria-controls' | 'class'> & {
        label: string;
        tooltip?: string;
        element?: HTMLButtonElement | HTMLAnchorElement;
        onclick: () => void;
        children: Snippet;
    } = $props();
</script>

<Tooltip.Root>
    <Tooltip.Trigger>
        <Button
            bind:element
            size="icon"
            variant="ghost"
            class={cn(className, 'shrink-0 text-foreground-muted hover:text-foreground')}
            aria-label={label}
            {onclick}
            {...rest}
        >
            {@render children()}
        </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>{tooltip}</Tooltip.Content>
</Tooltip.Root>
