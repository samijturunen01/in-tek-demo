import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { TelltaleIcon } from '../brand/Telltale'
import { track } from '../../lib/analytics'

/** Editorial, numbered service index – each row shows turnaround + warranty at a glance. */
export function ServiceIndex({
  eyebrow = 'Mitä korjaamme',
  title = 'Kuusi erikoisalaa – yksi osoite auton elektroniikalle.',
  intro = 'Erikoisalaamme ovat mittaristot, moottorinohjausyksiköt, sähköiset virtalukot ja autonavaimet. Jokainen palvelu alla kertoo korjausajan ja takuun suoraan.',
}: {
  eyebrow?: string
  title?: string
  intro?: string
}) {
  return (
    <section className="on-light bg-paper text-graphite">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-lg mt-5">{title}</h2>
          </div>
          <p className="text-slate lg:col-span-5">{intro}</p>
        </div>

        <ol className="mt-14 border-t border-graphite/15">
          {services.map((s, i) => {
            const time = s.facts.find((f) => f.label.toLowerCase().includes('korjausaika') || f.label.toLowerCase().includes('vaihto'))
            const warranty = s.facts.find((f) => f.label.toLowerCase().includes('takuu'))
            return (
              <li key={s.id} className="border-b border-graphite/15" data-reveal style={{ ['--d' as string]: `${i * 0.05}s` }}>
                <Link
                  to={`/${s.slug}`}
                  onClick={() => track('service_interest', { service: s.id, location: 'service-index' })}
                  className="link-row group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 py-6 transition-colors sm:gap-x-6 lg:grid-cols-[3rem_3.5rem_minmax(0,1fr)_minmax(0,1fr)_17.5rem_2rem] lg:py-7"
                >
                  <span className="hidden font-mono text-[0.85rem] font-semibold text-slate lg:block">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-graphite/15 bg-chalk text-graphite transition-colors group-hover:border-signal-deep group-hover:bg-ink group-hover:text-signal"
                  >
                    <TelltaleIcon id={s.icon} size={28} />
                  </span>
                  <span className="font-display text-[1.45rem] font-bold leading-tight [font-stretch:84%] sm:text-[1.7rem]">{s.name}</span>
                  <ArrowUpRight
                    size={24}
                    aria-hidden="true"
                    className="arrow col-start-3 row-start-1 text-slate transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-deep lg:col-start-6"
                  />
                  <span className="col-span-3 text-[0.98rem] text-slate lg:col-span-1 lg:col-start-4 lg:row-start-1">{s.summary}</span>
                  <span className="col-span-3 flex flex-wrap gap-2 lg:col-span-1 lg:col-start-5 lg:row-start-1 lg:justify-end">
                    {time ? <span className="chip whitespace-nowrap">{time.value}</span> : null}
                    {warranty ? <span className="chip whitespace-nowrap">takuu {warranty.value}</span> : null}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
