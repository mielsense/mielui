<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { createAttachmentKey } from 'svelte/attachments';
    import type { FormProps } from '.';
    import { setFormContext } from './context.svelte';

    let {
        children,
        class: className,
        element = $bindable(),
        pending = false,
        'aria-busy': ariaBusy,
        ...rest
    }: FormProps = $props();
    let submissions = $state(0);
    const submitAttachment = createAttachmentKey();
    const trackSubmissions = {
        [submitAttachment]: (form: HTMLFormElement) => {
            const handleSubmit = () => {
                submissions += 1;
            };
            form.addEventListener('submit', handleSubmit, true);
            return () => {
                form.removeEventListener('submit', handleSubmit, true);
            };
        }
    };
    setFormContext({
        get submissions() {
            return submissions;
        },
        get pending() {
            return Boolean(pending);
        }
    });
</script>

<form
    {...rest}
    {...trackSubmissions}
    bind:this={element}
    data-ui="form"
    aria-busy={ariaBusy ?? (Boolean(pending) || undefined)}
    data-pending={Boolean(pending) || undefined}
    class={cn(className, 'flex min-w-0 flex-col gap-6')}
>
    {@render children?.()}
</form>
