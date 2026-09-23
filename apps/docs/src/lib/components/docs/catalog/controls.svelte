<script lang="ts">
    import { calendar, check, chevron, field, panel } from './shapes.svelte';

    let { slug }: { slug: string } = $props();
</script>
{#if slug === 'button'}
    <div class="flex items-center gap-2">
        <span class="rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground">
            Continue
        </span>
        <span class="rounded-md border border-border bg-background px-4 py-2.5">Cancel</span>
    </div>
{:else if slug === 'calendar' || slug === 'range-calendar'}
    {@render calendar(slug === 'range-calendar')}
{:else if slug === 'date-picker' || slug === 'date-range-picker'}
    <div class="flex w-52 flex-col gap-2">
        <span class="text-[10px] text-foreground-muted">
            {slug === 'date-picker' ? 'Due date' : 'Date range'}
        </span>
        <div class={`${field} justify-between`}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" />
                <path d="M2 6h12M5 1v4m6-4v4" stroke="currentColor" />
            </svg>
            <span>{slug === 'date-picker' ? 'Sep 16, 2026' : 'Sep 16 – Sep 19'}</span>
            {@render chevron()}
        </div>
    </div>
{:else if slug === 'checkbox' || slug === 'radio-group'}
    <div class="flex w-44 flex-col gap-3">
        {#each ['Design', 'Development', 'Research'] as label, index}
            <div class="flex items-center gap-2">
                <span
                    class={`flex size-4 items-center justify-center border ${slug === 'radio-group' ? 'rounded-full' : 'rounded'} ${index === 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'}`}
                >
                    {#if index === 0}
                        {#if slug === 'checkbox'}
                            {@render check()}
                        {:else}
                            <span class="size-1.5 rounded-full bg-primary-foreground"></span>
                        {/if}
                    {/if}
                </span>
                <span>{label}</span>
            </div>
        {/each}
    </div>
{:else if ['select', 'native-select', 'combobox', 'dropdown-menu', 'context-menu', 'command'].includes(slug)}
    <div class={`${panel} w-48 overflow-hidden`}>
        <div
            class="flex items-center justify-between gap-3 border-b border-border px-3 py-2 text-foreground-muted"
        >
            <span>
                {slug === 'command' || slug === 'combobox' ? 'Search actions…' : 'Choose an option'}
            </span>
            {@render chevron()}
        </div>
        <div class="space-y-1 p-1.5">
            {#each ['Overview', 'Settings', 'Members'] as item, index}
                <div
                    class={`flex items-center justify-between rounded px-2 py-1.5 ${index === 1 ? 'bg-secondary' : ''}`}
                >
                    <span>{item}</span>
                    {#if index === 1}
                        {@render check()}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
{:else if ['input', 'label', 'field', 'textarea', 'number-field', 'tag-input', 'otp-field'].includes(slug)}
    <div class="flex w-52 flex-col gap-2">
        <span class="text-[10px] font-medium">
            {slug === 'tag-input' ? 'Tags' : slug === 'number-field' ? 'Quantity' : slug === 'otp-field' ? 'Verification code' : 'Display name'}
        </span>
        {#if slug === 'otp-field'}
            <div class="flex gap-1.5">
                {#each ['2', '8', '4', '', '', ''] as digit}
                    <span
                        class="flex h-9 w-7 items-center justify-center rounded border border-border bg-background font-mono"
                    >
                        {digit}
                    </span>
                {/each}
            </div>
        {:else if slug === 'number-field'}
            <div class={`${field} justify-between`}>
                <span>−</span>
                <span>3</span>
                <span>+</span>
            </div>
        {:else if slug === 'tag-input'}
            <div class={`${field} gap-1.5`}>
                <span class="rounded bg-secondary px-1.5 py-0.5 text-[10px]">Design ×</span>
                <span class="rounded bg-secondary px-1.5 py-0.5 text-[10px]">Web ×</span>
            </div>
        {:else if slug === 'textarea'}
            <div
                class="h-16 rounded-md border border-border bg-secondary/50 p-3 text-foreground-muted"
            >
                Write a note…
            </div>
        {:else}
            <div class={field}><span class="text-foreground-muted">Alex Morgan</span></div>
        {/if}
        {#if slug === 'field'}
            <span class="text-[9px] text-foreground-muted">
                Shown to everyone in your workspace.
            </span>
        {/if}
    </div>
{:else if slug === 'fieldset' || slug === 'form'}
    <div
        class={`${slug === 'fieldset' ? 'rounded-md border border-border p-3' : ''} flex w-48 flex-col gap-2`}
    >
        <span class="text-[10px] font-medium">
            {slug === 'fieldset' ? 'Contact details' : 'Create account'}
        </span>
        <div class={`${field} text-[10px] text-foreground-muted`}>Name</div>
        <div class={`${field} text-[10px] text-foreground-muted`}>Email address</div>
        {#if slug === 'form'}
            <span class="rounded bg-primary py-1.5 text-center text-[10px] text-primary-foreground">
                Continue
            </span>
        {/if}
    </div>
{:else if slug === 'file-upload'}
    <div
        class="flex w-52 flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-5"
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 16V3m-4 4 4-4 4 4M4 15v5h16v-5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
        <span>Drop files here</span>
        <span class="text-[9px] text-foreground-muted">PDF, PNG or JPG</span>
    </div>
{:else if slug === 'group' || slug === 'toggle-group' || slug === 'toolbar'}
    <div class={`${panel} flex items-center divide-x divide-border overflow-hidden`}>
        <span class="px-4 py-2.5 font-bold">B</span>
        <span class="bg-secondary px-4 py-2.5 italic">I</span>
        <span class="px-4 py-2.5 underline">U</span>
        {#if slug === 'toolbar'}
            <span class="px-4 py-2.5">↗</span>
        {/if}
    </div>
{:else if slug === 'toggle'}
    <div class="flex gap-3">
        <span class="flex size-10 items-center justify-center rounded-md bg-secondary font-bold">
            B
        </span>
        <span
            class="flex size-10 items-center justify-center rounded-md border border-border italic"
        >
            I
        </span>
    </div>
{:else if slug === 'progress' || slug === 'slider'}
    <div class="w-52">
        <div class="mb-3 flex justify-between text-[10px]">
            <span>{slug === 'progress' ? 'Uploading files' : 'Volume'}</span>
            <span class="text-foreground-muted">64%</span>
        </div>
        <div class="relative h-1.5 rounded-full bg-secondary">
            <div class="h-full w-[64%] rounded-full bg-primary"></div>
            {#if slug === 'slider'}
                <span
                    class="absolute top-1/2 left-[64%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm"
                ></span>
            {/if}
        </div>
    </div>
{:else if slug === 'switch'}
    <div class="flex flex-col gap-4">
        {#each [true, false] as enabled}
            <div class="flex items-center gap-3">
                <span
                    class={`flex h-5 w-9 items-center rounded-full px-0.5 ${enabled ? 'justify-end bg-primary' : 'bg-secondary'}`}
                >
                    <span class="size-4 rounded-full bg-background shadow-sm"></span>
                </span>
                <span>{enabled ? 'Notifications' : 'Quiet mode'}</span>
            </div>
        {/each}
    </div>
{:else if slug === 'color-picker'}
    <div class={`${panel} w-44 p-2`}>
        <div class="relative h-16 rounded bg-linear-to-r from-white to-primary">
            <div class="absolute inset-0 rounded bg-linear-to-t from-black to-transparent"></div>
            <span
                class="absolute top-3 right-8 size-3 rounded-full border-2 border-white shadow-sm"
            ></span>
        </div>
        <div
            class="mt-2 h-2 rounded-full bg-linear-to-r from-red-400 via-green-400 to-blue-500"
        ></div>
        <div class="mt-2 rounded border border-border px-2 py-1 font-mono text-[9px]">#b47da3</div>
    </div>
{:else if slug === 'copy-button'}
    <div class={`${field} gap-5 font-mono text-[10px]`}>
        <span>pnpm add mielui</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" />
            <path
                d="M10 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2"
                stroke="currentColor"
            />
        </svg>
    </div>
{/if}
