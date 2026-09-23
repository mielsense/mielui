<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeadingTag } from '../typography';
    import { titleClasses } from '../typography/variants';
    import type { CardTitleProps } from '.';

    let { children, level = 2, class: classProp, ...rest }: CardTitleProps = $props();
    const tag = $derived(`h${level}` as HeadingTag);
</script>

<svelte:element
    this={tag}
    {...rest}
    class={cn(
        classProp,
        'py-1',
        titleClasses
    )}
>
    {@render children?.()}
</svelte:element>
