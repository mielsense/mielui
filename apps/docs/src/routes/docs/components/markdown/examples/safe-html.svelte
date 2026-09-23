<script lang="ts">
    import { ShieldCheckIcon as ShieldCheck } from '@hugeicons/core-free-icons';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    const untrustedOutput = [
        '## Imported model output',
        '',
        `<script>document.body.textContent = "changed";<${'/'}script>`,
        '',
        '<button onclick="sendSecrets()">Approve access</button>',
        '',
        '[Open internal report](javascript:sendSecrets())'
    ].join('\n');
</script>

<div class="w-full max-w-2xl rounded-[var(--radius-xl)] border border-border bg-panel p-5 sm:p-6">
    <div class="mb-5 flex items-start gap-3 border-b border-border pb-4">
        <div
            class="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-secondary text-foreground-muted"
        >
            <HugeiconsIcon icon={ShieldCheck} size={16} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div>
            <p class="font-[var(--font-weight-label)] text-foreground">
                Untrusted content stays inert
            </p>
            <p class="mt-1 text-sm leading-6 text-foreground-muted">
                HTML is shown as source text. Unsafe URL schemes are not turned into links.
            </p>
        </div>
    </div>
    <Markdown content={untrustedOutput} />
</div>
