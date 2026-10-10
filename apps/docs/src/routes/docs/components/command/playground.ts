import {
    attributes,
    expression,
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

function item(name: string, icon: string, values: Values, extra = ''): string {
    const indent = values.groups ? '                ' : '            ';

    if (!values.icons) {
        return `
${indent}<Command.Item name="${name}"${extra}>${name}</Command.Item>`;
    }

    return `
${indent}<Command.Item name="${name}"${extra}>
${indent}    <HugeiconsIcon icon={${icon}} size={14} />
${indent}    ${name}
${indent}</Command.Item>`;
}

function group(heading: string, items: string, values: Values): string {
    if (!values.groups) {
        return items;
    }

    return `
            <Command.Group heading="${heading}">${items}
            </Command.Group>`;
}

export function code(values: Values): string {
    const trigger = attributes({
        variant: values.variant !== 'primary' && values.variant
    });
    const content = attributes({
        surface: values.glass && 'glass',
        allowClickOutside: values.allowClickOutside ? undefined : expression('false')
    });
    const search = attributes({
        placeholder: values.placeholder !== DEFAULT_PLACEHOLDER && values.placeholder,
        threshold: values.threshold !== 0.2 && values.threshold
    });
    const invite = attributes({
        disabled: values.disabledItem
    });
    const iconNames = [
        values.icons && 'Add01Icon as Plus',
        'Search01Icon as Search',
        values.icons && 'Settings01Icon as Settings',
        values.icons && 'UserAdd01Icon as UserPlus',
        values.icons && 'UserGroupIcon as Users'
    ].filter((name) => typeof name === 'string');
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
        item('New project', 'Plus', values) + item('Invite teammate', 'UserPlus', values, invite),
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
