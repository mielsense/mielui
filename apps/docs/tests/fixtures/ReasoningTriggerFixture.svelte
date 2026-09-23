<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';

    let blocked = $state(true);
    let clicks = $state(0);
</script>

<button type="button" onclick={() => { blocked = false; }}>Allow toggling</button>
<output>{clicks} clicks</output>
<Reasoning.Root>
    <Reasoning.Trigger
        duration="4.8s"
        onclick={(event) => {
        clicks += 1;
        if (blocked) {
            event.preventDefault();
        }
    }}
    />
    <Reasoning.Content>Compared recent deployments.</Reasoning.Content>
</Reasoning.Root>
