
## Navigation and repository tooling

FullscreenNav and its component subpath are removed. Compose Sheet.Root, Sheet.Trigger, and Sheet.Content with a Sheet.Title, Sheet.Description, Sheet.Close, and ordinary navigation links. Keep the link list in a scrollable region and close the sheet when a link is selected.

The repository now uses pnpm with Node.js. Install with `pnpm install --frozen-lockfile` and run workspace commands with `pnpm --filter <workspace> run <script>`. Package and registry tests use Vitest. TypeScript tooling runs through tsx. Existing component imports still use `@mielui/svelte/components/<name>` even when the source lives in `blocks/` or `ai-components/`.

## Dialog naming

Replace `Modal` with `Dialog` in imports and composed parts. Use `@mielui/svelte/components/dialog` and `mielui add dialog`. Rename `ModalProps`, `ModalContentProps`, and the other component prop types to their `Dialog` equivalents. The composed parts and behavior remain the same. AlertDialog uses Dialog internally and remains the confirmation component. Modal is not retained as an alias.
