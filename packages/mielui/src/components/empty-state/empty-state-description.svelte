<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { descriptionClasses } from '../typography/variants';
    import type { EmptyStateDescriptionProps } from '.';

    let { children, class: classProp, ...rest }: EmptyStateDescriptionProps = $props();
</script>

<p {...rest} data-slot="empty-state-description" class={cn(classProp, descriptionClasses)}>
    {@render children?.()}
</p>
