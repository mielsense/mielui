<script lang="ts">
    import { Menu01Icon as Menu } from '@hugeicons/core-free-icons';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import Navigation from './navigation.svelte';

    let open = $state(false);

    function close() {
        open = false;
    }
</script>

<div class="lg:hidden">
    <Sheet.Root bind:open>
        <Sheet.Trigger variant="ghost" size="icon" aria-label="Open navigation" class="-ms-2">
            <HugeiconsIcon icon={Menu} size={16} />
        </Sheet.Trigger>
        <Sheet.Content side="left">
            <Sheet.Header>
                <Sheet.Title>Documentation</Sheet.Title>
            </Sheet.Header>
            <div
                class="-mx-[15px] min-h-0 flex-1 overflow-y-auto pt-1 [--docs-side:var(--color-card)]"
            >
                <Navigation {close} siteLinks />
            </div>
        </Sheet.Content>
    </Sheet.Root>
</div>
