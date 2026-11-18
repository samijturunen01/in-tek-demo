import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Navigation, Phone } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { company, fullAddress } from '../../data/company'
import { track } from '../../lib/analytics'

export const mailSteps = [
  { t: 'Ota yhteyttä', d: `Soita ${company.phone.display} tai lähetä sähköpostia ja kerro vika. Varmista samalla lähetysohjeet.` },
  { t: 'Tee huoltolähete', d: 'Täytä huoltolähete verkossa ja tulosta se – tai kirjoita samat tiedot paperille.' },
  { t: 'Pakkaa ja lähetä', d: 'Laita huoltolähete paketin mukaan ja lähetä paketti Matkahuollon tai Postin kautta.' },
  { t: 'Korjattu yksikkö takaisin', d: 'Tyyppiviat korjataan yleensä 1–3 arkipäivässä. Yksikkö lähtee takaisin korjausta seuraavana päivänä.' },
]

/** Two delivery routes: bring the car to Joensuu, or mail the unit. */
export function TwoWays() {
  return (
    <section className="on-light grid-dots-light bg-paper-2 text-graphite">
      <div className="wrap py-20 lg:py-28">
        <div className="max-w-3xl" data-reveal>
          <p className="eyebrow">Asiointi</p>
          <h2 className="display-lg mt-5">Tuo auto Joensuuhun – tai lähetä yksikkö postitse.</h2>
          <p className="lead mt-5 text-slate">
            Avaimen ohjelmointiin tarvitaan auto paikan päälle tai käynnistyksenestoon liittyvä moottorinohjainlaite. Irrotetut yksiköt, kuten mittaristot ja
            ABS- tai airbag-ohjausyksiköt, voi lähettää meille mistä päin Suomea tahansa.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Bring in */}
          <article className="overflow-hidden rounded-[22px] border border-graphite/12 bg-chalk" data-reveal>
            <Photo
              id="nissan-avaimet-konepelti"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[16/9]"
              imgClassName="object-[50%_60%]"
            />
            <div className="p-6 sm:p-8">
              <p className="readout text-signal-deep">Vaihtoehto 1</p>
              <h3 className="display-md mt-2">Tuo auto Kuurnankadulle</h3>
              <p className="mt-4 text-slate">
                Korjaukset tehdään toimipisteessämme Joensuussa. Sovi käynti puhelimitse – samalla saat tietoa hinnoittelusta ja ajanvarauksesta.
              </p>
              <p className="mt-5 flex items-start gap-3 font-semibold">
                <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-signal-deep" />
                {fullAddress}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={company.phone.href} onClick={() => track('phone_click', { location: 'two-ways' })} className="btn btn-ink">
                  <Phone size={18} aria-hidden="true" /> Varaa aika: {company.phone.display}
                </a>
                <a
                  href={company.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('directions_click', { location: 'two-ways' })}
                  className="btn btn-outline-ink"
                >
                  <Navigation size={18} aria-hidden="true" /> Reittiohjeet
                  <span className="sr-only">(avautuu uuteen välilehteen)</span>
                </a>
              </div>
            </div>
          </article>

          {/* Mail in */}
          <article className="relative overflow-hidden rounded-[22px] bg-ink p-6 text-chalk sm:p-8" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            <p className="readout text-signal-2">Vaihtoehto 2</p>
            <h3 className="display-md mt-2">Lähetä yksikkö postitse</h3>
            <ol className="relative mt-8 grid gap-0">
              {mailSteps.map((s, i) => (
                <li key={s.t} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-7 last:pb-0">
                  {i < mailSteps.length - 1 ? (
                    <span aria-hidden="true" className="absolute bottom-0 left-[1.2rem] top-10 w-px bg-gradient-to-b from-signal/70 to-line-2" />
                  ) : null}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-signal/60 bg-ink-3 font-mono text-[0.9rem] font-bold text-signal-2">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-[1.3rem] font-semibold leading-tight [font-stretch:86%]">{s.t}</p>
                    <p className="mt-1.5 text-[0.97rem] text-mist">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to="/postikorjaus"
              onClick={() => track('cta_click', { cta: 'postikorjaus', location: 'two-ways' })}
              className="btn btn-signal mt-9 w-full sm:w-auto"
            >
              Tee huoltolähete <ArrowRight size={18} aria-hidden="true" className="arrow" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
