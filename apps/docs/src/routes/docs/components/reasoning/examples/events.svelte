<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';

    let state = $state('open');
</script>

<div class="flex w-full max-w-md flex-col gap-3">
    <Reasoning.Root
        onOpenChange={(open) => {
            state = open ? 'opening' : 'closing';
        }}
        onOpenChangeComplete={(open) => {
            state = open ? 'open' : 'closed';
        }}
    >
        <Reasoning.Trigger title="Compared the two plans" duration="3s" />
        <Reasoning.Content>
            <p>
                Yearly billing is cheaper after the eighth month, so it wins for a team that stays.
            </p>
        </Reasoning.Content>
    </Reasoning.Root>
    <p class="text-sm text-foreground-muted">The reasoning is {state}.</p>
</div>
