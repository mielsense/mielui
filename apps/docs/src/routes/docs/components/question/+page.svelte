<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import ComposerTakeover from './examples/composer-takeover.svelte';
    import ComposerTakeoverSrc from './examples/composer-takeover.svelte?raw';
    import FreeText from './examples/free-text.svelte';
    import FreeTextSrc from './examples/free-text.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import MultipleChoice from './examples/multiple-choice.svelte';
    import MultipleChoiceSrc from './examples/multiple-choice.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add question';
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
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Render{' '}
            <Typography.InlineCode>Question.Root</Typography.InlineCode> in the same layout slot as{' '}
            <Typography.InlineCode>Composer.Root</Typography.InlineCode>
            . Keep the prompt value in their shared parent so swapping the forms never clears an
            unsent draft.
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
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>variant="inset"</Typography.InlineCode> on
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
</div>
