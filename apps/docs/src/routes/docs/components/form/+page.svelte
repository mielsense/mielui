<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Remote from './examples/remote.svelte';
    import RemoteSrc from './examples/remote.svelte?raw';
    import RemoteBasic from './examples/remote-basic.svelte';
    import RemoteBasicSrc from './examples/remote-basic.svelte?raw';

    const RemoteServerSrc =
        "import { invalid } from '@sveltejs/kit';\nimport { form } from '$app/server';\nimport * as v from 'valibot';\n\nexport const validateProfile = form(\n    v.object({\n        username: v.pipe(\n            v.string(),\n            v.trim(),\n            v.minLength(3, 'Use at least 3 characters.'),\n            v.maxLength(40, 'Use at most 40 characters.')\n        ),\n        email: v.pipe(v.string(), v.email('Enter a valid email address.')),\n        intent: v.picklist(['validate', 'validate-reset'])\n    }),\n    async ({ username, intent }, issue) => {\n        await new Promise((resolve) => setTimeout(resolve, 350));\n        if (username.toLowerCase() === 'admin') {\n            invalid(issue.username('This username is reserved. Choose another one.'));\n        }\n        if (username.toLowerCase() === 'system') {\n            invalid('This profile cannot be validated right now. Choose another demo username.');\n        }\n        return { username, intent };\n    }\n);\n";
    const remoteConfig = `const config = {
  compilerOptions: { experimental: { async: true } },
  kit: { experimental: { remoteFunctions: true } }
};

export default config;`;
    const actionExample = `<script lang="ts">
  import * as Form from '@mielui/svelte/components/form';
  import { enhance } from '$app/forms';
  import { fromAction } from 'svelte/attachments';
</${'script'}>

<Form.Root method="POST" action="?/save" {@attach fromAction(enhance)}>
  <!-- Compose fields here. -->
  <Form.Actions><Form.Submit>Save</Form.Submit></Form.Actions>
</Form.Root>`;
</script>

