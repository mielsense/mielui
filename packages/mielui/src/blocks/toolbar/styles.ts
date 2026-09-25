import type { ToolbarRootProps } from './index';

export function toolbarControlClass(variant: ToolbarRootProps['variant']) {
    return variant === 'depth'
        ? 'rounded-[var(--radius-md)] bg-secondary bg-[image:var(--mielui-toolbar-face)] text-foreground-muted shadow-[var(--mielui-toolbar-raised)] hover:text-foreground active:bg-background active:bg-none active:shadow-[var(--mielui-toolbar-pressed)] data-[state=on]:bg-background data-[state=on]:bg-none data-[state=on]:text-foreground data-[state=on]:shadow-[var(--mielui-toolbar-pressed)] focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-raised)] data-[state=on]:focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-pressed)]'
        : 'data-[state=on]:bg-secondary data-[state=on]:text-foreground';
}
