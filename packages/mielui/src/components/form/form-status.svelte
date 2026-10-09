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
    class={cn(
        className,
        '[font-size:var(--font-size-label)] leading-snug',
        tone === 'error'
            ? 'text-[var(--mielui-error-text)]'
            : tone === 'success'
              ? 'text-[var(--mielui-success-text)]'
              : 'text-foreground-muted'
    )}
>
    {@render children?.()}
</div>
