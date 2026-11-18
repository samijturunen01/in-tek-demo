import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { SymptomFinder } from '../components/home/SymptomFinder'
import { ServiceIndex } from '../components/home/ServiceIndex'
import { TwoWays } from '../components/home/TwoWays'
import { CtaBand } from '../components/ui/CtaBand'
import { inquiryHref } from '../data/nav'

export function Services() {
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Palvelut' }]}
        eyebrow="Palvelut"
        title="Autoelektroniikan korjaukset ja autonavaimet – merkistä riippumatta"
        lead="Mittaristot, ABS- ja airbag-yksiköt, sähköiset virta- ja rattilukot, moottorin- ja vaihteistonohjaus sekä autonavaimet. Valitse palvelu tai aloita oireesta."
      >
        <Link to={inquiryHref()} className="btn btn-signal">
          Pyydä hinta-arvio <ArrowRight size={18} aria-hidden="true" className="arrow" />
        </Link>
        <a href="#merkkivalot" className="btn btn-ghost">
          Mikä valo palaa?
        </a>
      </PageIntro>
      <ServiceIndex eyebrow="Kaikki palvelut" title="Valitse korjattava kohde." intro="Jokaisella palvelusivulla näet tyypilliset viat, korjausajan, takuun ja sen, mitä tarvitsemme sinulta." />
      <SymptomFinder />
      <TwoWays />
      <CtaBand />
    </>
  )
}
