import {
    attributes,
    changed,
    defaultOn,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

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
    type: select('Type', ['single', 'multiple', 'text'], 'single', 'Content'),
    description: toggle('Description', 'Content', true),
    optionDescriptions: toggle('Option descriptions', 'Content', true),
    cancel: toggle('Cancel', 'Content'),
    status: select('Status', ['idle', 'submitting', 'error'], 'idle', 'State'),
    disabled: toggle('Disabled', 'State'),
    required: toggle('Required', 'State', true)
};

type Values = PlaygroundValues<typeof controls>;

function answerControl(values: Values): string {
    if (values.type === 'text') {
        return '        <Question.Input />';
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
        required: defaultOn(values.required)
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
        <Question.Submit />
    </Question.Actions>
</Question.Root>`;
}
