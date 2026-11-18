import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Photo } from '../ui/Photo'
import { serviceById } from '../../data/services'
import { inquiryHref } from '../../data/nav'
import { gsap } from '../../lib/motion'
import { prefersReducedMotion } from '../../lib/intro'
import { track } from '../../lib/analytics'
import type { PhotoId } from '../../data/photos'

const mosaic: { id: PhotoId; brand: string; className: string; sizes: string }[] = [
  { id: 'volvo-avaimet-kasi', brand: 'Volvo', className: 'col-span-7 row-span-2', sizes: '(min-width: 1024px) 26vw, 58vw' },
  { id: 'bmw-avaimet', brand: 'BMW', className: 'col-span-5 aspect-[4/5]', sizes: '(min-width: 1024px) 19vw, 42vw' },
  { id: 'audi-avaimet', brand: 'Audi', className: 'col-span-5 aspect-[4/5]', sizes: '(min-width: 1024px) 19vw, 42vw' },
]

/** Key service feature – authentic photos of in-TEK's own key work. */
export function KeysFeature() {
  const keys = serviceById('avaimet')
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-depth]', root.current).forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: Number(el.dataset.depth) },
          {
            yPercent: -Number(el.dataset.depth),
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-28">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Autonavaimet</p>
          <h2 className="display-lg mt-5">Avain hukassa, kuori rikki tai vara-avain puuttuu?</h2>
          <p className="lead mt-6 text-mist">
            Vaihdamme rikkinäisen kuoren, kytkimen tai lähettimen – jopa tunnin sisällä. Teemme ja ohjelmoimme uudet avaimet merkistä riippumatta, myös
            kun yhtään avainta ei ole jäljellä. Uudelle avaimelle annamme vuoden takuun.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {keys.facts.map((f) => (
              <div key={f.label} className="bg-ink-2 p-4">
                <dt className="text-[0.8rem] leading-snug text-fog">{f.label}</dt>
                <dd className="mt-1 font-display text-[1.35rem] font-bold leading-none [font-stretch:84%]">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="readout mt-8 text-fog">Varastossa avaimia mm.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {keys.chips!.map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={inquiryHref('avaimet')}
              onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'keys-feature', service: 'avaimet' })}
              className="btn btn-signal"
            >
              Kysy avainta autollesi <ArrowRight size={18} aria-hidden="true" className="arrow" />
            </Link>
            <Link to="/autonavaimet#avaintyot" className="btn btn-ghost">
              Katso avaintöitä
            </Link>
          </div>
        </div>

        <div ref={root} className="lg:col-span-7 lg:pl-6">
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            {mosaic.map((m, i) => (
              <figure key={m.id} className={`relative ${m.className}`} data-reveal="clip" style={{ ['--d' as string]: `${i * 0.1}s` }}>
                <div data-depth={i === 0 ? 4 : 8} className="h-full">
                  <Photo id={m.id} sizes={m.sizes} className="h-full rounded-2xl" />
                </div>
                <figcaption className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2 py-1 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-chalk backdrop-blur-sm">
                  Avaintyö · {m.brand}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-[0.88rem] text-fog lg:mt-12">Kuvat: in-TEKin omia avaintöitä asiakkaiden autoista.</p>
        </div>
      </div>
    </section>
  )
}
