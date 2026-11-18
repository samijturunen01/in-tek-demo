import { Link, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { company } from '../../data/company'
import { inquiryHref } from '../../data/nav'
import { track } from '../../lib/analytics'

/** Thumb-reach contact actions on phones and small tablets. */
export function MobileActionBar() {
  const { pathname } = useLocation()
  const onContact = pathname.replace(/\/+$/, '') === '/yhteystiedot'
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="wrap grid grid-cols-2 gap-2 py-2.5">
        <a
          href={company.phone.href}
          onClick={() => track('phone_click', { location: 'mobile-bar' })}
          className="btn btn-ghost !min-h-12 !px-3 text-[0.98rem]"
        >
          <Phone size={18} aria-hidden="true" className="text-signal" /> Soita
        </a>
        {onContact ? (
          <a href="#kysely" className="btn btn-signal !min-h-12 !px-3 text-[0.98rem]">
            Hinta-arviolomake
          </a>
        ) : (
          <Link
            to={inquiryHref()}
            onClick={() => track('cta_click', { cta: 'hinta-arvio', location: 'mobile-bar' })}
            className="btn btn-signal !min-h-12 !px-3 text-[0.98rem]"
          >
            Pyydä hinta-arvio
          </Link>
        )}
      </div>
    </div>
  )
}
