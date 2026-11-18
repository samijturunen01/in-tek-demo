import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, PackageCheck, ReceiptText, Undo2 } from 'lucide-react'
import { gsap } from '../../lib/motion'
import { prefersReducedMotion } from '../../lib/intro'

const points = [
  {
    icon: Undo2,
    t: 'Ei kuntoon? Korjaushinta palautetaan.',
    d: 'Jos laite tai yksikkö ei korjauksen jälkeen tule kuntoon, palautamme korjaushinnan tilillesi. Veloitamme vain 40 euron tarkistusmaksun.',
  },
  {
    icon: PackageCheck,
    t: 'Paluupostissa seuraavana päivänä',
    d: 'Korjattu yksikkö lähetetään takaisin korjausta seuraavana päivänä. Jos osa ei ole varastossa tai korjaus viivästyy, ilmoitamme aikataulusta.',
  },
  {
    icon: BadgeCheck,
    t: 'Takuu jokaiselle korjaukselle',
    d: 'Takuuaika on tuotteesta riippuen 6–24 kuukautta. Ohjelmiston korjaukset eivät kuulu takuun piiriin.',
  },
  {
    icon: ReceiptText,
    t: 'Selkeät ehdot etukäteen',
    d: 'Takuu- ja toimitusehdot ovat luettavissa ennen kuin lähetät mitään. Säilytä kuitti takuun todentamiseksi.',
  },
]

/** Risk reduction near the decision: warranty, refund rule and return shipping (verified terms). */
export function WarrantyBlock() {
  const gauge = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = gauge.current
    if (!svg || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wb-arc',
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } },
      )
    }, svg)
    return () => ctx.revert()
  }, [])

  return (
    <section className="on-light bg-paper text-graphite">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Takuu ja toimitus</p>
          <h2 className="display-lg mt-5">Takuu ja ehdot kirjoitettuna auki.</h2>
          <div className="relative mt-10 w-full max-w-[420px]">
            <svg ref={gauge} viewBox="0 0 240 150" className="w-full" aria-hidden="true">
              <path d="M20 130a100 100 0 0 1 200 0" fill="none" stroke="#d3dadf" strokeWidth="14" strokeLinecap="round" />
              <path
                className="wb-arc"
                d="M20 130a100 100 0 0 1 200 0"
                fill="none"
                stroke="#0370a3"
                strokeWidth="14"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="100"
              />
              {Array.from({ length: 9 }, (_, j) => {
                const i = j + 2
                const a = Math.PI - (i * Math.PI) / 12
                const r1 = 82
                const r2 = i % 3 === 0 ? 70 : 76
                return (
                  <line
                    key={i}
                    x1={Math.round((120 + r1 * Math.cos(a)) * 100) / 100}
                    y1={Math.round((130 - r1 * Math.sin(a)) * 100) / 100}
                    x2={Math.round((120 + r2 * Math.cos(a)) * 100) / 100}
                    y2={Math.round((130 - r2 * Math.sin(a)) * 100) / 100}
                    stroke="#45545f"
                    strokeWidth={i % 3 === 0 ? 2.4 : 1.4}
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>
            <div className="absolute inset-x-0 bottom-0 text-center">
              <p className="font-display text-[3.6rem] font-bold leading-none [font-stretch:78%] sm:text-[4.4rem]">6–24 kk</p>
              <p className="readout mt-2 text-slate">takuu korjauspalveluille</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-px overflow-hidden rounded-[22px] border border-graphite/12 bg-graphite/12 sm:grid-cols-2">
            {points.map((p, i) => (
              <li key={p.t} className="bg-chalk p-6 sm:p-7" data-reveal style={{ ['--d' as string]: `${i * 0.06}s` }}>
                <p.icon size={26} aria-hidden="true" className="text-signal-deep" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-[1.35rem] font-bold leading-tight [font-stretch:86%]">{p.t}</h3>
                <p className="mt-2 text-[0.97rem] text-slate">{p.d}</p>
              </li>
            ))}
          </ul>
          <Link to="/takuuehdot" className="btn btn-outline-ink mt-6">
            Lue takuu- ja toimitusehdot <ArrowRight size={18} aria-hidden="true" className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  )
}
