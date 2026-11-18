import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock, KeyRound, Phone, ShieldCheck } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { Photo } from '../components/ui/Photo'
import { Gallery } from '../components/ui/Gallery'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { serviceById } from '../data/services'
import { company } from '../data/company'
import { inquiryHref } from '../data/nav'
import { track } from '../lib/analytics'

const situations = [
  {
    t: 'Kuori rikki tai nappi ei toimi',
    d: 'Varastostamme löytyy kattava valikoima avainten kuoria. Kytkimen tai lähettimen vaihto onnistuu jopa tunnin sisällä.',
    icon: Clock,
  },
  {
    t: 'Tarvitset vara-avaimen',
    d: 'Teemme ja ohjelmoimme vara-avaimet merkistä riippumatta – mekaaniset, Smart- ja Keyless Go -avaimet.',
    icon: KeyRound,
  },
  {
    t: 'Kaikki avaimet ovat kadonneet',
    d: 'Uusi avain onnistuu myös ilman vanhaa. Ohjelmointiin tarvitaan auto paikan päälle tai käynnistyksenestoon liittyvä moottorinohjainlaite.',
    icon: ShieldCheck,
  },
]

export function Keys() {
  const s = serviceById('avaimet')
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Autonavaimet' }]}
        eyebrow="Autonavaimet · Joensuu"
        title={s.title}
        lead={<p>{s.lead}</p>}
        aside={
          <figure className="relative">
            <Photo id="volvo-avaimet-korjaamo" priority sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3] rounded-[22px]" />
            <figcaption className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2 py-1 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm">
              Avaintyö · Volvo
            </figcaption>
          </figure>
        }
      >
        <Link
          to={inquiryHref('avaimet')}
          onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'keys-intro', service: 'avaimet' })}
          className="btn btn-signal"
        >
          Kysy avainta autollesi <ArrowRight size={18} aria-hidden="true" className="arrow" />
        </Link>
        <a href={company.phone.href} onClick={() => track('phone_click', { location: 'keys-intro' })} className="btn btn-ghost">
          <Phone size={17} aria-hidden="true" className="text-signal" /> {company.phone.display}
        </a>
      </PageIntro>

      {/* Situations */}
      <section className="on-light bg-paper text-graphite">
        <div className="wrap py-20 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
            <h2 className="display-lg lg:col-span-7">Mikä tilanne sinulla on?</h2>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-graphite/12 bg-graphite/12 lg:col-span-5">
              {s.facts.map((f) => (
                <div key={f.label} className="bg-chalk p-4">
                  <dt className="text-[0.8rem] leading-snug text-slate">{f.label}</dt>
                  <dd className="mt-1 font-display text-[1.4rem] font-bold leading-none [font-stretch:84%]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {situations.map((x, i) => (
              <li key={x.t} className="rounded-[22px] border border-graphite/12 bg-chalk p-6 sm:p-7" data-reveal style={{ ['--d' as string]: `${i * 0.06}s` }}>
                <x.icon size={28} aria-hidden="true" className="text-signal-deep" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-[1.45rem] font-bold leading-tight [font-stretch:86%]">{x.t}</h3>
                <p className="mt-2 text-slate">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services + brands + photo */}
      <section className="border-b border-line bg-ink">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow">Avainpalvelut</p>
            <h2 className="display-md mt-4">Korjaus, vara-avain ja ohjelmointi samasta paikasta</h2>
            <ul className="mt-7 grid gap-3">
              {s.list.map((l) => (
                <li key={l} className="flex gap-3">
                  <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" strokeWidth={2.4} />
                  <span className="text-mist">{l}</span>
                </li>
              ))}
            </ul>
            <p className="readout mt-9 text-fog">{s.chipsTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.chips!.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lg:col-span-5 lg:col-start-8" data-reveal="clip">
            <Photo id="audi-ohjelmointi" sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/5] rounded-[22px]" />
            <figcaption className="mt-3 text-[0.9rem] text-fog">Ohjelmointi- ja diagnostiikkalaite kytkettynä asiakkaan autoon in-TEKin tiloissa.</figcaption>
          </figure>
        </div>
      </section>

      {/* Gallery */}
      <section id="avaintyot" className="border-b border-line bg-ink-2">
        <div className="wrap py-20 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <p className="eyebrow">Avaintyöt</p>
              <h2 className="display-lg mt-5">Avaimia asiakkaiden autoihin</h2>
            </div>
            <p className="text-mist lg:col-span-5">
              Kuvat ovat in-TEKin omista avaintöistä. Suodata merkin mukaan ja avaa kuva suuremmaksi.{' '}
              <a href={company.instagram.url} target="_blank" rel="noopener noreferrer" className="text-link text-chalk">
                Lisää kuvia Instagramissa {company.instagram.handle}
                <span className="sr-only"> (avautuu uuteen välilehteen)</span>
              </a>
            </p>
          </div>
          <div className="mt-10">
            <Gallery />
          </div>
        </div>
      </section>

      <section className="on-light bg-chalk text-graphite">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Kysyttyä</p>
            <h2 className="display-md mt-4">Autonavaimet: usein kysyttyä</h2>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={s.faq} />
          </div>
        </div>
      </section>

      <CtaBand
        service="avaimet"
        title="Kerro auton merkki, malli ja vuosimalli – katsotaan avain."
        text="Puhelimitse saat nopeasti lisätietoa avainpalveluista, hinnoittelusta ja ajanvarauksesta. Voit myös lähettää hinta-arviopyynnön."
        ctaLabel="Kysy avainta autollesi"
      />
    </>
  )
}
