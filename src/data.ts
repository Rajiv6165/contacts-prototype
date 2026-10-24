import type { Contact } from './types'

// Fictional data. Nobody is in "Customer" so the empty board group is visible
// from the start; a saved stage change can fill it. Several fields are missing on purpose.
export const seedContacts: Contact[] = [
  { id: 'c1', name: 'Maya Okafor', email: 'maya@northwind.example', company: 'Northwind Labs', role: 'Head of Ops', owner: 'Ravi Shah', labels: ['Warm intro', 'EU'], stage: 'Lead', notes: 'Met at the March meetup. Asked for a pricing sheet.' },
  { id: 'c2', name: 'Tomás Herrera', email: 'tomas@brightpath.example', company: 'Brightpath', role: 'Founder', owner: 'Ana Weiss', labels: ['Founder'], stage: 'Prospect', notes: 'Demo booked for next Tuesday.' },
  { id: 'c3', name: 'Priya Nair', email: 'priya@lumen.example', company: 'Lumen Health', owner: 'Ravi Shah', labels: ['Healthcare', 'Priority'], stage: 'Qualified', notes: 'Budget approved. Waiting on legal review.' },
  { id: 'c4', name: 'Jonas Albrecht', email: 'jonas@kestrel.example', company: 'Kestrel Freight', role: 'COO', labels: [], stage: 'Lead' },
  { id: 'c5', name: 'Amara Diallo', email: 'amara@sahel.example', role: 'Consultant', owner: 'Ana Weiss', labels: ['Referral'], stage: 'Lead', notes: 'Independent. Referred by Maya.' },
  { id: 'c6', name: 'Lena Fischer', email: 'lena@quill.example', company: 'Quill & Co', role: 'Marketing Lead', owner: 'Ravi Shah', labels: ['EU'], stage: 'Prospect' },
  { id: 'c7', name: 'Kenji Watanabe', email: 'kenji@harbor.example', company: 'Harbor Systems', role: 'CTO', owner: 'Ana Weiss', labels: ['Priority', 'Technical'], stage: 'Qualified', notes: 'Wants an API walkthrough before signing.' },
  { id: 'c8', name: 'Sofia Rossi', email: 'sofia@verde.example', company: 'Verde Foods', role: 'Buyer', labels: ['Retail'], stage: 'Prospect', notes: 'Prefers phone over email.' },
  { id: 'c9', name: 'Daniel Mensah', email: 'daniel@tidewater.example', company: 'Tidewater', owner: 'Ravi Shah', labels: [], stage: 'Lead' },
  { id: 'c10', name: 'Hannah Lindqvist', email: 'hannah@fjord.example', company: 'Fjord Analytics', role: 'Product Manager', owner: 'Ana Weiss', labels: ['Technical'], stage: 'Qualified' },
]
