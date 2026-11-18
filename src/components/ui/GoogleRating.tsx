import { Star } from 'lucide-react'
import { company } from '../../data/company'

/** Real, dated Google rating with a link to the source (no invented reviews). */
export function GoogleRating({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const r = company.googleRating
  return (
    <a
      href={company.maps.open}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-11 items-center gap-2 text-[0.95rem] ${tone === 'dark' ? 'text-mist hover:text-chalk' : 'text-slate hover:text-graphite'} ${className}`}
    >
      <Star size={17} aria-hidden="true" className="fill-amber text-amber" />
      <span>
        <strong className={tone === 'dark' ? 'text-chalk' : 'text-graphite'}>{r.value} / 5</strong> Google-arvioissa ({r.count} arviota,{' '}
        {r.checked})
      </span>
      <span className="sr-only">– avaa arviot Google Mapsissa uuteen välilehteen</span>
    </a>
  )
}
