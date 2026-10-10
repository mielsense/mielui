import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    type: select('Type', ['single', 'multiple'], 'single'),
    disabled: toggle('Disabled item', 'State'),
    collapsible: toggle('Collapsible', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const multiple = values.type === 'multiple';
    const state = multiple
        ? "let open = $state(['access']);"
        : "let open = $state<string | undefined>('access');";
    const props = attributes({
        type: multiple && 'multiple',
        collapsible: !multiple && !values.collapsible && expression('false')
    });
    const disabled = attributes({
        disabled: values.disabled
    });

    return `<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';

    ${state}
</script>

<Accordion.Root${props} bind:value={open} class="w-full max-w-md">
    <Accordion.Item value="access">
        <Accordion.Trigger>Who can access this workspace?</Accordion.Trigger>
        <Accordion.Content>
            Only invited members can open projects. Owners can invite people and change their roles.
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="plan">
        <Accordion.Trigger>Can I change my plan?</Accordion.Trigger>
        <Accordion.Content>
            Change your plan from Billing. New limits apply immediately.
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="export"${disabled}>
        <Accordion.Trigger>How do I export my data?</Accordion.Trigger>
        <Accordion.Content>
            Open Settings and choose Export. The archive includes your projects and files.
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>`;
}
