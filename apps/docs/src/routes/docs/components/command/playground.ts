import {
    attributes,
    BUTTON_VARIANTS,
    changed,
    compact,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', BUTTON_VARIANTS, 'primary'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    header: toggle('Header', 'Content', true),
    groups: toggle('Groups', 'Content', true),
    separator: toggle('Separator', 'Content', true),
    icons: toggle('Icons', 'Content', true),
    disabledItem: toggle('Disabled item', 'State')
};

type Values = PlaygroundValues<typeof controls>;

function item(name: string, icon: string, values: Values, disabled = false): string {
    const indent = values.groups ? '                ' : '            ';
    const props = attributes({
        name,
        disabled
    });

    if (!values.icons) {
        return `
${indent}<Command.Item${props}>${name}</Command.Item>`;
    }

    return `
${indent}<Command.Item${props}>
${indent}    <HugeiconsIcon icon={${icon}} size={14} />
${indent}    ${name}
${indent}</Command.Item>`;
}

function group(heading: string, items: string, values: Values): string {
    if (!values.groups) {
        return items;
    }

    return `
            <Command.Group${attributes({ heading })}>${items}
            </Command.Group>`;
}

export function code(values: Values): string {
    const trigger = attributes({
        variant: changed(values.variant, 'primary')
    });
    const content = attributes({
        surface: changed(values.surface, 'theme')
    });
    const iconNames = compact([
        values.icons && 'Add01Icon as Plus',
        'Search01Icon as Search',
        values.icons && 'Settings01Icon as Settings',
        values.icons && 'UserAdd01Icon as UserPlus',
        values.icons && 'UserGroupIcon as Users'
    ]);
    const iconImport =
        iconNames.length === 1
            ? `import { ${iconNames[0]} } from '@hugeicons/core-free-icons';`
            : `import {
        ${iconNames.join(',\n        ')}
    } from '@hugeicons/core-free-icons';`;
    const header = values.header
        ? `
        <Command.Header>Workspace</Command.Header>`
        : '';
    const actions = group(
        'Actions',
        item('New project', 'Plus', values) +
            item('Invite teammate', 'UserPlus', values, values.disabledItem),
        values
    );
    const separator = values.separator
        ? `
            <Command.Separator />`
        : '';
    const navigation = group(
        'Go to',
        item('Settings', 'Settings', values) + item('Team', 'Users', values),
        values
    );

    return `<script lang="ts">
    ${iconImport}
    import * as Command from '@mielui/svelte/components/command';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Command.Root>
    <Command.Trigger${trigger}>
        <HugeiconsIcon icon={Search} size={14} />
        Open palette
    </Command.Trigger>
    <Command.Content${content}>${header}
        <Command.Search />
        <Command.Results>${actions}${separator}${navigation}
        </Command.Results>
    </Command.Content>
</Command.Root>`;
}
