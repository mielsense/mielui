import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select(
        'Variant',
        ['outline', 'primary', 'secondary', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'outline'
    ),
    appearance: select('Appearance', ['button', 'input'], 'button', 'Appearance'),
    size: select('Size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    surface: select('Surface', ['inherit', 'solid', 'glass'], 'inherit', 'Appearance'),
    placeholder: text('Placeholder', 'Select a framework', 'Content'),
    groupLabel: toggle('Group label', 'Content'),
    trailing: toggle('Trailing icon', 'Content'),
    disabled: toggle('Disabled', 'State'),
    disabledItem: toggle('Disabled option', 'State'),
    multiple: toggle('Multiple', 'Behavior'),
    searchPlacement: select('Search placement', ['trigger', 'menu'], 'trigger', 'Behavior'),
    placement: select(
        'Placement',
        [
            'bottom',
            'bottom-start',
            'bottom-end',
            'top',
            'top-start',
            'top-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end'
        ],
        'bottom',
        'Behavior'
    ),
    threshold: number('Match threshold', 0.28, {
        min: 0,
        max: 1,
        step: 0.01,
        group: 'Behavior'
    }),
    hoverable: toggle('Open on hover', 'Behavior'),
    delay: number('Open delay', 0, {
        min: 0,
        max: 2000,
        step: 50,
        group: 'Behavior'
    }),
    closeDelay: number('Close delay', 150, {
        min: 0,
        max: 2000,
        step: 50,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        type: values.multiple && 'multiple',
        placement: values.placement !== 'bottom' && values.placement,
        hoverable: values.hoverable,
        delay: values.delay !== 0 && values.delay,
        closeDelay: values.closeDelay !== 150 && values.closeDelay
    });
    const trigger = attributes({
        variant: values.variant !== 'outline' && values.variant,
        appearance: values.appearance !== 'button' && values.appearance,
        size: values.size !== 'md' && values.size,
        placeholder: values.placeholder !== 'Select…' && values.placeholder,
        searchPlacement: values.searchPlacement !== 'trigger' && values.searchPlacement,
        threshold: values.threshold !== 0.28 && values.threshold,
        disabled: values.disabled,
        class: 'w-64'
    });
    const content = attributes({
        surface: values.surface !== 'inherit' && values.surface
    });
    const astro = attributes({
        value: 'astro',
        label: 'Astro',
        disabled: values.disabledItem
    });
    const label = values.groupLabel
        ? `
            <Combobox.Label>Frameworks</Combobox.Label>`
        : '';
    const imports = [
        values.trailing && "import { Search01Icon as Search } from '@hugeicons/core-free-icons';",
        "import * as Combobox from '@mielui/svelte/components/combobox';",
        values.trailing && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]
        .filter(Boolean)
        .join('\n    ');
    const state = values.multiple
        ? 'let frameworks = $state<string[]>([]);'
        : "let framework = $state('');";
    const binding = values.multiple ? 'frameworks' : 'framework';
    const element = values.trailing
        ? `<Combobox.Trigger${trigger}>
        {#snippet trailing()}
            <HugeiconsIcon icon={Search} />
        {/snippet}
    </Combobox.Trigger>`
        : `<Combobox.Trigger${trigger} />`;

    return `<script lang="ts">
    ${imports}

    ${state}
</script>

<Combobox.Root bind:value={${binding}}${root}>
    ${element}
    <Combobox.Content${content}>
        <Combobox.Results>${label}
            <Combobox.Item value="nextjs" label="Next.js" />
            <Combobox.Item value="sveltekit" label="SvelteKit" />
            <Combobox.Item value="nuxtjs" label="Nuxt.js" />
            <Combobox.Item value="remix" label="Remix" />
            <Combobox.Item${astro} />
        </Combobox.Results>
    </Combobox.Content>
</Combobox.Root>`;
}
