import {
    attributes,
    changed,
    compact,
    headingLevel,
    number,
    type PlaygroundValues,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    media: toggle('Media', 'Content'),
    title: toggle('Title', 'Content', true),
    description: toggle('Description', 'Content', true),
    content: toggle('Content', 'Content'),
    actions: toggle('Actions', 'Content', true),
    level: number('Title level', 2, {
        min: 1,
        max: 6,
        step: 1,
        group: 'Behavior'
    })
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const level = headingLevel(values.level);
    const imports = compact([
        values.media && "import { PackageIcon } from '@hugeicons/core-free-icons';",
        values.actions && "import { Button } from '@mielui/svelte/components/button';",
        "import * as EmptyState from '@mielui/svelte/components/empty-state';",
        values.content && "import * as Typography from '@mielui/svelte/components/typography';",
        values.media && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const media = values.media
        ? `
    <EmptyState.Media aria-hidden="true">
        <HugeiconsIcon icon={PackageIcon} class="size-6" />
    </EmptyState.Media>`
        : '';
    const title = values.title
        ? `
        <EmptyState.Title${attributes({ level: changed(level, 2) })}>No components yet</EmptyState.Title>`
        : '';
    const description = values.description
        ? `
        <EmptyState.Description>
            Add your first component to start building your interface.
        </EmptyState.Description>`
        : '';
    const header =
        values.title || values.description
            ? `
    <EmptyState.Header>${title}${description}
    </EmptyState.Header>`
            : '';
    const content = values.content
        ? `
    <EmptyState.Content>
        <Typography.InlineCode>pnpm dlx @mielui/svelte add button</Typography.InlineCode>
    </EmptyState.Content>`
        : '';
    const actions = values.actions
        ? `
    <EmptyState.Actions>
        <Button href="/docs/installation">Add a component</Button>
    </EmptyState.Actions>`
        : '';

    return `<script lang="ts">
    ${imports}
</script>

<EmptyState.Root class="max-w-sm">${media}${header}${content}${actions}
</EmptyState.Root>`;
}
