import {
    attributes,
    compact,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Trigger variant', ['outline', 'secondary', 'ghost'], 'outline'),
    glass: toggle('Glass surface', 'Appearance'),
    label: toggle('Label', 'Content', true),
    icons: toggle('Icons', 'Content', true),
    checkbox: toggle('Checkbox item', 'Content'),
    submenu: toggle('Submenu', 'Content'),
    destructive: toggle('Destructive item', 'Content', true),
    disabledItem: toggle('Disabled item', 'State')
};

type Values = PlaygroundValues<typeof controls>;

function row(icon: string, label: string, icons: boolean, indent = '        '): string {
    if (!icons) {
        return label;
    }

    return `
${indent}    <span class="flex items-center gap-2">
${indent}        <HugeiconsIcon icon={${icon}} size={13} />
${indent}        ${label}
${indent}    </span>
${indent}`;
}

export function code(values: Values): string {
    const trigger = attributes({
        variant: values.variant
    });
    const content = attributes({
        surface: values.glass && 'glass'
    });
    const subContent = attributes({
        surface: values.glass && 'glass'
    });
    const billing = attributes({
        disabled: values.disabledItem
    });
    const signOut = attributes({
        variant: values.destructive && 'destructive'
    });
    const iconNames = compact([
        'ArrowDown01Icon as ChevronDown',
        values.icons && 'CreditCardIcon as CreditCard',
        values.icons && 'Logout01Icon as LogOut',
        values.icons && values.submenu && 'PaintBoardIcon as Palette',
        values.icons && 'Settings01Icon as Settings',
        values.icons && 'UserIcon as User'
    ]);
    const iconImport =
        iconNames.length === 1
            ? `import { ${iconNames[0]} } from '@hugeicons/core-free-icons';`
            : `import {
        ${iconNames.join(',\n        ')}
    } from '@hugeicons/core-free-icons';`;
    const state = compact([
        values.checkbox && 'let notifications = $state(true);',
        values.submenu && "let theme = $state('system');"
    ]);
    const script = state.length
        ? `

    ${state.join('\n    ')}`
        : '';
    const label = values.label
        ? `
        <DropdownMenu.Label>alex@example.com</DropdownMenu.Label>`
        : '';
    const checkbox = values.checkbox
        ? `
        <DropdownMenu.CheckboxItem bind:checked={notifications}>
            Email notifications
        </DropdownMenu.CheckboxItem>`
        : '';
    const theme = row('Palette', 'Theme', values.icons, '            ');
    const submenu = values.submenu
        ? `
        <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>${theme}</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent${subContent}>
                <DropdownMenu.RadioGroup bind:value={theme}>
                    <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
        </DropdownMenu.Sub>`
        : '';

    return `<script lang="ts">
    ${iconImport}
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';${script}
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger${trigger}>
        My account
        <HugeiconsIcon icon={ChevronDown} size={16} class="text-foreground-muted" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content${content}>${label}
        <DropdownMenu.Item>${row('User', 'Profile', values.icons)}</DropdownMenu.Item>
        <DropdownMenu.Item${billing}>${row('CreditCard', 'Billing', values.icons)}</DropdownMenu.Item>
        <DropdownMenu.Item>${row('Settings', 'Settings', values.icons)}</DropdownMenu.Item>${checkbox}${submenu}
        <DropdownMenu.Separator />
        <DropdownMenu.Item${signOut}>${row('LogOut', 'Sign out', values.icons)}</DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>`;
}
