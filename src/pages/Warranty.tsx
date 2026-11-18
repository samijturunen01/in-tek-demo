import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { CtaBand } from '../components/ui/CtaBand'
import { termsSections, serviceWarranties } from '../data/terms'

const summary = [
  { k: 'Takuuaika', v: '6–24 kk', d: 'Tuotteesta riippuen' },
  { k: 'Jos yksikkö ei tule kuntoon', v: 'Hinta palautetaan', d: 'Tarkistusmaksu 40 €' },
  { k: 'Tyyppiviat', v: '1–3 arkipäivää', d: 'Muuten osien saatavuuden mukaan' },
  { k: 'Paluutoimitus', v: 'Seuraavana päivänä', d: 'Korjauksen jälkeen' },
]

export function Warranty() {
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Takuuehdot' }]}
        eyebrow="Takuu- ja toimitusehdot"
        title="Takuu, korjausaika ja säilytys – selkeästi ennen kuin lähetät"
        lead={<p>Nämä ehdot koskevat in-TEK Oy:n korjauspalveluita. Säilytä kuitti takuun todentamiseksi.</p>}
      />

      <section className="border-b border-line bg-ink-2">
        <dl className="wrap grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map((s, i) => (
            <div key={s.k} className={`py-8 sm:px-6 ${i > 0 ? 'border-t border-line sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l sm:border-line' : ''} ${i === 2 ? 'lg:border-l lg:border-line sm:border-t lg:border-t-0' : ''} ${i === 3 ? 'sm:border-t lg:border-t-0' : ''}`}>
              <dt className="readout text-fog">{s.k}</dt>
              <dd className="mt-2">
                <span className="block font-display text-[1.9rem] font-bold leading-none [font-stretch:82%]">{s.v}</span>
                <span className="mt-2 block text-[0.92rem] text-mist">{s.d}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="on-light bg-chalk text-graphite">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <nav aria-label="Ehtojen osiot" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="readout text-slate">Osiot</p>
              <ul className="mt-3 grid gap-1">
                {termsSections.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="inline-flex min-h-10 items-center font-semibold text-graphite hover:text-signal-deep">
                      {t.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#palvelukohtaiset" className="inline-flex min-h-10 items-center font-semibold text-graphite hover:text-signal-deep">
                    Palvelukohtaiset takuut
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {termsSections.map((t) => (
              <section key={t.id} id={t.id} className="scroll-mt-28 border-b border-graphite/12 pb-10 pt-2 [&+section]:pt-10">
                <h2 className="display-md">{t.title}</h2>
                <div className="mt-5 grid gap-4 text-[1.04rem] text-slate">
                  {t.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
            <section id="palvelukohtaiset" className="scroll-mt-28 pt-10">
              <h2 className="display-md">Palvelukohtaiset takuut</h2>
              <p className="mt-4 text-slate">Palvelusivuilla ilmoitetut takuuajat:</p>
              <table className="mt-5 w-full border-collapse text-left">
                <tbody>
                  {serviceWarranties.map((w) => (
                    <tr key={w.label} className="border-b border-graphite/12">
                      <th scope="row" className="py-3 pr-4 font-semibold">
                        {w.label}
                      </th>
                      <td className="py-3 font-mono font-semibold text-signal-deep">{w.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to="/postikorjaus" className="btn btn-ink mt-8">
                Lähetä yksikkö korjattavaksi <ArrowRight size={18} aria-hidden="true" className="arrow" />
              </Link>
            </section>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
