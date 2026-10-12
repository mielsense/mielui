import {
    attributes,
    compact,
    content,
    expression,
    type PlaygroundValues,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    shortcut: text('Shortcut', 'alt+K', 'Content'),
    label: text('Custom label', '', 'Content'),
    button: toggle('Inside a button', 'Content'),
    listen: toggle('Run on shortcut', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        shortcut: values.shortcut || expression('""'),
        ontrigger: values.listen && expression('run')
    });
    const kbd = values.label ? `<Kbd${props}>${content(values.label)}</Kbd>` : `<Kbd${props} />`;
    const active = values.button || values.listen;
    const imports = compact([
        values.button && "import { Button } from '@mielui/svelte/components/button';",
        "import Kbd from '@mielui/svelte/components/kbd';"
    ]).join('\n    ');
    const state = active
        ? `

    let runs = $state(0);

    function run() {
        runs += 1;
    }`
        : '';
    const target = values.button
        ? `<Button variant="secondary" onclick={run}>
        Search
        ${kbd}
    </Button>`
        : kbd;

    if (!active) {
        return `<script lang="ts">
    ${imports}
</script>

${kbd}`;
    }

    return `<script lang="ts">
    ${imports}${state}
</script>

<div class="flex flex-col items-center gap-3">
    ${target}
    <p role="status" class="m-0 text-sm text-foreground-muted">Runs: {runs}</p>
</div>`;
}
