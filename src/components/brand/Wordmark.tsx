/**
 * Typographic in-TEK wordmark. The company has no published graphic logo – both of
 * its sites use the plain name "in-TEK" – so the wordmark keeps the original
 * lower/upper-case spelling and turns the hyphen into a lit "LED segment".
 * The real hyphen stays inline (transparent) so the
 * accessible name is exactly "in-TEK" (LED = background stripe, no extra boxes).
 * Replace with official logo files if the customer has them (docs/IMAGE_REPLACEMENT_LIST.md).
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap font-display font-bold leading-none tracking-[-0.01em] [font-stretch:92%] ${className}`}>
      in
      <span className="bg-[linear-gradient(#2ca7e0,#2ca7e0)] bg-[length:100%_0.15em] bg-[position:0_56%] bg-no-repeat px-[0.08em] text-transparent [filter:drop-shadow(0_0_0.18em_rgb(44_167_224/0.9))]">
        -
      </span>
      TEK
    </span>
  )
}
