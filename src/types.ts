export const STAGES = ['Lead', 'Prospect', 'Qualified', 'Customer'] as const
export type Stage = (typeof STAGES)[number]
export type View = 'table' | 'board'

export interface Contact {
  id: string
  name: string
  email: string
  stage: Stage
  labels: string[]
  // Optional on purpose: the UI must cope with gaps in real data.
  company?: string
  role?: string
  owner?: string
  notes?: string
}

export type ContactPatch = Pick<Contact, 'stage' | 'notes'>
