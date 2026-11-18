import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { InstagramGlyph } from '../components/brand/InstagramGlyph'
import { PageIntro } from '../components/ui/PageIntro'
import { InquiryForm } from '../components/forms/InquiryForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { company, fullAddress } from '../data/company'
import { track } from '../lib/analytics'

export function Contact() {
  const tiles = [
    {
      icon: Phone,
      k: 'Soita',
      v: company.phone.display,
      d: 'Nopein tapa: tietoa palveluista, hinnoittelusta ja ajanvarauksesta.',
      href: company.phone.href,
      onClick: () => track('phone_click', { location: 'contact-tiles' }),
    },
    {
      icon: Mail,
      k: 'Sähköposti',
      v: company.email,
      d: 'Kerro auton merkki, malli ja vika – liitä kuva vikakoodista, jos sellainen on.',
      href: `mailto:${company.email}`,
      onClick: () => track('email_click', { location: 'contact-tiles' }),
    },
    {
      icon: MapPin,
      k: 'Toimipiste',
      v: fullAddress,
      d: 'Sovi käynti puhelimitse.',
      href: company.maps.directions,
      external: true,
      onClick: () => track('directions_click', { location: 'contact-tiles' }),
    },
  ]

  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Yhteystiedot' }]}
        eyebrow="Yhteystiedot"
        title="Soita, kirjoita tai pyydä hinta-arvio"
        lead={<p>Korjaukset tehdään toimipisteessämme Joensuussa osoitteessa Kuurnankatu 40 – yksiköt voi lähettää myös postitse.</p>}
      />

      <section className="border-b border-line bg-ink-2">
        <ul className="wrap grid gap-3 py-10 md:grid-cols-3 lg:py-14">
          {tiles.map((t) => (
            <li key={t.k}>
              <a
                href={t.href}
                onClick={t.onClick}
                {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col rounded-[18px] border border-line bg-ink p-6 transition-colors hover:border-signal"
              >
                <t.icon size={24} aria-hidden="true" className="text-signal" />
                <span className="readout mt-4 text-fog">{t.k}</span>
                <span className="mt-1 break-words font-display text-[1.55rem] font-bold leading-tight [font-stretch:86%] group-hover:text-signal-2">{t.v}</span>
                <span className="mt-2 text-[0.95rem] text-mist">{t.d}</span>
                {t.external ? <span className="sr-only">(reittiohjeet avautuvat uuteen välilehteen)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="kysely" className="on-light scroll-mt-20 bg-paper text-graphite">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="eyebrow">Hinta-arviopyyntö</p>
            <h2 className="display-lg mt-5">Kerro vika – kerromme vaihtoehdot.</h2>
            <p className="mt-5 text-slate">
              Mitä tarkemmin kuvaat auton ja vian, sitä nopeammin pääsemme asiaan. Vikakoodi, vuosimalli ja tieto siitä, tuotko auton vai lähetätkö
              yksikön, auttavat eniten.
            </p>
            <div className="mt-8 rounded-[18px] border border-graphite/12 bg-chalk p-6">
              <p className="readout text-slate">Yritystiedot</p>
              <dl className="mt-3 grid gap-1.5 text-[0.97rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate">Yritys</dt>
                  <dd className="font-semibold">{company.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate">Y-tunnus</dt>
                  <dd className="font-mono font-semibold">{company.businessId}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate">Toimipiste</dt>
                  <dd className="text-right font-semibold">{fullAddress}</dd>
                </div>
              </dl>
              <p className="mt-4 flex gap-2 text-[0.9rem] text-slate">
                <Clock size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-signal-deep" />
                Käynnit sovitaan puhelimitse.
              </p>
              <a
                href={company.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-signal-deep hover:underline"
              >
                <InstagramGlyph size={18} /> {company.instagram.handle}
                <span className="sr-only">(avautuu uuteen välilehteen)</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap py-20 lg:py-24">
          <div className="mb-8 grid gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Sijainti</p>
              <h2 className="display-lg mt-5">Kuurnankatu 40, Joensuu</h2>
            </div>
            <p className="text-mist lg:col-span-5">Toimipiste on Joensuussa Kuurnankadun varrella. Avaa reittiohjeet suoraan puhelimesi karttasovellukseen.</p>
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  )
}
