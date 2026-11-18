import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Phone } from 'lucide-react'
import { Cluster } from '../brand/Cluster'
import { company } from '../../data/company'
import { inquiryHref } from '../../data/nav'
import { gsap } from '../../lib/motion'
import { introAllowed, prefersReducedMotion, releaseIntroHold } from '../../lib/intro'
import { track } from '../../lib/analytics'
import { GoogleRating } from '../ui/GoogleRating'

const status = [
  { k: 'Vuodesta', v: '2008' },
  { k: 'Tyyppiviat korjattu', v: '1–3 arkipäivässä' },
  { k: 'Takuu korjauksille', v: '6–24 kk' },
  { k: 'Paluupostissa', v: 'korjausta seuraavana päivänä' },
]

/**
 * Homepage hero. Copy and CTAs are server-rendered and visible immediately – the
 * intro only animates the cluster graphic ("ignition self-test": telltales light,
 * needles sweep, warning lights go out, the in-TEK display lights up).
 */
export function Hero() {
  const clusterRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = clusterRef.current
    if (!svg) return
    if (!introAllowed() || prefersReducedMotion()) {
      releaseIntroHold()
      return
    }
    const ctx = gsap.context(() => {
      const needles = svg.querySelectorAll<SVGGElement>('.cl-needle')
      const origins = ['165 206', '635 206']
      const ticksL = svg.querySelectorAll('.cl-gauge-l .cl-tick')
      const ticksR = svg.querySelectorAll('.cl-gauge-r .cl-tick')
      const telltales = svg.querySelectorAll<SVGSVGElement>('.cl-telltale')
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          releaseIntroHold()
          gsap.set([telltales, ticksL, ticksR, '.cl-wordmark', '.cl-status'], { clearProps: 'all' })
        },
      })
      needles.forEach((n, i) => {
        tl.fromTo(n, { rotation: -135, svgOrigin: origins[i] }, { rotation: 135, svgOrigin: origins[i], duration: 0.85 }, 0.2)
        tl.to(n, { rotation: -135, svgOrigin: origins[i], duration: 0.8, ease: 'power3.inOut' }, 1.1)
      })
      tl.fromTo(ticksL, { opacity: 0.25 }, { opacity: 1, duration: 0.12, stagger: 0.85 / ticksL.length, ease: 'none' }, 0.2)
      tl.fromTo(ticksR, { opacity: 0.25 }, { opacity: 1, duration: 0.12, stagger: 0.85 / ticksR.length, ease: 'none' }, 0.2)
      tl.to(telltales, { color: '#2e4150', duration: 0.22, stagger: 0.1, ease: 'power1.out' }, 1.15)
      tl.fromTo('.cl-wordmark', { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 1.8)
      tl.fromTo('.cl-status', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 2.15)
    }, svg)
    return () => {
      ctx.revert()
      releaseIntroHold()
    }
  }, [])

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden="true" className="grid-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,#000,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute right-[-10%] top-[-10%] -z-10 h-[760px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(44_167_224/0.14),transparent)]"
      />

      <div className="wrap grid items-center gap-8 pb-10 pt-6 lg:grid-cols-12 lg:gap-10 lg:pb-14 lg:pt-12">
        <div className="lg:order-1 lg:col-span-7">
          <p className="eyebrow">Autoelektroniikka &amp; autonavaimet · Joensuu</p>
          <h1 className="display-xl mt-5">
            Auton elektroniikka ja avaimet kuntoon – <span className="text-signal-2">merkistä riippumatta</span>
          </h1>
          <p className="lead mt-6 max-w-[38rem] text-mist">
            Korjaamme mittaristot, ABS- ja airbag-yksiköt, sähköiset virta- ja rattilukot sekä muut ohjausyksiköt – ja teemme
            autonavaimet. Tuo auto Kuurnankadulle Joensuuhun tai lähetä yksikkö meille postitse.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={inquiryHref()}
              onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'hero' })}
              className="btn btn-signal"
            >
              Pyydä hinta-arvio <ArrowRight size={18} aria-hidden="true" className="arrow" />
            </Link>
            <Link
              to="/postikorjaus"
              onClick={() => track('cta_click', { cta: 'postikorjaus', location: 'hero' })}
              className="btn btn-ghost"
            >
              Lähetä yksikkö korjaukseen
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p className="text-[0.98rem] text-fog">
            Kiire? Soita{' '}
            <a
              href={company.phone.href}
              onClick={() => track('phone_click', { location: 'hero' })}
              className="inline-flex items-center gap-1.5 font-mono font-semibold text-chalk underline decoration-signal/60 underline-offset-4 hover:decoration-signal"
            >
              <Phone size={15} aria-hidden="true" className="text-signal" />
              {company.phone.display}
            </a>
          </p>
          <GoogleRating />
          </div>
        </div>
        <div className="order-first lg:order-2 lg:col-span-5">
          <Cluster ref={clusterRef} className="mx-auto max-w-[680px] drop-shadow-[0_30px_60px_rgb(0_0_0/0.45)]" />
          <a
            href="#merkkivalot"
            className="mx-auto mt-4 hidden w-fit items-center gap-2 rounded-md px-2 py-1 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-fog hover:text-signal-2 lg:flex"
          >
            Merkkivalo palaa? Aloita oireesta <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>

      </div>

      {/* Status bar – verified facts only */}
      <div className="border-t border-line bg-ink-2/70">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
          {status.map((s, i) => (
            <div
              key={s.k}
              className={`flex flex-col gap-1 py-5 pr-4 ${i % 2 === 1 ? 'border-l border-line pl-4 lg:pl-6' : ''} ${
                i === 2 ? 'border-t border-line lg:border-l lg:border-t-0 lg:pl-6' : ''
              } ${i === 3 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <dt className="readout text-fog">{s.k}</dt>
              <dd className="font-display text-[1.25rem] font-semibold leading-tight [font-stretch:86%] sm:text-[1.4rem]">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
