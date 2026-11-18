import { Plus } from 'lucide-react'
import type { QA } from '../../data/services'

/** Native <details> accordion: accessible, works without JavaScript and is crawlable. */
export function FaqList({ items, tone = 'light' }: { items: QA[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <div className={`border-t ${dark ? 'border-line' : 'border-graphite/15'}`}>
      {items.map((f) => (
        <details key={f.q} className={`group border-b ${dark ? 'border-line' : 'border-graphite/15'}`}>
          <summary
            className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[1.25rem] font-semibold [font-stretch:88%] sm:text-[1.4rem] [&::-webkit-details-marker]:hidden ${
              dark ? 'text-chalk' : 'text-graphite'
            }`}
          >
            {f.q}
            <span
              aria-hidden="true"
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45 ${
                dark ? 'border-line-2 text-signal' : 'border-graphite/20 text-signal-deep'
              }`}
            >
              <Plus size={18} />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-12 ${dark ? 'text-mist' : 'text-slate'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
