<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Label } from '@mielui/svelte/components/label';
    import * as OTPField from '@mielui/svelte/components/otp-field';

    let code = $state('');
    let result = $state('');
</script>
<form
    class="flex flex-col items-start gap-4"
    onsubmit={(event) => {
        event.preventDefault();
        result = `Submitted ${String(new FormData(event.currentTarget).get('code'))}`;
    }}
>
    <Label for="code-form">Security code</Label>
    <OTPField.Root
        id="code-form"
        name="code"
        length={6}
        minlength={6}
        required
        bind:value={code}
        pasteTransformer={(text) => text.replace(/[\s-]/g, '')}
    />
    <div class="flex gap-2">
        <Button type="submit">Verify</Button>
        <Button type="reset" variant="outline">Reset</Button>
    </div>
    <p role="status" class="text-sm text-foreground-muted">
        {result || 'You can paste a code containing spaces or hyphens.'}
    </p>
</form>
