import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    lines: number('Lines', 3, {
        min: 0,
        max: 8,
        step: 1,
        group: 'Appearance'
    }),
    lineHeight: number('Line height', 24, {
        min: 12,
        max: 40,
        step: 1,
        group: 'Appearance'
    }),
    barHeight: number('Bar height', 9, {
        min: 2,
        max: 24,
        step: 1,
        group: 'Appearance'
    }),
    reserve: toggle('Reserve a height', 'Appearance'),
    reserveHeight: number('Reserved height', 96, {
        min: 0,
        max: 240,
        step: 4,
        group: 'Appearance'
    }),
    custom: toggle('Custom placeholder', 'Content'),
    label: text('Label', 'Workspace summary', 'Content'),
    ready: toggle('Ready', 'State'),
    delay: number('Delay', 120, {
        min: 0,
        max: 2000,
        step: 20,
        group: 'Behavior'
    }),
    minVisible: number('Minimum visible', 380, {
        min: 0,
        max: 3000,
        step: 20,
        group: 'Behavior'
    })
};

export const shapeControls = {
    variant: select('Variant', ['default', 'shimmer'], 'default'),
    w: number('Width', 240, {
        min: 0,
        max: 400,
        step: 4,
        group: 'Appearance'
    }),
    h: number('Height', 120, {
        min: 0,
        max: 400,
        step: 4,
        group: 'Appearance'
    }),
    unit: select(
        'Unit',
        [
            'px',
            'rem',
            'em',
            '%',
            'vh',
            'vw',
            'vmin',
            'vmax',
            'ch',
            'ex',
            'cm',
            'mm',
            'in',
            'pt',
            'pc'
        ],
        'px',
        'Appearance'
    ),
    circle: toggle('Circle', 'Appearance')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        ready: values.ready || expression('false'),
        lines: values.lines !== 3 && values.lines,
        lineHeight: values.lineHeight !== 21 && values.lineHeight,
        barHeight: values.barHeight !== 9 && values.barHeight,
        reserve: values.reserve && values.reserveHeight,
        delay: values.delay !== 120 && values.delay,
        minVisible: values.minVisible !== 380 && values.minVisible,
        label: values.label
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

export function shapeCode(values: PlaygroundValues<typeof shapeControls>): string {
    const props = attributes({
        variant: values.variant !== 'default' && values.variant,
        w: values.w,
        h: values.h,
        unit: values.unit !== 'px' && values.unit,
        class: values.circle && 'rounded-full'
    });

    return `<script lang="ts">
    import { Skeleton } from '@mielui/svelte/components/skeleton';
</script>

<div class="flex h-48 w-full max-w-sm items-center justify-center overflow-hidden">
    <Skeleton${props} />
</div>`;
}
