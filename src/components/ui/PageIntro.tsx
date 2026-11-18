import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  to?: string
  label: string
}

/** Dark page header used on every subpage: breadcrumbs, H1, lead and actions. */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden="true" className="grid-dots absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(44_167_224/0.16),transparent)]"
      />
      <div className="wrap pb-14 pt-6 lg:pb-20 lg:pt-10">
        <nav aria-label="Murupolku">
          <ol className="flex flex-wrap items-center gap-1 text-[0.88rem] text-fog">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1">
                {i > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
                {c.to ? (
                  <Link to={c.to} className="rounded px-0.5 py-1 hover:text-chalk">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-mist">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={`mt-8 grid gap-10 lg:mt-12 ${aside ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
          <div className={aside ? 'lg:col-span-7' : 'max-w-4xl'}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-lg mt-5">{title}</h1>
            {lead ? <div className="lead mt-6 max-w-2xl text-mist">{lead}</div> : null}
            {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}
