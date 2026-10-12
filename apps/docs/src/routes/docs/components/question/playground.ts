import {
    attributes,
    changed,
    defaultOn,
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

function answerControl(values: Values): string {
    if (values.type === 'text') {
        const input = attributes({
            placeholder: changed(values.placeholder, DEFAULT_PLACEHOLDER),
            rows: changed(values.rows, 2),
            submitOnEnter: defaultOn(values.submitOnEnter),
            autoresize: defaultOn(values.autoresize)
        });

        return `        <Question.Input${input} />`;
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
        variant: changed(values.variant, 'default'),
        type: changed(values.type, 'single'),
        status: changed(values.status, 'idle'),
        disabled: values.disabled,
        required: defaultOn(values.required),
        autofocus: values.autofocus,
        errorMessage: changed(values.errorMessage, DEFAULT_ERROR)
    });
    const submit = attributes({
        label: changed(values.submitLabel, DEFAULT_SUBMIT),
        loadingLabel: changed(values.loadingLabel, DEFAULT_LOADING)
    });
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

<Question.Root bind:value={answer} onSubmit={submit}${root}>
    <Question.Content>
        <Question.Title>Where should we start?</Question.Title>${description}
${answerControl(values)}
    </Question.Content>
    <Question.Actions>${cancel}
        <Question.Submit${submit} />
    </Question.Actions>
</Question.Root>`;
}
