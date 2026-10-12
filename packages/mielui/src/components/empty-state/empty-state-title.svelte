<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeadingTag } from '../typography';
    import { titleClasses } from '../typography/variants';
    import type { EmptyStateTitleProps } from '.';

    let { children, level = 2, class: className, ...rest }: EmptyStateTitleProps = $props();
    const tag = $derived(`h${level}` as HeadingTag);
</script>

<svelte:element
    this={tag}
    {...rest}
    data-slot="empty-state-title"
    class={cn(className, titleClasses)}
>
    {@render children?.()}
</svelte:element>
