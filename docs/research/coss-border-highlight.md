# COSS border highlight review

Reviewed September 17, 2026. Research only: no highlight treatment is added to Mielui in this change.

## What the effect is

The current COSS Svelte registry uses a translucent border with a very small edge shadow on a pointer-transparent pseudo-element. In light mode, an input has a low-opacity black lower edge. In dark mode, it has a low-opacity white upper edge. Primary buttons use an inset upper highlight that changes when pressed. Input highlights are suppressed during focus, invalid, and disabled states, allowing the semantic state styling to take priority. This is a static surface treatment, not an animated traveling border.

Sources: [styling documentation](https://coss.miel.my/docs/styling.md), [Button registry source](https://coss.miel.my/r/button.json), [Input registry source](https://coss.miel.my/r/input.json), [Number Field registry source](https://coss.miel.my/r/number-field.json). The registry files were inspected directly; these recommendations are design judgments, not measured contrast findings.

## Best candidates

| Candidate | Purpose | Constraint |
| --- | --- | --- |
| Dark Input, Textarea, Number Field group | Distinguish the field surface from a similarly colored page | Apply once to the outer control; suppress on focus/error/disabled |
| Primary buttons | Make the existing filled surface subtly tactile | No extra drop shadow; pressed state should flatten |
| Select and Combobox triggers | Align filled triggers with input treatment | Share the same field token; never style each child separately |
| Dialog, Popover, Drawer outer surfaces | Clarify the edge of a raised surface in dark mode | Avoid a second competing border around inset content |

Do not apply it to outline or ghost buttons, separators, calendar cells, or every Card. Outline buttons should remain flat, as requested. Group should have one outer treatment rather than overlapping highlights on each item.

## Before implementing

Use a semantic token for the edge color instead of copying COSS white/black percentages throughout components. Compare light and dark themes, focused/invalid/disabled/pressed states, joined controls, and high contrast. Check that the edge clarifies the surface without becoming a glow or replacing the accessible focus indicator. User review of a small visual comparison should precede rollout.
