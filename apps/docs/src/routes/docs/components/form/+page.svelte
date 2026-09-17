<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Remote from './examples/remote.svelte';
    import RemoteSrc from './examples/remote.svelte?raw';

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
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Form</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Keep native submission intact, with clear feedback from the first field to the final
                action.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
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
            ErrorSummary accepts issues containing message and an optional controlId. It renders
            nothing when empty, links directly to known controls, and keeps cross-field or
            form-level messages visible without inventing a target. Override its heading snippet or
            children(issues) snippet to compose your own summary body. The summary does not announce
            or move focus automatically; bind:element lets your submission handler focus it
            deliberately after tick(). Field.Error announces local changes politely, while Status
            owns pending and submission feedback.
        </Typography.Text>
    </section>
    <section id="remote-forms" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">SvelteKit remote forms</Typography.H2>
        <Typography.Text variant="supporting">
            This live example uses SvelteKit’s experimental remote-form API. Schema errors appear
            beside each control. A reserved username is rejected on the server. The second submitter
            resets only after a successful response; validation and network failures keep the draft.
        </Typography.Text>
        <ComponentPreview code={RemoteSrc} class="max-h-none"><Remote /></ComponentPreview>
        <Typography.Text variant="supporting">
            The docs application opts in to remote functions and async compilation. Mielui itself
            imports no Kit runtime and requires no experimental flag. To run this example in your
            own Kit 2 application, explicitly enable both options and install Valibot (pnpm add
            valibot). These examples target Kit 2.70 or later and Svelte 5.33 or later. See the<a
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
            after success. The example catches failures, announces a useful message, and focuses the
            error summary after rendering its issues. The summary links to fields with known IDs;
            form-level issues remain readable text.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use field.issues() for local feedback, fields.issues() for form-level issues, and
            fields.allIssues() for a full summary. Pass local issues to Field.Root and render
            Field.Error. Pass all issues to Form.ErrorSummary, including root-level issues without a
            controlId. Validation is not triggered on every keystroke by Form; choose validate() or
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
    <Typography.Text variant="supporting">
        For server validation returned without JavaScript, declare stable describedBy and errorId
        values on Field.Control and matching IDs on Description and Error. The remote example uses
        $props.id() so those relationships work before hydration.
    </Typography.Text>
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
