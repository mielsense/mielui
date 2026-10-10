<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Question from '@mielui/svelte/components/question';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import CancelExample from './examples/cancel.svelte';
    import CancelExampleSrc from './examples/cancel.svelte?raw';
    import ComposerTakeover from './examples/composer-takeover.svelte';
    import ComposerTakeoverSrc from './examples/composer-takeover.svelte?raw';
    import FreeText from './examples/free-text.svelte';
    import FreeTextSrc from './examples/free-text.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import MultipleChoice from './examples/multiple-choice.svelte';
    import MultipleChoiceSrc from './examples/multiple-choice.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        options as playgroundOptions
    } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add question';

    let playgroundAnswer = $state('');
    let playgroundAnswers = $state<string[]>([]);
    const usageSnippet = `import * as Question from '@mielui/svelte/components/question';

let answer = $state('');

async function submitAnswer(value: string) {
  await continueAgent(value);
}

<Question.Root variant="inset" bind:value={answer} onSubmit={submitAnswer} onError={reportError}>
  <Question.Content>
    <Question.Title>Which environment should I use?</Question.Title>
    <Question.Description>Your prompt draft remains untouched.</Question.Description>
    <Question.Options>
      <Question.Option value="preview" label="Preview" />
      <Question.Option value="production" label="Production" />
    </Question.Options>
  </Question.Content>
  <Question.Actions>
    <Question.Cancel onclick={() => skipQuestion()}>Skip question</Question.Cancel>
    <Question.Submit />
  </Question.Actions>
</Question.Root>`;
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
                {@const root = {
                    variant: values.variant,
                    status: values.status,
                    disabled: values.disabled,
                    required: values.required,
                    autofocus: values.autofocus,
                    errorMessage: values.errorMessage
                }}
                {#snippet parts()}
                    <Question.Content>
                        <Question.Title>Where should we start?</Question.Title>
                        {#if values.description}
                            <Question.Description>
                                This sets the focus for the next round of work.
                            </Question.Description>
                        {/if}
                        {#if values.type === 'text'}
                            <Question.Input
                                placeholder={values.placeholder}
                                rows={values.rows}
                                submitOnEnter={values.submitOnEnter}
                                autoresize={values.autoresize}
                            />
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
                        <Question.Submit
                            label={values.submitLabel}
                            loadingLabel={values.loadingLabel}
                        />
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
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Render{' '}
            <Typography.InlineCode>Question.Root</Typography.InlineCode>
            in the same layout slot as{' '}
            <Typography.InlineCode>Composer.Root</Typography.InlineCode>
            would occupy. Keep the prompt value in their shared parent so swapping the forms never
            clears an unsent draft.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            Use type="single" for one option, type="multiple" for several, or type="text" with
            Question.Input. Single and text modes use a string answer; multiple mode uses a string
            array. Changing type clears the answer to the new mode's empty value.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Question waits for async submit handlers and prevents duplicate submissions while
            pending. A rejected submission keeps the answer and shows errorMessage until the next
            attempt. Use onError to report failures. Changing mode or unmounting ignores an
            unfinished submission's result.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Options use the same indicators as Checkbox and RadioGroup: square checkboxes in
            multiple mode and round radios otherwise. Hover washes the row, and selection lights the
            indicator instead of filling the row. An error shows one message above the frame and one
            red frame edge; the answer field keeps its neutral border while it stays marked invalid
            for assistive technology.
        </Typography.Text>
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>variant="inset"</Typography.InlineCode>
            on
            <Typography.InlineCode>Question.Root</Typography.InlineCode>
            for the shared Card frame and recessed content surface. The default variant uses a plain
            Card. Place
            <Typography.InlineCode>Question.Actions</Typography.InlineCode>
            after
            <Typography.InlineCode>Question.Content</Typography.InlineCode>
            to keep controls in the footer. Both parts are optional; omit the description or restyle
            the actions to suit the space.
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`<Question.Root variant="inset" bind:value={answer} onSubmit={next}>
  <Question.Content>
    <Question.Title>{question.title}</Question.Title>
    <Question.Options>
      {#each question.options as option (option.value)}
        <Question.Option {...option} />
      {/each}
    </Question.Options>
  </Question.Content>
  <Question.Actions class="justify-between">
    <Question.Cancel disabled={index === 0} onclick={(event) => {
      event.preventDefault();
      back();
    }}>Back</Question.Cancel>
    <Question.Submit label="Next" />
  </Question.Actions>
</Question.Root>`}
        />
        <Typography.Text variant="supporting">
            <Typography.InlineCode>Question.Content</Typography.InlineCode>
            groups the title, description, and answer controls in a fieldset. It does not manage
            step navigation or transitions.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Store the step index and answers in the parent. When a flow mixes answer types, key Root
            by question so each step gets its own state. Changing type on the same Root clears its
            answer.
        </Typography.Text>
        <Typography.Text variant="supporting">
            To use Cancel as a Back button, call event.preventDefault() before navigating. This
            prevents Root's cancellation handler from running.
        </Typography.Text>
    </section>

    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Answer ownership</Typography.H2>
        <Typography.Text variant="supporting">
            Bind value when the answer must survive navigation. Keep submission results in
            application state and show what was accepted. A text answer is a string; a
            multiple-choice answer is a string array. Cancel should return the surrounding interface
            to a usable state, as in the composer takeover example.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Use the same inset composition for multiple selections, a written answer, or a
                question beneath a live transcript.
            {/snippet}
        </SectionHeading>

        <div id="question-series" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Question series</Typography.H3>
            <Typography.Text variant="supporting">
                Three questions in a row with a back button, a step count, and a summary at the end.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>

        <div id="multiple-choice" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple choice</Typography.H3>
            <ComponentPreview code={MultipleChoiceSrc}><MultipleChoice /></ComponentPreview>
        </div>

        <div id="free-text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Free text</Typography.H3>
            <ComponentPreview code={FreeTextSrc}><FreeText /></ComponentPreview>
        </div>

        <div id="composer-takeover" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Conversation takeover</Typography.H3>
            <Typography.Text variant="supporting">
                Answer or skip the question to restore the composer with its draft intact.
            </Typography.Text>
            <ComponentPreview code={ComposerTakeoverSrc}>
                <ComposerTakeover />
            </ComponentPreview>
        </div>
    </section>
    <section id="text-answers" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Text answers and cancelling</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Input is a textarea that grows as the person types. `rows` sets its starting height, 2 by default, and `autoresize={false}` keeps that height and scrolls instead. Enter submits and Shift+Enter adds a line. Set `submitOnEnter={false}` when answers run to several paragraphs, so Enter adds a line and only the Submit button sends. `readonly` shows the answer without allowing edits, which suits a question that has already been answered."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"In a question with options, pressing 1 to 9 picks the option with that number, and each option shows its key. Digits typed into a text answer are left alone. Add a Cancel part to let the person skip the question. `onCancel` on Root runs when it is pressed."}
            />
        </Typography.Text>
        <ComponentPreview code={CancelExampleSrc}>
            <CancelExample />
        </ComponentPreview>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Submit takes `loadingLabel` for the text it shows while `onSubmit` is pending. Submit, Input and Option accept `element` to bind their DOM node."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Title, Description, Options, Actions, Cancel and Submit render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
