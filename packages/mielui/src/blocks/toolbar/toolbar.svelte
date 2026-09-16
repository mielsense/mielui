<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ToolbarProps } from '.';
    import { toolbarNavigation } from './navigation';

    let { children, class: classProp, ...rest }: ToolbarProps = $props();
</script>

<div
    use:toolbarNavigation
    data-ui="toolbar"
    role="toolbar"
    class={cn(classProp, 'flex flex-wrap items-center justify-between gap-1 p-1.5 text-foreground')}
    {...rest}
>
    {@render children?.()}
</div>
