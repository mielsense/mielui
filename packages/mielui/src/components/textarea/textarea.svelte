<script lang="ts">
    import { input } from '@mielui/svelte/components/input/variants';
    import { cn } from '@mielui/svelte/utils';
    import { fieldMetadata } from '../_internal/field-metadata';
    import type { TextareaProps } from '.';

    let {
        placeholder,
        label,
        description,
        variant = 'outline',
        autoresize = false,
        class: classProp,
        children,
        element = $bindable<HTMLTextAreaElement>(),
        value = $bindable<string | number | null | undefined>(),
        oninput,
        id: idProp,
        'aria-describedby': externalDescription,
        ...rest
    }: TextareaProps = $props();

    const generatedId = $props.id();
    const metadata = $derived(
        fieldMetadata({
            id: idProp ?? `field-${generatedId}`,
            metadataId: generatedId,
            description,
            describedBy: externalDescription
        })
    );

    function resize() {
        if (!autoresize || !element) {
            return;
        }
        element.style.height = 'auto';
        const style = getComputedStyle(element);
        const border =
            style.boxSizing === 'border-box'
                ? (Number.parseFloat(style.borderTopWidth) || 0) +
                  (Number.parseFloat(style.borderBottomWidth) || 0)
                : -(
                      (Number.parseFloat(style.paddingTop) || 0) +
                      (Number.parseFloat(style.paddingBottom) || 0)
                  );
        element.style.height = `${element.scrollHeight + border}px`;
    }

    $effect(() => {
        const node = element;
        if (!autoresize || !node) {
            return;
        }
        const originalHeight = node.style.height;
        let width = node.clientWidth;
        const observer = new ResizeObserver(() => {
            if (node.clientWidth !== width) {
                width = node.clientWidth;
                resize();
            }
        });
        observer.observe(node);
        resize();
        return () => {
            observer.disconnect();
            node.style.height = originalHeight;
        };
    });

    $effect(() => {
        if (autoresize) {
            value;
            resize();
        }
    });

    const composerClass = $derived(
        variant === 'secondary'
            ? 'border-transparent bg-secondary hover:border-[var(--color-input)] has-[textarea:disabled]:border-transparent'
            : 'border-[var(--color-input)] bg-[var(--color-field)] hover:border-[var(--color-border-strong)] has-[textarea:disabled]:border-[var(--color-input)]'
    );
</script>

{#snippet field()}
    <textarea
        bind:this={element}
        id={metadata.controlId}
        aria-describedby={metadata.describedBy}
        bind:value
        oninput={(event) => {
            oninput?.(event);
            resize();
        }}
        data-ui="textarea"
        data-variant={variant}
        class={cn(
            classProp,
            children &&
                'rounded-none border-0 bg-transparent shadow-none focus-visible:shadow-none aria-invalid:focus-visible:shadow-none disabled:opacity-100',
            autoresize && 'resize-none overflow-y-hidden',
            'min-h-16 resize-y rounded-[var(--radius-xl)] py-2.5 leading-body',
            input({ variant })
        )}
        {...rest}
        {placeholder}
    ></textarea>
{/snippet}

{#snippet control()}
    {#if children}
        <div
            data-ui="textarea-composer"
            data-variant={variant}
            class={cn(
                'overflow-hidden rounded-[var(--radius-xl)] border-[length:var(--border-size)] transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none has-[textarea:focus-visible]:border-primary has-[textarea:focus-visible]:shadow-[var(--focus-ring)] has-[[aria-invalid=true]]:border-error has-[[aria-invalid=true]]:has-[textarea:focus-visible]:border-error has-[[aria-invalid=true]]:has-[textarea:focus-visible]:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)] has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:opacity-[var(--opacity-disabled)]',
                composerClass
            )}
        >
            {@render field()}
            {@render children()}
        </div>
    {:else}
        {@render field()}
    {/if}
{/snippet}

{#snippet meta()}
    {#if label}
        <label
            for={metadata.controlId}
            class="w-fit select-none [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground [font-family:var(--font-sans),sans-serif]"
        >
            {label}
            {#if rest.required}
                <span
                    aria-hidden="true"
                    data-ui="required-mark"
                    class="text-[var(--mielui-error-text)]"
                    >*</span
                >
            {/if}
        </label>
    {/if}
    {@render control()}
    {#if description}
        <span
            id={metadata.descriptionId}
            class="[font-size:var(--font-size-label)] [font-weight:var(--font-weight-description)] [letter-spacing:var(--tracking-body)] leading-snug text-foreground-muted"
        >
            {description}
        </span>
    {/if}
{/snippet}

{#if label}
    <div class="flex flex-col gap-1.5">{@render meta()} </div>
{:else if description}
    <div class="flex flex-col gap-1.5">
        {@render meta()}
    </div>
{:else}
    {@render control()}
{/if}
