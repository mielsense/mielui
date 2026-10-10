import {
    attributes,
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

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        variant: values.variant,
        icon: values.icon === 'hidden' && expression('false'),
        announcement: values.announcement !== 'off' && values.announcement
    });
    const custom = values.icon === 'custom';
    const iconImport = custom
        ? `
    import { Megaphone01Icon } from '@hugeicons/core-free-icons';`
        : '';
    const buttonImport = values.action
        ? `
    import { Button } from '@mielui/svelte/components/button';`
        : '';
    const iconComponent = custom
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';
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

    return `<script lang="ts">${iconImport}
    import * as Alert from '@mielui/svelte/components/alert';${buttonImport}${iconComponent}
</script>

<Alert.Root${props}>${icon}${title}${description}${action}
</Alert.Root>`;
}
