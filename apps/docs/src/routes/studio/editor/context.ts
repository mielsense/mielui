import { createContext } from 'svelte';
import type { ThemeEditor } from './controller.svelte';

export const [getThemeEditor, setThemeEditor] = createContext<ThemeEditor>();
