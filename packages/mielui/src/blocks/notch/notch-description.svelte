<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { descriptionClasses } from '../../components/typography/variants';
    import type { NotchDescriptionProps } from '.';

    let { children, class: className, ...rest }: NotchDescriptionProps = $props();
</script>
<p {...rest} data-ui="notch-description" class={cn(className, descriptionClasses)}>
    {@render children?.()}
</p>
