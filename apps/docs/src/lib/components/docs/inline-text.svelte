<script lang="ts" module>
    export const inlineLinkClass =
        'text-foreground underline decoration-primary underline-offset-2 [text-decoration-skip-ink:auto] [text-decoration-thickness:from-font] [text-underline-position:from-font] transition-[text-decoration-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:decoration-foreground motion-reduce:transition-none focus-visible:rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]';
</script>

<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';

    import { parseInlineText } from './inline-text';

    let { text }: { text: string } = $props();

    const segments = $derived(parseInlineText(text));
</script>

<!--
    @component
    Renders one line of prose with `code` spans and [label](href) links as adjacent
    nodes, so formatting the page markup cannot add or remove spaces around them.
-->

{#each segments as segment, index (index)}
    {#if segment.kind === 'code'}
        <Typography.InlineCode>{segment.value}</Typography.InlineCode>
    {:else if segment.kind === 'link'}
        <a class={inlineLinkClass} href={segment.href}>{segment.value}</a>
    {:else}
        {segment.value}
    {/if}
{/each}
