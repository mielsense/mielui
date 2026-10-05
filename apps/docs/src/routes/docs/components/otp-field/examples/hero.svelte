<script lang="ts">
    import { Label } from '@mielui/svelte/components/label';
    import * as OTPField from '@mielui/svelte/components/otp-field';

    let code = $state('');
</script>
<div class="flex flex-col gap-3">
    <Label for="verification-code">Verification code</Label>
    <OTPField.Root
        id="verification-code"
        bind:value={code}
        length={6}
        aria-describedby="verification-hint"
    >
        {#snippet children({ cells })}
            <OTPField.Group>
                {#each cells.slice(0, 3) as cell, index (index)}
                    <OTPField.Cell {cell} />
                {/each}
            </OTPField.Group>
            <OTPField.Separator />
            <OTPField.Group>
                {#each cells.slice(3) as cell, index (index)}
                    <OTPField.Cell {cell} />
                {/each}
            </OTPField.Group>
        {/snippet}
    </OTPField.Root>
    <p id="verification-hint" class="text-sm text-foreground-muted">
        Enter the six-digit code sent to your email.
    </p>
</div>
