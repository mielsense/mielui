<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { cn } from '@mielui/svelte/utils';
    import type { CodeBlockListProps } from '.';

    let { children, class: className, ...rest }: CodeBlockListProps = $props();
</script>

<Tabs.List class={cn(className, 'min-w-0')} {...rest}> {@render children?.()} </Tabs.List>
