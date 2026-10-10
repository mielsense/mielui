import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    siblings: number('Siblings', 1, {
        min: 0,
        max: 100,
        step: 1,
        group: 'Appearance'
    }),
    total: number('Total pages', 20, {
        min: 1,
        max: 1000,
        step: 1,
        group: 'Content'
    }),
    labels: toggle('Custom labels', 'Content'),
    page: number('Page', 6, {
        min: 1,
        max: 1000,
        step: 1,
        group: 'State'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        total: values.total,
        siblings: values.siblings !== 1 && values.siblings,
        labels: values.labels && expression('labels')
    });
    const labels = values.labels
        ? `

    const labels = {
        navigation: 'Search results pages',
        previous: 'Previous results',
        next: 'Next results',
        page: (page: number) => {
            return \`Results page \${page}\`;
        }
    };`
        : '';

    return `<script lang="ts">
    import { Pagination } from '@mielui/svelte/components/pagination';

    let page = $state(${values.page});${labels}
</script>

<Pagination bind:page${props} />`;
}
