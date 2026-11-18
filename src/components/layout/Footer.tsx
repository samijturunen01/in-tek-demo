import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { InstagramGlyph } from '../brand/InstagramGlyph'
import { Wordmark } from '../brand/Wordmark'
import { company, fullAddress } from '../../data/company'
import { services } from '../../data/services'
import { mainNav } from '../../data/nav'
import { track } from '../../lib/analytics'

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2 pb-28 text-mist lg:pb-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex text-chalk" aria-label="in-TEK – etusivu">
            <Wordmark className="text-[40px]" />
          </Link>
          <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed">
            Autoelektroniikan ja autonavainten korjaukset merkistä riippumatta – Joensuussa ja postitse. Vuodesta {company.foundedYear}.
          </p>
          <ul className="mt-6 grid gap-3 text-[0.98rem]">
            <li>
              <a
                href={company.phone.href}
                onClick={() => track('phone_click', { location: 'footer' })}
                className="inline-flex min-h-11 items-center gap-3 font-semibold text-chalk hover:text-signal-2"
              >
                <Phone size={18} aria-hidden="true" className="text-signal" /> {company.phone.display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                onClick={() => track('email_click', { location: 'footer' })}
                className="inline-flex min-h-11 items-center gap-3 font-semibold text-chalk hover:text-signal-2"
              >
                <Mail size={18} aria-hidden="true" className="text-signal" /> {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-signal" />
              <span>{fullAddress}</span>
            </li>
          </ul>
        </div>

        <nav aria-label="Palvelut" className="lg:col-span-3">
          <p className="readout text-fog">Palvelut</p>
          <ul className="mt-4 grid gap-1">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/${s.slug}`} className="inline-flex min-h-10 items-center hover:text-chalk">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sivusto" className="lg:col-span-2">
          <p className="readout text-fog">Sivusto</p>
          <ul className="mt-4 grid gap-1">
            {mainNav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="inline-flex min-h-10 items-center hover:text-chalk">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="readout text-fog">Yritystiedot</p>
          <dl className="mt-4 grid gap-2 text-[0.96rem]">
            <div>
              <dt className="sr-only">Yritys</dt>
              <dd className="font-semibold text-chalk">{company.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Y-tunnus</dt>
              <dd className="font-mono text-chalk">{company.businessId}</dd>
            </div>
          </dl>
          <a
            href={company.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-2 px-3 font-semibold text-chalk hover:border-signal"
          >
            <InstagramGlyph size={18} /> {company.instagram.handle}
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-6 text-[0.85rem] text-fog md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <p className="max-w-3xl md:text-right">
            Konseptidemo: Hades Designin ehdotus in-TEKin verkkosivujen uudistukseksi – ei yrityksen virallinen sivusto. Virallinen sivusto:{' '}
            <a href={company.originalSite} className="text-link text-mist" rel="noopener noreferrer">
              in-tek.fi
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
