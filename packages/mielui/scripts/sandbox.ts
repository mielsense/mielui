/**
 * mielui CLI sandbox -- verifies the CLI works by running the built `mielui` binary
 * against a throwaway, SvelteKit-shaped project under the gitignored `.sandbox/`.
 * For CLI developers; not shipped to library users (scripts/ is outside the
 * published `files`).
 *
 *   pnpm run sandbox                  # build, then run the full check suite
 *   pnpm run sandbox run add button   # run one mielui command in the sandbox app
 *   pnpm run sandbox reset [--bare]   # recreate the app (bare = omit peer deps)
 *   pnpm run sandbox clean            # delete the sandbox
 *
 * Prepend --no-build to skip rebuilding the CLI first (`pnpm run sandbox --no-build`).
 *
 * The check suite exercises every command and guard by invoking the real binary
 * against a fresh install and asserting on the result; it exits non-zero if any
 * check fails. Use `run` to reproduce a failing command interactively.
 */

import { spawnSync } from 'node:child_process';
import {
    closeSync,
    existsSync,
    mkdirSync,
    openSync,
    readFileSync,
    rmSync,
    writeFileSync
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';
import { gradientLine } from '../cli/utils/ui';
import pkg from '../package.json';

const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distEntry = path.join(cliRoot, 'dist/index.js');
const sandboxRoot = path.join(cliRoot, '.sandbox');
const appDir = path.join(sandboxRoot, 'app');

/** Directory `mielui init` installs into by default; checks assert against it. */
const MIELUI = 'src/lib/mielui';

/** Framework-level peers a real consumer project would already have. */
const FRAMEWORK_PEERS: Record<string, string> = {
    svelte: '^5.0.0',
    tailwindcss: '^4.0.0'
};

/** Component-level peers mielui pulls; omitted by `--bare` so the missing-peer
 * warning path can be exercised. */
const COMPONENT_PEERS: Record<string, string> = {
    cnfast: '^0.0.8',
    'tailwind-merge': '^3.0.0',
    'tailwind-variants': '^3.0.0',
    '@floating-ui/dom': '^1.0.0',
    '@hugeicons/core-free-icons': '^4.3.0',
    'fuse.js': '^7.0.0'
};

function header(text: string) {
    console.log();
    console.log(`  ${gradientLine(text)}`);
    console.log();
}

const dim = (message: string) => console.log(pc.dim(`  ${message}`));

/** (Re)writes the sandbox app from scratch. */
function createApp(bare: boolean) {
    rmSync(appDir, { recursive: true, force: true });
    mkdirSync(path.join(appDir, 'src/lib'), { recursive: true });
    mkdirSync(path.join(appDir, 'src/routes'), { recursive: true });

    const devDependencies = bare
        ? { ...FRAMEWORK_PEERS }
        : { ...FRAMEWORK_PEERS, ...COMPONENT_PEERS };

    writeFileSync(
        path.join(appDir, 'package.json'),
        `${JSON.stringify(
            {
                name: 'mielui-sandbox-app',
                private: true,
                type: 'module',
                version: '0.0.0',
                devDependencies
            },
            null,
            '\t'
        )}\n`
    );

    // `mielui init` only checks that this file exists -- the sandbox exercises the
    // install flow, not a running SvelteKit app, so the fixture stays empty.
    writeFileSync(
        path.join(appDir, 'svelte.config.js'),
        '/** Fixture for the mielui CLI sandbox -- its presence satisfies `mielui init`. */\nexport default {};\n'
    );

    // Empty lockfile so the CLI detects pnpm as the package manager.
    writeFileSync(path.join(appDir, 'pnpm-lock.yaml'), '');

    writeFileSync(
        path.join(appDir, 'src/app.css'),
        [
            '/* mielui token system -- available after `mielui init`. */',
            "@import './lib/mielui/ui.css';",
            '/* Theme overrides -- available after `mielui add theme <slug>`: */',
            "/* @import './lib/mielui/theme.css'; */",
            ''
        ].join('\n')
    );

    writeFileSync(
        path.join(appDir, 'README.md'),
        [
            '# mielui CLI sandbox (generated)',
            '',
            'Ephemeral SvelteKit-shaped project for exercising the local `mielui` build.',
            'Created and reset by `packages/mielui/scripts/sandbox.ts`; everything under',
            '`.sandbox/` is gitignored. Edits here are disposable -- `pnpm run sandbox reset`',
            'recreates it from scratch.',
            ''
        ].join('\n')
    );
}

function ensureApp() {
    if (!existsSync(appDir)) {
        createApp(false);
        dim(`scaffolded a fresh app at ${path.relative(cliRoot, appDir)}`);
    }
}

function buildCli(noBuild: boolean) {
    if (noBuild) {
        if (!existsSync(distEntry)) {
            console.error(
                pc.red(`✖ ${path.relative(cliRoot, distEntry)} is missing -- drop --no-build.`)
            );
            process.exit(1);
        }
        return;
    }
    const result = spawnSync('pnpm', ['run', 'build'], { cwd: cliRoot, stdio: 'inherit' });
    if (result.status !== 0) {
        console.error(pc.red('✖ CLI build failed.'));
        process.exit(result.status ?? 1);
    }
}

// --- check suite: run the real binary, capture output, assert ---------------

/** Runs `mielui` in the sandbox app and captures combined output (no TTY, so the
 * CLI never prompts -- it takes the non-interactive branch everywhere). */
function mielui(args: string[]): { status: number; out: string } {
    const outputFile = path.join(sandboxRoot, '.command-output');
    mkdirSync(sandboxRoot, { recursive: true });
    const output = openSync(outputFile, 'w');
    let result: ReturnType<typeof spawnSync>;
    try {
        result = spawnSync('node', [distEntry, ...args], {
            cwd: appDir,
            stdio: ['ignore', output, output]
        });
    } finally {
        closeSync(output);
    }
    const out = readFileSync(outputFile, 'utf8');
    rmSync(outputFile, { force: true });
    return { status: result.status ?? 1, out };
}

const exists = (rel: string) => existsSync(path.join(appDir, rel));
const read = (rel: string) => readFileSync(path.join(appDir, rel), 'utf8');
const config = () =>
    JSON.parse(read('mielui.json')) as { components?: Record<string, string> } & Record<
        string,
        unknown
    >;

/** Fresh app + `mielui init -y`; returns the init result for assertions. */
function initApp(bare = false) {
    createApp(bare);
    return mielui(['init', '-y']);
}

type Check = { label: string; run: () => string[] };

const CHECKS: Check[] = [
    {
        label: 'init bootstraps mielui.json + base files',
        run: () => {
            const f: string[] = [];
            const r = initApp();
            if (r.status !== 0) {
                f.push(`init exited ${r.status}`);
            }
            for (const file of [
                'mielui.json',
                `${MIELUI}/ui.css`,
                `${MIELUI}/utils.ts`,
                `${MIELUI}/transition.ts`
            ]) {
                if (!exists(file)) {
                    f.push(`missing ${file}`);
                }
            }
            if (exists('mielui.json')) {
                const cfg = config();
                if (cfg.dir !== 'src/lib/mielui') {
                    f.push(`mielui.json dir = ${String(cfg.dir)}`);
                }
                if (cfg.alias !== '$lib/mielui') {
                    f.push(`mielui.json alias = ${String(cfg.alias)}`);
                }
                if (!cfg.registry) {
                    f.push('mielui.json missing registry');
                }
            }
            return f;
        }
    },
    {
        label: 'init guards against re-initialising',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['init', '-y']);
            if (r.status !== 0) {
                f.push(`second init exited ${r.status}`);
            }
            if (!r.out.includes('already exists')) {
                f.push('no "already exists" notice');
            }
            return f;
        }
    },
    {
        label: 'add installs files, rewrites imports, records version',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', 'button']);
            if (r.status !== 0) {
                f.push(`add button exited ${r.status}`);
            }
            for (const file of ['button.svelte', 'index.ts', 'variants.ts']) {
                if (!exists(`${MIELUI}/components/button/${file}`)) {
                    f.push(`missing button/${file}`);
                }
            }
            if (exists(`${MIELUI}/components/button/button.svelte`)) {
                const src = read(`${MIELUI}/components/button/button.svelte`);
                if (!src.includes('$lib/mielui')) {
                    f.push('imports not rewritten to alias');
                }
                if (src.includes('@mielui/svelte')) {
                    f.push('stale @mielui/svelte import remains');
                }
            }
            if (!config().components?.button) {
                f.push('mielui.json did not record button');
            }
            return f;
        }
    },
    {
        label: 'add resolves transitive deps (command → dialog, button)',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', 'command']);
            if (r.status !== 0) {
                f.push(`add command exited ${r.status}`);
            }
            for (const name of ['command', 'dialog', 'button']) {
                if (!exists(`${MIELUI}/components/${name}`)) {
                    f.push(`missing component dir ${name}`);
                }
                if (!config().components?.[name]) {
                    f.push(`mielui.json missing ${name}`);
                }
            }
            return f;
        }
    },
    {
        label: 'add pulls internal deps (dialog → _internal/overlay)',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', 'dialog']);
            if (r.status !== 0) {
                f.push(`add dialog exited ${r.status}`);
            }
            if (!exists(`${MIELUI}/components/_internal/overlay/overlay.svelte.ts`)) {
                f.push('internal overlay not installed');
            }
            if (!exists(`${MIELUI}/components/dialog/dialog.svelte`)) {
                f.push('dialog not installed');
            }
            return f;
        }
    },
    {
        label: 'add accepts multiple components at once',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', 'accordion', 'badge']);
            if (r.status !== 0) {
                f.push(`add exited ${r.status}`);
            }
            for (const name of ['accordion', 'badge']) {
                if (!config().components?.[name]) {
                    f.push(`mielui.json missing ${name}`);
                }
            }
            return f;
        }
    },
    {
        label: 'add is idempotent (re-add skips existing)',
        run: () => {
            const f: string[] = [];
            initApp();
            mielui(['add', 'button']);
            const r = mielui(['add', 'button']);
            if (r.status !== 0) {
                f.push(`re-add exited ${r.status}`);
            }
            if (!r.out.includes('already existed')) {
                f.push('no skip notice on re-add');
            }
            return f;
        }
    },
    {
        label: 'add --overwrite replaces modified files',
        run: () => {
            const f: string[] = [];
            initApp();
            mielui(['add', 'button']);
            const target = `${MIELUI}/components/button/button.svelte`;
            writeFileSync(path.join(appDir, target), '// tampered\n');
            const r = mielui(['add', 'button', '--overwrite']);
            if (r.status !== 0) {
                f.push(`overwrite exited ${r.status}`);
            }
            const src = exists(target) ? read(target) : '';
            if (src.includes('// tampered')) {
                f.push('file not overwritten');
            }
            if (!src.includes('$lib/mielui')) {
                f.push('overwritten file missing rewritten imports');
            }
            return f;
        }
    },
    {
        label: 'add before init fails with guidance',
        run: () => {
            const f: string[] = [];
            createApp(false); // deliberately skip init
            const r = mielui(['add', 'button']);
            if (r.status === 0) {
                f.push('expected non-zero exit');
            }
            if (!r.out.includes('mielui init')) {
                f.push('no "mielui init" guidance');
            }
            return f;
        }
    },
    {
        label: 'unknown component suggests the closest match',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', 'buton']);
            if (r.status === 0) {
                f.push('expected non-zero exit');
            }
            if (!r.out.includes('did you mean')) {
                f.push('no suggestion offered');
            }
            if (!r.out.includes('button')) {
                f.push('did not suggest "button"');
            }
            return f;
        }
    },
    {
        label: 'internal component rejected as a direct target',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', '_internal/overlay']);
            if (r.status === 0) {
                f.push('expected non-zero exit');
            }
            if (!r.out.includes('internal')) {
                f.push('no "internal" explanation');
            }
            return f;
        }
    },
    {
        label: 'add theme default resolves offline',
        run: () => {
            const f: string[] = [];
            initApp();
            const r = mielui(['add', 'theme', 'default']);
            if (r.status !== 0) {
                f.push(`add theme exited ${r.status}`);
            }
            if (!exists(`${MIELUI}/theme.css`)) {
                f.push('theme.css not written');
            } else if (!read(`${MIELUI}/theme.css`).includes(':root')) {
                f.push('theme.css missing :root');
            }
            return f;
        }
    },
    {
        label: 'list shows components and themes',
        run: () => {
            const f: string[] = [];
            const r = mielui(['list']);
            if (r.status !== 0) {
                f.push(`list exited ${r.status}`);
            }
            if (!r.out.includes('button')) {
                f.push('list missing "button"');
            }
            if (!r.out.includes('default')) {
                f.push('list missing "default" theme');
            }
            return f;
        }
    },
    {
        label: '--version matches package.json',
        run: () => {
            const f: string[] = [];
            const r = mielui(['--version']);
            if (r.status !== 0) {
                f.push(`--version exited ${r.status}`);
            }
            if (r.out.trim() !== pkg.version) {
                f.push(`printed "${r.out.trim()}", expected ${pkg.version}`);
            }
            return f;
        }
    },
    {
        label: 'bare project reports missing peer dependencies',
        run: () => {
            const f: string[] = [];
            const r = initApp(true);
            if (r.status !== 0) {
                f.push(`init exited ${r.status}`);
            }
            if (!r.out.includes('missing peer dependencies')) {
                f.push('no missing-peer warning');
            }
            return f;
        }
    }
];

