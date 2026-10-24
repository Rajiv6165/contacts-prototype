import type { Contact } from '../types'
import { Labels, NotSet, StagePill } from './ui'

interface Props {
  contacts: Contact[]
  selectedId: string | null
  onOpen: (id: string) => void
}

const HEADERS = ['Name', 'Company', 'Role', 'Owner', 'Stage', 'Labels', 'Email', 'Notes']

export function ContactTable({ contacts, selectedId, onOpen }: Props) {
  return (
    <div className="h-full overflow-auto">
      <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            {HEADERS.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`sticky top-0 border-b border-line bg-white px-3 py-2 text-left text-xs font-medium text-muted ${i === 0 ? 'left-0 z-20' : 'z-10'}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => {
            const selected = c.id === selectedId
            const bg = selected ? 'bg-accent-soft' : 'bg-white group-hover:bg-canvas'
            const cell = `border-b border-line px-3 py-2 align-top ${bg}`
            return (
              <tr key={c.id} className="group cursor-pointer" onClick={() => onOpen(c.id)}>
                <td className={`sticky left-0 z-10 font-medium ${cell}`}>
                  <button
                    data-contact-id={c.id}
                    aria-current={selected || undefined}
                    onClick={(e) => { e.stopPropagation(); onOpen(c.id) }}
                    className="text-left hover:underline"
                  >
                    {c.name}
                  </button>
                </td>
                <td className={cell}>{c.company ?? <NotSet />}</td>
                <td className={cell}>{c.role ?? <NotSet />}</td>
                <td className={cell}>{c.owner ?? <NotSet />}</td>
                <td className={cell}><StagePill stage={c.stage} /></td>
                <td className={cell}><Labels labels={c.labels} /></td>
                <td className={`${cell} text-muted`}>{c.email}</td>
                <td className={`${cell} max-w-[220px] truncate text-muted`}>{c.notes ?? <NotSet />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
