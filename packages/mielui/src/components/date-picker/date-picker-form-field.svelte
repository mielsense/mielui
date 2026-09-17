<script lang="ts">
    import { getDatePickerContext } from './context.svelte';

    let {
        name,
        form,
        field,
        type
    }: {
        name?: string;
        form?: string;
        field: HTMLDivElement | null;
        type?: 'start' | 'end';
    } = $props();
    const context = getDatePickerContext();
    let input = $state<HTMLInputElement | null>(null);

    $effect(() => {
        const control = input;
        const fieldNode = field;
        if (!control || !fieldNode) {
            return;
        }
        function synchronizeValidity() {
            control?.setCustomValidity(
                fieldNode?.hasAttribute('data-invalid') ? 'Enter a valid date.' : ''
            );
        }
        synchronizeValidity();
        const observer = new MutationObserver(synchronizeValidity);
        observer.observe(fieldNode, { attributes: true, attributeFilter: ['data-invalid'] });
        return () => {
            observer.disconnect();
        };
    });

    $effect(() => {
        void form;
        const owner = input?.form;
        if (!owner) {
            return;
        }
        function handleReset(event: Event) {
            queueMicrotask(() => {
                if (!event.defaultPrevented) {
                    context.reset();
                }
            });
        }
        owner.addEventListener('reset', handleReset);
        return () => {
            owner.removeEventListener('reset', handleReset);
        };
    });
</script>

<input
    bind:this={input}
    type="text"
    hidden
    tabindex={-1}
    {name}
    {form}
    value={context.getValue(type)?.toString() ?? ''}
    disabled={context.disabled}
    readonly={context.readonly}
    required={context.required}
    oninvalid={(event) => {
            event.preventDefault();
            field?.querySelector<HTMLElement>('[role="spinbutton"]')?.focus({ preventScroll: true });
        }}
/>
