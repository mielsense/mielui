import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'ghost', 'segmented'], 'default'),
    orientation: select('Orientation', ['horizontal', 'vertical'], 'horizontal', 'Appearance'),
    panels: toggle('Panels', 'Content', true),
    icons: toggle('Icons', 'Content'),
    count: toggle('Count', 'Content'),
    disabled: toggle('Disabled tab', 'State'),
    activationMode: select('Activation', ['automatic', 'manual'], 'automatic', 'Behavior'),
    forceMount: toggle('Keep panels mounted', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

function trigger(
    value: string,
    label: string,
    icon: string,
    values: Values,
    options: { count?: boolean; disabled?: boolean } = {}
): string {
    const props = attributes({
        value,
        disabled: options.disabled,
        class: (values.icons || options.count) && 'gap-1.5'
    });

    if (!values.icons && !options.count) {
        return `
        <Tabs.Trigger${props}>${label}</Tabs.Trigger>`;
    }

    const iconLine = values.icons
        ? `
            <HugeiconsIcon icon={${icon}} size={14} />`
        : '';
    const countLine = options.count
        ? `
            <span class="text-xs tabular-nums text-foreground-muted">12</span>`
        : '';

    return `
        <Tabs.Trigger${props}>${iconLine}
            ${label}${countLine}
        </Tabs.Trigger>`;
}

function panel(value: string, body: string, values: Values): string {
    const props = attributes({
        value,
        forceMount: values.forceMount,
        class: `${values.orientation === 'vertical' ? 'py-1.5' : 'pt-3'} text-sm text-foreground-muted`
    });

    return `
    <Tabs.Content${props}>
        ${body}
    </Tabs.Content>`;
}

function indent(block: string): string {
    return block
        .split('\n')
        .map((line) => (line ? `    ${line}` : line))
        .join('\n');
}

export function code(values: Values): string {
    const props = attributes({
        variant: values.variant !== 'default' && values.variant,
        orientation: values.orientation !== 'horizontal' && values.orientation,
        activationMode: values.activationMode !== 'automatic' && values.activationMode
    });
    const iconImport = values.icons
        ? `
    import {
        Activity01Icon as Activity,
        File01Icon as File,
        Home01Icon as Home
    } from '@hugeicons/core-free-icons';`
        : '';
    const iconComponent = values.icons
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';
    const triggers =
        trigger('overview', 'Overview', 'Home', values) +
        trigger('activity', 'Activity', 'Activity', values, { count: values.count }) +
        trigger('files', 'Files', 'File', values, { disabled: values.disabled });
    const panels = values.panels
        ? panel('overview', 'Everything is up to date.', values) +
          panel('activity', 'You updated the project settings.', values) +
          panel('files', 'README.md and package.json', values)
        : '';
    const tabs = `<Tabs.Root bind:value={tab}${props}>
    <Tabs.List>${triggers}
    </Tabs.List>${panels}
</Tabs.Root>`;
    const markup = values.panels
        ? `<div class="w-full max-w-sm">
${indent(tabs)}
</div>`
        : tabs;

    return `<script lang="ts">${iconImport}
    import * as Tabs from '@mielui/svelte/components/tabs';${iconComponent}

    let tab = $state('overview');
</script>

${markup}`;
}
