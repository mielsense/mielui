<script lang="ts">
    import * as Collapsible from '@mielui/svelte/components/collapsible';

    let open = $state(false);
</script>

<div class="w-full max-w-md">
    <Collapsible.Root bind:open>
        <Collapsible.Trigger>
            {open ? 'Hide delivery details' : 'Show delivery details'}
        </Collapsible.Trigger>
        <Collapsible.Content>
            Delivery takes 3 to 5 business days. A tracking link appears here after the order ships.
        </Collapsible.Content>
    </Collapsible.Root>
</div>
