
## Navigation and repository tooling

FullscreenNav and its component subpath are removed. Compose Sheet.Root, Sheet.Trigger, and Sheet.Content with a Sheet.Title, Sheet.Description, Sheet.Close, and ordinary navigation links. Keep the link list in a scrollable region and close the sheet when a link is selected.

The repository now uses pnpm with Node.js. Install with `pnpm install --frozen-lockfile` and run workspace commands with `pnpm --filter <workspace> run <script>`. Package and registry tests use Vitest. TypeScript tooling runs through tsx. Existing component imports still use `@mielui/svelte/components/<name>` even when the source lives in `blocks/` or `ai-components/`.

## Dialog naming

Replace `Modal` with `Dialog` in imports and composed parts. Use `@mielui/svelte/components/dialog` and `mielui add dialog`. Rename `ModalProps`, `ModalContentProps`, and the other component prop types to their `Dialog` equivalents. The composed parts and behavior remain the same. AlertDialog uses Dialog internally and remains the confirmation component. Modal is not retained as an alias.

## Toast composition

Toast is now a namespace with Root, Content, Footer, Title, Icon, Actions, Action, and Close. Replace `<Toast toast={item} />` with `<Toast.Root toast={item} />`. Toaster and toast.success() keep their existing imports and behavior. Root without children uses these public parts. With children, it renders only the supplied composition. Put description or custom content in Content and place Title and Actions inside Footer. Actions defaults to the toast actions; custom Action parts take an action object with label, callback, and optional variant. Close calls the toast exit callback. Root itself does not register a toast or create a portal. Use toast() and Toaster for timed, portaled notifications. Use persistent: true for a decision that must wait for a user. There is no progress bar. Hover and keyboard focus both pause timed notifications.

## Kbd and Show More

Replace Shortcut and ShortcutProps with Kbd and KbdProps. Import Kbd from @mielui/svelte/components/kbd or the package root. The shortcut string prop and ontrigger callback retain their behavior. The previous components/shortcut entry is removed. Show More is now grouped with Blocks in source and docs; its public import stays @mielui/svelte/components/show-more.
