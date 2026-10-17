import type { TaskStep, TaskStepsLabels, TaskStepsState } from '.';

function summarize(
    steps: TaskStep[],
    active: number,
    position: number,
    failure: boolean,
    labels: TaskStepsLabels | undefined
) {
    if (steps.length === 0) {
        return labels?.empty ?? 'No steps.';
    }
    if (failure) {
        const step = steps[active].label;

        return labels?.failed?.(step) ?? `Failed at ${step}.`;
    }
    if (position === steps.length) {
        return labels?.complete?.(steps.length) ?? `All ${steps.length} steps complete.`;
    }
    const step = steps[active].label;

    return (
        labels?.progress?.(step, active + 1, steps.length) ??
        `${step}, step ${active + 1} of ${steps.length}.`
    );
}

export function deriveTaskSteps(
    steps: TaskStep[],
    current: number,
    failed: boolean,
    labels?: TaskStepsLabels
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
    const sentence = summarize(steps, active, position, failure, labels);
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
