import { useEffect, useRef, useState } from 'react'
import { STAGES, type Contact, type ContactPatch, type Stage } from '../types'
import { Labels, NotSet } from './ui'

interface Props {
  contact: Contact
  onSave: (patch: ContactPatch) => void
  onClose: () => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm">{children}</dd>
    </div>
  )
}

// The parent renders this with key={contact.id}, so the draft resets when another contact opens.
export function DetailsPanel({ contact, onSave, onClose }: Props) {
  const [stage, setStage] = useState<Stage>(contact.stage)
  const [notes, setNotes] = useState(contact.notes ?? '')
  const [justSaved, setJustSaved] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => { heading.current?.focus() }, [])

  const dirty = stage !== contact.stage || notes !== (contact.notes ?? '')

  const save = () => {
    onSave({ stage, notes: notes.trim() === '' ? undefined : notes })
    setJustSaved(true)
  }

  return (
    <aside
      role="dialog"
      aria-label={`Details for ${contact.name}`}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
      className="flex h-full w-[360px] shrink-0 flex-col border-l border-line bg-white"
    >
      <header className="flex items-start justify-between gap-2 border-b border-line p-4">
        <div>
          <h2 ref={heading} tabIndex={-1} className="text-base font-semibold outline-none">{contact.name}</h2>
          <a href={`mailto:${contact.email}`} className="text-sm text-accent hover:underline">{contact.email}</a>
        </div>
        <button onClick={onClose} aria-label="Close details" className="rounded p-1 text-muted hover:bg-canvas">✕</button>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <dl className="grid grid-cols-2 gap-4">
          <Field label="Company">{contact.company ?? <NotSet />}</Field>
          <Field label="Role">{contact.role ?? <NotSet />}</Field>
          <Field label="Owner">{contact.owner ?? <NotSet />}</Field>
          <Field label="Labels"><Labels labels={contact.labels} /></Field>
        </dl>

        <div>
          <label htmlFor="stage" className="text-xs text-muted">Stage</label>
          <select
            id="stage"
            value={stage}
            onChange={(e) => { setStage(e.target.value as Stage); setJustSaved(false) }}
            className="mt-1 block w-full rounded-md border border-line bg-white px-2 py-1.5 text-sm"
          >
            {STAGES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="text-xs text-muted">Notes</label>
          <textarea
            id="notes"
            rows={7}
            value={notes}
            placeholder="Add a note about this contact"
            onChange={(e) => { setNotes(e.target.value); setJustSaved(false) }}
            className="mt-1 block w-full resize-y rounded-md border border-line px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-line p-4">
        <button
          onClick={save}
          disabled={!dirty}
          className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white disabled:bg-line disabled:text-muted"
        >
          Save changes
        </button>
        <button onClick={onClose} className="rounded-md px-3 py-1.5 text-sm hover:bg-canvas">Cancel</button>
        <span role="status" className="ml-auto text-xs text-muted">
          {dirty ? 'Unsaved changes' : justSaved ? 'Saved' : ''}
        </span>
      </footer>
    </aside>
  )
}
