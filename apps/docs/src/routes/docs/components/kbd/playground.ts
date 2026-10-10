import {
    attributes,
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

function attribute(value: string) {
    if (value === '' || /["{&]/.test(value)) {
        return expression(JSON.stringify(value));
    }

    return value;
}

function content(value: string): string {
    if (/[{}<&]/.test(value) || value !== value.trim()) {
        return `{${JSON.stringify(value)}}`;
    }

    return value;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        shortcut: attribute(values.shortcut),
        ontrigger: values.listen && expression('run')
    });
    const kbd = values.label ? `<Kbd${props}>${content(values.label)}</Kbd>` : `<Kbd${props} />`;
    const active = values.button || values.listen;
    const buttonImport = values.button
        ? `
    import { Button } from '@mielui/svelte/components/button';`
        : '';
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
    import Kbd from '@mielui/svelte/components/kbd';
</script>

${kbd}`;
    }

    return `<script lang="ts">${buttonImport}
    import Kbd from '@mielui/svelte/components/kbd';${state}
</script>

<div class="flex flex-col items-center gap-3">
    ${target}
    <p role="status" class="m-0 text-sm text-foreground-muted">Runs: {runs}</p>
</div>`;
}
