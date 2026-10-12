import {
    attributes,
    changed,
    compact,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['info', 'success', 'warning', 'error'], 'info'),
    icon: select('Icon', ['default', 'custom', 'hidden'], 'default', 'Content'),
    title: toggle('Title', 'Content', true),
    description: toggle('Description', 'Content', true),
    action: toggle('Action', 'Content'),
    announcement: select('Announcement', ['off', 'polite', 'assertive'], 'off', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const props = attributes({
        variant: changed(values.variant, 'info'),
        icon: values.icon === 'hidden' && expression('false'),
        announcement: changed(values.announcement, 'off')
    });
    const custom = values.icon === 'custom';
    const imports = compact([
        custom && "import { Megaphone01Icon } from '@hugeicons/core-free-icons';",
        "import * as Alert from '@mielui/svelte/components/alert';",
        values.action && "import { Button } from '@mielui/svelte/components/button';",
        custom && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const icon = custom
        ? `
    {#snippet icon()}
        <HugeiconsIcon icon={Megaphone01Icon} size={16} aria-hidden="true" />
    {/snippet}`
        : '';
    const title = values.title
        ? `
    <Alert.Title>Heads up</Alert.Title>`
        : '';
    const description = values.description
        ? `
    <Alert.Description>
        You can add components to your app using the command line.
    </Alert.Description>`
        : '';
    const action = values.action
        ? `
    <Button variant="secondary" size="sm" href="/docs/installation">Read the guide</Button>`
        : '';

    return `<script lang="ts">
    ${imports}
</script>

<Alert.Root${props}>${icon}${title}${description}${action}
</Alert.Root>`;
}
