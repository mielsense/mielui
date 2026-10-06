<script lang="ts">
    import { Menu01Icon as Menu } from '@hugeicons/core-free-icons';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import ScrollEdge from '$lib/components/shell/scroll-edge.svelte';
    import { fadeY, scrollFade } from '$lib/components/shell/scroll-fade';
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
            <div class="relative -mx-[15px] flex min-h-0 flex-1 flex-col">
                <div
                    {@attach scrollFade({ start: false, size: 56, target: 'parent' })}
                    class={`min-h-0 flex-1 overflow-y-auto pt-1 [--docs-side:transparent] ${fadeY}`}
                >
                    <Navigation {close} siteLinks />
                </div>
                <ScrollEdge edge="bottom" />
            </div>
        </Sheet.Content>
    </Sheet.Root>
</div>
