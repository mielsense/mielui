export function gaugeLiveMotion(arc: SVGPathElement, scale: number) {
    const viewport = arc.ownerSVGElement ?? arc;
    const highlight = arc.animate(
        [{ filter: 'brightness(1)' }, { filter: 'brightness(1.45)' }, { filter: 'brightness(1)' }],
        { duration: 2400 * scale, iterations: Infinity, easing: 'ease-in-out' }
    );
    let visible = false;
    function update() {
        if (visible && !document.hidden) {
            highlight.play();
        } else {
            highlight.pause();
        }
    }
    const observer = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? false;
        update();
    });
    observer.observe(viewport);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
        highlight.cancel();
        observer.disconnect();
        document.removeEventListener('visibilitychange', update);
    };
}
