export const dateCalendarClasses =
    'w-fit max-w-full space-y-3 p-3 text-foreground [--calendar-cell-size:calc(var(--spacing)*10)]';

export const dateFieldClasses =
    'inline-flex w-auto min-w-max flex-1 items-center gap-0.5 py-1 has-[:focus]:border-primary has-[:focus]:shadow-[var(--focus-ring)] data-disabled:cursor-not-allowed data-disabled:border-[var(--color-input)] data-disabled:opacity-[var(--opacity-disabled)] data-invalid:border-error data-invalid:has-[:focus]:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)]';

export const dateLabelClasses =
    'w-fit [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground data-disabled:opacity-[var(--opacity-disabled)]';

export const dateTriggerClasses =
    'shrink-0 text-foreground-muted hover:text-foreground data-[state=open]:text-foreground';
