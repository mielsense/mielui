import {
    attributes,
    changed,
    number,
    type PlaygroundValues
} from '#lib/components/docs/playground.js';

export const controls = {
    siblings: number('Siblings', 1, {
        min: 0,
        max: 4,
        step: 1,
        group: 'Appearance'
    }),
    total: number('Total pages', 20, {
        min: 1,
        max: 1000,
        step: 1,
        group: 'Content'
    }),
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
        siblings: changed(values.siblings, 1)
    });

    return `<script lang="ts">
    import { Pagination } from '@mielui/svelte/components/pagination';

    let page = $state(${values.page});
</script>

<Pagination bind:page${props} />`;
}
