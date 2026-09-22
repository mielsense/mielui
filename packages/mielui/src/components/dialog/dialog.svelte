<script module lang="ts">
    const ERROR_THEME_COLOR = '#dc2626'; // token-lint-disable-line no-literal-color: browser theme-color fallback
    let errorThemeCount = 0;
    let savedThemeColors: Array<{ element: HTMLMetaElement; content: string | null }> | undefined;
    let createdThemeColor: HTMLMetaElement | undefined;

    function applyErrorThemeColor() {
        if (errorThemeCount++ > 0) {
            return;
        }

        const themeColors = Array.from(
            document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
        );
        if (themeColors.length === 0) {
            createdThemeColor = document.createElement('meta');
            createdThemeColor.name = 'theme-color';
            document.head.append(createdThemeColor);
            themeColors.push(createdThemeColor);
        }
        savedThemeColors = themeColors.map((element) => ({
            element,
            content: element.getAttribute('content')
        }));
        for (const { element } of savedThemeColors) {
            element.content = ERROR_THEME_COLOR;
        }
    }

    function restoreThemeColor() {
        if (--errorThemeCount > 0) {
            return;
        }
        for (const { element, content } of savedThemeColors ?? []) {
            if (content === null) {
                element.removeAttribute('content');
            } else {
                element.content = content;
            }
        }
        createdThemeColor?.remove();
        createdThemeColor = undefined;
        savedThemeColors = undefined;
    }
</script>

<script lang="ts">
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { DialogProps, DialogState } from '.';
    import { type DialogFooterSlot, setDialogContext } from './context.svelte';

    let {
        open = $bindable(false),
        onOpenChange,
        error = false,
        orientation = 'horizontal',
        children
    }: DialogProps = $props();
    const id = $props.id();

    const modalState: DialogState = {
        get open() {
            return open;
        },
        set open(value: boolean) {
            if (open === value) {
                return;
            }
            open = value;
            onOpenChange?.(value);
        },
        get error() {
            return error;
        },
        get orientation() {
            return orientation;
        }
    };
    const modalContext = $state({
        id,
        titleId: undefined as string | undefined,
        descriptionId: undefined as string | undefined,
        contentId: `dialog-${id}`,
        returnFocusEl: undefined as HTMLElement | undefined,
        state: modalState,
        footerSlot: undefined as DialogFooterSlot | undefined,
        headerSlot: undefined as DialogFooterSlot | undefined
    });
    let wasOpen = $state(false);
    setDialogContext(modalContext);

    $effect.pre(() => {
        if (
            modalState.open &&
            !wasOpen &&
            typeof document !== 'undefined' &&
            document.activeElement instanceof HTMLElement &&
            document.activeElement !== document.body
        ) {
            modalContext.returnFocusEl = document.activeElement;
        }
        wasOpen = modalState.open;
    });

    $effect(() => {
        if (!error || !modalState.open || typeof document === 'undefined') {
            return;
        }
        applyErrorThemeColor();
        return restoreThemeColor;
    });
</script>

<DialogPrimitive.Root bind:open={modalState.open}>
    {@render children?.()}
</DialogPrimitive.Root>
