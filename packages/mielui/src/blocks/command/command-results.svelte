<script lang="ts">
    import { cn, travelingHighlight } from '@mielui/svelte/utils';
    import type { CommandResultsProps } from '.';
    import { getCommandContext } from './context.svelte';

    const { state: command } = getCommandContext();

    const { children, empty, class: className, ...rest }: CommandResultsProps = $props();
</script>

{#snippet defaultEmpty()}
    <p class="text-sm text-foreground-muted">No results found</p>
{/snippet}

<div
    {...rest}
    id={`${command.id}-listbox`}
    role="listbox"
    aria-label="Command results"
    use:travelingHighlight
    class={cn(className, 'max-h-full overflow-y-auto overscroll-contain p-1 [scrollbar-gutter:stable]')}
>
    {@render children?.()}
    {#if command.searchContent !== '' && command.results.length === 0}
        <div class="flex w-full items-center justify-center p-3">
            {@render (empty ?? defaultEmpty)()}
        </div>
    {/if}
</div>
