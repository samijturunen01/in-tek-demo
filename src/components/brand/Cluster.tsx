import { forwardRef } from 'react'
import type { TelltaleId } from '../../data/services'
import { TelltalePaths } from './Telltale'

/**
 * Signature graphic: a stylised night-time instrument cluster. Its final state
 * (rendered on the server) shows every warning telltale dark and the in-TEK
 * wordmark lit on the centre display. The homepage hero animates the
 * "ignition self-test" towards this state (see Hero.tsx).
 */
const f = (n: number) => Math.round(n * 100) / 100
const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return [f(cx + r * Math.sin(a)), f(cy - r * Math.cos(a))] as const
}

const START = -135
const END = 135
const TICKS = 25

interface Gauge {
  cx: number
  cy: number
  r: number
  labels: string[]
  unit: string
  redFrom?: number
}

const gauges: Gauge[] = [
  { cx: 165, cy: 206, r: 128, labels: ['0', '30', '60', '90', '120', '150', '180', '210', '240'], unit: 'km/h' },
  { cx: 635, cy: 206, r: 128, labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8'], unit: '×1000 r/min', redFrom: 101 },
]

const arc = (cx: number, cy: number, r: number, from: number, to: number) => {
  const [sx, sy] = pt(cx, cy, r, from)
  const [ex, ey] = pt(cx, cy, r, to)
  return `M${sx} ${sy}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${ex} ${ey}`
}

const telltales: { id: TelltaleId; tone: 'amber' | 'red' }[] = [
  { id: 'abs', tone: 'amber' },
  { id: 'airbag', tone: 'red' },
  { id: 'cluster', tone: 'amber' },
  { id: 'immobilizer', tone: 'amber' },
  { id: 'steering', tone: 'amber' },
  { id: 'key', tone: 'amber' },
  { id: 'engine', tone: 'amber' },
]

export const Cluster = forwardRef<SVGSVGElement, { className?: string }>(function Cluster({ className = '' }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 800 420"
      className={`cluster block h-auto w-full ${className}`}
      role="img"
      aria-labelledby="cluster-title"
    >
      <title id="cluster-title">
        Piirretty mittaristo: merkkivalot ABS, airbag, mittaristo, käynnistyksenesto, rattilukko, avain ja moottori ovat sammuneet, keskinäytössä in-TEK.
      </title>
      <defs>
        <linearGradient id="cl-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111d28" />
          <stop offset="1" stopColor="#070c12" />
        </linearGradient>
        <radialGradient id="cl-gauge" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#0f1c27" />
          <stop offset="1" stopColor="#060b10" />
        </radialGradient>
        <radialGradient id="cl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2ca7e0" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2ca7e0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Binnacle */}
      <rect x="6" y="18" width="788" height="394" rx="62" fill="url(#cl-face)" stroke="#22323f" strokeWidth="2" />
      <path d="M70 26C250 8 550 8 730 26" fill="none" stroke="#2e4150" strokeWidth="1.5" opacity="0.6" />

      {gauges.map((g, gi) => {
        const ticks = Array.from({ length: TICKS }, (_, i) => {
          const a = START + (i * (END - START)) / (TICKS - 1)
          const major = i % 3 === 0
          const [x1, y1] = pt(g.cx, g.cy, g.r - (major ? 19 : 11), a)
          const [x2, y2] = pt(g.cx, g.cy, g.r - 3, a)
          const [lx, ly] = pt(g.cx, g.cy, g.r - 38, a)
          return { x1, y1, x2, y2, major, lx, ly, label: major ? g.labels[i / 3] : null, red: g.redFrom !== undefined && a >= g.redFrom }
        })
        return (
          <g key={g.unit} className={gi === 0 ? 'cl-gauge-l' : 'cl-gauge-r'}>
            <circle cx={g.cx} cy={g.cy} r={g.r + 8} fill="url(#cl-gauge)" stroke="#22323f" strokeWidth="2" />
            <path d={arc(g.cx, g.cy, g.r, START, END)} fill="none" stroke="#1d2b37" strokeWidth="2" />
            {g.redFrom !== undefined ? (
              <path d={arc(g.cx, g.cy, g.r - 7, g.redFrom, END)} fill="none" stroke="#ef5b5f" strokeOpacity="0.55" strokeWidth="6" />
            ) : null}
            {ticks.map((t, i) => (
              <g key={i} className="cl-tick">
                <line
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.red ? '#ef5b5f' : t.major ? '#dbe6ee' : '#7f93a3'}
                  strokeWidth={t.major ? 3 : 1.6}
                  strokeLinecap="round"
                />
                {t.label ? (
                  <text
                    x={t.lx}
                    y={t.ly + 5}
                    textAnchor="middle"
                    fill="#9fb1bf"
                    fontFamily="'JetBrains Mono Variable', monospace"
                    fontSize="14"
                    fontWeight="600"
                  >
                    {t.label}
                  </text>
                ) : null}
              </g>
            ))}
            <text
              x={g.cx}
              y={g.cy + 62}
              textAnchor="middle"
              fill="#6f8292"
              fontFamily="'JetBrains Mono Variable', monospace"
              fontSize="12"
              letterSpacing="1.5"
            >
              {g.unit}
            </text>
            <g className="cl-needle" transform={`rotate(${START} ${g.cx} ${g.cy})`}>
              <line x1={g.cx} y1={g.cy + 16} x2={g.cx} y2={g.cy - g.r + 24} stroke="#5cc2f0" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <circle cx={g.cx} cy={g.cy} r="11" fill="#13212d" stroke="#2e4150" strokeWidth="2" />
          </g>
        )
      })}

      {/* Centre display */}
      <ellipse cx="400" cy="190" rx="150" ry="110" fill="url(#cl-glow)" className="cl-glow" />
      <rect x="302" y="88" width="196" height="196" rx="20" fill="#060b10" stroke="#22323f" strokeWidth="2" />
      {/* Display content as native SVG text (not foreignObject: keeps the H1 as the LCP element) */}
      <text
        x="400"
        y="136"
        textAnchor="middle"
        fill="#8597a6"
        fontFamily="'JetBrains Mono Variable', monospace"
        fontSize="11"
        fontWeight="600"
        letterSpacing="2"
      >
        AUTOELEKTRONIIKKA
      </text>
      <g className="cl-wordmark">
        <text
          x="400"
          y="203"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Saira Variable', 'Arial Narrow', sans-serif"
          fontSize="50"
          fontWeight="700"
          style={{ fontStretch: '92%' }}
        >
          in
          <tspan fill="#2ca7e0" stroke="#2ca7e0" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 6px #2ca7e0)' }}>
            -
          </tspan>
          TEK
        </text>
      </g>
      <g className="cl-status">
        <circle cx="342" cy="245" r="3.6" fill="#2ca7e0" style={{ filter: 'drop-shadow(0 0 4px #2ca7e0)' }} />
        <text
          x="352"
          y="249"
          fill="#5cc2f0"
          fontFamily="'JetBrains Mono Variable', monospace"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="1.6"
        >
          EI VIKAKOODEJA
        </text>
      </g>

      {/* Telltale row */}
      <rect x="220" y="320" width="360" height="54" rx="14" fill="#070c12" stroke="#1b2834" strokeWidth="1.5" />
      {telltales.map((t, i) => (
        <svg
          key={t.id}
          x={234 + i * 48}
          y={330}
          width="34"
          height="34"
          viewBox="0 0 32 32"
          className="cl-telltale telltale"
          data-tone={t.tone}
          overflow="visible"
        >
          <TelltalePaths id={t.id} />
        </svg>
      ))}
    </svg>
  )
})
