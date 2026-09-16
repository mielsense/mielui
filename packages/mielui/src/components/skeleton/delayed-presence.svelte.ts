type PresenceOptions = {
    readonly active: boolean;
    readonly delay: number;
    readonly minVisible: number;
};

function delayValue(value: number, fallback: number) {
    return Number.isFinite(value) ? Math.min(2_147_483_647, Math.max(0, value)) : fallback;
}

export function delayedPresence(options: PresenceOptions) {
    let visible = $state(false);
    let shownAt = 0;
    $effect(() => {
        if (options.active) {
            if (visible) {
                return;
            }
            const timer = setTimeout(
                () => {
                    shownAt = performance.now();
                    visible = true;
                },
                delayValue(options.delay, 120)
            );
            return () => clearTimeout(timer);
        }
        if (!visible) {
            return;
        }
        const remaining = Math.max(
            0,
            delayValue(options.minVisible, 380) - (performance.now() - shownAt)
        );
        const timer = setTimeout(() => {
            visible = false;
        }, remaining);
        return () => clearTimeout(timer);
    });
    return {
        get visible() {
            return visible;
        }
    };
}
