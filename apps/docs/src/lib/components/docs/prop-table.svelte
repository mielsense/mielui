<script lang="ts">
    import type { ReferenceProperty } from '$lib/server/api-reference';
    import InlineText from './inline-text.svelte';

    let { properties }: { properties: ReferenceProperty[] } = $props();

    function displayType(type: string) {
        return type.replace(/\s*\|\s*undefined$/, '');
    }
</script>

<div class="mielui-inset-frame @container min-w-0">
    <ul
        class="mielui-inset-surface m-0 flex list-none flex-col divide-y-[length:var(--border-size)] divide-[var(--docs-rule,var(--color-border))] overflow-hidden p-0"
    >
        {#each properties as property (property.name)}
            <li
                class="grid grid-cols-1 gap-x-6 gap-y-1.5 px-4 py-3 @xl:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
            >
                <div class="flex min-w-0 flex-col gap-0.5">
                    <code class="font-mono text-[13px] leading-6 break-words text-foreground">
                        {property.name}
                    </code>
                    {#if property.required || property.bindable}
                        <span class="flex flex-wrap gap-x-2 text-xs text-foreground-muted">
                            {#if property.required}
                                <span>Required</span>
                            {/if}
                            {#if property.bindable}
                                <span>Bindable</span>
                            {/if}
                        </span>
                    {/if}
                </div>
                <div class="flex min-w-0 flex-col gap-1.5">
                    <code
                        class="font-mono text-xs leading-6 whitespace-pre-wrap break-words text-foreground-muted"
                    >
                        {displayType(property.type)}
                    </code>
                    {#if property.description}
                        <p class="m-0 text-sm leading-6 text-foreground-muted">
                            <InlineText text={property.description} />
                        </p>
                    {/if}
                    {#if property.default}
                        <p class="m-0 flex min-w-0 gap-1.5 text-xs leading-5 text-foreground-muted">
                            <span>Default</span>
                            <code class="min-w-0 font-mono break-words text-foreground">
                                {property.default}
                            </code>
                        </p>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
</div>
