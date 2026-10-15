<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as TagInput from '@mielui/svelte/components/tag-input';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Adding from './examples/adding.svelte';
    import AddingSrc from './examples/adding.svelte?raw';
    import Controlled from './examples/controlled.svelte';
    import ControlledSrc from './examples/controlled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import MaxTags from './examples/max-tags.svelte';
    import MaxTagsSrc from './examples/max-tags.svelte?raw';
    import Required from './examples/required.svelte';
    import RequiredSrc from './examples/required.svelte?raw';
    import Validation from './examples/validation.svelte';
    import ValidationSrc from './examples/validation.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundTags = $state(['svelte', 'design-system']);

    const usageCode = `<script lang="ts">
    import * as TagInput from '@mielui/svelte/components/tag-input';

    let tags = $state(['svelte']);
</${'script'}>

<TagInput.Root bind:tags label="Topics">
    <TagInput.List />
    <TagInput.Input placeholder="Add a topic…" />
</TagInput.Root>`;
</script>

<svelte:head>
    <title>Mielui · Tag Input</title>
    <meta
        name="description"
        content="Enter and validate removable tags with keyboard, paste, and form support."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Tag Input">
        A field that turns typed text into removable tags. Type a value and press Enter.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-md">
                    <TagInput.Root
                        bind:tags={playgroundTags}
                        variant={values.variant}
                        label={values.label ? 'Topics' : undefined}
                        description={values.description
                            ? 'Type a topic and press Enter.'
                            : undefined}
                        error={values.error ? 'Topics must be lowercase.' : undefined}
                        max={values.max ? 3 : undefined}
                        disabled={values.disabled}
                    >
                        <TagInput.List />
                        <TagInput.Input
                            aria-label={values.label ? undefined : 'Topics'}
                            placeholder={values.placeholder || undefined}
                        />
                    </TagInput.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add tag-input" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Bind `tags` on Root to the list. Inside Root, `List` renders the tags and `Input` takes new ones. Enter or a comma adds the typed text, and Backspace in an empty input removes the last tag.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Set `name` to submit each tag as a hidden form value. A disabled field submits nothing. Bind `element` on Input to reach the text input.'}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="saving-topics" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Saving topics</Typography.H3>
            <Typography.Text variant="supporting">
                A tag field with a count, a clear button, and a save button that reads the current
                tags.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="adding-tags" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Adding tags</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Enter adds the typed text, and so does any character in `delimiters`, a comma by default. `addOnBlur` adds what is left in the field when it loses focus, and `addOnPaste` splits pasted text on the same delimiters. Both are on by default. `normalize` cleans each tag before it is added. A tag that already exists is refused unless `allowDuplicates` is set. Bind `query` to read or set the text still being typed.'}
                />
            </Typography.Text>
            <ComponentPreview code={AddingSrc}>
                <Adding />
            </ComponentPreview>
        </div>

        <div id="responding-to-changes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Responding to changes</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`onAdd` and `onRemove` report single tags. `onTagsChange` reports the whole list.'}
                />
            </Typography.Text>
            <ComponentPreview code={ControlledSrc}>
                <Controlled />
            </ComponentPreview>
        </div>

        <div id="validation" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Validation</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Return `false` or a message from `validate` to refuse a tag. `onReject` receives the refused value, a `code`, and a readable `reason`.'}
                />
            </Typography.Text>
            <ComponentPreview code={ValidationSrc}>
                <Validation />
            </ComponentPreview>
        </div>

        <div id="maximum" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Maximum</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`max` caps the list. Extra tags are refused with the `max-tags` code.'}
                />
            </Typography.Text>
            <ComponentPreview code={MaxTagsSrc}>
                <MaxTags />
            </ComponentPreview>
        </div>

        <div id="required" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Required</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`required` blocks native form submission until there is at least one tag. `requiredMessage` sets the message the browser shows.'}
                />
            </Typography.Text>
            <ComponentPreview code={RequiredSrc}>
                <Required />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English. Pass a `labels` object to Root to translate the remove button's name, the refusal reasons, the announcements after a tag is added or removed, and the required message. `TagInputLabels` types it. Every key is optional, and omitted keys keep their English default. `requiredMessage` wins over `labels.required`."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<TagInput.Root
    bind:tags
    label="Sujets"
    labels={{
        remove: (tag) => \`Supprimer \${tag}\`,
        duplicate: (tag) => \`\${tag} est déjà dans la liste.\`,
        maxReached: (max) => \`\${max} sujets au maximum.\`,
        added: (tag, count) => \`\${tag} ajouté, \${count} au total.\`,
        removed: (tag, count) => \`\${tag} retiré, \${count} au total.\`,
        required: 'Ajoutez au moins un sujet.'
    }}
>
    <TagInput.List />
    <TagInput.Input placeholder="Ajouter un sujet…" />
</TagInput.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>
