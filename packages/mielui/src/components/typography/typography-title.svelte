<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeadingTag, TypographyTitleProps } from '.';
    import { titleClasses } from './variants';

    let { level, children, class: className, ...rest }: TypographyTitleProps = $props();

    const tag = $derived(`h${level}` as HeadingTag);
</script>

<svelte:element this={tag} {...rest} data-ui="typography-title" class={cn(className, titleClasses)}>
    {@render children?.()}
</svelte:element>
