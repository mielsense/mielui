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

<div class="flex w-full max-w-2xl flex-col gap-4">
    <div class="flex items-start gap-3 border-b border-border pb-4">
        <HugeiconsIcon
            icon={ShieldCheck}
            size={16}
            class="mt-0.5 shrink-0 text-foreground-muted"
            aria-hidden="true"
        />
        <div>
            <p class="[font-weight:var(--font-weight-label)] text-foreground">
                Untrusted content stays inert
            </p>
            <p class="mt-1 text-sm leading-6 text-foreground-muted">
                HTML is shown as source text. Unsafe URL schemes are not turned into links.
            </p>
        </div>
    </div>
    <Markdown content={untrustedOutput} />
</div>
