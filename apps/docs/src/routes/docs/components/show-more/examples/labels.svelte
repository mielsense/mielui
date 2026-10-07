<script lang="ts">
    import { ShowMore } from '@mielui/svelte/components/show-more';

    const comments = [
        'Maya: The new limiter looks right to me.',
        'Theo: Can we log the key when a client is throttled?',
        'Amira: Docs need the retry header explained.',
        'Jordan: Approved once the log line is in.',
        'Maya: Log line added in the last commit.'
    ];
    let toggles = $state(0);
</script>

<div class="flex w-full max-w-md flex-col gap-3">
    <ShowMore
        lines={2}
        defaultExpanded
        moreLabel="Show all 5 comments"
        lessLabel="Hide older comments"
        onExpandedChange={() => {
            toggles += 1;
        }}
    >
        <div class="flex flex-col gap-2 text-sm">
            {#each comments as comment (comment)}
                <p>{comment}</p>
            {/each}
        </div>
    </ShowMore>
    <p class="text-sm text-foreground-muted">Toggled {toggles} times</p>
</div>
