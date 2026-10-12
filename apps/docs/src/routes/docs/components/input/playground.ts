import {
    attributes,
    changed,
    compact,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['outline', 'secondary'], 'outline'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    placeholder: text('Placeholder', 'mielui', 'Content'),
    leading: toggle('Leading icon', 'Content'),
    trailing: toggle('Trailing text', 'Content'),
    disabled: toggle('Disabled', 'State'),
    readonly: toggle('Read only', 'State'),
    required: toggle('Required', 'State'),
    invalid: toggle('Invalid', 'State'),
    type: select(
        'Type',
        ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date', 'time', 'file'],
        'text',
        'Behavior'
    )
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const file = values.type === 'file';
    const leading = values.leading && !file;
    const trailing = values.trailing && !file;
    const props = attributes({
        type: changed(values.type, 'text'),
        variant: changed(values.variant, 'outline'),
        label: values.label && 'Project name',
        'aria-label': !values.label && 'Project name',
        description: values.description && 'The name shown in your workspace.',
        placeholder: !file && values.placeholder,
        disabled: values.disabled,
        readonly: values.readonly,
        required: values.required,
        'aria-invalid': values.invalid && 'true'
    });
    const imports = compact([
        leading && "import { GitBranchIcon as GitBranch } from '@hugeicons/core-free-icons';",
        "import { Input } from '@mielui/svelte/components/input';",
        leading && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const state = file ? 'let files = $state<FileList>();' : "let name = $state('');";
    const binding = file ? 'bind:files' : 'bind:value={name}';
    const snippets = compact([
        leading &&
            `    {#snippet leading()}
        <HugeiconsIcon icon={GitBranch} />
    {/snippet}`,
        trailing &&
            `    {#snippet trailing()}
        <span>.git</span>
    {/snippet}`
    ]).join('\n');
    const element = snippets
        ? `<Input ${binding}${props}>
${snippets}
</Input>`
        : `<Input ${binding}${props} />`;

    return `<script lang="ts">
    ${imports}

    ${state}
</script>

${element}`;
}
