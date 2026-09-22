<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeadingTag } from '../../components/typography';
    import { titleClasses } from '../../components/typography/variants';
    import type { NotchTitleProps } from '.';

    let { children, level = 2, class: className, ...rest }: NotchTitleProps = $props();
    const tag = $derived(`h${level}` as HeadingTag);
</script>
<svelte:element this={tag} {...rest} data-ui="notch-title" class={cn(className, titleClasses)}>
    {@render children?.()}
</svelte:element>
