# Core docs content review, September 23, 2026

## Scope

Read usage and example prose for all 52 core component pages listed below. Scanned their example source for bare action buttons, timers, pending states, and placeholder links. This was a source review, not a claim that every example was exercised in a browser. Categories were compared with the core-component manifest; no move was justified.

## Changes

- Rewrote Slider, Combobox, Input, Tabs, Drawer, Native Select, Table, Hover Card, OTP Field, Collapsible, Kbd, Pagination, and Progress guidance. Lead with composition or binding; split form, keyboard, and state behavior into separate paragraphs. Removed internal library attribution where it did not help users.
- Moved Input and Kbd prose from outside sections into Usage. Removed duplicate Kbd event guidance. Moved the Drawer secondary example after Usage.
- Declared the bound state shown in Slider and Tabs usage snippets. Removed an unused Avatar import from the Hover Card snippet.
- Connected Group Undo/Redo to revision state and Zoom controls to a bounded percentage. Disabled actions at their boundaries.
- Added a Complete request / Start again control to the indeterminate Progress example. Prevented repeated Spinner saves while its pending operation is active.

## Verification

The 17 edited Svelte files pass scoped Biome formatting and lint. All 17 parse with the installed Svelte compiler. No full tests or browser sweep were run by this reviewer.

## Pages read

- accordion
- alert
- alert-dialog
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- checkbox
- collapsible
- combobox
- context-menu
- date-picker
- date-range-picker
- dialog
- drawer
- dropdown-menu
- empty-state
- field
- fieldset
- file-upload
- form
- group
- hover-card
- input
- kbd
- label
- native-select
- number-field
- otp-field
- pagination
- popover
- progress
- radio-group
- range-calendar
- scroll-area
- select
- separator
- sheet
- skeleton
- slider
- spinner
- switch
- table
- tabs
- tag-input
- textarea
- toggle
- toggle-group
- tooltip
- typography

## Remaining review limits

Button variant samples and tooltip placement triggers intentionally demonstrate appearance or hover behavior without application mutations. All other bare Button matches in the targeted scan were addressed in Group. A full runtime pass is still needed for overlay nesting, keyboard focus, and narrow layout. This review does not certify those states.
