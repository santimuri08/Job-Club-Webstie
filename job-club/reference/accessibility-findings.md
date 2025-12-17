# Accessibility Findings (EAiKW Harvest)

## What to look for in EAiKW

- Keyboard navigation (focus states, skip links)
- ARIA usage for menus/dialogs
- Semantic headings and landmark regions
- Form label/required field handling

## Job Club status

- Layouts use semantic `header`, `main`, `footer`.
- Cookie banner/modal use `role="dialog"` and `aria-label`.
- Join form uses explicit `<label for>` associations.

## Remaining a11y TODO

- Add a visible focus style for interactive elements if not already present.
- Ensure cookie modal can be closed via Escape and traps focus (enhancement).
- Add `aria-expanded` changes for the mini cube menu (verify with keyboard).
