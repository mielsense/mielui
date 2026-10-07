/** Cancels link navigation inside a live example so demos never leave the page. */
export function stayOnPage(event: MouseEvent) {
    const target = event.target;
    if (target instanceof Element && target.closest('a[href]')) {
        event.preventDefault();
    }
}
