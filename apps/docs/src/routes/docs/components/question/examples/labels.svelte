<script lang="ts">
    import type { QuestionLabels } from '@mielui/svelte/components/question';
    import * as Question from '@mielui/svelte/components/question';

    const labels: QuestionLabels = {
        selectAnswer: 'Choisissez une réponse.',
        submitError: "La réponse n'a pas pu être envoyée.",
        submit: 'Envoyer',
        submitting: 'Envoi…'
    };

    let answer = $state('');
</script>

<div class="w-full max-w-xl">
    <Question.Root
        variant="inset"
        {labels}
        bind:value={answer}
        onSubmit={() => {
            answer = '';
        }}
    >
        <Question.Content>
            <Question.Title>Où lancer la migration en premier ?</Question.Title>
            <Question.Options>
                <Question.Option value="preview" label="Environnement de test" />
                <Question.Option value="production" label="Production" />
            </Question.Options>
        </Question.Content>
        <Question.Actions>
            <Question.Cancel>Passer</Question.Cancel>
            <Question.Submit />
        </Question.Actions>
    </Question.Root>
</div>
