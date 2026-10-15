<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Field from '@mielui/svelte/components/field';
    import { Input } from '@mielui/svelte/components/input';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Composite from './examples/composite.svelte';
    import CompositeSrc from './examples/composite.svelte?raw';
    import HeroSrc from './examples/hero.svelte?raw';
    import Horizontal from './examples/horizontal.svelte';
    import HorizontalSrc from './examples/horizontal.svelte?raw';
    import Validation from './examples/validation.svelte';
    import ValidationSrc from './examples/validation.svelte?raw';
    import {
        COPY,
        ISSUE_COUNT,
        code as playgroundCode,
        controls as playgroundControls
    } from './playground';

    function issuesFor(orientation: 'vertical' | 'horizontal', amount: 'none' | 'one' | 'two') {
        const messages = COPY[orientation].issues.slice(0, ISSUE_COUNT[amount]);

        return messages.map((message) => {
            return {
                message
            };
        });
    }
</script>

<svelte:head>
    <title>Mielui · Field</title>
    <meta
        name="description"
        content="Composable labels, descriptions, and validation for native and custom form controls."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Field">Keep a control, its label, and its feedback connected.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const copy = $derived(COPY[values.orientation])}
                {const issues = $derived(issuesFor(values.orientation, values.issues))}
                {#if values.orientation === 'horizontal'}
                    <Field.Root
                        orientation="horizontal"
                        required={values.required}
                        disabled={values.disabled}
                        invalid={values.invalid ? true : undefined}
                        {issues}
                        class="max-w-sm gap-3"
                    >
                        <Field.Control>
                            {#snippet children(control)}
                                <Checkbox
                                    {...control}
                                    name="updates"
                                    aria-label={values.label ? undefined : copy.label}
                                    class="mt-0.5"
                                />
                            {/snippet}
                        </Field.Control>
                        {#if values.label || values.description || issues.length > 0}
                            <Field.Content>
                                {#if values.label}
                                    <Field.Label>{copy.label}</Field.Label>
                                {/if}
                                {#if values.description}
                                    <Field.Description>{copy.description}</Field.Description>
                                {/if}
                                {#if issues.length > 0}
                                    <Field.Error />
                                {/if}
                            </Field.Content>
                        {/if}
                    </Field.Root>
                {:else}
                    <Field.Root
                        required={values.required}
                        disabled={values.disabled}
                        invalid={values.invalid ? true : undefined}
                        {issues}
                        class="w-full max-w-sm"
                    >
                        {#if values.label}
                            <Field.Label>{copy.label}</Field.Label>
                        {/if}
                        <Field.Control>
                            {#snippet children(control)}
                                <Input
                                    {...control}
                                    type="email"
                                    name="email"
                                    aria-label={values.label ? undefined : copy.label}
                                    placeholder="you@company.com"
                                />
                            {/snippet}
                        </Field.Control>
                        {#if values.description}
                            <Field.Description>{copy.description}</Field.Description>
                        {/if}
                        {#if issues.length > 0}
                            <Field.Error />
                        {/if}
                    </Field.Root>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add field input" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Field connects a label, one control, and its feedback; the control keeps its own value.
            Spread the attributes from Field.Control onto the component that renders the actual
            input, button, or other labelable control.
        </Typography.Text>
        <CodeBlock code={HeroSrc} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            Root creates a stable control ID that Label targets, even before hydration. Mounted
            descriptions and errors are added to the control’s aria-describedby alongside any IDs
            you pass yourself. Omit either part, reorder them, or add more than one description. Set
            controlId on Root for a custom ID.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Control renders its snippet with no wrapper element. When you write your own wrapper
            component, forward the supplied attachment to the real control. Input, Textarea, and
            components with an Input part already do. If the control renders its own label, use only
            one of the two labels.
        </Typography.Text>
    </section>

    <section id="server-rendering" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Server-rendered feedback</Typography.H2>
        <Typography.Text variant="supporting">
            For a form that works without JavaScript, declare the description and error IDs
            explicitly. Pass describedBy and errorId to Control, and matching IDs to Description and
            Error. Control appends errorId only while Root is invalid. Keep explicitly referenced
            parts present whenever those IDs apply; omit the prop when you omit its part. Automatic
            metadata discovery enhances the mounted form but does not replace these server-rendered
            relationships.
        </Typography.Text>
        <CodeBlock
            code={`<Field.Root {issues}>
    <Field.Label>Email</Field.Label>
    <Field.Control describedBy="email-help" errorId="email-error">
        {#snippet children(control)}
            <Input {...control} name="email" type="email" />
        {/snippet}
    </Field.Control>
    <Field.Description id="email-help">Your work address.</Field.Description>
    <Field.Error id="email-error" />
</Field.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            Use $props.id() to prefix these IDs when a reusable form can appear more than once.
        </Typography.Text>
    </section>

    <section id="validation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Validation feedback</Typography.H2>
        <Typography.Text variant="supporting">
            Pass issues as a readonly array of objects with a message. Root derives invalid state;
            Error displays the messages and removes duplicates. SvelteKit remote field issues fit
            this shape directly. Field does not invent validation rules, submit data, or clear your
            errors while someone edits.
        </Typography.Text>
        <ComponentPreview code={ValidationSrc}>
            <Validation />
        </ComponentPreview>
        <Typography.Text variant="supporting">
            Error reveals and collapses with the short press motion token, skips movement with
            reduced motion, and exposes validation text immediately. It announces local updates
            politely by default. When a focused form-wide summary owns error feedback, set
            aria-live="off" on Error to avoid repeating the same issues.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use invalid for externally managed validity. Error can accept its own issues or custom
            children. Keep the Root validity state in sync when supplying a custom error. Error text
            describes the control; use Form.Status for a single submission announcement instead of
            announcing every field as an alert.
        </Typography.Text>
    </section>

    <section id="horizontal" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">A control beside its label</Typography.H2>
        <Typography.Text variant="supporting">
            Use horizontal orientation for a checkbox or switch. Content keeps the label and
            description together while the control remains a separate region.
        </Typography.Text>
        <ComponentPreview code={HorizontalSrc}>
            <Horizontal />
        </ComponentPreview>
    </section>

    <section id="composite-controls" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composite controls</Typography.H2>
        <Typography.Text variant="supporting">
            NumberField.Root owns its value, native name, range, and stepper state. Give Field.Root
            and NumberField.Root the same disabled and required values, then spread Control
            attributes onto NumberField.Input. Field.Label replaces NumberField.Label here.
            OTPField.Root forwards these attributes to its real input, so spread them directly onto
            that root. Neither example adds a second input or duplicates the label.
        </Typography.Text>
        <ComponentPreview code={CompositeSrc}>
            <Composite />
        </ComponentPreview>
    </section>

    <section id="grouping" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Groups and required fields</Typography.H2>
        <Typography.Text variant="supporting">
            Group supplies spacing between fields; it adds no ARIA role. For a named group of
            controls or group-wide disabled behavior, use{' '}
            <a href="/docs/components/fieldset" class="underline underline-offset-4">Fieldset</a>
            {' '}
            instead. Root's disabled and required props reach the control through Field.Control.
            When Root is required, Field.Label shows a required mark after its text. The mark is
            hidden from assistive technology, which reads the control's required state instead.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Every part except Control accepts the native attributes of the element it renders: Label
            renders a label, Description a p, and Root, Error, Content, and Group a div. Root
            supports bind:element. Compose{' '}
            <a href="/docs/components/form" class="underline underline-offset-4">Form</a>
            {' '}
            for pending feedback, submission, and a complete remote-form example.
        </Typography.Text>
    </section>
</div>
