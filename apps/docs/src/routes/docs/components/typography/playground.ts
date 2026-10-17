import type { TypographyTextVariant } from '@mielui/svelte/components/typography';
import { attributes, type PlaygroundValues, select } from '$lib/components/docs/playground';

export const controls = {
    role: select(
        'Component',
        [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'title',
            'description',
            'text-lead',
            'text-body',
            'text-supporting',
            'metadata',
            'inline-code'
        ],
        'text-lead'
    )
};

export const samples = {
    heading: 'Preparing the September release',
    paragraph:
        'Review the updated components and documentation before publishing the next release.',
    metadata: 'Project notes / September 3, 2026',
    code: 'pnpm run release-gate'
};

type Role = PlaygroundValues<typeof controls>['role'];

const names: Record<Role, string> = {
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
    h5: 'H5',
    h6: 'H6',
    title: 'Title',
    description: 'Description',
    'text-lead': 'Text',
    'text-body': 'Text',
    'text-supporting': 'Text',
    metadata: 'Metadata',
    'inline-code': 'InlineCode'
};

/** The Text variant a role prints, leaving out `supporting` because it is the default. */
export function textVariant(role: Role): TypographyTextVariant | undefined {
    if (role === 'text-lead') {
        return 'lead';
    }

    if (role === 'text-body') {
        return 'body';
    }

    return undefined;
}

function isParagraph(role: Role): boolean {
    return role === 'description' || names[role] === 'Text';
}

function sample(role: Role): string {
    if (isParagraph(role)) {
        return samples.paragraph;
    }

    if (role === 'metadata') {
        return samples.metadata;
    }

    if (role === 'inline-code') {
        return samples.code;
    }

    return samples.heading;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const name = `Typography.${names[values.role]}`;
    const props = attributes({
        level: values.role === 'title' && 2,
        variant: textVariant(values.role)
    });
    const markup = isParagraph(values.role)
        ? `<${name}${props}>
    ${sample(values.role)}
</${name}>`
        : `<${name}${props}>${sample(values.role)}</${name}>`;

    return `<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
</script>

${markup}`;
}
