<script lang="ts">
    import * as OTPField from '@mielui/svelte/components/otp-field';

    let code = $state('');
</script>
<div class="flex flex-col gap-3">
    <label for="verification-code" class="[font-size:var(--font-size-body)]">
        Verification code
    </label>
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
    <p id="verification-hint" class="text-foreground-muted [font-size:var(--font-size-caption)]">
        Enter the six-digit code sent to your email.
    </p>
</div>
