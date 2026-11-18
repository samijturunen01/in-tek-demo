/**
 * Typographic in-TEK wordmark. The company has no published graphic logo – both of
 * its sites use the plain name "in-TEK" – so the wordmark keeps the original
 * lower/upper-case spelling and turns the hyphen into a lit "LED segment".
 * Replace with official logo files if the customer has them (docs/IMAGE_REPLACEMENT_LIST.md).
 */
export function Wordmark({ className = '', ledClassName = '' }: { className?: string; ledClassName?: string }) {
  return (
    <span className={`inline-flex items-center font-display font-bold leading-none tracking-[-0.01em] [font-stretch:92%] ${className}`}>
      <span className="sr-only">in-TEK</span>
      <span aria-hidden="true">in</span>
      <span
        aria-hidden="true"
        className={`mx-[0.08em] mt-[0.1em] inline-block h-[0.15em] w-[0.42em] rounded-[1.5px] bg-signal shadow-[0_0_0.4em_rgb(44_167_224/0.85)] ${ledClassName}`}
      />
      <span aria-hidden="true">TEK</span>
    </span>
  )
}
