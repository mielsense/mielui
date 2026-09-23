<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import type { FieldErrorProps } from '.';
    import { getFieldContext } from './context.svelte';

    let {
        issues,
        children,
        class: className,
        id,
        role = 'status',
        ...rest
    }: FieldErrorProps = $props();
    const field = getFieldContext();
    const uid = $props.id();
    const messages = $derived([
        ...new Set((issues ?? field.issues).map((issue) => issue.message).filter(Boolean))
    ]);
</script>

{#if children || messages.length > 0}
    <div
        {...rest}
        id={id ?? `field-error-${uid}`}
        {role}
        aria-atomic="true"
        aria-hidden={!children && messages.length === 0 ? true : undefined}
        transition:themedSlide={{ durationVar: '--motion-duration-press', fallback: 160 }}
        data-ui="field-error"
        data-field-error
        class={cn(className, 'text-sm leading-body text-error')}
    >
        {#if children}
            {@render children()}
        {:else if messages.length === 1}
            {messages[0]}
        {:else}
            <ul class="list-disc space-y-1 pl-4">
                {#each messages as message (message)}
                    <li>{message}</li>
                {/each}
            </ul>
        {/if}
    </div>
{/if}
