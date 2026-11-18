import type { ServiceId, TelltaleId } from '../../data/services'
import { TelltalePaths } from '../brand/Telltale'

/**
 * Abstract circuit-board composition for services without authentic photography.
 * Clearly an illustration (not a photo or technical drawing). Labels are terms
 * from the service's own verified content.
 */
const labels: Record<ServiceId, string[]> = {
  mittaristot: ['CAN', 'LCD', 'IMMO', 'VDO'],
  abs: ['BOSCH', 'ATE', 'PUMP', 'SENS'],
  airbag: ['CFFF', '65535', 'B1231', 'CRASH'],
  virtalukot: ['ESL', 'EZS', 'J518', 'KEY'],
  ohjausyksikot: ['ECU', 'TCU', 'HALDEX', 'VP44'],
  avaimet: ['SMART', 'KEYLESS', 'TRANSP', 'REMOTE'],
}

const traces = [
  { d: 'M280 210H200l-40-40H70', pad: [70, 170], label: [70, 150] },
  { d: 'M280 210H200l-40 40H90', pad: [90, 250], label: [90, 280] },
  { d: 'M280 210h80l40-50h90', pad: [490, 160], label: [490, 140] },
  { d: 'M280 210h80l40 50h70', pad: [470, 260], label: [470, 290] },
]

export function ServiceArt({ service, icon, tone }: { service: ServiceId; icon: TelltaleId; tone: 'amber' | 'red' | 'blue' }) {
  const color = tone === 'red' ? '#ef5b5f' : tone === 'blue' ? '#2ca7e0' : '#f5a524'
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink-2" data-inview>
      <svg viewBox="0 0 560 420" className="block h-auto w-full" aria-hidden="true">
        <defs>
          <radialGradient id={`sa-glow-${service}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={color} stopOpacity="0.28" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <pattern id={`sa-dots-${service}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#ffffff" fillOpacity="0.07" />
          </pattern>
        </defs>
        <rect width="560" height="420" fill={`url(#sa-dots-${service})`} />
        {/* faint background traces */}
        <g fill="none" stroke="#1d2b37" strokeWidth="2">
          <path d="M0 60h120l30 30h160l30-30h220" />
          <path d="M0 360h90l30-30h200l30 30h210" />
          <path d="M40 0v40l20 20M520 420v-50l-20-20" />
        </g>
        <g fill="none" stroke="#2e4150" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {traces.map((t) => (
            <path key={t.d} d={t.d} />
          ))}
        </g>
        <g fill="none" stroke="#2ca7e0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="trace-anim">
          {traces.map((t) => (
            <path key={t.d} d={t.d} opacity="0.85" pathLength={1} />
          ))}
        </g>
        {traces.map((t, i) => (
          <g key={i}>
            <circle cx={t.pad[0]} cy={t.pad[1]} r="7" fill="#0e1821" stroke="#2ca7e0" strokeWidth="2.5" />
            <text
              x={t.pad[0]}
              y={t.label[1]}
              textAnchor="middle"
              fill="#8597a6"
              fontFamily="'JetBrains Mono Variable', monospace"
              fontSize="13"
              fontWeight="700"
              letterSpacing="1.2"
            >
              {labels[service][i]}
            </text>
          </g>
        ))}
        {/* the unit */}
        <circle cx="280" cy="210" r="150" fill={`url(#sa-glow-${service})`} />
        <rect x="205" y="135" width="150" height="150" rx="22" fill="#091017" stroke="#2e4150" strokeWidth="2.5" />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} stroke="#2e4150" strokeWidth="3" strokeLinecap="round">
            <path d={`M${225 + i * 27.5} 135v-14`} />
            <path d={`M${225 + i * 27.5} 285v14`} />
          </g>
        ))}
        <svg x="235" y="165" width="90" height="90" viewBox="0 0 32 32" style={{ color, filter: `drop-shadow(0 0 10px ${color})` }}>
          <TelltalePaths id={icon} />
        </svg>
      </svg>
    </div>
  )
}
