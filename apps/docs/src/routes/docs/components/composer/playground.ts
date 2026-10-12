import {
    attributes,
    changed,
    compact,
    defaultOn,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

const DEFAULT_PLACEHOLDER = 'Message the agent...';
const DEFAULT_ERROR = 'Message could not be sent.';

export const controls = {
    toolbar: select('Toolbar', ['default', 'inset'], 'default'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    placeholder: text('Placeholder', DEFAULT_PLACEHOLDER, 'Content'),
    errorMessage: text('Error message', DEFAULT_ERROR, 'Content'),
    header: toggle('Header', 'Content'),
    actions: toggle('Actions', 'Content', true),
    footer: toggle('Footer', 'Content'),
    status: select('Status', ['idle', 'submitting', 'error'], 'idle', 'State'),
    generating: toggle('Generating', 'State'),
    disabled: toggle('Disabled', 'State'),
    allowEmpty: toggle('Allow empty', 'Behavior'),
    submitOnEnter: toggle('Submit on Enter', 'Behavior', true)
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const root = attributes({
        surface: changed(values.surface, 'theme'),
        status: changed(values.status, 'idle'),
        generating: values.generating,
        disabled: values.disabled,
        allowEmpty: values.allowEmpty,
        errorMessage: changed(values.errorMessage, DEFAULT_ERROR)
    });
    const input = attributes({
        placeholder: changed(values.placeholder, DEFAULT_PLACEHOLDER),
        submitOnEnter: defaultOn(values.submitOnEnter)
    });
    const toolbar = attributes({
        variant: changed(values.toolbar, 'default')
    });
    const imports = compact([
        values.header && "import { Badge } from '@mielui/svelte/components/badge';",
        "import * as Composer from '@mielui/svelte/components/composer';"
    ]).join('\n    ');
    const header = values.header
        ? `
    <Composer.Header>
        <Badge variant="outline">release-notes.md</Badge>
    </Composer.Header>`
        : '';
    const actions = values.actions
        ? `
        <Composer.Actions>
            <span class="px-2 text-xs text-foreground-muted">Mielui 3.1</span>
        </Composer.Actions>`
        : '';
    const footer = values.footer
        ? `
    <Composer.Footer>
        <span class="px-2.5">Answers can cite the web.</span>
    </Composer.Footer>`
        : '';

    return `<script lang="ts">
    ${imports}

    let value = $state('');

    function send() {
        value = '';
    }
</script>

<Composer.Root bind:value onSubmit={send}${root}>${header}
    <Composer.Input${input} />
    <Composer.Toolbar${toolbar}>${actions}
        <Composer.Submit />
    </Composer.Toolbar>${footer}
</Composer.Root>`;
}
