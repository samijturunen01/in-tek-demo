import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AlertCircle, Printer, ShieldCheck } from 'lucide-react'
import { services } from '../../data/services'
import { company, fullAddress } from '../../data/company'
import { termsSections } from '../../data/terms'
import { EMAIL, PHONE } from '../../lib/forms/validate'
import { track } from '../../lib/analytics'

interface Slip {
  name: string
  street: string
  postalCode: string
  city: string
  phone: string
  email: string
  unit: string
  unitDetails: string
  vehicle: string
  description: string
  accept: boolean
}

const empty: Slip = {
  name: '',
  street: '',
  postalCode: '',
  city: '',
  phone: '',
  email: '',
  unit: '',
  unitDetails: '',
  vehicle: '',
  description: '',
  accept: false,
}

type Errors = Partial<Record<keyof Slip, string>>

function check(d: Slip): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  if (d.street.trim().length < 3) e.street = 'Kirjoita palautusosoite.'
  if (!/^\d{5}$/.test(d.postalCode.trim())) e.postalCode = 'Postinumerossa on viisi numeroa.'
  if (d.city.trim().length < 2) e.city = 'Kirjoita postitoimipaikka.'
  if (!PHONE.test(d.phone.trim())) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Tarkista sähköpostiosoite.'
  if (!d.unit) e.unit = 'Valitse korjattava yksikkö.'
  if (d.vehicle.trim().length < 2) e.vehicle = 'Kirjoita ajoneuvo ja rekisteritunnus.'
  if (d.description.trim().length < 10) e.description = 'Kuvaile vika, oireet ja vikakoodit (vähintään 10 merkkiä).'
  if (!d.accept) e.accept = 'Hyväksy takuu- ja toimitusehdot.'
  return e
}

const order: (keyof Slip)[] = ['name', 'street', 'postalCode', 'city', 'phone', 'email', 'unit', 'vehicle', 'description', 'accept']

/**
 * Online version of in-TEK's paper service form ("huoltolähete"). Everything stays in
 * the browser: the slip is rendered into a print-only sheet and printed / saved as PDF.
 */
