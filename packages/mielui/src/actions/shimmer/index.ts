import type { Action } from 'svelte/action';

export const shimmer: Action<HTMLElement> = (node) => {
    const originalPosition = node.style.position;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const overlay = document.createElement('span');
    const band = document.createElement('span');
    const textOnly = node.childElementCount === 0 && Boolean(node.textContent?.trim());
    overlay.className = 'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]';
    band.className = textOnly
        ? 'absolute inset-0 bg-linear-to-r from-transparent via-foreground to-transparent bg-clip-text text-transparent bg-size-[200%_100%]'
        : 'absolute inset-0 bg-linear-to-r from-transparent via-foreground/10 to-transparent';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('data-shimmer-visual', '');
    overlay.inert = true;
    overlay.append(band);
    let animation: Animation | undefined;
    function syncText() {
        band.textContent = [...node.childNodes]
            .filter((child) => child !== overlay)
            .map((child) => child.textContent ?? '')
            .join('');
    }
    const observer = textOnly
        ? new MutationObserver((records) => {
              if (
                  records.some(
                      (record) => record.target !== overlay && !overlay.contains(record.target)
                  )
              ) {
                  syncText();
              }
          })
        : undefined;
    if (textOnly) {
        syncText();
        observer?.observe(node, { childList: true, characterData: true, subtree: true });
    }
    if (getComputedStyle(node).position === 'static') {
        node.style.position = 'relative';
    }

    function sync() {
        animation?.cancel();
        animation = undefined;
        const themeDuration = getComputedStyle(node).getPropertyValue('--motion-duration-panel');
        if (reduced.matches || Number.parseFloat(themeDuration) === 0) {
            overlay.remove();
            return;
        }
        node.append(overlay);
        animation = band.animate(
            textOnly
                ? [{ backgroundPositionX: '200%' }, { backgroundPositionX: '-200%' }]
                : [{ transform: 'translateX(-100%)' }, { transform: 'translateX(100%)' }],
            { duration: 1600, iterations: Number.POSITIVE_INFINITY, easing: 'linear' }
        );
    }

    let themeDuration = getComputedStyle(node).getPropertyValue('--motion-duration-panel');
    const themeObserver = new MutationObserver(() => {
        const nextDuration = getComputedStyle(node).getPropertyValue('--motion-duration-panel');
        if (nextDuration !== themeDuration) {
            themeDuration = nextDuration;
            sync();
        }
    });
    let ancestor: HTMLElement | null = node;
    while (ancestor) {
        themeObserver.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
        ancestor = ancestor.parentElement;
    }

    reduced.addEventListener('change', sync);
    sync();
    return {
        destroy() {
            themeObserver.disconnect();
            observer?.disconnect();
            animation?.cancel();
            overlay.remove();
            node.style.position = originalPosition;
            reduced.removeEventListener('change', sync);
        }
    };
};
