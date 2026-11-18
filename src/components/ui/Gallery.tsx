import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { photoBrands, photos, photoSize, type PhotoBrand } from '../../data/photos'
import { photoSrc, photoSrcSet } from '../../lib/asset'
import { track } from '../../lib/analytics'

/** Filterable gallery of in-TEK's own key work with an accessible <dialog> viewer. */
export function Gallery() {
  const [brand, setBrand] = useState<PhotoBrand | 'Kaikki'>('Kaikki')
  const [open, setOpen] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const items = brand === 'Kaikki' ? photos : photos.filter((p) => p.brand === brand)
  const counts = Object.fromEntries(photoBrands.map((b) => [b, photos.filter((p) => p.brand === b).length]))

  const show = (i: number) => {
    setOpen(i)
    track('gallery_open', { brand: items[i].brand })
  }

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open !== null && !d.open) d.showModal()
    if (open === null && d.open) d.close()
  }, [open])

  const step = (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length))

  const current = open !== null ? items[open] : null

  return (
    <div>
      <div role="group" aria-label="Suodata merkin mukaan" className="flex flex-wrap gap-2">
        {(['Kaikki', ...photoBrands] as const).map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={brand === b}
            onClick={() => setBrand(b)}
            className={`min-h-11 rounded-lg border px-4 font-semibold transition-colors ${
              brand === b ? 'border-signal bg-signal text-ink' : 'border-line-2 text-mist hover:border-signal hover:text-chalk'
            }`}
          >
            {b}
            <span className={`ml-2 font-mono text-[0.8rem] ${brand === b ? 'text-ink/70' : 'text-fog'}`}>
              {b === 'Kaikki' ? photos.length : counts[b]}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Näytetään {items.length} kuvaa
      </p>

      <ul className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {items.map((p, i) => {
          const m = photoSize(p.id)
          return (
            <li key={p.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => show(i)}
                className="group relative block w-full overflow-hidden rounded-xl bg-ink-3 text-left"
                aria-label={`Avaa kuva: ${p.alt}`}
              >
                <img
                  src={photoSrc(p.id, 480)}
                  srcSet={photoSrcSet(p.id)}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 48vw"
                  width={m.w}
                  height={m.h}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent px-3 pb-2.5 pt-8">
                  <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-chalk">{p.brand}</span>
                  <Expand size={16} aria-hidden="true" className="text-chalk opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null)
        }}
        aria-label="Kuvakatselu"
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-ink/95 p-0 text-chalk backdrop:bg-ink/80"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="font-mono text-[0.85rem] text-mist">
                {open! + 1} / {items.length} · Avaintyö · {current.brand}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-2"
                aria-label="Sulje kuvakatselu"
                autoFocus
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-4 sm:px-20">
              <img
                key={current.id}
                src={photoSrc(current.id, 1440)}
                srcSet={photoSrcSet(current.id)}
                sizes="100vw"
                alt={current.alt}
                className="max-h-full min-h-0 w-auto max-w-full rounded-lg object-contain"
              />
              <figcaption className="mt-3 max-w-2xl text-center text-[0.95rem] text-mist">{current.alt}</figcaption>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-2 bg-ink/80 sm:left-5"
                aria-label="Edellinen kuva"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-2 bg-ink/80 sm:right-5"
                aria-label="Seuraava kuva"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </figure>
          </div>
        ) : null}
      </dialog>
    </div>
  )
}
