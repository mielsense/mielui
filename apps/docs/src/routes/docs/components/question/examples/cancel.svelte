<script lang="ts">
    import * as Question from '@mielui/svelte/components/question';

    let answer = $state('');
    let outcome = $state('Waiting for an answer');
</script>

<div class="flex w-full max-w-md flex-col gap-3">
    <Question.Root
        variant="inset"
        type="text"
        bind:value={answer}
        onSubmit={(value) => {
            outcome = `Answer: ${Array.isArray(value) ? value.join(', ') : value}`;
        }}
        onCancel={() => {
            outcome = 'Skipped';
        }}
    >
        <Question.Content>
            <Question.Title>What should the migration notes cover?</Question.Title>
            <Question.Description
                >Enter adds a line here. Use the button to send.</Question.Description
            >
            <Question.Input
                rows={3}
                submitOnEnter={false}
                placeholder="List the breaking changes"
            />
        </Question.Content>
        <Question.Actions>
            <Question.Cancel>Skip</Question.Cancel>
            <Question.Submit loadingLabel="Sending" />
        </Question.Actions>
    </Question.Root>
    <p class="text-sm text-foreground-muted" role="status">{outcome}</p>
</div>
