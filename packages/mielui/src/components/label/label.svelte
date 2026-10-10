<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { LabelProps } from '.';

    let { class: className, required = false, children, ...rest }: LabelProps = $props();
</script>

<label
    data-ui="label"
    data-required={required || undefined}
    class={cn(
        className,
        'select-none [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--opacity-disabled)]'
    )}
    {...rest}
>
    {@render children?.()}
    {#if required}
        <span aria-hidden="true" data-ui="required-mark" class="text-[var(--mielui-error-text)]"
            >*</span
        >
    {/if}
</label>
