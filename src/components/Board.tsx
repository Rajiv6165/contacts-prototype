import { STAGES, type Contact } from '../types'
import { Initials, Labels, StageDot } from './ui'

interface Props {
  contacts: Contact[]
  selectedId: string | null
  onOpen: (id: string) => void
}

export function Board({ contacts, selectedId, onOpen }: Props) {
  return (
    <div className="flex h-full gap-3 overflow-x-auto p-4">
      {STAGES.map((stage) => {
        const items = contacts.filter((c) => c.stage === stage)
        return (
          <section key={stage} aria-label={`${stage}, ${items.length} contacts`} className="flex w-64 shrink-0 flex-col">
            <h2 className="mb-2 flex items-center gap-2 px-1 text-sm font-medium">
              <StageDot stage={stage} />
              {stage}
              <span className="text-muted">{items.length}</span>
            </h2>
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto rounded-lg bg-black/[0.03] p-2">
              {items.length === 0 && (
                <p className="px-2 py-6 text-center text-sm text-muted">No contacts in {stage} yet. Change a contact's stage to add one.</p>
              )}
              {items.map((c) => (
                <button
                  key={c.id}
                  data-contact-id={c.id}
                  aria-current={c.id === selectedId || undefined}
                  onClick={() => onOpen(c.id)}
                  className={`rounded-md border bg-white p-3 text-left shadow-sm hover:border-accent ${c.id === selectedId ? 'border-accent ring-1 ring-accent' : 'border-line'}`}
                >
                  <span className="block text-sm font-medium">{c.name}</span>
                  {(c.company || c.role) && (
                    <span className="mt-0.5 block text-xs text-muted">{[c.role, c.company].filter(Boolean).join(' at ')}</span>
                  )}
                  {c.labels.length > 0 && <span className="mt-2 block"><Labels labels={c.labels} /></span>}
                  {c.owner && (
                    <span className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                      <Initials name={c.owner} /> {c.owner}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
