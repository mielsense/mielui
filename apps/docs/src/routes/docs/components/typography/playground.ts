import {
    attributes,
    changed,
    headingLevel,
    number,
    type PlaygroundValues,
    select
} from '$lib/components/docs/playground';

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
            'text',
            'metadata',
            'inline-code'
        ],
        'text'
    ),
    variant: select('Text variant', ['lead', 'body', 'supporting'], 'lead', 'Appearance'),
    level: number('Title level', 2, {
        min: 1,
        max: 6,
        step: 1,
        group: 'Behavior'
    })
};

export const samples = {
    heading: 'Preparing the September release',
    paragraph:
        'Review the updated components and documentation before publishing the next release.',
    metadata: 'Project notes / September 3, 2026',
    code: 'pnpm run release-gate'
};

const names = {
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
    h5: 'H5',
    h6: 'H6',
    title: 'Title',
    description: 'Description',
    text: 'Text',
    metadata: 'Metadata',
    'inline-code': 'InlineCode'
};

type Values = PlaygroundValues<typeof controls>;

function sample(role: Values['role']): string {
    if (role === 'description' || role === 'text') {
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

export function code(values: Values): string {
    const name = `Typography.${names[values.role]}`;
    const props = attributes({
        level: values.role === 'title' && headingLevel(values.level),
        variant: values.role === 'text' && changed(values.variant, 'supporting')
    });
    const paragraph = values.role === 'description' || values.role === 'text';
    const markup = paragraph
        ? `<${name}${props}>
    ${sample(values.role)}
</${name}>`
        : `<${name}${props}>${sample(values.role)}</${name}>`;

    return `<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
</script>

${markup}`;
}
