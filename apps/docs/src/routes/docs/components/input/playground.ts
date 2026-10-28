import {
    attributes,
    changed,
    compact,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', ['outline', 'secondary'], 'outline'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    placeholder: text('Placeholder', 'mielui', 'Content'),
    leading: toggle('Leading icon', 'Content'),
    trailing: toggle('Trailing text', 'Content'),
    disabled: toggle('Disabled', 'State'),
    required: toggle('Required', 'State'),
    invalid: toggle('Invalid', 'State')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const props = attributes({
        variant: changed(values.variant, 'outline'),
        label: values.label && 'Project name',
        'aria-label': !values.label && 'Project name',
        description: values.description && 'The name shown in your workspace.',
        placeholder: values.placeholder,
        disabled: values.disabled,
        required: values.required,
        'aria-invalid': values.invalid && 'true'
    });
    const imports = compact([
        values.leading &&
            "import { GitBranchIcon as GitBranch } from '@hugeicons/core-free-icons';",
        "import { Input } from '@mielui/svelte/components/input';",
        values.leading && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const snippets = compact([
        values.leading &&
            `    {#snippet leading()}
        <HugeiconsIcon icon={GitBranch} />
    {/snippet}`,
        values.trailing &&
            `    {#snippet trailing()}
        <span>.git</span>
    {/snippet}`
    ]).join('\n');
    const element = snippets
        ? `<Input bind:value={name}${props}>
${snippets}
</Input>`
        : `<Input bind:value={name}${props} />`;

    return `<script lang="ts">
    ${imports}

    let name = $state('');
</script>

${element}`;
}
