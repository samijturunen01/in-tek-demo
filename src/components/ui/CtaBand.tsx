import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { inquiryHref } from '../../data/nav'
import type { ServiceId } from '../../data/services'
import { track } from '../../lib/analytics'

/** Closing call to action – a specific reason to get in touch on every page. */
export function CtaBand({
  title = 'Ennen kuin tilaat uuden yksikön, kysy korjausta.',
  text = 'Kerro auton merkki, malli ja vian oireet – myös vikakoodit, jos ne ovat tiedossa. Puhelimitse saat nopeasti lisätietoa palveluista, hinnoittelusta ja ajanvarauksesta.',
  service,
  ctaLabel = 'Pyydä hinta-arvio',
  extra,
}: {
  title?: ReactNode
  text?: ReactNode
  service?: ServiceId
  ctaLabel?: string
  extra?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="grid-dots absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-full -z-10 h-[620px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(44_167_224/0.28),transparent)]"
      />
      <div className="wrap py-20 lg:py-28" data-reveal>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">Seuraava askel</p>
          <h2 className="display-lg mt-5">{title}</h2>
          <p className="lead mx-auto mt-6 max-w-2xl text-mist">{text}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={inquiryHref(service)}
              onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'cta-band', service: service ?? 'none' })}
              className="btn btn-signal"
            >
              {ctaLabel} <ArrowRight size={18} aria-hidden="true" className="arrow" />
            </Link>
            <a href={company.phone.href} onClick={() => track('phone_click', { location: 'cta-band' })} className="btn btn-ghost">
              <Phone size={18} aria-hidden="true" className="text-signal" /> {company.phone.display}
            </a>
            <a href={`mailto:${company.email}`} onClick={() => track('email_click', { location: 'cta-band' })} className="btn btn-ghost">
              <Mail size={18} aria-hidden="true" className="text-signal" /> {company.email}
            </a>
          </div>
          {extra ? <div className="mt-8">{extra}</div> : null}
        </div>
      </div>
    </section>
  )
}
