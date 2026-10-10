import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['outline', 'secondary', 'ghost'], 'outline'),
    size: select('Trigger size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    glass: toggle('Glass surface', 'Appearance'),
    dynamic: toggle('Dynamic width', 'Appearance'),
    label: toggle('Label', 'Content', true),
    icons: toggle('Icons', 'Content', true),
    checkbox: toggle('Checkbox item', 'Content'),
    submenu: toggle('Submenu', 'Content'),
    destructive: toggle('Destructive item', 'Content', true),
    disabled: toggle('Disabled trigger', 'State'),
    disabledItem: toggle('Disabled item', 'State'),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true),
    dismissLayer: toggle('Dismiss layer', 'Behavior', true),
    focusTrap: toggle('Trap focus', 'Behavior'),
    lockScroll: toggle('Lock scroll', 'Behavior'),
    portal: toggle('Portal', 'Behavior', true)
};

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

export function code(values: PlaygroundValues<typeof controls>): string {
    const trigger = attributes({
        variant: values.variant,
        size: values.size !== 'md' && values.size,
        disabled: values.disabled
    });
    const content = attributes({
        surface: values.glass && 'glass',
        dynamic: values.dynamic,
        allowClickOutside: values.allowClickOutside ? undefined : expression('false'),
        dismissLayer: values.dismissLayer ? undefined : expression('false'),
        focusTrap: values.focusTrap,
        lockScroll: values.lockScroll,
        portal: values.portal ? undefined : expression('false')
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
    const iconNames = [
        'ArrowDown01Icon as ChevronDown',
        values.icons && 'CreditCardIcon as CreditCard',
        values.icons && 'Logout01Icon as LogOut',
        values.icons && values.submenu && 'PaintBoardIcon as Palette',
        values.icons && 'Settings01Icon as Settings',
        values.icons && 'UserIcon as User'
    ].filter((name) => typeof name === 'string');
    const iconImport =
        iconNames.length === 1
            ? `import { ${iconNames[0]} } from '@hugeicons/core-free-icons';`
            : `import {
        ${iconNames.join(',\n        ')}
    } from '@hugeicons/core-free-icons';`;
    const state = [
        values.checkbox && 'let notifications = $state(true);',
        values.submenu && "let theme = $state('system');"
    ].filter((line) => typeof line === 'string');
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
