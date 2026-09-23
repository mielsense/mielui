<script lang="ts">
    import * as ContextMenu from '@mielui/svelte/components/context-menu';

    let rotation = $state(0);
    let message = $state('');

    function rotate() {
        rotation = (rotation + 90) % 360;
        message = `Rotated ${rotation} degrees.`;
    }

    function reset() {
        rotation = 0;
        message = 'Original orientation restored.';
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/docs/components/context-menu#image`
            );
            message = 'Preview link copied.';
        } catch {
            message = 'Clipboard access is unavailable.';
        }
    }
</script>

<div class="flex flex-col items-center gap-3">
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <svg
                role="img"
                aria-label="Geometric illustration"
                viewBox="0 0 160 120"
                class="h-32 w-44 rounded-[var(--radius-lg)] border border-border bg-secondary p-4"
            >
                <g transform={`rotate(${rotation} 80 60)`}>
                    <circle cx="100" cy="35" r="16" fill="var(--color-primary)" />
                    <path d="M10 100L60 35L110 100Z" fill="var(--color-foreground)" opacity="0.6" />
                    <path d="M65 100L110 60L150 100Z" fill="var(--color-primary)" />
                </g>
            </svg>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item callback={rotate}>Rotate clockwise</ContextMenu.Item>
            <ContextMenu.Item callback={reset}>Reset orientation</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item callback={copyLink}>Copy preview link</ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
    <p class="text-xs text-foreground-muted">Right-click or press and hold the illustration.</p>
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
