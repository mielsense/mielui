import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

const DEFAULT_SUBMIT = 'Submit answer';
const DEFAULT_LOADING = 'Submitting...';
const DEFAULT_PLACEHOLDER = 'Type your answer...';
const DEFAULT_ERROR = 'Answer could not be submitted.';

export const options = [
    {
        value: 'interface',
        label: 'The interface',
        description: 'Refine the screens people use every day.'
    },
    {
        value: 'workflow',
        label: 'The workflow',
        description: 'Make the path from start to finish simpler.'
    },
    {
        value: 'foundation',
        label: 'The foundation',
        description: 'Improve the architecture behind the product.'
    }
];

export const controls = {
    variant: select('Variant', ['default', 'inset'], 'inset'),
    rows: number('Input rows', 2, {
        min: 1,
        max: 8,
        step: 1,
        group: 'Appearance'
    }),
    description: toggle('Description', 'Content', true),
    optionDescriptions: toggle('Option descriptions', 'Content', true),
    cancel: toggle('Cancel', 'Content'),
    submitLabel: text('Submit label', DEFAULT_SUBMIT, 'Content'),
    loadingLabel: text('Loading label', DEFAULT_LOADING, 'Content'),
    placeholder: text('Placeholder', DEFAULT_PLACEHOLDER, 'Content'),
    errorMessage: text('Error message', DEFAULT_ERROR, 'Content'),
    status: select('Status', ['idle', 'submitting', 'error'], 'idle', 'State'),
    disabled: toggle('Disabled', 'State'),
    type: select('Type', ['single', 'multiple', 'text'], 'single', 'Behavior'),
    required: toggle('Required', 'Behavior', true),
    autofocus: toggle('Autofocus', 'Behavior'),
    submitOnEnter: toggle('Submit on Enter', 'Behavior', true),
    autoresize: toggle('Autoresize', 'Behavior', true)
};

type Values = PlaygroundValues<typeof controls>;

function textAttribute(name: string, value: string, fallback: string): string {
    return value === fallback
        ? ''
        : attributes({
              [name]: value
          });
}

function answerControl(values: Values): string {
    if (values.type === 'text') {
        const placeholder = textAttribute('placeholder', values.placeholder, DEFAULT_PLACEHOLDER);
        const input = attributes({
            rows: values.rows !== 2 && values.rows,
            submitOnEnter: values.submitOnEnter ? undefined : expression('false'),
            autoresize: values.autoresize ? undefined : expression('false')
        });

        return `        <Question.Input${placeholder}${input} />`;
    }

    const items = options
        .map((option) => {
            const props = attributes({
                value: option.value,
                label: option.label,
                description: values.optionDescriptions && option.description
            });

            return `            <Question.Option${props} />`;
        })
        .join('\n');

    return `        <Question.Options>
${items}
        </Question.Options>`;
}

export function code(values: Values): string {
    const multiple = values.type === 'multiple';
    const root = attributes({
        variant: values.variant !== 'default' && values.variant,
        type: values.type !== 'single' && values.type,
        status: values.status !== 'idle' && values.status,
        disabled: values.disabled,
        required: values.required ? undefined : expression('false'),
        autofocus: values.autofocus
    });
    const errorMessage = textAttribute('errorMessage', values.errorMessage, DEFAULT_ERROR);
    const submit = `${textAttribute('label', values.submitLabel, DEFAULT_SUBMIT)}${textAttribute('loadingLabel', values.loadingLabel, DEFAULT_LOADING)}`;
    const description = values.description
        ? `
        <Question.Description>
            This sets the focus for the next round of work.
        </Question.Description>`
        : '';
    const cancel = values.cancel
        ? `
        <Question.Cancel>Skip</Question.Cancel>`
        : '';

    return `<script lang="ts">
    import * as Question from '@mielui/svelte/components/question';

    let answer = $state${multiple ? '<string[]>([])' : `('')`};

    function submit() {
        answer = ${multiple ? '[]' : `''`};
    }
</script>

<Question.Root bind:value={answer} onSubmit={submit}${root}${errorMessage}>
    <Question.Content>
        <Question.Title>Where should we start?</Question.Title>${description}
${answerControl(values)}
    </Question.Content>
    <Question.Actions>${cancel}
        <Question.Submit${submit} />
    </Question.Actions>
</Question.Root>`;
}
