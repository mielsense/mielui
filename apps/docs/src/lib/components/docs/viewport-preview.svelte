<script lang="ts">
    import { onMount } from 'svelte';

    let {
        example,
        title
    }: {
        example: 'notch/hero' | 'notch/peek' | 'notch/activity' | 'notch/glass' | 'toast/notch';
        title: string;
    } = $props();
    let frame: HTMLIFrameElement;

    function syncTheme() {
        const target = frame?.contentDocument?.documentElement;
        if (!target) {
            return;
        }
        const source = document.documentElement;
        target.classList.toggle('dark', source.classList.contains('dark'));
        target.classList.toggle('light', source.classList.contains('light'));
        target.style.colorScheme = getComputedStyle(source).colorScheme;
        const tokens = getComputedStyle(source);
        for (let index = 0; index < tokens.length; index += 1) {
            const name = tokens.item(index);
            if (name.startsWith('--')) {
                target.style.setProperty(name, tokens.getPropertyValue(name));
            }
        }
    }

    onMount(() => {
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        observer.observe(document.head, { childList: true, subtree: true, characterData: true });
        return () => {
            observer.disconnect();
        };
    });
</script>

<iframe
    bind:this={frame}
    src={`/preview/${example}`}
    {title}
    onload={syncTheme}
    class="h-[24rem] w-full border-0 bg-background"
></iframe>
