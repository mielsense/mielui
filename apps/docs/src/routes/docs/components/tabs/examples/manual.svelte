<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let tab = $state('draft');
</script>

<div class="w-full max-w-sm">
    <Tabs.Root bind:value={tab} activationMode="manual">
        <div role="group" aria-label="Draft settings">
            <Tabs.List>
                <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
                <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                <Tabs.Trigger value="history" disabled>History</Tabs.Trigger>
            </Tabs.List>
        </div>
        <Tabs.Content value="draft" forceMount class="pt-4">
            <Input label="Draft title" placeholder="Type here, then switch tabs" />
        </Tabs.Content>
        <Tabs.Content value="preview" class="pt-4">
            <p class="text-sm text-foreground-muted">
                Return to Draft to see the input still holds your text.
            </p>
        </Tabs.Content>
    </Tabs.Root>
</div>
