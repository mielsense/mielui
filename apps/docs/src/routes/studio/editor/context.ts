import { getContext, setContext } from 'svelte';
import type { ThemeEditor } from './controller.svelte';

const themeEditorKey = Symbol('theme-editor');
export function setThemeEditor(editor: ThemeEditor) {
    setContext(themeEditorKey, editor);
}
export function getThemeEditor() {
    return getContext<ThemeEditor>(themeEditorKey);
}
