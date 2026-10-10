import {
    attributes,
    expression,
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

function textAttribute(name: string, value: string, fallback: string): string {
    return value === fallback
        ? ''
        : attributes({
              [name]: value
          });
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        surface: values.surface !== 'theme' && values.surface,
        status: values.status !== 'idle' && values.status,
        generating: values.generating,
        disabled: values.disabled,
        allowEmpty: values.allowEmpty
    });
    const errorMessage = textAttribute('errorMessage', values.errorMessage, DEFAULT_ERROR);
    const placeholder = textAttribute('placeholder', values.placeholder, DEFAULT_PLACEHOLDER);
    const input = attributes({
        submitOnEnter: values.submitOnEnter ? undefined : expression('false')
    });
    const toolbar = attributes({
        variant: values.toolbar !== 'default' && values.toolbar
    });
    const badge = values.header
        ? `    import { Badge } from '@mielui/svelte/components/badge';
`
        : '';
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
${badge}    import * as Composer from '@mielui/svelte/components/composer';

    let value = $state('');

    function send() {
        value = '';
    }
</script>

<Composer.Root bind:value onSubmit={send}${root}${errorMessage}>${header}
    <Composer.Input${placeholder}${input} />
    <Composer.Toolbar${toolbar}>${actions}
        <Composer.Submit />
    </Composer.Toolbar>${footer}
</Composer.Root>`;
}
