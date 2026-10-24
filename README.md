# Contacts: table and board prototype

A Table / Board interface over one shared set of 10 fictional contacts. Built with React, TypeScript, Vite and Tailwind CSS v4. Mock data and local state only.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## What it does

- **Table / Board switch** in the header. Both views render from one `contacts` array in `App.tsx`, so they cannot drift apart.
- **Edit Stage and Notes from either view.** Clicking a row or a card opens a details panel on the right. Changes stay in a draft until **Save changes**; **Cancel** (or Esc, or the close button) discards the draft.
- **Saving moves the card** to its new stage column and updates the table row in the same render.
- **Empty group:** nobody starts in Customer, so the empty state shows immediately. Move someone there to fill it.
- **Missing data:** some contacts have no company, role, owner, labels or notes. The table shows a dash; cards and the panel simply leave the line out or show a dash.
- **Context is kept:** closing the panel does not change the view, and focus returns to the row or card that opened it, even after the contact moved columns.

## Design choices

- **Table** shows every field except full notes (a one-line preview), because scanning across fields is what a table is for. The Name column is sticky so it stays visible when the table scrolls sideways on a narrower screen.
- **Cards** show only what helps you decide who to talk to next: name, role at company, labels, owner. Email and notes live in the panel.
- **One shared panel** for both views, so editing behaves the same everywhere. It is a side panel, not a modal, so the list stays visible and the selected row or card stays highlighted.
- **Save is explicit and disabled until something changes.** The footer says "Unsaved changes" or "Saved" (announced as a status message).
- **Quiet visual style:** cool neutrals, one teal accent, IBM Plex Sans. Stage is shown with a small colour dot plus the word, so it never relies on colour alone.
- **Keyboard:** the name button in each row and each card are real buttons. Opening the panel moves focus to its heading, Esc closes it, and focus goes back to the opener.

## Trade-offs

- Unsaved edits are discarded when you close the panel or open another contact. Simple and predictable, but a "discard changes?" prompt would be kinder.
- Stage is changed through a select in the panel, not by dragging. It is accessible and robust, but slower than drag-and-drop.
- Labels, owner and the other fields are read-only, as the brief only asks for Stage and Notes edits.
- State is a plain `useState` list. With more edit types or async saving I would move to a reducer or a small store.

## Left unfinished / next

- Drag-and-drop between board columns (with a keyboard alternative).
- Search, filters and column sorting.
- Confirmation before discarding unsaved edits, and an undo after saving.
- Below about 900px the panel should become a full-width sheet.
- Component tests for the save/cancel and view-switch flows.
