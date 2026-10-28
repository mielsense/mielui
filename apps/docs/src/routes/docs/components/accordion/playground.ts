import {
    attributes,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    type: select('Type', ['single', 'multiple'], 'single'),
    disabled: toggle('Disabled item', 'State')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const multiple = values.type === 'multiple';
    const root = multiple ? `type="multiple" value={['access']}` : 'value="access"';
    const disabled = attributes({
        disabled: values.disabled
    });

    return `<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
</script>

<Accordion.Root ${root} class="w-full max-w-md">
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
