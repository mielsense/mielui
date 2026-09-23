export function cloneVisual(source: HTMLElement, target: HTMLElement) {
    const excluded = new Set(['script', 'style', 'link', 'iframe', 'object', 'embed']);
    const passive = new Set([
        'span',
        'div',
        'p',
        'strong',
        'b',
        'em',
        'i',
        's',
        'del',
        'ins',
        'small',
        'sub',
        'sup',
        'code',
        'kbd',
        'samp',
        'time',
        'mark',
        'br',
        'ul',
        'ol',
        'li',
        'svg',
        'g',
        'path',
        'circle',
        'ellipse',
        'rect',
        'line',
        'polyline',
        'polygon',
        'text',
        'tspan'
    ]);
    function copyNode(node: Node): Node | undefined {
        if (!(node instanceof Element)) {
            return node.nodeType === Node.TEXT_NODE ? node.cloneNode(false) : undefined;
        }
        if (excluded.has(node.localName)) {
            return undefined;
        }
        const copy = passive.has(node.localName)
            ? (node.cloneNode(false) as Element)
            : document.createElement('span');
        for (const attribute of [...copy.attributes]) {
            if (
                attribute.name === 'id' ||
                attribute.name === 'for' ||
                attribute.name === 'name' ||
                attribute.name === 'form' ||
                attribute.name === 'autofocus' ||
                attribute.name === 'tabindex' ||
                attribute.name === 'list' ||
                attribute.name === 'headers' ||
                attribute.name === 'contenteditable' ||
                (['href', 'xlink:href'].includes(attribute.name) &&
                    attribute.value.startsWith('#')) ||
                attribute.name.startsWith('aria-') ||
                attribute.name.startsWith('on')
            ) {
                copy.removeAttribute(attribute.name);
            }
        }
        for (const child of node.childNodes) {
            const copiedChild = copyNode(child);
            if (copiedChild) {
                copy.appendChild(copiedChild);
            }
        }
        return copy;
    }
    const fragment = document.createDocumentFragment();
    for (const child of source.childNodes) {
        const copy = copyNode(child);
        if (copy) {
            fragment.appendChild(copy);
        }
    }
    target.replaceChildren(fragment);
}
