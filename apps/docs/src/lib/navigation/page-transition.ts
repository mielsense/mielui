import { onDestroy } from 'svelte';
import { onNavigate } from '$app/navigation';

export function setupPageTransition() {
    let activePageTransition: ViewTransition | undefined;

    onDestroy(() => {
        activePageTransition?.skipTransition();
    });

    onNavigate((navigation) => {
        activePageTransition?.skipTransition();
        if (
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            navigation.from?.url.pathname === navigation.to?.url.pathname ||
            navigation.to?.url.pathname.startsWith('/preview/') ||
            navigation.from?.url.pathname.startsWith('/preview/')
        ) {
            return;
        }

        return new Promise<void>((resolve) => {
            let transition: ViewTransition;
            try {
                transition = document.startViewTransition(async () => {
                    resolve();
                    await navigation.complete;
                });
            } catch {
                resolve();
                return;
            }
            activePageTransition = transition;
            void transition.ready
                .then(() => {
                    document.documentElement.animate(
                        pixelRevealFrames(window.innerWidth, window.innerHeight),
                        {
                            duration: 240,
                            easing: 'linear',
                            fill: 'both',
                            pseudoElement: '::view-transition-new(root)'
                        }
                    );
                })
                .catch(() => {
                    resolve();
                });
            function releaseTransition() {
                if (activePageTransition === transition) {
                    activePageTransition = undefined;
                }
            }
            void transition.finished.then(releaseTransition, releaseTransition);
        });
    });
}

function pixelRevealFrames(width: number, height: number): Keyframe[] {
    const size = 72;
    const stages = 8;
    const buckets = Array.from({ length: stages }, () => [] as string[]);
    for (let row = 0; row < Math.ceil(height / size); row += 1) {
        for (let column = 0; column < Math.ceil(width / size); column += 1) {
            let hash = Math.imul(column + 1, 374761393) ^ Math.imul(row + 1, 668265263);
            hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
            const rank = ((hash ^ (hash >>> 16)) >>> 0) % stages;
            buckets[rank].push(
                `<rect x="${column * size}" y="${row * size}" width="${size}" height="${size}" fill="white"/>`
            );
        }
    }
    let cells = '';
    return Array.from({ length: stages + 1 }, (_, stage) => {
        if (stage > 0) {
            cells += buckets[stage - 1].join('');
        }
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${cells}</svg>`;
        return {
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            easing: 'steps(1, end)',
            offset: stage / stages
        };
    });
}
