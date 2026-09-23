<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import * as Form from '@mielui/svelte/components/form';
    import { Input } from '@mielui/svelte/components/input';
    import { toast } from '@mielui/svelte/components/toast';
    import { onDestroy } from 'svelte';

    let pending = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let notification: ReturnType<typeof toast.promise> | undefined;

    onDestroy(() => {
        clearTimeout(timer);
        notification?.exit?.();
    });

    function submit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        event.preventDefault();
        const data = new FormData(event.currentTarget, event.submitter);
        const name = String(data.get('displayName')).trim();
        pending = true;
        const request = new Promise<string>((resolve) => {
            timer = setTimeout(() => {
                pending = false;
                resolve(name);
            }, 800);
        });
        notification = toast.promise(request, {
            loading: 'Checking profile…',
            success: (name) => `${name} is ready to save.`,
            successDescription: 'This preview keeps your data in the browser.',
            error: 'Could not check your profile'
        });
    }
</script>

<Form.Root class="w-full max-w-md" onsubmit={submit} {pending}>
    <Fieldset.Root>
        <Fieldset.Legend>Profile details</Fieldset.Legend>
        <Field.Group>
            <Field.Root required>
                <Field.Label>Display name</Field.Label>
                <Field.Control>
                    {#snippet children(control)}
                        <Input
                            {...control}
                            name="displayName"
                            autocomplete="name"
                            placeholder="Sam Rivera"
                        />
                    {/snippet}
                </Field.Control>
                <Field.Description>The name shown to your teammates.</Field.Description>
            </Field.Root>
            <Field.Root required>
                <Field.Label>Work email</Field.Label>
                <Field.Control>
                    {#snippet children(control)}
                        <Input
                            {...control}
                            type="email"
                            name="email"
                            autocomplete="email"
                            placeholder="sam@company.com"
                        />
                    {/snippet}
                </Field.Control>
            </Field.Root>
        </Field.Group>
    </Fieldset.Root>
    <Form.Actions>
        <Form.Submit>Save profile</Form.Submit>
        <Button type="reset" variant="ghost">Reset</Button>
    </Form.Actions>
</Form.Root>
