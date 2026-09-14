import type { InstallPath, RunSource } from '$lib/run-types';
import type { ManualPlan, ManualStep } from '$lib/terminal-types';
import { manualConsumerRoot } from './paths';

const quote = (value: string) =>
    /^[a-zA-Z0-9_./:@=*-]+$/.test(value) ? value : JSON.stringify(value);
const command = (...parts: string[]) => parts.map(quote).join(' ');

function step(id: string, title: string, description: string, value: string): ManualStep {
    return { id, title, description, command: value };
}

export async function buildManualPlan(
    source: RunSource,
    installPath: InstallPath
): Promise<ManualPlan> {
    const steps: ManualStep[] = [];

    if (installPath === 'cli') {
        steps.push(
            step(
                'cli-init',
                'Initialize Mielui',
                'The lab already links the selected Mielui package into this app.',
                command('bunx', '--no-install', 'mielui', 'init', '-y')
            ),
            step(
                'cli-add',
                'Install all components',
                'Copy every public component and its dependencies in one operation.',
                command('bunx', '--no-install', 'mielui', 'add', '*', '-y')
            )
        );
    } else if (source === 'npm') {
        steps.push(
            step(
                'package-install',
                'Install Mielui',
                'Exercise package subpath imports.',
                command('bun', 'add', '@mielui/svelte@latest')
            )
        );
    }

    steps.push(
        step(
            'check',
            'Check types',
            'Run Svelte diagnostics.',
            command('bunx', 'svelte-check', '--tsconfig', './tsconfig.json')
        ),
        step(
            'build',
            'Build the app',
            'Run the production compiler.',
            command('bun', 'run', 'build')
        ),
        step(
            'dev',
            'Launch the app',
            'Keep this command running, then open the printed localhost URL. Cancel stops it.',
            command(
                'bun',
                'run',
                'dev',
                '--',
                '--host',
                '127.0.0.1',
                '--port',
                '5174',
                '--strictPort'
            )
        )
    );

    return { workspace: manualConsumerRoot, steps };
}
