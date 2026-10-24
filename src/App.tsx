import { useState } from 'react'
import { seedContacts } from './data'
import type { ContactPatch, View } from './types'
import { ContactTable } from './components/ContactTable'
import { Board } from './components/Board'
import { DetailsPanel } from './components/DetailsPanel'

export default function App() {
  // One list is the single source of truth; both views only read from it.
  const [contacts, setContacts] = useState(seedContacts)
  const [view, setView] = useState<View>('table')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = contacts.find((c) => c.id === selectedId) ?? null

  const save = (id: string, patch: ContactPatch) =>
    setContacts((all) => all.map((c) => (c.id === id ? { ...c, ...patch } : c)))

  const close = () => {
    const id = selectedId
    setSelectedId(null)
    // Return focus to the row or card that opened the panel, in whichever view is showing.
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-contact-id="${id}"]`)?.focus())
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3">
        <h1 className="text-lg font-semibold">Contacts <span className="ml-1 text-sm font-normal text-muted">{contacts.length}</span></h1>
        <div role="group" aria-label="View" className="flex rounded-md bg-canvas p-0.5 text-sm">
          {(['table', 'board'] as const).map((v) => (
            <button
              key={v}
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded px-3 py-1 capitalize ${view === v ? 'bg-white font-medium shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <main className="min-w-0 flex-1">
          {view === 'table'
            ? <ContactTable contacts={contacts} selectedId={selectedId} onOpen={setSelectedId} />
            : <Board contacts={contacts} selectedId={selectedId} onOpen={setSelectedId} />}
        </main>
        {selected && (
          <DetailsPanel key={selected.id} contact={selected} onSave={(p) => save(selected.id, p)} onClose={close} />
        )}
      </div>
    </div>
  )
}
