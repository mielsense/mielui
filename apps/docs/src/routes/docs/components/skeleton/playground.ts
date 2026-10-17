import {
    attributes,
    changed,
    expression,
    number,
    type PlaygroundValues,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    lines: number('Lines', 3, {
        min: 0,
        max: 8,
        step: 1,
        group: 'Appearance'
    }),
    custom: toggle('Custom placeholder', 'Content'),
    ready: toggle('Ready', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        ready: values.ready || expression('false'),
        lines: changed(values.lines, 3),
        lineHeight: 24,
        label: 'Workspace summary'
    });
    const imports = values.custom ? 'Skeleton, SkeletonSwap' : 'SkeletonSwap';
    const skeleton = values.custom
        ? `
        {#snippet skeleton()}
            <div class="flex flex-col gap-3 py-1.5">
                <Skeleton variant="shimmer" class="h-3 w-full" />
                <Skeleton variant="shimmer" class="h-3 w-full" />
                <Skeleton variant="shimmer" class="h-3 w-2/3" />
            </div>
        {/snippet}`
        : '';

    return `<script lang="ts">
    import { ${imports} } from '@mielui/svelte/components/skeleton';
</script>

<div class="w-full max-w-sm">
    <SkeletonSwap${props}>${skeleton}
        <p class="m-0 text-sm leading-6 text-foreground-muted">
            Your workspace has 12 active projects. Three are ready for review, and the next team
            check-in is on Friday.
        </p>
    </SkeletonSwap>
</div>`;
}
