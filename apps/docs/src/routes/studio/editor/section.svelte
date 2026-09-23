<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';

    let {
        title,
        open = false,
        separator = true,
        bodyClass = 'gap-4',
        children
    }: {
        title: string;
        open?: boolean;
        separator?: boolean;
        bodyClass?: string;
        children: Snippet;
    } = $props();
</script>

<Collapsible.Root {open}>
    <section
        class={separator ? 'border-b-[length:var(--border-size)] border-[var(--docs-rule,var(--color-border))]' : undefined}
    >
        <div class="flex items-center gap-2">
            <Collapsible.Trigger
                class="group flex h-[var(--docs-row-height)] flex-1 justify-between text-sm font-semibold"
            >
                <span>{title}</span>
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    aria-hidden="true"
                    class="text-foreground-muted transition-transform [transition-duration:var(--motion-duration-press)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                />
            </Collapsible.Trigger>
        </div>
        <Collapsible.Content class={`flex flex-col pt-4 pb-6 ${bodyClass}`}>
            {@render children()}
        </Collapsible.Content>
    </section>
</Collapsible.Root>
