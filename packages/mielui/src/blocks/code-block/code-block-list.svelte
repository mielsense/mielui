<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { cn } from '@mielui/svelte/utils';
    import type { CodeBlockListProps } from '.';

    let { children, class: className, ...rest }: CodeBlockListProps = $props();
</script>

<!-- Delegates the active-underline indicator + keyboard nav to Mielui's Tabs. -->
<Tabs.List class={cn(className, 'border-0 bg-transparent p-0')} {...rest}>
    {@render children?.()}
</Tabs.List>
