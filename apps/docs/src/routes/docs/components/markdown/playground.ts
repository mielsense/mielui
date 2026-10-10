import { attributes, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    quote: toggle('Quote', 'Content'),
    table: toggle('Table', 'Content', true),
    tasks: toggle('Task list', 'Content', true),
    codeBlock: toggle('Code block', 'Content'),
    streaming: toggle('Streaming', 'State')
};

const FENCE = '```';

function lines(values: PlaygroundValues<typeof controls>): string[] {
    const quote = values.quote
        ? ['', '> Keep image transforms outside the cache until the key audit is complete.']
        : [];
    const table = values.table
        ? [
              '',
              '| Region | Hit rate | p95 |',
              '| :--- | ---: | ---: |',
              '| iad1 | 91% | 142 ms |',
              '| fra1 | 88% | 156 ms |'
          ]
        : [];
    const tasks = values.tasks
        ? ['', '- [x] Confirm cache headers at the edge', '- [ ] Audit image transformation keys']
        : [];
    const codeBlock = values.codeBlock
        ? ['', `${FENCE}ts`, 'await edgeCache.promote({ traffic: 0.5 });', FENCE]
        : [];

    return [
        '## Edge cache rollout',
        '',
        'The canary cut origin traffic by **38%** and kept `cache_hit_age` in range. [Open the runbook](https://example.com/runbooks/edge-cache).',
        ...quote,
        ...table,
        ...tasks,
        ...codeBlock
    ];
}

export function source(values: PlaygroundValues<typeof controls>): string {
    return lines(values).join('\n');
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        streaming: values.streaming,
        class: 'w-full max-w-xl'
    });
    const report = lines(values)
        .map((line) => `        '${line}'`)
        .join(',\n');

    return `<script lang="ts">
    import { Markdown } from '@mielui/svelte/components/markdown';

    const report = [
${report}
    ].join('\\n');
</script>

<Markdown content={report}${props} />`;
}
