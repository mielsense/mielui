<script lang="ts">
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import * as Form from '@mielui/svelte/components/form';
    import { Input } from '@mielui/svelte/components/input';
    import { toast } from '@mielui/svelte/components/toast';
    import { validateProfile } from './profile.remote';

    const uid = $props.id();
    const draft = validateProfile.for(uid);
</script>

<Form.Root
    class="w-full max-w-md"
    novalidate
    pending={draft.pending}
    {...draft.enhance(async (instance) => {
        const request = instance.submit().then((valid) => {
            if (!valid) {
                throw new Error('Review the highlighted fields.');
            }
            const result = instance.result;
            return result;
        });
        toast.promise(request, {
            loading: 'Checking your draft…',
            success: (result) => `${result?.username ?? 'Your username'} is available.`,
            error: 'Could not validate your draft',
            errorDescription: () => draft.fields.allIssues()?.length ? 'Review the highlighted fields.' : 'Your draft is still here. Try again.'
        });
        await request.catch(() => undefined);
    })}
>
    <Form.ErrorSummary issues={draft.fields.allIssues()} />
    <Fieldset.Root>
        <Fieldset.Legend>Profile draft</Fieldset.Legend>
        <Fieldset.Description>
            This demo validates on the server. Nothing is stored. Try “admin” to see a server-side
            issue, or “system” for a form-level issue.
        </Fieldset.Description>
        <Field.Group>
            <Field.Root required issues={draft.fields.username.issues()}>
                <Field.Label>Username</Field.Label>
                <Field.Control>
                    {#snippet children(control)}
                        <Input
                            {...control}
                            {...draft.fields.username.as('text')}
                            autocomplete="username"
                            placeholder="sam-rivera"
                        />
                    {/snippet}
                </Field.Control>
                <Field.Description>Between 3 and 40 characters.</Field.Description>
                <Field.Error aria-live="off" />
            </Field.Root>
            <Field.Root required issues={draft.fields.email.issues()}>
                <Field.Label>Email</Field.Label>
                <Field.Control>
                    {#snippet children(control)}
                        <Input
                            {...control}
                            {...draft.fields.email.as('email')}
                            autocomplete="email"
                            placeholder="sam@company.com"
                        />
                    {/snippet}
                </Field.Control>
                <Field.Error aria-live="off" />
            </Field.Root>
        </Field.Group>
    </Fieldset.Root>
    <Form.Actions>
        <Form.Submit {...draft.fields.intent.as('submit', 'validate')} loadingLabel="Checking">
            Validate draft
        </Form.Submit>
    </Form.Actions>
</Form.Root>
