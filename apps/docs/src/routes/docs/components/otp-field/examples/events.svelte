<script lang="ts">
    import * as OTPField from '@mielui/svelte/components/otp-field';

    let typed = $state('');
</script>

<div class="flex flex-col items-center gap-3">
    <OTPField.Root
        length={6}
        aria-label="Verification code"
        onValueChange={(value) => {
            typed = value;
        }}
    />
    <p class="text-sm text-foreground-muted">{typed.length} of 6 digits entered</p>
</div>
