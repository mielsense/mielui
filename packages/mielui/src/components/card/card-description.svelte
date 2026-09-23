<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { descriptionClasses } from '../typography/variants';
    import type { CardDescriptionProps } from '.';

    let { children, class: classProp, ...rest }: CardDescriptionProps = $props();
</script>

<p {...rest} class={cn(classProp, descriptionClasses)}>
    {@render children?.()}
</p>
