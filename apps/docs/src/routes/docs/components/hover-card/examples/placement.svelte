<script lang="ts">
    import * as HoverCard from '@mielui/svelte/components/hover-card';

    const sides = ['top', 'right', 'bottom', 'left'] as const;
</script>

<div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
    {#each sides as side (side)}
        <HoverCard.Root openDelay={100}>
            <HoverCard.Trigger class="underline underline-offset-4">
                {side[0].toUpperCase() + side.slice(1)}
            </HoverCard.Trigger>
            <HoverCard.Content {side} align="center" class="w-56">
                <HoverCard.Title>{`Opens on the ${side}`}</HoverCard.Title>
                <HoverCard.Description>
                    The card flips to the opposite side when there is no room.
                </HoverCard.Description>
            </HoverCard.Content>
        </HoverCard.Root>
    {/each}
</div>
