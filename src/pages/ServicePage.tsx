import { Link } from 'react-router-dom'
import { ArrowRight, Check, Send, Wrench } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { Photo } from '../components/ui/Photo'
import { ServiceArt } from '../components/service/ServiceArt'
import { TelltaleIcon } from '../components/brand/Telltale'
import { electronicsServices, serviceById, type ServiceId } from '../data/services'
import { symptoms } from '../data/symptoms'
import { inquiryHref } from '../data/nav'
import { company } from '../data/company'
import { track } from '../lib/analytics'

/** Template for the electronics service pages (URL slugs preserved from in-tek.fi). */
export function ServicePage({ id }: { id: ServiceId }) {
  const s = serviceById(id)
  const tone = symptoms.find((x) => x.service === id)?.tone ?? 'amber'
  const related = electronicsServices.filter((x) => x.id !== id).slice(0, 4)

  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { to: '/palvelut', label: 'Palvelut' }, { label: s.name }]}
        eyebrow={s.name}
        title={s.title}
        lead={<p>{s.lead}</p>}
        aside={
          <dl className="panel grid gap-px overflow-hidden !bg-line">
            {s.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 bg-ink-2 px-5 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="readout text-fog">{f.label}</dt>
                <dd>
                  <span className="block font-display text-[1.6rem] font-bold leading-none [font-stretch:84%]">{f.value}</span>
                  {f.note ? <span className="mt-1.5 block text-[0.9rem] text-mist">{f.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        }
      >
        <Link
          to={inquiryHref(s.id)}
          onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'service-intro', service: s.id })}
          className="btn btn-signal"
        >
          Kysy hintaa korjaukselle <ArrowRight size={18} aria-hidden="true" className="arrow" />
        </Link>
        <Link to="/postikorjaus" className="btn btn-ghost">
          <Send size={17} aria-hidden="true" /> Lähetä postitse
        </Link>
      </PageIntro>

      {/* Symptoms + visual */}
      <section className="on-light bg-paper text-graphite">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow">Tunnistatko oireen?</p>
            <h2 className="display-md mt-4">{s.listTitle}</h2>
            <ul className="mt-8 grid gap-3">
              {s.list.map((item) => (
                <li key={item} className="flex items-start gap-4 rounded-xl border border-graphite/12 bg-chalk px-4 py-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-signal">
                    <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
            {s.chips ? (
              <div className="mt-8">
                <p className="readout text-slate">{s.chipsTitle}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-6" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            {s.photo ? (
              <figure>
                <Photo id={s.photo.id} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[22px]" />
                <figcaption className="mt-3 text-[0.9rem] text-slate">{s.photo.caption}</figcaption>
              </figure>
            ) : (
              <ServiceArt service={s.id} icon={s.icon} tone={tone} />
            )}
          </div>
        </div>
      </section>

      {s.note ? (
        <section className="border-b border-line bg-ink-2">
          <div className="wrap grid gap-6 py-16 lg:grid-cols-12 lg:items-center lg:py-20" data-reveal>
            <div className="flex items-center gap-4 lg:col-span-5">
              <Wrench size={30} aria-hidden="true" className="shrink-0 text-signal" strokeWidth={1.8} />
              <h2 className="display-md">{s.note.title}</h2>
            </div>
            <p className="lead text-mist lg:col-span-7">{s.note.text}</p>
          </div>
        </section>
      ) : null}

      {/* What we need + how to deliver */}
      <section className="border-b border-line bg-ink">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Näin pääset alkuun</p>
            <h2 className="display-md mt-4">Kerro nämä, niin pääsemme suoraan asiaan</h2>
            <ul className="mt-7 grid gap-3">
              {s.needs.map((n, i) => (
                <li key={n} className="flex gap-4">
                  <span className="font-mono text-[0.85rem] font-bold text-signal-2">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-mist">{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            <div className="panel flex flex-col p-6">
              <p className="readout text-fog">Joensuussa</p>
              <h3 className="mt-2 font-display text-[1.5rem] font-bold leading-tight [font-stretch:86%]">Tuo auto tai yksikkö</h3>
              <p className="mt-3 flex-1 text-[0.97rem] text-mist">
                {company.address.street}, {company.address.city}. Sovi käynti puhelimitse – samalla saat tietoa hinnoittelusta.
              </p>
              <a href={company.phone.href} onClick={() => track('phone_click', { location: 'service-page', service: s.id })} className="btn btn-ghost mt-5">
                Soita {company.phone.display}
              </a>
            </div>
            <div className="panel flex flex-col p-6">
              <p className="readout text-fog">Mistä tahansa Suomesta</p>
              <h3 className="mt-2 font-display text-[1.5rem] font-bold leading-tight [font-stretch:86%]">Lähetä postitse</h3>
              <p className="mt-3 flex-1 text-[0.97rem] text-mist">Ota ensin yhteyttä, tee huoltolähete ja lähetä yksikkö Matkahuollon tai Postin kautta.</p>
              <Link to="/postikorjaus" className="btn btn-ghost mt-5">
                Postikorjauksen ohjeet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="on-light bg-chalk text-graphite">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Kysyttyä</p>
            <h2 className="display-md mt-4">{s.name}: usein kysyttyä</h2>
            <Link to="/takuuehdot" className="text-link mt-6 inline-block font-semibold text-signal-deep">
              Takuu- ja toimitusehdot
            </Link>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={s.faq} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-y border-line bg-ink-2">
        <div className="wrap py-16 lg:py-20">
          <p className="readout text-fog">Muut korjaukset</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/${r.slug}`}
                  className="link-row group flex h-full items-center gap-4 rounded-xl border border-line bg-ink px-4 py-4 font-semibold transition-colors hover:border-signal"
                >
                  <TelltaleIcon id={r.icon} size={28} className="shrink-0 text-fog transition-colors group-hover:text-signal" />
                  <span className="flex-1">{r.name}</span>
                  <ArrowRight size={18} aria-hidden="true" className="arrow text-fog" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand service={s.id} title={`${s.name} – kysy hinta-arviota.`} />
    </>
  )
}
