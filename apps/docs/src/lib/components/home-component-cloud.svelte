<script lang="ts">
    import { components, sanitizeComponent } from '$lib/components';

    const namesPerRow = 8;
    const rows = Array.from({ length: Math.ceil(components.length / namesPerRow) }, (_, index) =>
        components.slice(index * namesPerRow, (index + 1) * namesPerRow)
    );

    function drift(node: HTMLElement, index: number) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const duration = 90000 + index * 6000;
        const animation = node.animate(
            [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
            {
                duration,
                iterations: Infinity,
                easing: 'linear',
                direction: index % 2 === 0 ? 'normal' : 'reverse'
            }
        );
        animation.currentTime = duration * (index / rows.length);

        function updatePlayback() {
            if (reducedMotion.matches || document.hidden) {
                animation.pause();
            } else {
                animation.play();
            }
        }

        reducedMotion.addEventListener('change', updatePlayback);
        document.addEventListener('visibilitychange', updatePlayback);
        updatePlayback();

        return {
            destroy() {
                reducedMotion.removeEventListener('change', updatePlayback);
                document.removeEventListener('visibilitychange', updatePlayback);
                animation.cancel();
            }
        };
    }
</script>

<div
    aria-hidden="true"
    data-home-component-cloud
    class="pointer-events-none absolute inset-x-[var(--home-rail)] top-14 bottom-14 flex select-none flex-col justify-around overflow-hidden py-4 text-[clamp(1.5rem,3.5vw,3rem)] leading-none font-medium text-foreground/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_85%)] dark:text-foreground/12"
>
    {#each rows as names, index (index)}
        <div use:drift={index} class="flex w-max shrink-0">
            {#each [0, 1] as copy (copy)}
                <div class="flex min-w-[100vw] shrink-0 items-center justify-around gap-8 px-4">
                    {#each names as name (name)}
                        <span class="whitespace-nowrap">{sanitizeComponent(name)}</span>
                    {/each}
                </div>
            {/each}
        </div>
    {/each}
</div>
