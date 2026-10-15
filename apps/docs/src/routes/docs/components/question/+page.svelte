<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Question from '@mielui/svelte/components/question';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import CancelExample from './examples/cancel.svelte';
    import CancelExampleSrc from './examples/cancel.svelte?raw';
    import ComposerTakeover from './examples/composer-takeover.svelte';
    import ComposerTakeoverSrc from './examples/composer-takeover.svelte?raw';
    import FreeText from './examples/free-text.svelte';
    import FreeTextSrc from './examples/free-text.svelte?raw';
    import Labels from './examples/labels.svelte';
    import LabelsSrc from './examples/labels.svelte?raw';
    import MultipleChoice from './examples/multiple-choice.svelte';
    import MultipleChoiceSrc from './examples/multiple-choice.svelte?raw';
    import Series from './examples/series.svelte';
    import SeriesSrc from './examples/series.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        options as playgroundOptions
    } from './playground';

    let playgroundAnswer = $state('');
    let playgroundAnswers = $state<string[]>([]);
    const usageSnippet = `<script lang="ts">
    import * as Question from '@mielui/svelte/components/question';

    let {
        onAnswer,
        onSkip
    }: {
        onAnswer: (answer: string) => Promise<void>;
        onSkip: () => void;
    } = $props();

    let answer = $state('');
</${'script'}>

<Question.Root variant="inset" bind:value={answer} onSubmit={onAnswer} onCancel={onSkip}>
    <Question.Content>
        <Question.Title>Which environment should I use?</Question.Title>
        <Question.Description>Your prompt draft stays as it is.</Question.Description>
        <Question.Options>
            <Question.Option value="preview" label="Preview" />
            <Question.Option value="production" label="Production" />
        </Question.Options>
    </Question.Content>
    <Question.Actions>
        <Question.Cancel>Skip</Question.Cancel>
        <Question.Submit />
    </Question.Actions>
</Question.Root>`;

    const labelsCode = `<script lang="ts">
    import * as Question from '@mielui/svelte/components/question';
    import type { QuestionLabels } from '@mielui/svelte/components/question';

    const labels: QuestionLabels = {
        selectAnswer: 'Choisissez une réponse.',
        selectAnswers: 'Choisissez au moins une réponse.',
        enterAnswer: 'Saisissez une réponse.',
        submitError: "La réponse n'a pas pu être envoyée.",
        submit: 'Envoyer',
        submitting: 'Envoi…',
        answer: 'Réponse',
        placeholder: 'Saisissez votre réponse…'
    };
</${'script'}>`;
</script>