<svelte:head>
    <title>Mielui · Form</title>
    <meta
        name="description"
        content="Composable native forms that preserve SvelteKit actions, remote-form attachments, validation, and submitter behavior."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Form">
        Keep native submission intact, with clear feedback from the first field to the final action.
    </PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add form field fieldset input" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Native first</Typography.H2>
        <Typography.Text variant="supporting">
            Root renders a form and forwards native attributes, callbacks, and symbol-keyed
            attachments. It does not prevent submission, serialize values, swallow errors, or reset
            inputs. Use a native action, SvelteKit form action, remote form, or your own onsubmit
            handler. Native validation remains enabled unless you explicitly set novalidate.
        </Typography.Text>
        <CodeBlock code={HeroSrc} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            Actions is an independent flex container; move it before the fields or omit it entirely.
            Submit is a native submit button styled with Button and inherits Root’s pending state.
            It preserves name, value, formaction, formmethod, and other submitter attributes. Status
            is a polite live region with neutral, success, and error tones. Keep it mounted when its
            message changes.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Pass pending as a boolean or a pending-request count. It marks the form busy and shows
            loading feedback on Submit without disabling all fields or removing their values from
            FormData. Root’s element binding exposes the actual form. Use element.requestSubmit() to
            preserve validation and submitter behavior; element.submit() bypasses them.
        </Typography.Text>
    </section>
    <section id="error-summary" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">A complete error summary</Typography.H2>
        <Typography.Text variant="supporting">
            Pass validation issues directly to ErrorSummary. Each issue needs a message and may
            include a path or controlId. Paths resolve against native field names within the form;
            form-level issues remain text. Nested paths use names such as profile.email or
            members[0].email. After a submission finishes with issues, the summary receives focus.
            Set focusOnError={false} when your application manages focus. Initial server-rendered
            errors do not steal focus. Override heading or children(issues) to customize the
            content.
        </Typography.Text>
    </section>
    <section id="remote-forms" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">SvelteKit remote forms</Typography.H2>
        <Typography.Text variant="supporting">
            This live example uses SvelteKit’s experimental remote-form API. Schema errors appear
            beside each control. A reserved username is rejected on the server. Validation and
            network failures keep the draft.
        </Typography.Text>
        <ComponentPreview code={RemoteBasicSrc} class="max-h-none">
            <RemoteBasic />
        </ComponentPreview>
        <Typography.Text variant="supporting">
            The docs application opts in to remote functions and async compilation. Mielui itself
            imports no Kit runtime and requires no experimental flag. To run this example in your
            own Kit 2 application, explicitly enable both options and install Valibot (pnpm add
            valibot). These examples target Kit 2.70 or later and Svelte 5.39 or later. See the<a
                href="https://svelte.dev/docs/kit/remote-functions"
                class="underline underline-offset-4"
            >
                official remote-functions guide
            </a> before enabling experimental features.
        </Typography.Text>
        <CodeBlock code={remoteConfig} lang="javascript" copy="overlay" />
        <Typography.H3 class="docs-subsection-heading">
            Validate at the server boundary
        </Typography.H3>
        <Typography.Text variant="supporting">
            Place the handler in a .remote.ts file under src, outside src/lib/server. Its schema is
            the authority. Real mutations must authenticate and authorize the current request before
            changing data. This demonstration waits briefly to make pending feedback visible and
            returns a validation result; it writes nothing.
        </Typography.Text>
        <CodeBlock code={RemoteServerSrc} lang="typescript" copy="overlay" />
        <Typography.H3 class="docs-subsection-heading">
            Preserve the remote form’s attributes
        </Typography.H3>
        <Typography.Text variant="supporting">
            Spread the remote form or its enhance() result directly onto Root. Its attachment
            reaches the actual form. Spread fields.username.as('text') onto Input after
            Field.Control’s attributes, so Kit owns the field name, value, and validity. Do not add
            a competing bind:value or replace its name. Each rendered form needs its own instance;
            .for(id) keeps repeated forms independent.
        </Typography.Text>
        <Typography.Text variant="supporting">
            enhance receives a form instance. Await instance.submit(): false means validation
            failed; thrown errors are transport or application failures. A successful enhanced
            submission does not reset automatically. Call instance.element.reset() deliberately
            after success. The examples use toast.promise for pending, success, and failure
            feedback. Mount Toaster once in your app layout. ErrorSummary focuses the error summary
            after rendering its issues. The summary resolves issue paths to the form’s named fields;
            form-level issues remain readable text.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use field.issues() for local feedback, fields.issues() for form-level issues, and
            fields.allIssues() for a full summary. Pass local issues to Field.Root and render
            Field.Error. Pass all issues to Form.ErrorSummary, including root-level issues without a
            path. Validation is not triggered on every keystroke by Form; choose validate() or
            preflight(schema) when your application needs that policy.
        </Typography.Text>
        <Typography.H3 class="docs-subsection-heading">
            Files, checkboxes, and multiple actions
        </Typography.H3>
        <Typography.Text variant="supporting">
            Remote files need enctype="multipart/form-data" and fields.file.as('file') on a native
            file control. Unchecked checkboxes are absent from FormData, so make boolean schema
            fields optional or defaulted. Mark sensitive fields with Kit’s underscore naming
            convention, such as _password, so validation round trips do not echo them. Use
            fields.intent.as('submit', value) on each Submit to preserve which action was chosen.
        </Typography.Text>
    </section>
    <section id="multiple-actions" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Multiple actions and reset</Typography.H2>
        <Typography.Text variant="supporting">
            For server validation returned without JavaScript, declare stable describedBy and
            errorId values on Field.Control and matching IDs on Description and Error. The
            multiple-action example uses $props.id() so those relationships work before hydration.
            The basic example lets Field associate descriptions and errors after hydration.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use submitter values when the server needs to distinguish actions. This example resets
            only after successful validation; errors preserve the draft.
        </Typography.Text>
        <ComponentPreview code={RemoteSrc} class="max-h-none"><Remote /></ComponentPreview>
    </section>
    <section id="form-actions" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Stable SvelteKit form actions</Typography.H2>
        <Typography.Text variant="supporting">
            Ordinary form actions need no experimental flag. A named POST action continues to work
            without JavaScript. Add progressive enhancement with fromAction; the attachment passes
            through Root. Keep your +page.server.ts action responsible for validation and
            persistence.
        </Typography.Text>
        <CodeBlock code={actionExample} lang="svelte" copy="overlay" />
    </section>
    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Layout and feedback ownership</Typography.H2>
        <Typography.Text variant="supporting">
            Compose Fieldset for named groups and Field for individual controls. Root supplies a
            vertical layout that class can replace; class="contents" lets a dialog’s form fields and
            footer participate in the surrounding layout. Keep dialog headings outside that form
            when they belong to the dialog itself. There is no hidden validation store, submission
            timer, or global form state.
        </Typography.Text>
    </section>
</div>
