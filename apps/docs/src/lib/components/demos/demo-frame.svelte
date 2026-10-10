<script lang="ts">
    import { ArrowUpRight01Icon as ArrowUpRight } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';

    const {
        title,
        lead,
        description,
        href,
        linkLabel,
        fill = false,
        class: className,
        children
    }: {
        title: string;
        /** Replaces the visible title, for example with tabs. The title still names the section. */
        lead?: Snippet;
        description: string;
        /** Where the corner link goes. Omit it to show the demo without a link. */
        href?: string;
        /** Accessible name of the link to the components the demo is built from. */
        linkLabel?: string;
        /** Stretches the frame to the height of its container instead of sizing to the demo. */
        fill?: boolean;
        class?: string;
        children: Snippet;
    } = $props();

    const id = $props.id();
</script>

<!--
    @component
    A titled homepage demo inside the shared inset frame.
-->

<section
    aria-label={lead ? title : undefined}
    aria-labelledby={lead ? undefined : id}
    class={cn('flex min-w-0 flex-col gap-3', fill && 'h-full min-h-0')}
>
    <div class="flex items-center justify-between gap-3 px-1">
        <div class="flex min-w-0 items-center gap-2.5">
            {#if lead}
                {@render lead()}
            {:else}
                <h3 {id} class="m-0 shrink-0 text-[15px] leading-6 font-medium text-foreground">
                    {title}
                </h3>
            {/if}
            <p class="m-0 hidden min-w-0 truncate text-sm leading-6 text-foreground-muted sm:block">
                {description}
            </p>
        </div>
        {#if href}
            <a
                {href}
                aria-label={linkLabel}
                class="grid size-7 shrink-0 place-items-center rounded-full text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
            >
                <HugeiconsIcon icon={ArrowUpRight} size={15} />
            </a>
        {/if}
    </div>
    <div class={cn('mielui-inset-frame', fill && 'flex min-h-0 flex-1 flex-col')}>
        <div
            class={cn(
                className,
                'mielui-inset-surface @container w-full min-w-0 overflow-hidden [&_:is([data-ui=scroll-area-viewport],[data-ui=conversation-content])]:overscroll-auto',
                fill && 'min-h-0 flex-1'
            )}
        >
            {@render children()}
        </div>
    </div>
</section>
