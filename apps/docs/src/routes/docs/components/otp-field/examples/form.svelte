<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
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
    <label for="code-form" class="[font-size:var(--font-size-body)]">Security code</label>
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
    <p role="status" class="text-foreground-muted [font-size:var(--font-size-caption)]">
        {result || 'You can paste a code containing spaces or hyphens.'}
    </p>
</form>
