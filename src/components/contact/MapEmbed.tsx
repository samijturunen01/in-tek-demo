import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { company, fullAddress } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps: nothing loads from Google until the visitor
 * asks for the map. Uses the keyless embed URL (no paid API key).
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false)
  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-ink-2">
      <div className="relative aspect-[4/3] min-h-[360px] w-full sm:aspect-[16/10] sm:min-h-0 lg:aspect-[21/9]">
        {load ? (
          <iframe
            title={`Kartta: ${company.name}, ${fullAddress}`}
            src={company.maps.embed}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="grid-dots absolute inset-0 flex items-center justify-center p-6">
            {/* Schematic placeholder – abstract street lines, not a real map */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="#1d2b37" strokeLinecap="round">
                <path d="M-20 250C180 230 330 220 820 170" strokeWidth="16" />
                <path d="M300 -20L360 420" strokeWidth="12" />
                <path d="M-20 90L820 40" strokeWidth="8" />
                <path d="M640 -20L590 420" strokeWidth="8" />
              </g>
              <g fill="none" stroke="#2ca7e0" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 8">
                <path d="M-20 250C180 230 330 220 820 170" />
              </g>
            </svg>
            <div className="relative max-w-sm text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal text-ink shadow-[0_0_30px_rgb(44_167_224/0.6)]">
                <MapPin size={26} aria-hidden="true" />
              </span>
              <p className="mt-4 font-display text-[1.6rem] font-bold leading-tight [font-stretch:84%]">{fullAddress}</p>
              <button
                type="button"
                onClick={() => {
                  setLoad(true)
                  track('map_load')
                }}
                className="btn btn-signal mt-5"
              >
                Näytä kartta
              </button>
              <p className="mt-3 text-[0.85rem] text-fog">Kartta ladataan Googlelta vasta, kun valitset sen.</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 font-semibold">
          <MapPin size={18} aria-hidden="true" className="text-signal" /> {company.name}, {fullAddress}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={company.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('directions_click', { location: 'map' })}
            className="btn btn-signal !min-h-11 !px-4 text-[0.95rem]"
          >
            <Navigation size={17} aria-hidden="true" /> Katso reittiohjeet
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
          <a href={company.maps.open} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-4 text-[0.95rem]">
            Avaa Google Mapsissa
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
