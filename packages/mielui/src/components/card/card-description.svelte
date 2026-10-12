<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { descriptionClasses } from '../typography/variants';
    import type { CardDescriptionProps } from '.';

    let { children, class: className, ...rest }: CardDescriptionProps = $props();
</script>

<p {...rest} class={cn(className, descriptionClasses)}>
    {@render children?.()}
</p>