function verify(noBuild: boolean) {
    buildCli(noBuild);
    header('mielui sandbox · verify');
    dim(`running ${CHECKS.length} checks against ${path.relative(cliRoot, appDir)}`);
    console.log();

    let failed = 0;
    for (const check of CHECKS) {
        const failures = check.run();
        if (failures.length === 0) {
            console.log(`  ${pc.green('✔')} ${check.label}`);
        } else {
            failed++;
            console.log(`  ${pc.red('✖')} ${check.label}`);
            for (const failure of failures) {
                console.log(`    ${pc.red(failure)}`);
            }
        }
    }

    console.log();
    if (failed > 0) {
        console.log(`  ${pc.red(`${failed} of ${CHECKS.length} checks failed`)}`);
        dim('reproduce a command with: pnpm run sandbox run <args>');
        process.exit(1);
    }
    console.log(`  ${pc.green(`all ${CHECKS.length} checks passed`)}`);
}

/** Runs one mielui command against the persistent sandbox app, for debugging. */
function runOnce(mieluiArgs: string[], noBuild: boolean) {
    if (mieluiArgs.length === 0) {
        printHelp();
        process.exit(1);
    }
    buildCli(noBuild);
    ensureApp();
    process.exit(
        spawnSync('node', [distEntry, ...mieluiArgs], { cwd: appDir, stdio: 'inherit' }).status ?? 1
    );
}

