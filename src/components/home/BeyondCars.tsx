import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Car, CarFront, Motorbike, Sailboat, Snowflake, Truck } from 'lucide-react'
import { company, yearsInBusiness } from '../../data/company'
import { inquiryHref } from '../../data/nav'

const vehicles = [
  { icon: Car, label: 'Henkilöautot' },
  { icon: CarFront, label: 'Mopoautot' },
  { icon: Sailboat, label: 'Veneet' },
  { icon: Truck, label: 'Raskas kalusto' },
  { icon: Snowflake, label: 'Moottorikelkat' },
  { icon: Motorbike, label: 'Moottoripyörät' },
]

/** Wider relevance: other vehicle types (instrument clusters) and business customers. */
export function BeyondCars() {
  const years = yearsInBusiness()
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink-2">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">Ei vain henkilöautot</p>
          <h2 className="display-lg mt-5">Mittaristot myös veneisiin, kelkkoihin ja raskaaseen kalustoon.</h2>
          <p className="lead mt-6 text-mist">
            Autojen lisäksi korjaamme mopoautojen, veneiden, raskaan kaluston, moottorikelkkojen ja moottoripyörien mittaristoja.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {vehicles.map((v) => (
              <li key={v.label} className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-ink px-3 font-semibold">
                <v.icon size={20} aria-hidden="true" className="shrink-0 text-signal" strokeWidth={1.8} />
                {v.label}
              </li>
            ))}
          </ul>
          <Link to="/mittaristot" className="btn btn-ghost mt-8">
            Mittariston korjaus <ArrowRight size={18} aria-hidden="true" className="arrow" />
          </Link>
        </div>

        <div className="grid gap-4 lg:col-span-5 lg:col-start-8" data-reveal style={{ ['--d' as string]: '0.08s' }}>
          <div className="panel p-6 sm:p-8">
            <Building2 size={26} aria-hidden="true" className="text-signal" strokeWidth={1.8} />
            <h3 className="mt-4 font-display text-[1.6rem] font-bold leading-tight [font-stretch:86%]">Korjaamoille ja yrityksille</h3>
            <p className="mt-3 text-mist">
              Palvelemme sekä yksityisasiakkaita että yrityksiä. Lähetä yksiköt korjattavaksi tai kysy avainten ohjelmoinnista – kerro yrityksesi nimi
              hinta-arviopyynnössä.
            </p>
            <Link to={inquiryHref()} className="text-link mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-chalk">
              Pyydä hinta-arvio yritykselle <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="panel flex items-center gap-6 p-6 sm:p-8">
            <p className="font-display text-[4.2rem] font-bold leading-none text-signal-2 [font-stretch:76%]">{company.foundedYear}</p>
            <p className="text-mist">
              Autoelektroniikan ja autonavainten korjauksia Joensuussa jo {years} vuoden ajan – nykyisin nimellä {company.name}.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
