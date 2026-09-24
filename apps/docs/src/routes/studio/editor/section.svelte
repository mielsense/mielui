<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';

    let {
        title,
        open = false,
        bodyClass = 'gap-4',
        action,
        children
    }: {
        title: string;
        open?: boolean;
        bodyClass?: string;
        action?: Snippet;
        children: Snippet;
    } = $props();
</script>

<Collapsible.Root {open}>
    <section>
        <div
            class="flex items-center gap-2 rounded-[var(--radius-lg)] bg-secondary/25 pr-2 transition-colors hover:bg-secondary/50 has-[[data-state=open]]:bg-secondary/50"
        >
            <Collapsible.Trigger
                class="group flex h-11 min-w-0 flex-1 items-center justify-between rounded-[var(--radius-lg)] px-3 text-sm font-medium"
            >
                <span>{title}</span>
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    aria-hidden="true"
                    class="text-foreground-muted transition-transform [transition-duration:var(--motion-duration-press)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                />
            </Collapsible.Trigger>
            {@render action?.()}
        </div>
        <Collapsible.Content class={`flex flex-col px-2 pt-4 pb-5 ${bodyClass}`}>
            {@render children()}
        </Collapsible.Content>
    </section>
</Collapsible.Root>
