- Remove Fullscreen Nav. Use Sheet with navigation links for mobile menus.
- Rename Modal to Dialog, including its types, package subpath, and CLI command.

- Replace standalone Toast usage with Toast.Root and its composable parts. Toast progress bars have been removed.

- Renamed Shortcut to Kbd, including its import path and prop type.

- Require Svelte 5.33 or newer for attachment support.

- Card titles default to level-two headings and accept an explicit heading level.
- Alert announcements are opt-in, with separate polite and assertive modes.
- Breadcrumb current-page state is explicit instead of inferred from the router.
- Reorder List dragging starts from its handle; row content remains interactive and accessible.
- Enforce mode-specific Input, Question, Accordion, and Toggle Group values and branch-specific Button and Badge attributes.
