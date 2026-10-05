import { untrack } from 'svelte';

type FollowOptions = {
    follow: boolean;
    readonly threshold: number;
};

export function createConversationFollow(options: FollowOptions) {
    let atBottom = $state(true);
    let scrollingToBottom = $state(false);
    let viewport = $state<HTMLDivElement>();

    const conversation = {
        get scrollable() {
            return scrollable;
        },
        get follow() {
            return options.follow;
        },
        set follow(value) {
            options.follow = value;
        },
        get threshold() {
            return options.threshold;
        },
        get atBottom() {
            return atBottom;
        },
        set atBottom(value) {
            atBottom = value;
        },
        get scrollingToBottom() {
            return scrollingToBottom;
        },
        set scrollingToBottom(value) {
            scrollingToBottom = value;
        },
        get viewport() {
            return viewport;
        },
        set viewport(value) {
            viewport = value;
        },
        scrollToBottom(behavior: ScrollBehavior = 'auto') {
            options.follow = true;
            scrollingToBottom = behavior === 'smooth';
            if (!viewport) {
                scrollingToBottom = false;
                return;
            }
            viewport.scrollTo({ top: viewport.scrollHeight, behavior });
        },
        observeViewport,
        handleScroll,
        finishScroll(viewport: HTMLDivElement) {
            conversation.scrollingToBottom = false;
            measure(viewport);
        },
        markUserIntent() {
            userScrollIntent = true;
        }
    };

    let scrollable = $state(false);
    let previousScrollTop = 0;
    let userScrollIntent = false;

    function isNearBottom(viewport: HTMLDivElement) {
        const remaining = viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop;
        return remaining <= Math.max(0, conversation.threshold);
    }

    function measure(viewport: HTMLDivElement, resume = true) {
        scrollable = viewport.scrollHeight - viewport.clientHeight > 1;
        const nearBottom = isNearBottom(viewport);
        conversation.atBottom = nearBottom;
        if (nearBottom && resume) {
            conversation.follow = true;
            conversation.scrollingToBottom = false;
        }
        return nearBottom;
    }

    function handleScroll(viewport: HTMLDivElement) {
        const nextScrollTop = viewport.scrollTop;
        const scrolledUp = nextScrollTop < previousScrollTop - 1;
        const userScrolledUp = userScrollIntent && scrolledUp;
        const nearBottom = measure(viewport, !userScrolledUp);

        if (
            userScrolledUp ||
            (!nearBottom && (userScrollIntent || (!conversation.scrollingToBottom && scrolledUp)))
        ) {
            conversation.follow = false;
            conversation.scrollingToBottom = false;
        }

        previousScrollTop = nextScrollTop;
        userScrollIntent = false;
    }

    function observeViewport(viewport: HTMLDivElement) {
        untrack(() => {
            conversation.viewport = viewport;
            previousScrollTop = viewport.scrollTop;
            measure(viewport);
        });

        const transcript = viewport.querySelector<HTMLElement>(
            '[data-ui="conversation-transcript"]'
        );
        const observer = new ResizeObserver(() => {
            if (conversation.follow) {
                conversation.scrollToBottom('auto');
            } else {
                measure(viewport, false);
            }
        });
        observer.observe(viewport);
        if (transcript) {
            observer.observe(transcript);
        }

        $effect(() => {
            if (conversation.follow && !conversation.scrollingToBottom) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        });

        return () => {
            observer.disconnect();
            if (conversation.viewport === viewport) {
                conversation.viewport = undefined;
            }
        };
    }

    return conversation;
}
