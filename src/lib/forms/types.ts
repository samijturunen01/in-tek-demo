import type { ServiceId } from '../../data/services'

export type Delivery = 'tuon' | 'postitse' | 'en-tieda'

/** Repair inquiry – fields chosen to produce a qualified lead with minimal effort. */
export interface RepairInquiry {
  service: ServiceId | 'en-tieda' | ''
  vehicle: string
  year: string
  plate: string
  description: string
  delivery: Delivery | ''
  name: string
  phone: string
  email: string
  isCompany: boolean
  company: string
  consent: boolean
}

export type FieldErrors = Partial<Record<keyof RepairInquiry, string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: RepairInquiry): Promise<SubmitResult>
}
