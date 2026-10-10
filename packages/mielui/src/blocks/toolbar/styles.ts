import type { ToolbarRootProps } from './index';

const depth =
    'bg-secondary bg-[image:var(--mielui-toolbar-face)] text-foreground-muted shadow-[var(--mielui-toolbar-raised)] hover:text-foreground active:bg-background active:bg-none active:shadow-[var(--mielui-toolbar-pressed)] data-[state=on]:bg-background data-[state=on]:bg-none data-[state=on]:text-foreground data-[state=on]:shadow-[var(--mielui-toolbar-pressed)] focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-raised)] data-[state=on]:focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-pressed)]';
const flat =
    'relative z-[1] text-foreground-muted hover:text-foreground data-[state=on]:text-foreground';
const selected =
    'mielui-glow mielui-glow-neutral text-foreground shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]';

export function toolbarControlClass(variant: ToolbarRootProps['variant'], on = false) {
    if (variant === 'depth') {
        return depth;
    }

    return on ? `${flat} ${selected}` : flat;
}
