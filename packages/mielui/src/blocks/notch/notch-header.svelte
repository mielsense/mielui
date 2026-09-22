<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { NotchHeaderProps } from '.';

    let { children, class: className, ...rest }: NotchHeaderProps = $props();
</script>
<div
    {...rest}
    data-ui="notch-header"
    class={cn(className, 'touch-none flex min-w-0 flex-col gap-1 pr-7')}
>
    {@render children?.()}
</div>
