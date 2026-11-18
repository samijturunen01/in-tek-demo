import type { ServiceId, TelltaleId } from './services'

/**
 * "Mikä valo palaa?" – symptom finder entries. Causes and figures come from the
 * matching service pages on in-tek.fi (see docs/CONTENT_SOURCES.md).
 */
export interface Symptom {
  id: string
  icon: TelltaleId
  /** Warning colour of the telltale: amber = fault, red = safety system, blue = info */
  tone: 'amber' | 'red' | 'blue'
  label: string
  title: string
  text: string
  causes: string[]
  meta: string[]
  service: ServiceId
  also?: ServiceId
}

export const symptoms: Symptom[] = [
  {
    id: 'abs',
    icon: 'abs',
    tone: 'amber',
    label: 'ABS-valo palaa',
    title: 'ABS-merkkivalo ei sammu',
    text: 'Luistonestojärjestelmä on havainnut vian. Kun syy on ABS-ohjausyksikössä, se korjataan – eri valmistajien yksiköt, kuten Bosch ja ATE.',
    causes: ['Vikakoodeja ei pääse lukemaan', 'Nopeusanturien viat', 'ABS-pumpun ohjausvika', 'Paineanturivika'],
    meta: ['Yleensä ~2 arkipäivää', 'Takuu 6–12 kk'],
    service: 'abs',
  },
  {
    id: 'airbag',
    icon: 'airbag',
    tone: 'red',
    label: 'Airbag-valo palaa',
    title: 'Airbag-valo palaa eikä koodi poistu',
    text: 'Lukittunutta turvatyynyn ohjausyksikköä ei saa nollattua tavallisella testerillä. Korjaamme turvatyyny-yksiköt valmistajasta riippumatta.',
    causes: ['Johtosarjan katkos (penkin alla, ratin spiraalissa)', 'Akku- tai syöttöjännitevika', 'Crash Data -lukitus tai sisäinen vika'],
    meta: ['Yleensä ~2 tuntia', 'Esim. VAG 65535 · Volvo CFFF'],
    service: 'airbag',
  },
  {
    id: 'mittaristo',
    icon: 'cluster',
    tone: 'amber',
    label: 'Mittari heittelee tai on pimeä',
    title: 'Mittarit heittelevät tai näyttö pimenee',
    text: 'Nopeus-, kierrosluku-, lämpö- tai polttoainemittari toimii vain välillä, tai näytössä on pikselivikaa. Korjaamme mittaristot kaikkiin merkkeihin.',
    causes: ['Satunnaisesti toimivat mittarit', 'Näytön pikselivika', 'CAN-väylän viat'],
    meta: ['Tyyppiviat 1–3 arkipäivää', 'Takuu 6–24 kk'],
    service: 'mittaristot',
  },
  {
    id: 'kaynnistys',
    icon: 'immobilizer',
    tone: 'amber',
    label: 'Auto ei käynnisty',
    title: 'Avainta ei tunnisteta tai auto ei käynnisty',
    text: 'Käynnistyksenestoon liittyvä vika voi olla sähköisessä virtalukossa, mittaristossa tai avaimessa. Kerro oireet ja auton malli, niin selvitetään oikea korjaus.',
    causes: ['Mittariston virrat eivät mene päälle', 'Avainta ei tunnisteta', 'Auto sammuu tai ei käynnisty'],
    meta: ['Virtalukot 1 työpäivässä', 'Takuu 12 kk'],
    service: 'virtalukot',
    also: 'mittaristot',
  },
  {
    id: 'ratti',
    icon: 'steering',
    tone: 'amber',
    label: 'Ohjauspyörä lukossa',
    title: 'Ohjauspyörä on jäänyt lukkoon',
    text: 'Sähköinen rattilukko on osa käynnistyksenestoa. Korjaamme rattilukot – esimerkiksi Mercedes ESL/EZS ja Audi J518 – yhden työpäivän sisällä.',
    causes: ['Rattilukko ei aukea', 'Mittaristo ei herää', 'Auto ei käynnisty'],
    meta: ['1 työpäivä', 'Tarvitaan 1 toimiva avain'],
    service: 'virtalukot',
  },
  {
    id: 'avain',
    icon: 'key',
    tone: 'blue',
    label: 'Avain hukassa tai rikki',
    title: 'Avain on kadonnut, rikki tai tarvitset vara-avaimen',
    text: 'Vaihdamme rikkinäisen kuoren, kytkimen tai lähettimen ja teemme uudet avaimet kaikkiin merkkeihin – myös kun yhtään avainta ei ole jäljellä.',
    causes: ['Avaimen kuori haljennut', 'Kaukosäädin ei toimi', 'Kaikki avaimet kadonneet'],
    meta: ['Kytkin tai lähetin jopa 1 h', 'Uudelle avaimelle 1 v takuu'],
    service: 'avaimet',
  },
  {
    id: 'ohjausyksikko',
    icon: 'engine',
    tone: 'amber',
    label: 'Muu ohjausyksikkö',
    title: 'Moottori-, vaihteisto- tai muu ohjausyksikkö',
    text: 'Moottorin ohjausyksiköt ja niiden ohjelmointi, Haldex, xenon, VP44, automaattivaihteisto, Webasto/Eberspächer ja ilmastointipaneelit.',
    causes: ['Moottorinohjausyksikkö', 'Automaattivaihteiston ohjaus', 'Lämmittimet ja ilmastointipaneelit'],
    meta: ['Tyyppiviat 1–3 arkipäivää', 'Takuu 6–24 kk'],
    service: 'ohjausyksikot',
  },
]
