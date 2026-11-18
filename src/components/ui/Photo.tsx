import { photoById, photoSize, type PhotoId } from '../../data/photos'
import { photoSrc, photoSrcSet } from '../../lib/asset'

/**
 * Responsive, layout-stable authentic photo. width/height come from the build-time
 * manifest so the browser reserves space before the image loads (no CLS).
 */
export function Photo({
  id,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  className = '',
  imgClassName = '',
  priority = false,
  alt,
}: {
  id: PhotoId
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  alt?: string
}) {
  const p = photoById(id)
  const m = photoSize(id)
  return (
    <div className={`overflow-hidden bg-ink-3 ${className}`}>
      <img
        src={photoSrc(id, 960)}
        srcSet={photoSrcSet(id)}
        sizes={sizes}
        width={m.w}
        height={m.h}
        alt={alt ?? p.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
