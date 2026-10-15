import {
    attributes,
    BUTTON_VARIANTS,
    CONTROL_SIZES,
    changed,
    compact,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', BUTTON_VARIANTS, 'outline'),
    appearance: select('Appearance', ['button', 'input'], 'button', 'Appearance'),
    size: select('Size', CONTROL_SIZES, 'md', 'Appearance'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    groupLabel: toggle('Group label', 'Content'),
    trailing: toggle('Trailing icon', 'Content'),
    disabled: toggle('Disabled', 'State'),
    multiple: toggle('Multiple', 'Behavior'),
    searchPlacement: select('Search placement', ['trigger', 'menu'], 'trigger', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const root = attributes({
        type: values.multiple && 'multiple'
    });
    const trigger = attributes({
        variant: changed(values.variant, 'outline'),
        appearance: changed(values.appearance, 'button'),
        size: changed(values.size, 'md'),
        placeholder: 'Select a framework',
        searchPlacement: changed(values.searchPlacement, 'trigger'),
        disabled: values.disabled,
        class: 'w-64'
    });
    const content = attributes({
        surface: changed(values.surface, 'theme')
    });
    const label = values.groupLabel
        ? `
            <Combobox.Label>Frameworks</Combobox.Label>`
        : '';
    const imports = compact([
        values.trailing && "import { Search01Icon as Search } from '@hugeicons/core-free-icons';",
        "import * as Combobox from '@mielui/svelte/components/combobox';",
        values.trailing && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
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
            <Combobox.Item value="astro" label="Astro" />
        </Combobox.Results>
    </Combobox.Content>
</Combobox.Root>`;
}
