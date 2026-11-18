import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { Wordmark } from '../brand/Wordmark'
import { mainNav, inquiryHref } from '../../data/nav'
import { company } from '../../data/company'
import { electronicsServices, services } from '../../data/services'
import { TelltaleIcon } from '../brand/Telltale'
import { track } from '../../lib/analytics'

const serviceSlugs = electronicsServices.map((s) => `/${s.slug}`)

/** "Palvelut" stays active on individual electronics service pages. */
function useIsActive() {
  const { pathname } = useLocation()
  const p = pathname.replace(/\/+$/, '') || '/'
  return (to: string) => (to === '/' ? p === '/' : to === '/palvelut' ? p === to || serviceSlugs.includes(p) : p === to)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isActive = useIsActive()
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu whenever the route changes.
  const [lastKey, setLastKey] = useState(location.key)
  if (lastKey !== location.key) {
    setLastKey(location.key)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a, button')
        const first = toggleRef.current!
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-ink/95 backdrop-blur-md' : 'border-transparent bg-ink'
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Link to="/" className="-m-2 flex items-center rounded-md p-2 text-chalk" aria-label="in-TEK – etusivu">
          <Wordmark className="text-[30px] lg:text-[34px]" />
        </Link>

        <nav aria-label="Päävalikko" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  className={`relative block rounded-md px-3 py-2 text-[0.97rem] font-semibold transition-colors ${
                    isActive(item.to) ? 'text-chalk' : 'text-mist hover:text-chalk'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-signal shadow-[0_0_10px_#2ca7e0] transition-opacity ${
                      isActive(item.to) ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={company.phone.href}
            onClick={() => track('phone_click', { location: 'header' })}
            className="hidden items-center gap-2 rounded-md px-3 py-2 font-mono text-[0.95rem] font-semibold text-chalk hover:text-signal-2 xl:inline-flex"
          >
            <Phone size={17} aria-hidden="true" className="text-signal" />
            {company.phone.display}
          </a>
          <Link
            to={inquiryHref()}
            onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'header' })}
            className="btn btn-signal hidden !min-h-11 !px-4 text-[0.95rem] sm:inline-flex"
          >
            Pyydä hinta-arvio
          </Link>
          <a
            href={company.phone.href}
            onClick={() => track('phone_click', { location: 'header-mobile' })}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-2 text-chalk lg:hidden"
            aria-label={`Soita ${company.phone.display}`}
          >
            <Phone size={19} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 items-center gap-2 rounded-lg border border-line-2 px-3 font-semibold text-chalk lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span>{open ? 'Sulje' : 'Valikko'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto border-t border-line bg-ink lg:hidden"
      >
        <nav aria-label="Mobiilivalikko" className="wrap pb-32 pt-4">
          <ul className="divide-y divide-line border-b border-line">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  className={`flex min-h-14 items-center justify-between py-3 font-display text-[1.7rem] font-bold [font-stretch:84%] ${
                    isActive(item.to) ? 'text-signal-2' : 'text-chalk'
                  }`}
                >
                  {item.label}
                  {isActive(item.to) ? <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_#2ca7e0]" aria-hidden="true" /> : null}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="readout mt-7 text-fog">Palvelut</p>
          <ul className="mt-3 grid gap-1">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/${s.slug}`} className="flex min-h-12 items-center gap-3 rounded-lg px-1 py-2 font-semibold text-mist hover:text-chalk">
                  <TelltaleIcon id={s.icon} size={24} className="text-signal" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link to={inquiryHref()} className="btn btn-signal w-full">
              Pyydä hinta-arvio <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={company.phone.href} className="btn btn-ghost w-full">
              <Phone size={18} aria-hidden="true" /> Soita {company.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
