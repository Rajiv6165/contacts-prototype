import type { Stage } from '../types'

const DOT: Record<Stage, string> = {
  Lead: 'bg-slate-400',
  Prospect: 'bg-sky-500',
  Qualified: 'bg-amber-500',
  Customer: 'bg-emerald-500',
}

export function StageDot({ stage }: { stage: Stage }) {
  return <span aria-hidden className={`inline-block h-2 w-2 shrink-0 rounded-full ${DOT[stage]}`} />
}

export function StagePill({ stage }: { stage: Stage }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <StageDot stage={stage} />
      {stage}
    </span>
  )
}

export function Labels({ labels }: { labels: string[] }) {
  if (labels.length === 0) return <NotSet />
  return (
    <span className="flex flex-wrap gap-1">
      {labels.map((l) => (
        <span key={l} className="rounded bg-accent-soft px-1.5 py-0.5 text-xs text-accent">{l}</span>
      ))}
    </span>
  )
}

export function NotSet() {
  return <span className="text-muted/60" aria-label="Not set">—</span>
}

export function Initials({ name }: { name: string }) {
  const text = name.split(' ').map((p) => p[0]).join('').slice(0, 2)
  return (
    <span title={name} className="grid h-5 w-5 place-items-center rounded-full bg-line text-[10px] font-semibold text-muted">
      {text}
    </span>
  )
}
