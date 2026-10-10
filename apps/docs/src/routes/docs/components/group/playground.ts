import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    orientation: select('Orientation', ['horizontal', 'vertical'], 'horizontal'),
    variant: select('Button variant', ['outline', 'secondary', 'primary'], 'outline', 'Appearance'),
    size: select('Button size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    content: select('Controls', ['buttons', 'input'], 'buttons', 'Content'),
    text: toggle('Text', 'Content'),
    separators: toggle('Separators', 'Content', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const withInput = values.content === 'input';
    const rootProps = attributes({
        orientation: values.orientation !== 'horizontal' && values.orientation,
        'aria-label': withInput ? 'Website' : 'Page navigation',
        class: withInput && 'w-full max-w-xs'
    });
    const buttonProps = attributes({
        variant: values.variant !== 'primary' && values.variant,
        size: values.size !== 'md' && values.size
    });
    const separatorProps = attributes({
        orientation: values.orientation === 'vertical' && 'horizontal'
    });
    const children: string[] = [];

    if (values.text && withInput) {
        children.push('    <Group.Text as="label" for={id}>https://</Group.Text>');
    }
    if (values.text && !withInput) {
        children.push('    <Group.Text>Page 2 of 8</Group.Text>');
    }
    if (withInput) {
        const inputProps = attributes({
            id: values.text && expression('id'),
            'aria-label': !values.text && 'Website',
            placeholder: 'example.com'
        });

        children.push(`    <Input${inputProps} />`);
        children.push(`    <Button${buttonProps}>Visit</Button>`);
    } else {
        children.push(`    <Button${buttonProps}>Previous</Button>`);
        children.push(`    <Button${buttonProps}>Next</Button>`);
    }

    const separator = values.separators ? `\n    <Group.Separator${separatorProps} />\n` : '\n';
    const imports = [
        "    import { Button } from '@mielui/svelte/components/button';",
        "    import * as Group from '@mielui/svelte/components/group';",
        withInput && "    import { Input } from '@mielui/svelte/components/input';"
    ].filter((line) => line !== false);
    const script = values.text && withInput ? '\n\n    const id = $props.id();' : '';

    return `<script lang="ts">
${imports.join('\n')}${script}
</script>

<Group.Root${rootProps}>
${children.join(separator)}
</Group.Root>`;
}
