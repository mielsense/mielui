<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let open = $state(true);
</script>

<div class="w-full max-w-96">
    <div class="space-y-4">
        <Collapsible.Root bind:open>
            <Collapsible.Trigger class="w-full justify-between">
                <span>Weekly sync, June 18</span>
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    aria-hidden="true"
                    class="shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none {open
                        ? 'rotate-180'
                        : ''}"
                />
            </Collapsible.Trigger>
            <Collapsible.Content class="flex flex-col gap-3 pt-1 pb-2">
                <p class="m-0">
                    The export flow is ready for testing. Maya owns the migration guide, and Sam
                    will review keyboard navigation before Friday.
                </p>
                <ul class="m-0 list-none space-y-2 p-0">
                    <li class="flex gap-2">
                        <span class="text-foreground-muted">•</span>
                        <span>Ship the studio redesign by end of quarter</span>
                    </li>
                    <li class="flex gap-2">
                        <span class="text-foreground-muted">•</span>
                        <span>Draft v2 migration guide for customers</span>
                    </li>
                    <li class="flex gap-2">
                        <span class="text-foreground-muted">•</span>
                        <span>Review pricing experiment results with finance</span>
                    </li>
                </ul>
            </Collapsible.Content>
        </Collapsible.Root>
    </div>
</div>
