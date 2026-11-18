import type { TelltaleId } from '../../data/services'

/**
 * Dashboard-telltale inspired glyphs (custom, simplified – not manufacturer symbols).
 * Drawn on a 32×32 grid with currentColor strokes so they can "light up".
 */
export function TelltalePaths({ id }: { id: TelltaleId }) {
  switch (id) {
    case 'abs':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="16" cy="16" r="9" />
          <path d="M5.2 9.8a12.5 12.5 0 0 0 0 12.4M26.8 9.8a12.5 12.5 0 0 1 0 12.4" />
          <text
            x="16"
            y="18.6"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="'JetBrains Mono Variable', monospace"
            fontWeight="800"
            fontSize="7.4"
            letterSpacing="-0.3"
          >
            ABS
          </text>
        </g>
      )
    case 'airbag':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="6.5" r="2.6" />
          <path d="M9.6 11.2 8.4 19.6h6.4l3.4 6.4" />
          <path d="M8.4 19.6 7 26" />
          <path d="M10 13.4l6.6 2.2" />
          <circle cx="22.4" cy="13.2" r="5.2" />
        </g>
      )
    case 'cluster':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4.6 23a11.4 11.4 0 1 1 22.8 0" />
          <path d="M8.2 14.6l1.6 1.2M16 10.8v2M23.8 14.6l-1.6 1.2" />
          <path d="M16 23l5.2-6.8" />
          <circle cx="16" cy="23" r="1.6" fill="currentColor" />
        </g>
      )
    case 'immobilizer':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21v-4.6L7 10h18l3 6.4V21H4Z" />
          <circle cx="9" cy="23.4" r="2" />
          <circle cx="23" cy="23.4" r="2" />
          <circle cx="12.2" cy="15.8" r="2" />
          <path d="M14.2 15.8h7.2M19.6 15.8v2.2" />
        </g>
      )
    case 'steering':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.6 7.2A10 10 0 1 0 15 25.9" />
          <circle cx="14" cy="16" r="2.8" />
          <path d="M4.4 14.2h6.8M16.8 14.2h4M14 18.8v6.6" />
          <rect x="20.2" y="19.6" width="8.6" height="7" rx="1.4" />
          <path d="M22 19.6v-2a2.5 2.5 0 0 1 5 0v2" />
        </g>
      )
    case 'key':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="16" r="5.4" />
          <circle cx="10" cy="16" r="1.4" />
          <path d="M15.4 16H28M24.4 16v3.6M20.6 16v2.4" />
        </g>
      )
    case 'engine':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 11.5h4l1.6-2.2h5.6l1.4 2.2H25v3h2.4V12H29v9.2h-1.6v-2.6H25V23h-4.6l-2 2.2h-7.2L9.6 23H8.5v-3.4H5.8v3.2H4.2V14h1.6v3.2h2.7z" />
          <path d="M14 6.6h5.6M16.8 6.6v2.7" />
        </g>
      )
  }
}

export function TelltaleIcon({
  id,
  size = 28,
  className = '',
  title,
}: {
  id: TelltaleId
  size?: number
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <TelltalePaths id={id} />
    </svg>
  )
}
