<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FormStatusProps } from '.';

    let {
        children,
        class: className,
        tone = 'neutral',
        role = 'status',
        ...rest
    }: FormStatusProps = $props();
</script>

<div
    {...rest}
    {role}
    data-ui="form-status"
    data-tone={tone}
    class={cn(className, 'text-sm leading-body', tone === 'error' ? 'text-error' : tone === 'success' ? 'text-success' : 'text-foreground-muted')}
>
    {@render children?.()}
</div>
