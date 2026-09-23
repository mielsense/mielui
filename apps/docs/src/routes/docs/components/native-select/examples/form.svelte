<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Label } from '@mielui/svelte/components/label';
    import * as NativeSelect from '@mielui/svelte/components/native-select';

    const id = $props.id();
    let plan = $state('');
    let saved = $state('');

    function savePlan(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
        event.preventDefault();
        saved = String(new FormData(event.currentTarget).get('plan'));
    }
</script>

<form class="flex w-full max-w-xs flex-col gap-3" onsubmit={savePlan}>
    <Label for={id}>Plan</Label>
    <NativeSelect.Root {id} name="plan" required bind:value={plan}>
        <NativeSelect.Option value="" disabled>Choose a plan</NativeSelect.Option>
        <NativeSelect.Option value="personal">Personal</NativeSelect.Option>
        <NativeSelect.Option value="team">Team</NativeSelect.Option>
        <NativeSelect.Option value="enterprise" disabled>
            Enterprise, coming soon
        </NativeSelect.Option>
    </NativeSelect.Root>
    <Button type="submit">Save plan</Button>
    <p role="status" class="min-h-5 text-sm text-foreground-muted">
        {saved ? `Saved ${saved} plan.` : ''}
    </p>
</form>
