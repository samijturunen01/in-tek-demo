import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { services } from '../data/services'
import { company } from '../data/company'
import { TelltaleIcon } from '../components/brand/Telltale'

export function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="grid-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="wrap py-20 lg:py-28">
        <p className="readout text-amber">Vikakoodi 404</p>
        <h1 className="display-xl mt-5 max-w-4xl">Tätä sivua ei löytynyt.</h1>
        <p className="lead mt-6 max-w-2xl text-mist">
          Linkki voi olla vanhentunut tai osoitteessa on kirjoitusvirhe. Valitse alta palvelu, palaa etusivulle tai soita meille.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-signal">
            Etusivulle <ArrowRight size={18} aria-hidden="true" className="arrow" />
          </Link>
          <a href={company.phone.href} className="btn btn-ghost">
            <Phone size={17} aria-hidden="true" className="text-signal" /> {company.phone.display}
          </a>
        </div>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                to={`/${s.slug}`}
                className="link-row group flex h-full items-center gap-4 rounded-xl border border-line bg-ink-2 px-4 py-4 font-semibold transition-colors hover:border-signal"
              >
                <TelltaleIcon id={s.icon} size={28} className="shrink-0 text-fog transition-colors group-hover:text-signal" />
                <span className="flex-1">{s.name}</span>
                <ArrowRight size={18} aria-hidden="true" className="arrow text-fog" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
