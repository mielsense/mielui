import {
    changed,
    expression,
    number,
    type PlaygroundValues,
    tag,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    lines: number('Lines', 3, {
        min: 1,
        max: 8,
        group: 'Appearance'
    }),
    maxHeight: number('Max height', 320, {
        min: 80,
        max: 480,
        step: 8,
        group: 'Appearance'
    }),
    defaultExpanded: toggle('Expanded by default', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = {
        lines: changed(values.lines, 3),
        maxHeight: changed(values.maxHeight, 320),
        defaultExpanded: values.defaultExpanded,
        labels: expression("{ region: 'Migration details' }"),
        class: 'w-full max-w-md'
    };

    return `<script lang="ts">
    import { ShowMore } from '@mielui/svelte/components/show-more';
</script>

${tag('ShowMore', props, '>')}
    <div class="flex flex-col gap-2">
        <p>
            The workspace migration is scheduled for Tuesday at 09:00 UTC. Your projects, comments,
            and uploaded files will move together. Read-only access remains available during the
            transfer.
        </p>
        <p>
            Before the migration, export any reports needed for the morning meeting. Scheduled jobs
            will pause for up to fifteen minutes and resume after the new workspace passes its
            health checks.
        </p>
        <p>
            If a check fails, the team will restore the previous workspace and notify its owners.
            Existing links will continue to work after the transfer.
        </p>
    </div>
</ShowMore>`;
}
