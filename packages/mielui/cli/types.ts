/**
 * Registry artifact types.
 *
 * `scripts/build-registry.ts` snapshots every component manifest from
 * `packages/mielui` into `registry/index.json` (this shape) plus the raw
 * source files under `registry/files/`. The published CLI ships that
 * snapshot so `mielui add` works without a server.
 */

export type RegistryComponent = {
    name: string;
    version: string;
    visibility: 'public' | 'internal';
    description?: string;
    /** Paths relative to the mielui source root (e.g. `components/button/button.svelte`). */
    files: string[];
    /** Other mielui components this one pulls in transitively. */
    components: string[];
    /** `utils.<symbol>` or `<module>` shared dependencies. */
    shared: string[];
    /** `shared` entries resolved to source files at snapshot time. */
    sharedFiles: string[];
    /** npm packages the consumer project must have installed. */
    peerDependencies: Record<string, string>;
};

export type RegistryIndex = {
    /** Version of the @mielui/svelte package the snapshot was built with. */
    cliVersion: string;
    builtAt: string;
    components: RegistryComponent[];
};

export type RegistryTheme = {
    slug: string;
    name: string;
    description?: string;
    css: string;
};

/** Shape of `mielui.json` in the consumer project root. */
export type MieluiConfig = {
    $schema?: string;
    /** Directory mielui source is installed into, relative to project root. */
    dir: string;
    /** Import alias that replaces `@mielui/svelte` in installed files. */
    alias: string;
    /** Theme registry API base URL used by `mielui add theme <slug>`. */
    registry: string;
    /** Installed components and their versions, maintained by `mielui add`. */
    components: Record<string, string>;
};
