import type { TaskStep, TaskStepsState } from '.';
export function deriveTaskSteps(
    steps: TaskStep[],
    current: number,
    failed: boolean
): TaskStepsState {
    const position = Number.isFinite(current)
        ? Math.max(0, Math.min(steps.length, Math.trunc(current)))
        : 0;
    const failure = failed && steps.length > 0;
    const active = failure ? Math.min(position, steps.length - 1) : position;
    const rows = steps.map((step, index) => ({
        ...step,
        status:
            index < active
                ? ('done' as const)
                : index === active
                  ? failure
                      ? ('error' as const)
                      : ('active' as const)
                  : ('pending' as const)
    }));
    const completed = rows.filter((row) => row.status === 'done').length;
    const sentence =
        steps.length === 0
            ? 'No steps.'
            : failure
              ? `Failed at ${steps[active].label}.`
              : position === steps.length
                ? `All ${steps.length} steps complete.`
                : `${steps[active].label}, step ${active + 1} of ${steps.length}.`;
    return {
        rows,
        current: active,
        completed,
        total: steps.length,
        failed: failure,
        complete: completed === steps.length,
        sentence
    };
}
