import { Hero } from '../components/home/Hero'
import { SymptomFinder } from '../components/home/SymptomFinder'
import { TwoWays } from '../components/home/TwoWays'
import { ServiceIndex } from '../components/home/ServiceIndex'
import { KeysFeature } from '../components/home/KeysFeature'
import { WarrantyBlock } from '../components/home/WarrantyBlock'
import { BeyondCars } from '../components/home/BeyondCars'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { faqs } from '../data/faq'

export function Home() {
  return (
    <>
      <Hero />
      <SymptomFinder />
      <ServiceIndex />
      <KeysFeature />
      <TwoWays />
      <BeyondCars />
      <WarrantyBlock />
      <section className="on-light border-t border-graphite/10 bg-chalk text-graphite">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Usein kysyttyä</p>
            <h2 className="display-lg mt-5">Ennen kuin lähetät tai soitat</h2>
            <p className="mt-5 text-slate">Vastaukset perustuvat in-TEKin palvelu- ja takuuehtoihin.</p>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