function printHelp() {
    header('mielui sandbox');
    console.log('  Run the local mielui build against a throwaway project and verify it works.');
    console.log();
    console.log(
        `  ${pc.cyan('pnpm run sandbox')}                  run the full check suite (default)`
    );
    console.log(
        `  ${pc.cyan('pnpm run sandbox run <args>')}       run one mielui command in the app`
    );
    console.log(
        `  ${pc.cyan('pnpm run sandbox reset [--bare]')}   recreate the app (bare omits peers)`
    );
    console.log(`  ${pc.cyan('pnpm run sandbox clean')}            delete the sandbox`);
    console.log();
    dim('prepend --no-build to skip rebuilding the CLI first');
    console.log();
}

// --- dispatch ---------------------------------------------------------------

let args = process.argv.slice(2);
let noBuild = false;
if (args[0] === '--no-build') {
    noBuild = true;
    args = args.slice(1);
}

const command = args[0];
switch (command) {
    case undefined:
    case 'verify':
        verify(noBuild);
        break;
    case 'help':
    case '--help':
    case '-h':
        printHelp();
        break;
    case 'clean':
        rmSync(sandboxRoot, { recursive: true, force: true });
        dim('removed .sandbox');
        break;
    case 'reset':
        createApp(args.includes('--bare'));
        dim(
            `reset app at ${path.relative(cliRoot, appDir)}${args.includes('--bare') ? ' (bare)' : ''}`
        );
        break;
    case 'run':
        runOnce(args.slice(1), noBuild);
        break;
    default:
        runOnce(args, noBuild);
}
