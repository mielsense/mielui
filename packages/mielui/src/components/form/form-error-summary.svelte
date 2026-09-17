<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import type { FormErrorSummaryProps } from '.';

    let {
        issues = [],
        heading,
        children,
        element = $bindable(),
        class: className,
        ...rest
    }: FormErrorSummaryProps = $props();
    const uid = $props.id();
    const messages = $derived(issues.filter((issue) => issue.message.trim().length > 0));
</script>

{#if messages.length > 0}
    <div
        transition:themedSlide={{ durationVar: '--motion-duration-press', fallback: 160 }}
        aria-hidden={messages.length === 0 ? true : undefined}
        tabindex="-1"
        aria-labelledby={`${uid}-heading`}
        {...rest}
        bind:this={element}
        data-ui="form-error-summary"
        class={cn(className, 'rounded-lg border border-error/30 bg-error/5 p-4 text-sm text-error outline-none focus-visible:ring-2 focus-visible:ring-ring')}
    >
        <div id={`${uid}-heading`} class="font-medium">
            {#if heading}
                {@render heading()}
            {:else}
                Review your details
            {/if}
        </div>
        <div class="mt-2">
            {#if children}
                {@render children(messages)}
            {:else}
                <ul class="list-disc space-y-1 pl-4">
                    {#each messages as issue}
                        <li>
                            {#if issue.controlId}
                                <a
                                    href={`#${encodeURIComponent(issue.controlId)}`}
                                    class="underline underline-offset-4"
                                >
                                    {issue.message}
                                </a>
                            {:else}
                                {issue.message}
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
{/if}
