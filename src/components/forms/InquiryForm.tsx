import { useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle, ArrowRight, CircleCheck, Info, Loader2, Phone } from 'lucide-react'
import { services, type ServiceId } from '../../data/services'
import { company } from '../../data/company'
import { TelltaleIcon } from '../brand/Telltale'
import { validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import type { FieldErrors, RepairInquiry } from '../../lib/forms/types'
import { track } from '../../lib/analytics'

const empty: RepairInquiry = {
  service: '',
  vehicle: '',
  year: '',
  plate: '',
  description: '',
  delivery: '',
  name: '',
  phone: '',
  email: '',
  isCompany: false,
  company: '',
  consent: false,
}

const order: (keyof RepairInquiry)[] = ['service', 'vehicle', 'year', 'description', 'name', 'phone', 'email', 'company', 'consent']

const deliveryOptions = [
  { v: 'tuon', l: 'Tuon Joensuuhun' },
  { v: 'postitse', l: 'Lähetän postitse' },
  { v: 'en-tieda', l: 'En tiedä vielä' },
] as const

/** Repair inquiry ("hinta-arviopyyntö"). Demo mode: nothing is sent or stored. */
export function InquiryForm() {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const location = useLocation()
  const [data, setData] = useState<RepairInquiry>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const started = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Service preselection from ?palvelu= – read only after hydration so the SSR markup stays identical.
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const param = isClient ? new URLSearchParams(location.search).get('palvelu') : null
  const preselected: ServiceId | '' = param && services.some((s) => s.id === param) ? (param as ServiceId) : ''
  const service = data.service || preselected

  const set = <K extends keyof RepairInquiry>(k: K, v: RepairInquiry[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'hinta-arvio' })
    }
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload: RepairInquiry = { ...data, service }
    const found = validate(payload)
    setErrors(found)
    const keys = order.filter((k) => found[k])
    if (keys.length) {
      track('form_validation_error', { form: 'hinta-arvio', count: keys.length })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setState('sending')
    try {
      const res = await getFormAdapter().submit(payload)
      setMessage(res.message)
      setState('done')
      track('form_submit_success', { form: 'hinta-arvio', service, delivery: data.delivery || 'ei-valittu', demo: res.demo })
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch {
      setState('error')
    }
  }

  const errorKeys = order.filter((k) => errors[k])

  if (state === 'done') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[22px] border border-graphite/15 bg-chalk p-6 outline-none sm:p-10">
        <CircleCheck size={40} aria-hidden="true" className="text-signal-deep" />
        <h3 className="mt-4 font-display text-[2rem] font-bold leading-tight [font-stretch:84%]">{message}</h3>
        {isDemoMode() ? (
          <p className="mt-3 text-slate">
            Tämä on verkkosivujen konseptidemo: lomake ei lähettänyt eikä tallentanut tietojasi. Tuotantoversiossa viesti välitetään in-TEKille.
          </p>
        ) : null}
        <p className="mt-5 text-slate">Kiireellisissä asioissa soita suoraan:</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a href={company.phone.href} className="btn btn-ink">
            <Phone size={18} aria-hidden="true" /> {company.phone.display}
          </a>
          <button
            type="button"
            className="btn btn-outline-ink"
            onClick={() => {
              setData(empty)
              setState('idle')
              started.current = false
            }}
          >
            Tee uusi pyyntö
          </button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="rounded-[22px] border border-graphite/15 bg-chalk p-5 sm:p-8 lg:p-10" aria-describedby={id('intro')}>
      <p id={id('intro')} className="text-slate">
        Pakolliset kentät on merkitty tähdellä (<span className="req">*</span>). Täyttäminen vie noin kaksi minuuttia.
      </p>

      {errorKeys.length ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-xl border border-[#c02d33]/40 bg-[#fdf1f1] p-4 outline-none">
          <p className="flex items-center gap-2 font-semibold text-[#9f1f25]">
            <AlertCircle size={18} aria-hidden="true" /> Tarkista {errorKeys.length === 1 ? 'yksi kenttä' : `${errorKeys.length} kenttää`}:
          </p>
          <ul className="mt-2 grid gap-1 pl-7 text-[0.95rem]">
            {errorKeys.map((k) => (
              <li key={k}>
                <a
                  href={`#${id(k)}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(id(k))
                    el?.scrollIntoView({ block: 'center' })
                    el?.focus({ preventScroll: true })
                  }}
                  className="text-[#9f1f25] underline underline-offset-2"
                >
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* 1. Service */}
      <fieldset className="mt-8" aria-describedby={errors.service ? id('service-err') : undefined}>
        <legend className="flex items-center gap-3 font-display text-[1.5rem] font-bold [font-stretch:86%]">
          <Step n={1} /> Mitä korjataan? <span className="req">*</span>
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" id={id('service')} tabIndex={-1}>
          {services.map((s) => (
            <label key={s.id} className="choice">
              <input type="radio" name={id('svc')} value={s.id} checked={service === s.id} onChange={() => set('service', s.id)} />
              <TelltaleIcon id={s.icon} size={24} className="shrink-0 text-signal-deep" />
              {s.short}
            </label>
          ))}
          <label className="choice">
            <input type="radio" name={id('svc')} value="en-tieda" checked={service === 'en-tieda'} onChange={() => set('service', 'en-tieda')} />
            <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center font-mono font-bold text-signal-deep">
              ?
            </span>
            En ole varma
          </label>
        </div>
        <FieldError id={id('service-err')} msg={errors.service} />
      </fieldset>

      {/* 2. Vehicle + fault */}
      <fieldset className="mt-10">
        <legend className="flex items-center gap-3 font-display text-[1.5rem] font-bold [font-stretch:86%]">
          <Step n={2} /> Ajoneuvo ja vika
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-6">
          <Field label="Merkki ja malli" required id={id('vehicle')} error={errors.vehicle} className="sm:col-span-6" hint="Esim. Volvo V70 tai Lynx-moottorikelkka">
            <input
              id={id('vehicle')}
              className="input"
              value={data.vehicle}
              onChange={(e) => set('vehicle', e.target.value)}
              autoComplete="off"
              aria-invalid={!!errors.vehicle}
              aria-describedby={`${id('vehicle')}-hint${errors.vehicle ? ` ${id('vehicle')}-err` : ''}`}
            />
          </Field>
          <Field label="Vuosimalli" id={id('year')} error={errors.year} className="sm:col-span-3">
            <input
              id={id('year')}
              className="input"
              inputMode="numeric"
              maxLength={4}
              value={data.year}
              onChange={(e) => set('year', e.target.value.replace(/\D/g, ''))}
              aria-invalid={!!errors.year}
              aria-describedby={errors.year ? `${id('year')}-err` : undefined}
            />
          </Field>
          <Field label="Rekisteritunnus" id={id('plate')} className="sm:col-span-3">
            <input
              id={id('plate')}
              className="input uppercase"
              value={data.plate}
              onChange={(e) => set('plate', e.target.value.toUpperCase())}
              autoComplete="off"
              maxLength={10}
            />
          </Field>
          <Field
            label="Vian kuvaus, oireet ja vikakoodit"
            required
            id={id('description')}
            error={errors.description}
            className="sm:col-span-6"
            hint="Esim. ”Airbag-valo palaa, testeri näyttää koodin 65535” tai ”Nopeusmittari jää välillä nollaan”."
          >
            <textarea
              id={id('description')}
              className="input min-h-36 resize-y"
              value={data.description}
              onChange={(e) => set('description', e.target.value)}
              maxLength={2000}
              aria-invalid={!!errors.description}
              aria-describedby={`${id('description')}-hint${errors.description ? ` ${id('description')}-err` : ''}`}
            />
          </Field>
        </div>
        <div className="mt-6">
          <p className="field-label" id={id('delivery-l')}>
            Miten toimitat auton tai yksikön? <span className="opt">(valinnainen)</span>
          </p>
          <div role="radiogroup" aria-labelledby={id('delivery-l')} className="grid gap-2 sm:grid-cols-3">
            {deliveryOptions.map((o) => (
              <label key={o.v} className="choice">
                <input type="radio" name={id('delivery')} value={o.v} checked={data.delivery === o.v} onChange={() => set('delivery', o.v)} />
                <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full border-2 border-graphite/40 [.choice:has(input:checked)_&]:border-[5px] [.choice:has(input:checked)_&]:border-signal-deep" />
                {o.l}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* 3. Contact */}
      <fieldset className="mt-10">
        <legend className="flex items-center gap-3 font-display text-[1.5rem] font-bold [font-stretch:86%]">
          <Step n={3} /> Yhteystiedot
        </legend>
        <p className="mt-2 text-[0.95rem] text-slate">Anna puhelinnumero tai sähköposti – tai molemmat.</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nimi" required id={id('name')} error={errors.name} className="sm:col-span-2">
            <input
              id={id('name')}
              className="input"
              value={data.name}
              onChange={(e) => set('name', e.target.value)}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${id('name')}-err` : undefined}
            />
          </Field>
          <Field label="Puhelinnumero" id={id('phone')} error={errors.phone} note="(puhelin tai sähköposti)">
            <input
              id={id('phone')}
              className="input"
              type="tel"
              inputMode="tel"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${id('phone')}-err` : undefined}
            />
          </Field>
          <Field label="Sähköposti" id={id('email')} error={errors.email} note="(puhelin tai sähköposti)">
            <input
              id={id('email')}
              className="input"
              type="email"
              inputMode="email"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${id('email')}-err` : undefined}
            />
          </Field>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold sm:col-span-2">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#0370a3]"
              checked={data.isCompany}
              onChange={(e) => set('isCompany', e.target.checked)}
              aria-controls={id('company-wrap')}
              aria-expanded={data.isCompany}
            />
            Pyydän hinta-arviota yritykselle
          </label>
          <div id={id('company-wrap')} hidden={!data.isCompany} className="sm:col-span-2">
            <Field label="Yrityksen nimi" required id={id('company')} error={errors.company}>
              <input
                id={id('company')}
                className="input"
                value={data.company}
                onChange={(e) => set('company', e.target.value)}
                autoComplete="organization"
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? `${id('company')}-err` : undefined}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      <div className="mt-8" id={id('consent')} tabIndex={-1}>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-[#0370a3]"
            checked={data.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${id('consent')}-err` : undefined}
          />
          <span className="text-[0.97rem]">
            Annan luvan käyttää tietojani tähän yhteydenottoon vastaamiseen. <span className="req">*</span>
          </span>
        </label>
        <FieldError id={`${id('consent')}-err`} msg={errors.consent} />
      </div>

      {isDemoMode() ? (
        <p className="mt-8 flex gap-3 rounded-xl bg-paper p-4 text-[0.93rem] text-slate">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-signal-deep" />
          Konseptidemo: lomake ei lähetä eikä tallenna tietoja. Tuotantoversiossa pyyntö välitetään in-TEKille.
        </p>
      ) : null}

      {state === 'error' ? (
        <p role="alert" className="mt-6 font-semibold text-[#9f1f25]">
          Lähetys epäonnistui. Yritä uudelleen tai soita {company.phone.display}.
        </p>
      ) : null}

      <button type="submit" className="btn btn-signal mt-6 w-full sm:w-auto" disabled={state === 'sending'} aria-disabled={state === 'sending'}>
        {state === 'sending' ? (
          <>
            <Loader2 size={18} aria-hidden="true" className="animate-spin" /> Lähetetään…
          </>
        ) : (
          <>
            Lähetä hinta-arviopyyntö <ArrowRight size={18} aria-hidden="true" className="arrow" />
          </>
        )}
      </button>
    </form>
  )
}

const noopSubscribe = () => () => {}

function Step({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-[0.85rem] font-bold text-signal">
      {n}
    </span>
  )
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null
  return (
    <p id={id} className="field-error">
      <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
      {msg}
    </p>
  )
}

function Field({
  label,
  id,
  required,
  error,
  hint,
  note,
  className = '',
  children,
}: {
  label: string
  id: string
  required?: boolean
  error?: string
  hint?: string
  note?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required ? <span className="req">*</span> : <span className="opt">{note ?? '(valinnainen)'}</span>}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="field-hint mt-1.5">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-err`} msg={error} />
    </div>
  )
}