export function ServiceSlipForm() {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const [d, setD] = useState<Slip>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [printed, setPrinted] = useState<Slip | null>(null)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const summary = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!printed) return
    const t = window.setTimeout(() => window.print(), 50)
    return () => window.clearTimeout(t)
  }, [printed])

  const set = <K extends keyof Slip>(k: K, v: Slip[K]) => {
    setD((x) => ({ ...x, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = check(d)
    setErrors(found)
    if (order.some((k) => found[k])) {
      requestAnimationFrame(() => summary.current?.focus())
      return
    }
    setPrinted({ ...d })
    track('huoltolahete_print', { unit: d.unit })
  }

  const errKeys = order.filter((k) => errors[k])
  const input = (k: keyof Slip, extra: Record<string, unknown> = {}) => ({
    id: id(k),
    className: 'input',
    value: d[k] as string,
    onChange: (e: { target: { value: string } }) => set(k, e.target.value as never),
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${id(k)}-err` : undefined,
    ...extra,
  })

  return (
    <>
      <form noValidate onSubmit={onSubmit} className="rounded-[22px] border border-graphite/15 bg-chalk p-5 sm:p-8 lg:p-10">
        <p className="flex gap-3 rounded-xl bg-paper p-4 text-[0.95rem] text-slate">
          <ShieldCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-signal-deep" />
          Tiedot eivät lähde minnekään: huoltolähete muodostetaan ja tulostetaan suoraan selaimessasi. Voit myös tallentaa sen PDF-tiedostoksi
          tulostusikkunassa.
        </p>

        {errKeys.length ? (
          <div ref={summary} tabIndex={-1} role="alert" className="mt-6 rounded-xl border border-[#c02d33]/40 bg-[#fdf1f1] p-4 outline-none">
            <p className="flex items-center gap-2 font-semibold text-[#9f1f25]">
              <AlertCircle size={18} aria-hidden="true" /> Täydennä {errKeys.length === 1 ? 'yksi kenttä' : `${errKeys.length} kenttää`} ennen tulostusta.
            </p>
            <ul className="mt-2 grid gap-1 pl-7 text-[0.95rem] text-[#9f1f25]">
              {errKeys.map((k) => (
                <li key={k}>{errors[k]}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <fieldset className="mt-8">
          <legend className="font-display text-[1.45rem] font-bold [font-stretch:86%]">Asiakas- ja palautustiedot</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-6">
            <F label="Nimi" k="name" id={id} errors={errors} className="sm:col-span-6">
              <input {...input('name', { autoComplete: 'name' })} />
            </F>
            <F label="Katuosoite" k="street" id={id} errors={errors} className="sm:col-span-6">
              <input {...input('street', { autoComplete: 'street-address' })} />
            </F>
            <F label="Postinumero" k="postalCode" id={id} errors={errors} className="sm:col-span-2">
              <input {...input('postalCode', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5 })} />
            </F>
            <F label="Postitoimipaikka" k="city" id={id} errors={errors} className="sm:col-span-4">
              <input {...input('city', { autoComplete: 'address-level2' })} />
            </F>
            <F label="Puhelin" k="phone" id={id} errors={errors} className="sm:col-span-3">
              <input {...input('phone', { autoComplete: 'tel', type: 'tel', inputMode: 'tel' })} />
            </F>
            <F label="Sähköposti" k="email" id={id} errors={errors} optional className="sm:col-span-3">
              <input {...input('email', { autoComplete: 'email', type: 'email', inputMode: 'email' })} />
            </F>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-display text-[1.45rem] font-bold [font-stretch:86%]">Laitteen ja ajoneuvon tiedot</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-6">
            <F label="Korjattava yksikkö" k="unit" id={id} errors={errors} className="sm:col-span-3">
              <select {...input('unit')}>
                <option value="">Valitse…</option>
                {services
                  .filter((s) => s.id !== 'avaimet')
                  .map((s) => (
                    <option key={s.id} value={s.short}>
                      {s.short}
                    </option>
                  ))}
                <option value="Autonavain / avaimen kaukosäädin">Autonavain / kaukosäädin</option>
                <option value="Muu">Muu</option>
              </select>
            </F>
            <F label="Yksikön tarkenne" k="unitDetails" id={id} errors={errors} optional className="sm:col-span-3" hint="Esim. valmistaja tai osanumero">
              <input {...input('unitDetails', { autoComplete: 'off' })} />
            </F>
            <F label="Ajoneuvo ja rekisteritunnus" k="vehicle" id={id} errors={errors} className="sm:col-span-6" hint="Esim. Audi A6 2007, ABC-123">
              <input {...input('vehicle', { autoComplete: 'off' })} />
            </F>
            <F label="Vian kuvaus, vikakoodit ja oireet" k="description" id={id} errors={errors} className="sm:col-span-6">
              <textarea {...input('description', { className: 'input min-h-32 resize-y', maxLength: 1500 })} />
            </F>
          </div>
        </fieldset>

        <div className="mt-8">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id={id('accept')}
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-[#0370a3]"
              checked={d.accept}
              onChange={(e) => set('accept', e.target.checked)}
              aria-invalid={!!errors.accept}
              aria-describedby={errors.accept ? `${id('accept')}-err` : undefined}
            />
            <span>
              Olen tutustunut{' '}
              <Link to="/takuuehdot" className="text-link font-semibold text-signal-deep">
                takuu- ja toimitusehtoihin
              </Link>{' '}
              ja hyväksyn ne. <span className="req">*</span>
            </span>
          </label>
          {errors.accept ? (
            <p id={`${id('accept')}-err`} className="field-error">
              <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" /> {errors.accept}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn btn-signal">
            <Printer size={18} aria-hidden="true" /> Tulosta huoltolähete
          </button>
          <button
            type="button"
            className="btn btn-outline-ink"
            onClick={() => {
              setD(empty)
              setErrors({})
              setPrinted(null)
            }}
          >
            Tyhjennä lomake
          </button>
        </div>
        {printed ? (
          <p role="status" className="mt-4 text-[0.95rem] text-slate">
            Huoltolähete avattiin tulostettavaksi. Laita se paketin mukaan. Jos tulostusikkuna ei auennut, paina Ctrl + P (Mac: ⌘ + P).
          </p>
        ) : null}
      </form>

      {mounted && printed ? createPortal(<PrintSheet s={printed} />, document.body) : null}
    </>
  )
}

function F({
  label,
  k,
  id,
  errors,
  optional,
  hint,
  className = '',
  children,
}: {
  label: string
  k: keyof Slip
  id: (k: string) => string
  errors: Errors
  optional?: boolean
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id(k)} className="field-label">
        {label} {optional ? <span className="opt">(valinnainen)</span> : <span className="req">*</span>}
      </label>
      {children}
      {hint ? <p className="field-hint mt-1.5">{hint}</p> : null}
      {errors[k] ? (
        <p id={`${id(k)}-err`} className="field-error">
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" /> {errors[k]}
        </p>
      ) : null}
    </div>
  )
}

function PrintSheet({ s }: { s: Slip }) {
  const today = new Date().toLocaleDateString('fi-FI')
  const row = (k: string, v: string) => (
    <tr>
      <th style={{ textAlign: 'left', padding: '4px 10px 4px 0', width: '36%', fontWeight: 600, verticalAlign: 'top' }}>{k}</th>
      <td style={{ padding: '4px 0', borderBottom: '1px solid #bbb' }}>{v || '—'}</td>
    </tr>
  )
  return (
    <div className="print-sheet" aria-hidden="true" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10.5pt', color: '#000', lineHeight: 1.4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #000', paddingBottom: 8 }}>
        <div>
          <div style={{ fontSize: '22pt', fontWeight: 700 }}>in-TEK huoltolähete</div>
          <div>Laadittu {today}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '9.5pt' }}>
          <strong>{company.name}</strong>
          <br />
          {fullAddress}
          <br />
          {company.phone.display} · {company.email}
          <br />
          Y-tunnus {company.businessId}
        </div>
      </div>

      <h2 style={{ fontSize: '12pt', margin: '14px 0 4px' }}>Asiakkaan / palautustiedot</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {row('Nimi', s.name)}
          {row('Osoite', `${s.street}, ${s.postalCode} ${s.city}`)}
          {row('Puhelin', s.phone)}
          {row('Sähköposti', s.email)}
        </tbody>
      </table>

      <h2 style={{ fontSize: '12pt', margin: '14px 0 4px' }}>Laitteen / ajoneuvon tiedot</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {row('Korjattava yksikkö', [s.unit, s.unitDetails].filter(Boolean).join(' – '))}
          {row('Ajoneuvo / rekisteritunnus', s.vehicle)}
        </tbody>
      </table>

      <h2 style={{ fontSize: '12pt', margin: '14px 0 4px' }}>Vian kuvaus, vikakoodit, oireet</h2>
      <div style={{ border: '1px solid #000', padding: 8, minHeight: '28mm', whiteSpace: 'pre-wrap' }}>{s.description}</div>

      <h2 style={{ fontSize: '12pt', margin: '14px 0 4px' }}>Suoritetut tarkastukset ja toimenpiteet (in-TEK täyttää)</h2>
      <div style={{ border: '1px solid #000', minHeight: '30mm' }} />

      <p style={{ marginTop: 14 }}>Vakuutan, että olen tutustunut liitteenä oleviin takuu- ja toimitusehtoihin ja hyväksyn ne.</p>
      <div style={{ display: 'flex', gap: 24, marginTop: 18 }}>
        <div style={{ flex: '0 0 30%', borderTop: '1px solid #000', paddingTop: 3 }}>Päiväys</div>
        <div style={{ flex: 1, borderTop: '1px solid #000', paddingTop: 3 }}>Allekirjoitus ja nimenselvennys</div>
      </div>

      <div style={{ marginTop: 16, fontSize: '8pt', borderTop: '1px solid #999', paddingTop: 6 }}>
        <strong>Takuu- ja toimitusehdot</strong>
        {termsSections.map((t) => (
          <p key={t.id} style={{ margin: '3px 0' }}>
            <strong>{t.title}: </strong>
            {t.paragraphs.join(' ')}
          </p>
        ))}
        <p style={{ marginTop: 6, color: '#444' }}>
          Huoltolähete luotu in-TEKin verkkosivujen konseptidemossa (Hades Design). Varmista lähetysohjeet in-TEKiltä ennen lähettämistä.
        </p>
      </div>
    </div>
  )
}
