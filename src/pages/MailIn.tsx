import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { ServiceSlipForm } from '../components/forms/ServiceSlipForm'
import { CtaBand } from '../components/ui/CtaBand'
import { FaqList } from '../components/ui/FaqList'
import { mailSteps } from '../components/home/TwoWays'
import { company } from '../data/company'
import { track } from '../lib/analytics'

const mailFaq = [
  {
    q: 'Mitä yksiköitä voin lähettää postitse?',
    a: 'Esimerkiksi mittaristot, ABS- ja airbag-ohjausyksiköt, moottorin- ja vaihteistonohjausyksiköt sekä muut irrotettavat ohjausyksiköt. Kerro yksikkö ja vika, kun otat yhteyttä.',
  },
  {
    q: 'Millä lähetän paketin?',
    a: 'Lähetä paketti Matkahuollon tai Postin kautta. Varmista lähetysosoite ja -tapa, kun otat yhteyttä ennen lähettämistä.',
  },
  {
    q: 'Milloin saan yksikön takaisin?',
    a: 'Tyyppiviat korjataan yleensä 1–3 arkipäivässä, ja korjattu yksikkö lähetetään takaisin korjausta seuraavana päivänä. Jos korjaus viivästyy esimerkiksi varaosan takia, ilmoitamme aikataulusta.',
  },
  {
    q: 'Entä jos korjaus ei onnistu?',
    a: 'Jos laite tai yksikkö ei korjauksen jälkeen tule kuntoon, palautamme korjaushinnan tilillesi ja veloitamme vain 40 euron tarkistusmaksun.',
  },
]

export function MailIn() {
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Postikorjaus' }]}
        eyebrow="Postikorjaus"
        title="Lähetä yksikkö korjattavaksi – mistä päin Suomea tahansa"
        lead={
          <p>
            Mittaristo, ABS-, airbag- tai muu ohjausyksikkö korjaukseen ilman ajomatkaa Joensuuhun. Neljä vaihetta – ja huoltolähetteen voit tehdä
            tällä sivulla.
          </p>
        }
      >
        <a href="#huoltolahete" className="btn btn-signal">
          Tee huoltolähete <ArrowRight size={18} aria-hidden="true" className="arrow" />
        </a>
        <a href={company.phone.href} onClick={() => track('phone_click', { location: 'mail-in-intro' })} className="btn btn-ghost">
          <Phone size={17} aria-hidden="true" className="text-signal" /> Ota ensin yhteyttä
        </a>
      </PageIntro>

      {/* Steps */}
      <section className="border-b border-line bg-ink-2">
        <div className="wrap py-20 lg:py-24">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mailSteps.map((s, i) => (
              <li key={s.t} className="panel relative p-6" data-reveal style={{ ['--d' as string]: `${i * 0.07}s` }}>
                <span className="font-mono text-[2.6rem] font-bold leading-none text-signal-2/90">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-5 font-display text-[1.5rem] font-bold leading-tight [font-stretch:86%]">{s.t}</h2>
                <p className="mt-2 text-[0.97rem] text-mist">{s.d}</p>
                {i === 0 ? (
                  <div className="mt-5 grid gap-2">
                    <a href={company.phone.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-chalk hover:text-signal-2">
                      <Phone size={17} aria-hidden="true" className="text-signal" /> {company.phone.display}
                    </a>
                    <a
                      href={`mailto:${company.email}`}
                      onClick={() => track('email_click', { location: 'mail-in-steps' })}
                      className="inline-flex min-h-11 items-center gap-2 font-semibold text-chalk hover:text-signal-2"
                    >
                      <Mail size={17} aria-hidden="true" className="text-signal" /> {company.email}
                    </a>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Slip generator */}
      <section id="huoltolahete" className="on-light bg-paper text-graphite">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Huoltolähete verkossa</p>
            <h2 className="display-lg mt-5">Täytä, tulosta, paketin mukaan.</h2>
            <p className="mt-5 text-slate">
              Lomake sisältää samat tiedot kuin in-TEKin paperinen huoltolähete. Tulosteeseen tulevat mukaan takuu- ja toimitusehdot sekä tila
              allekirjoitukselle.
            </p>
            <ul className="mt-6 grid gap-2 text-[0.97rem] text-slate">
              <li>• Tulosta A4-paperille tai tallenna PDF:ksi</li>
              <li>• Kirjoita vikakoodit, jos ne ovat tiedossa</li>
              <li>• Säilytä kuitti takuun todentamiseksi</li>
            </ul>
            <p className="mt-6 text-[0.95rem] text-slate">
              Ei tulostinta? Kirjoita samat tiedot paperille ja laita paperi paketin mukaan.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ServiceSlipForm />
          </div>
        </div>
      </section>

      <section className="on-light bg-chalk text-graphite">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Kysyttyä</p>
            <h2 className="display-md mt-4">Postikorjaus: usein kysyttyä</h2>
            <Link to="/takuuehdot" className="text-link mt-6 inline-block font-semibold text-signal-deep">
              Takuu- ja toimitusehdot
            </Link>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={mailFaq} />
          </div>
        </div>
      </section>

      <CtaBand title="Epävarma, voiko yksikön korjata?" text="Kysy ennen lähettämistä. Kerro auton merkki, malli, yksikkö ja vian oireet – myös vikakoodit, jos ne ovat tiedossa." />
    </>
  )
}
