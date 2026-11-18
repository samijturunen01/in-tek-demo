import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { symptoms } from '../../data/symptoms'
import { serviceById } from '../../data/services'
import { inquiryHref } from '../../data/nav'
import { TelltaleIcon } from '../brand/Telltale'
import { track } from '../../lib/analytics'

/**
 * "Mikä valo palaa?" – a symptom-led entry for visitors who know the warning
 * light or symptom but not the name of the unit. Implemented as an ARIA tabs widget.
 */
export function SymptomFinder({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [active, setActive] = useState(0)
  const uid = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const s = symptoms[active]
  const service = serviceById(s.service)
  const also = s.also ? serviceById(s.also) : null
  const H = headingLevel === 2 ? 'h2' : 'h3'

  const select = (i: number, focus = false) => {
    setActive(i)
    track('symptom_select', { symptom: symptoms[i].id })
    if (focus) tabs.current[i]?.focus()
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = symptoms.length
    const map: Record<string, number> = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key], true)
    }
  }

  return (
    <section id="merkkivalot" className="relative border-b border-line bg-ink-2">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow">Merkkivalo-opas</p>
            <H className="display-lg mt-5">Mikä valo palaa? Aloita oireesta.</H>
          </div>
          <p className="text-mist lg:col-span-5">
            Et tarvitse osan nimeä. Valitse oire, niin näet tyypilliset syyt, korjausajan ja takuun – ja voit kysyä hintaa suoraan oikeasta korjauksesta.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            role="tablist"
            aria-label="Oireet ja merkkivalot"
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1"
          >
            {symptoms.map((item, i) => {
              const selected = i === active
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group relative flex min-h-[60px] items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left font-semibold transition-colors lg:px-4 ${
                    selected ? 'border-line-2 bg-ink-3 text-chalk' : 'border-line bg-transparent text-mist hover:border-line-2 hover:text-chalk'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-signal shadow-[0_0_10px_#2ca7e0] transition-opacity ${
                      selected ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    data-tone={item.tone}
                    className={`telltale shrink-0 ${selected ? 'is-lit' : 'text-fog group-hover:text-mist'}`}
                  >
                    <TelltaleIcon id={item.icon} size={30} />
                  </span>
                  <span className="text-[0.95rem] leading-snug lg:text-[1.02rem]">{item.label}</span>
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${s.id}`}
            tabIndex={0}
            className="panel relative overflow-hidden p-6 sm:p-8 lg:col-span-7 lg:p-10"
          >
            <div aria-hidden="true" className="grid-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(200deg,#000,transparent_60%)]" />
            <div className="relative" key={s.id}>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="readout text-fog">{service.name}</p>
                  <H className="display-md mt-3">{s.title}</H>
                </div>
                <span className="telltale is-lit hidden shrink-0 sm:block" data-tone={s.tone}>
                  <TelltaleIcon id={s.icon} size={64} />
                </span>
              </div>
              <p className="mt-5 max-w-xl text-mist">{s.text}</p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="readout text-fog">Tyypillisiä syitä</p>
                  <ul className="mt-3 grid gap-2">
                    {s.causes.map((c) => (
                      <li key={c} className="flex gap-3 text-[0.98rem]">
                        <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="readout text-fog">Korjaus</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.meta.map((m) => (
                      <li key={m} className="chip !text-chalk">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to={inquiryHref(service.id)}
                  onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'symptom-finder', service: service.id })}
                  className="btn btn-signal"
                >
                  Pyydä hinta-arvio <ArrowRight size={18} aria-hidden="true" className="arrow" />
                </Link>
                <Link to={`/${service.slug}`} className="btn btn-ghost">
                  {service.name}
                </Link>
              </div>
              {also ? (
                <p className="mt-5 text-[0.95rem] text-fog">
                  Katso myös:{' '}
                  <Link to={`/${also.slug}`} className="text-link text-mist hover:text-chalk">
                    {also.name}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
