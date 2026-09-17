<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import * as Form from '@mielui/svelte/components/form';
    import { Input } from '@mielui/svelte/components/input';
    import { tick } from 'svelte';
    import { validateProfile } from './profile.remote';

    const uid = $props.id();
    const draft = validateProfile.for(uid);
    let notice = $state('');
    let tone = $state<'neutral' | 'success' | 'error'>('neutral');
    const issues = $derived(draft.fields.allIssues() ?? []);
    const summary = $derived(
        issues.map((issue) => ({
            message: issue.message,
            controlId:
                issue.path?.[0] === 'username'
                    ? `${uid}-username`
                    : issue.path?.[0] === 'email'
                      ? `${uid}-email`
                      : undefined
        }))
    );
    let errorSummary = $state<HTMLDivElement>();
</script>

<Form.Root
    class="w-full max-w-md"
    novalidate
    pending={draft.pending}
    onreset={() => { notice = ''; tone = 'neutral'; }}
    {...draft.enhance(async (instance) => {
        notice = '';
        tone = 'neutral';
        try {
            if (!(await instance.submit())) {
                notice = 'Review the issues above.';
                tone = 'error';
                await tick();
                errorSummary?.focus();
                return;
            }
            const result = instance.result;
            if (result?.intent === 'validate-reset') {
                instance.element.reset();
            }
            notice = `${result?.username ?? 'Your username'} is available. ${result?.intent === 'validate-reset' ? 'The form has been reset.' : 'Your draft is ready.'}`;
            tone = 'success';
        } catch {
            notice = 'Could not reach the server. Your draft is still here; try again.';
            tone = 'error';
        }
    })}
>
    <Form.ErrorSummary issues={summary} bind:element={errorSummary} />
    <Fieldset.Root>
        <Fieldset.Legend>Profile draft</Fieldset.Legend>
        <Fieldset.Description>
            This demo validates on the server. Nothing is stored. Try “admin” to see a server-side
            issue, or “system” for a form-level issue.
        </Fieldset.Description>
        <Field.Group>
            <Field.Root
                controlId={`${uid}-username`}
                required
                issues={draft.fields.username.issues()}
            >
                <Field.Label>Username</Field.Label>
                <Field.Control
                    describedBy={`${uid}-username-hint`}
                    errorId={`${uid}-username-error`}
                >
                    {#snippet children(control)}
                        <Input
                            {...control}
                            {...draft.fields.username.as('text')}
                            autocomplete="username"
                            placeholder="sam-rivera"
                        />
                    {/snippet}
                </Field.Control>
                <Field.Description id={`${uid}-username-hint`}>
                    Between 3 and 40 characters.
                </Field.Description>
                <Field.Error aria-live="off" id={`${uid}-username-error`} />
            </Field.Root>
            <Field.Root controlId={`${uid}-email`} required issues={draft.fields.email.issues()}>
                <Field.Label>Email</Field.Label>
                <Field.Control errorId={`${uid}-email-error`}>
                    {#snippet children(control)}
                        <Input
                            {...control}
                            {...draft.fields.email.as('email')}
                            autocomplete="email"
                            placeholder="sam@company.com"
                        />
                    {/snippet}
                </Field.Control>
                <Field.Error aria-live="off" id={`${uid}-email-error`} />
            </Field.Root>
        </Field.Group>
    </Fieldset.Root>
    <Form.Actions>
        <Form.Submit {...draft.fields.intent.as('submit', 'validate')} loadingLabel="Checking">
            Validate draft
        </Form.Submit>
        <Form.Submit
            {...draft.fields.intent.as('submit', 'validate-reset')}
            variant="outline"
            loadingLabel="Checking"
        >
            Validate and reset
        </Form.Submit>
        <Button type="reset" variant="ghost" disabled={draft.pending > 0}>Reset</Button>
    </Form.Actions>
    <Form.Status tone={draft.pending ? 'neutral' : tone} class="min-h-5">
        {draft.pending ? 'Checking your draft…' : notice || (issues.length ? 'Review the issues above.' : '')}
    </Form.Status>
</Form.Root>
