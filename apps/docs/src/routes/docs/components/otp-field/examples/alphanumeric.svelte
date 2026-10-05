<script lang="ts">
    import { Label } from '@mielui/svelte/components/label';
    import * as OTPField from '@mielui/svelte/components/otp-field';
</script>
<div class="flex flex-col gap-3">
    <Label for="recovery-code">Recovery code</Label>
    <OTPField.Root
        id="recovery-code"
        length={5}
        pattern="^[a-zA-Z0-9]*$"
        inputmode="text"
        autocapitalize="characters"
        pasteTransformer={(text) => text.trim().toUpperCase()}
    />
</div>
