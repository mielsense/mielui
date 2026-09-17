<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldsetDescriptionProps } from '.';

    let { children, class: className, ...rest }: FieldsetDescriptionProps = $props();
</script>

<p
    {...rest}
    data-ui="fieldset-description"
    class={cn(className, 'text-sm leading-body text-foreground-muted')}
>
    {@render children?.()}
</p>
