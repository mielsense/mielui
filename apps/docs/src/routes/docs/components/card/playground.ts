import type { HeadingLevel } from '@mielui/svelte/components/typography';
import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'panel', 'inset'], 'default'),
    surface: select('Surface', ['solid', 'glass'], 'solid', 'Appearance'),
    title: toggle('Title', 'Content', true),
    description: toggle('Description', 'Content', true),
    content: toggle('Content', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    level: number('Title level', 2, {
        min: 1,
        max: 6,
        step: 1,
        group: 'Behavior'
    })
};

export const backdrop =
    'w-full rounded-[var(--radius-xl)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--chart-1)_45%,transparent),color-mix(in_oklab,var(--chart-2)_35%,transparent)_45%,color-mix(in_oklab,var(--chart-5)_45%,transparent))] p-8';

const headingLevels: readonly HeadingLevel[] = [1, 2, 3, 4, 5, 6];

/** The heading level a number stands for, or the default of 2 when it is out of range. */
export function headingLevel(value: number): HeadingLevel {
    return headingLevels.find((level) => level === value) ?? 2;
}

function indent(source: string, depth: number): string {
    const prefix = ' '.repeat(depth);

    return source
        .split('\n')
        .map((line) => `${prefix}${line}`)
        .join('\n');
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const glass = values.surface === 'glass';
    const level = headingLevel(values.level);
    const root = attributes({
        variant: values.variant !== 'default' && values.variant,
        surface: glass && 'glass',
        class: glass ? 'mx-auto w-full max-w-sm' : 'w-full max-w-sm'
    });
    const title = values.title
        ? `
        <Card.Title${attributes({ level: level !== 2 && level })}>Checkout redesign</Card.Title>`
        : '';
    const description = values.description
        ? `
        <Card.Description>A shorter payment flow for the web and mobile stores.</Card.Description>`
        : '';
    const header =
        values.title || values.description
            ? `
    <Card.Header>${title}${description}
    </Card.Header>`
            : '';
    const content = values.content
        ? `
    <Card.Content>
        <dl class="m-0 grid grid-cols-2 gap-4 text-sm">
            <div>
                <dt class="text-foreground-muted">Lead</dt>
                <dd class="m-0 mt-1">Ines Moreau</dd>
            </div>
            <div>
                <dt class="text-foreground-muted">Due</dt>
                <dd class="m-0 mt-1">October 30</dd>
            </div>
        </dl>
    </Card.Content>`
        : '';
    const footer = values.footer
        ? `
    <Card.Footer>
        <Button variant="outline">Share</Button>
        <Button>Open project</Button>
    </Card.Footer>`
        : '';
    const buttonImport = values.footer
        ? `
    import { Button } from '@mielui/svelte/components/button';`
        : '';
    const card = `<Card.Root${root}>${header}${content}${footer}
</Card.Root>`;
    const markup = glass
        ? `<div
    class="${backdrop}"
>
${indent(card, 4)}
</div>`
        : card;

    return `<script lang="ts">${buttonImport}
    import * as Card from '@mielui/svelte/components/card';
</script>

${markup}`;
}
