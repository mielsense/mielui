import type { HeadingLevel } from '@mielui/svelte/components/typography';
import { attributes, number, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

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

const headingLevels: readonly HeadingLevel[] = [1, 2, 3, 4, 5, 6];

/** The heading level a number stands for, or the default of 2 when it is out of range. */
export function headingLevel(value: number): HeadingLevel {
    return headingLevels.find((level) => level === value) ?? 2;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const level = headingLevel(values.level);
    const iconImport = values.media
        ? `
    import { PackageIcon } from '@hugeicons/core-free-icons';`
        : '';
    const buttonImport = values.actions
        ? `
    import { Button } from '@mielui/svelte/components/button';`
        : '';
    const typographyImport = values.content
        ? `
    import * as Typography from '@mielui/svelte/components/typography';`
        : '';
    const iconComponent = values.media
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';
    const media = values.media
        ? `
    <EmptyState.Media aria-hidden="true">
        <HugeiconsIcon icon={PackageIcon} class="size-6" />
    </EmptyState.Media>`
        : '';
    const title = values.title
        ? `
        <EmptyState.Title${attributes({ level: level !== 2 && level })}>No components yet</EmptyState.Title>`
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

    return `<script lang="ts">${iconImport}${buttonImport}
    import * as EmptyState from '@mielui/svelte/components/empty-state';${typographyImport}${iconComponent}
</script>

<EmptyState.Root class="max-w-sm">${media}${header}${content}${actions}
</EmptyState.Root>`;
}
