<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldDescriptionProps } from '.';

    let { children, class: className, id, ...rest }: FieldDescriptionProps = $props();
    const uid = $props.id();
</script>

<p
    {...rest}
    id={id ?? `field-description-${uid}`}
    data-ui="field-description"
    data-field-description
    class={cn(className, 'text-sm leading-body text-foreground-muted')}
>
    {@render children?.()}
</p>
