import {
    attributes,
    changed,
    compact,
    defaultOn,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

const DEFAULT_PLACEHOLDER = 'Type a command or search...';

export const controls = {
    variant: select('Variant', ['primary', 'secondary', 'outline', 'ghost'], 'outline'),
    glass: toggle('Glass surface', 'Appearance'),
    header: toggle('Header', 'Content', true),
    groups: toggle('Groups', 'Content', true),
    separator: toggle('Separator', 'Content', true),
    icons: toggle('Icons', 'Content', true),
    empty: toggle('Custom empty message', 'Content'),
    placeholder: text('Placeholder', DEFAULT_PLACEHOLDER, 'Content'),
    disabledItem: toggle('Disabled item', 'State'),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true),
    threshold: number('Search threshold', 0.2, {
        min: 0,
        max: 1,
        step: 0.05,
        group: 'Behavior'
    })
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
        surface: values.glass && 'glass',
        allowClickOutside: defaultOn(values.allowClickOutside)
    });
    const search = attributes({
        placeholder: changed(values.placeholder, DEFAULT_PLACEHOLDER),
        threshold: changed(values.threshold, 0.2)
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
    const empty = values.empty
        ? `
            {#snippet empty()}
                <p class="text-sm text-foreground-muted">Nothing matches. Try another word.</p>
            {/snippet}`
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
        <Command.Search${search} />
        <Command.Results>${empty}${actions}${separator}${navigation}
        </Command.Results>
    </Command.Content>
</Command.Root>`;
}
