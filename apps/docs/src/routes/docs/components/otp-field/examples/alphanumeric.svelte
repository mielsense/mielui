<script lang="ts">
    import * as OTPField from '@mielui/svelte/components/otp-field';
</script>
<div class="flex flex-col gap-3">
    <label for="recovery-code" class="[font-size:var(--font-size-body)]">Recovery code</label>
    <OTPField.Root
        id="recovery-code"
        length={5}
        pattern="^[a-zA-Z0-9]*$"
        inputmode="text"
        autocapitalize="characters"
        pasteTransformer={(text) => text.trim().toUpperCase()}
    />
</div>
