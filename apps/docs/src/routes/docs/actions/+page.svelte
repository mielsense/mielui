<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
</script>
<svelte:head><title>Mielui · Actions</title></svelte:head>
<div class="flex flex-col items-start gap-4">
    <PageIntro title="Actions">Add animation to existing elements with Svelte actions.</PageIntro>
    <Button href="/docs/actions/morph" variant="outline">Morph</Button>
    <Button href="/docs/actions/number-shuffle" variant="outline">Number shuffle</Button>
    <Button href="/docs/actions/shimmer" variant="outline">Shimmer</Button>
</div>