<svelte:head>
    <title>Mielui · Question</title>
    <meta
        name="description"
        content="An inline agent question that temporarily replaces the prompt composer with choice or free-text answers."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Question">
        Collect a single choice, multiple choices, or a written answer. Compose several questions
        into a step-by-step flow.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const root = $derived({
                    variant: values.variant,
                    status: values.status,
                    disabled: values.disabled,
                    required: values.required
                })}
                {#snippet parts()}
                    <Question.Content>
                        <Question.Title>Where should we start?</Question.Title>
                        {#if values.description}
                            <Question.Description>
                                This sets the focus for the next round of work.
                            </Question.Description>
                        {/if}
                        {#if values.type === 'text'}
                            <Question.Input />
                        {:else}
                            <Question.Options>
                                {#each playgroundOptions as option (option.value)}
                                    <Question.Option
                                        value={option.value}
                                        label={option.label}
                                        description={values.optionDescriptions
                                            ? option.description
                                            : undefined}
                                    />
                                {/each}
                            </Question.Options>
                        {/if}
                    </Question.Content>
                    <Question.Actions>
                        {#if values.cancel}
                            <Question.Cancel>Skip</Question.Cancel>
                        {/if}
                        <Question.Submit />
                    </Question.Actions>
                {/snippet}
                <div class="w-full max-w-xl">
                    {#if values.type === 'multiple'}
                        <Question.Root
                            {...root}
                            type="multiple"
                            bind:value={playgroundAnswers}
                            onSubmit={() => {
                                playgroundAnswers = [];
                            }}
                        >
                            {@render parts()}
                        </Question.Root>
                    {:else}
                        <Question.Root
                            {...root}
                            type={values.type}
                            bind:value={playgroundAnswer}
                            onSubmit={() => {
                                playgroundAnswer = '';
                            }}
                        >
                            {@render parts()}
                        </Question.Root>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add question" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Render{' '}
            <Typography.InlineCode>Question.Root</Typography.InlineCode>
            in the slot{' '}
            <Typography.InlineCode>Composer.Root</Typography.InlineCode>
            would occupy. Keep the prompt value in their shared parent so swapping the two never
            clears an unsent draft.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"Use `type=\"single\"` for one option, `type=\"multiple\"` for several, or `type=\"text\"` with `Question.Input`. Single and text modes use a string answer; multiple mode uses a string array. Changing `type` clears the answer to the new mode's empty value."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Question waits for an async `onSubmit` and ignores repeat submissions while it is pending. A rejected submission keeps the answer and shows the error message until the next attempt. Use `onError` to report failures. Changing mode or unmounting ignores an unfinished submission's result."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            Options use the same indicators as Checkbox and RadioGroup: square checkboxes in
            multiple mode and round radios otherwise. An error shows one message above the frame and
            tints the frame edge.
        </Typography.Text>
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`variant=\"inset\"` frames the question with a recessed content surface; the default variant uses a plain Card. Place `Question.Actions` after `Question.Content` to keep the controls in the footer. Both the description and the actions are optional."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`Question.Content` groups the title, description, and answer controls in a fieldset. It does not manage step navigation. Store the step index and answers in the parent. When a flow mixes answer types, key Root by question so each step gets its own state."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"To use Cancel as a Back button, call `event.preventDefault()` in its `onclick` before navigating. This keeps Root's `onCancel` from running."}
            />
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`<Question.Root
    variant="inset"
    bind:value={answers[step]}
    labels={{ submit: 'Next' }}
    onSubmit={next}
>
    <Question.Content>
        <Question.Title>{question.title}</Question.Title>
        <Question.Options>
            {#each question.options as option (option.value)}
                <Question.Option {...option} />
            {/each}
        </Question.Options>
    </Question.Content>
    <Question.Actions>
        <Question.Cancel
            disabled={step === 0}
            onclick={(event) => {
                event.preventDefault();
                step -= 1;
            }}
        >
            Back
        </Question.Cancel>
        <Question.Submit />
    </Question.Actions>
</Question.Root>`}
        />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="question-series" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Question series</Typography.H3>
            <Typography.Text variant="supporting">
                Three questions in a row with a back button, a step count, and a summary at the end.
            </Typography.Text>
            <ComponentPreview code={SeriesSrc}>
                <Series />
            </ComponentPreview>
        </div>

        <div id="multiple-choice" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple choice</Typography.H3>
            <ComponentPreview code={MultipleChoiceSrc}>
                <MultipleChoice />
            </ComponentPreview>
        </div>

        <div id="free-text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Free text</Typography.H3>
            <ComponentPreview code={FreeTextSrc}>
                <FreeText />
            </ComponentPreview>
        </div>

        <div id="skip" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"
                >Skip and multi-line answers</Typography.H3
            >
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`submitOnEnter={false}` makes Enter add a line, so only the button sends. `onCancel` on Root runs when Skip is pressed."}
                />
            </Typography.Text>
            <ComponentPreview code={CancelExampleSrc}>
                <CancelExample />
            </ComponentPreview>
        </div>

        <div id="composer-takeover" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Composer takeover</Typography.H3>
            <Typography.Text variant="supporting">
                Answer or skip the question to restore the composer with its draft intact.
            </Typography.Text>
            <ComponentPreview code={ComposerTakeoverSrc}>
                <ComposerTakeover />
            </ComponentPreview>
        </div>

        <div id="translated-labels" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Translated labels</Typography.H3>
            <Typography.Text variant="supporting">
                Submit without choosing to see the translated validation message.
            </Typography.Text>
            <ComponentPreview code={LabelsSrc}>
                <Labels />
            </ComponentPreview>
        </div>
    </section>

    <section id="text-answers" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Text answers</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`Question.Input` is a textarea that grows as the person types. `rows` sets its starting height, 2 by default, and `autoresize={false}` keeps that height and scrolls instead. Enter submits and Shift+Enter adds a line; `submitOnEnter={false}` makes Enter add a line. `readonly` shows the answer without allowing edits."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            In a question with options, pressing 1 to 9 picks the option with that number, and each
            option shows its key. Digits typed into a text answer are left alone.
        </Typography.Text>
    </section>

    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`Question.Submit` reads `labels.submit` for its text and `labels.submitting` for the text it shows while `onSubmit` is pending; pass `children` to replace its content. `Question.Input` takes `placeholder` and `aria-label`, which win over `labels.placeholder` and `labels.answer`. Submit, Input and Option accept `bind:element` for their DOM node."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Title, Description, Options, Actions, Cancel and Submit render their `children` and accept `class` and other element attributes."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `QuestionLabels` to `Question.Root` to translate the three validation messages, the message shown when submitting fails, the submit button text, and the answer field's placeholder and accessible name. Every key is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
