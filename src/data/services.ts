/**
 * Services – content based on the original in-tek.fi pages (S1–S8 in
 * docs/CONTENT_SOURCES.md). Do not add claims that are not verified there.
 */
import type { PhotoId } from './photos'

export type TelltaleId = 'abs' | 'airbag' | 'cluster' | 'immobilizer' | 'steering' | 'key' | 'engine'

export type ServiceId = 'mittaristot' | 'abs' | 'airbag' | 'virtalukot' | 'ohjausyksikot' | 'avaimet'

export interface Fact {
  label: string
  value: string
  note?: string
}

export interface QA {
  q: string
  a: string
}

export interface Service {
  id: ServiceId
  slug: string
  name: string
  /** Short label for chips, selects and navigation. */
  short: string
  icon: TelltaleId
  title: string
  summary: string
  lead: string
  facts: Fact[]
  listTitle: string
  list: string[]
  chipsTitle?: string
  chips?: string[]
  /** Optional extra paragraph block. */
  note?: { title: string; text: string }
  needs: string[]
  faq: QA[]
  photo?: { id: PhotoId; caption: string }
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'mittaristot',
    slug: 'mittaristot',
    name: 'Mittariston korjaus',
    short: 'Mittaristo',
    icon: 'cluster',
    title: 'Mittariston korjaus – kaikki automerkit ja myös muut ajoneuvot',
    summary: 'Heittelevät mittarit, pikselivikainen näyttö, käynnistyksenesto- ja CAN-väylän viat.',
    lead:
      'Kun nopeusmittari jää nollaan, polttoainemittari heittelee tai näytöstä puuttuu pikseleitä, vika on usein mittariston elektroniikassa. Korjaamme auton mittaristot merkistä ja viasta riippumatta – ja samalla osaamisella myös mopoautojen, veneiden, raskaan kaluston, moottorikelkkojen ja moottoripyörien mittaristot.',
    facts: [
      { label: 'Korjausaika', value: '1–3 arkipäivää', note: 'Tyyppiviat. Muissa tapauksissa aika riippuu varaosien saatavuudesta.' },
      { label: 'Takuu', value: '6–24 kk', note: 'Sisältyy kaikkiin mittaristojen korjauksiin.' },
      { label: 'Valmistajat', value: 'Kaikki', note: 'Mm. Magneti Marelli, Johnson Controls, Siemens VDO, Jaeger.' },
    ],
    listTitle: 'Tyypilliset viat, jotka korjaamme',
    list: [
      'Kierrosluku-, nopeus-, lämpö- tai polttoainemittari toimii vain satunnaisesti',
      'Mittariston näytössä on pikselivikaa',
      'Käynnistyksenestovika – auto sammuu tai ei käynnisty',
      'CAN-väylän viat',
    ],
    chipsTitle: 'Korjaamme mittaristot myös näihin',
    chips: ['Henkilöautot', 'Mopoautot', 'Veneet', 'Raskas kalusto', 'Moottorikelkat', 'Moottoripyörät'],
    needs: ['Ajoneuvon merkki, malli ja rekisteritunnus', 'Vian kuvaus, oireet ja mahdolliset vikakoodit', 'Mittaristo – tuotuna tai postitse lähetettynä'],
    faq: [
      {
        q: 'Korjaatteko myös muiden kuin henkilöautojen mittaristoja?',
        a: 'Kyllä. Autojen lisäksi korjaamme mopoautojen, veneiden, raskaan kaluston, moottorikelkkojen ja moottoripyörien mittaristoja.',
      },
      {
        q: 'Voinko lähettää mittariston postitse?',
        a: 'Voit. Ota ensin yhteyttä puhelimitse tai sähköpostilla, täytä huoltolähete ja lähetä mittaristo Matkahuollon tai Postin kautta. Korjattu mittaristo lähetetään takaisin korjausta seuraavana päivänä.',
      },
      {
        q: 'Kuinka pitkä takuu mittariston korjauksella on?',
        a: 'Kaikkiin mittaristojen korjauksiin sisältyy 6–24 kuukauden takuu. Ohjelmiston korjaukset eivät kuulu takuun piiriin.',
      },
    ],
    seo: {
      title: 'Mittariston korjaus Joensuussa ja postitse | in-TEK',
      description:
        'Auton mittariston korjaus kaikkiin merkkeihin: heittelevät mittarit, pikseliviat, käynnistyksenesto- ja CAN-väylän viat. Myös mopoautot, veneet ja kelkat. Takuu 6–24 kk.',
    },
  },
  {
    id: 'abs',
    slug: 'abs-yksikot',
    name: 'ABS-yksikön korjaus',
    short: 'ABS-yksikkö',
    icon: 'abs',
    title: 'ABS-ohjausyksikön korjaus – kun ABS-valo jää palamaan',
    summary: 'Bosch, ATE ja muut valmistajat. Korjaus yleensä noin kahdessa arkipäivässä.',
    lead:
      'ABS-merkkivalo kertoo, että luistonestojärjestelmä on havainnut vian. Kun syy on ohjausyksikössä, korjaamme sen – eri valmistajien yksiköt, kuten Bosch ja ATE. Luistonestoyksikön korjaukseen kuluu yleensä vain noin kaksi arkipäivää.',
    facts: [
      { label: 'Korjausaika', value: '~2 arkipäivää', note: 'Yleensä. Jos osaa ei ole varastossa, olemme yhteydessä.' },
      { label: 'Takuu', value: '6–12 kk', note: 'ABS-ohjausyksikön korjaukselle.' },
      { label: 'Valmistajat', value: 'Bosch, ATE ym.', note: 'Eri valmistajien ABS-ohjausyksiköt.' },
    ],
    listTitle: 'Vikoja, joihin korjaus auttaa',
    list: [
      'Ei diagnostiikkayhteyttä – vikakoodeja ei pääse lukemaan',
      'Nopeusanturien viat',
      'ABS-pumpun ohjausvika',
      'Paineanturivika',
    ],
    needs: ['Auton merkki, malli ja rekisteritunnus', 'Vikakoodit ja oireet, jos tiedossa', 'ABS-ohjausyksikkö – tuotuna tai postitse lähetettynä'],
    faq: [
      {
        q: 'Pitääkö koko ABS-yksikkö vaihtaa uuteen?',
        a: 'Ei aina. Kun vika on ohjausyksikön elektroniikassa, korjaamme ohjausyksikön. Kerro auton merkki, malli ja vikakoodit, niin katsotaan, sopiiko korjaus sinun vikaasi.',
      },
      {
        q: 'Kuinka kauan ABS-yksikön korjaus kestää?',
        a: 'Luistonestoyksikön korjaukseen kuluu yleensä noin kaksi arkipäivää. Jos tarvittavaa osaa ei löydy varastostamme, olemme sinuun yhteydessä.',
      },
      {
        q: 'Mikä takuu ABS-korjauksella on?',
        a: 'Annamme ABS-ohjausyksikön korjaukselle 6–12 kuukauden takuun. Tarkemmat ehdot löydät takuuehdoista.',
      },
    ],
    seo: {
      title: 'ABS-ohjausyksikön korjaus Joensuussa ja postitse | in-TEK',
      description:
        'ABS-valo palaa? Korjaamme eri valmistajien ABS-ohjausyksiköt (mm. Bosch, ATE) yleensä noin kahdessa arkipäivässä. Takuu 6–12 kk. Tuo Joensuuhun tai lähetä postitse.',
    },
  },
  {
    id: 'airbag',
    slug: 'airbag-yksikot',
    name: 'Airbag-yksikön korjaus',
    short: 'Airbag-yksikkö',
    icon: 'airbag',
    title: 'Airbag-yksikön korjaus – kun turvatyynyvalo ei sammu',
    summary: 'Crash data -lukitus ja vikakoodit, joita tavallinen testeri ei poista. Yleensä noin kaksi tuntia.',
    lead:
      'Palava airbag-merkkivalo tarkoittaa, että turvatyynyjärjestelmä on havainnut vian. Jos ohjausyksikkö on lukittunut – esimerkiksi tallennetun törmäystiedon (Crash Data) vuoksi – vikakoodia ei voi poistaa tavallisella diagnostiikkatesterillä. Korjaamme turvatyynyjen ohjausyksiköt valmistajasta riippumatta.',
    facts: [
      { label: 'Korjausaika', value: '~2 tuntia', note: 'Airbag-yksikön korjaus yleensä.' },
      { label: 'Takuu', value: '6–24 kk', note: 'Korjauspalveluille. Crash data -resetointi ei kuulu takuuseen.' },
      { label: 'Valmistajat', value: 'Kaikki', note: 'Turvatyyny-yksiköt valmistajasta riippumatta.' },
    ],
    listTitle: 'Tyypillisiä syitä airbag-valon syttymiseen',
    list: [
      'Johtosarjan katkos – esimerkiksi penkin alla tai ohjauspyörän spiraalissa',
      'Akku- tai syöttöjännitevika',
      'Ohjausyksikön lukitus tai sisäinen vika (Crash Data)',
    ],
    chipsTitle: 'Esimerkkejä valmistajakohtaisista vikakoodeista',
    chips: ['Volvo CFFF', 'VAG 65535', 'Mazda B1231'],
    needs: ['Auton merkki, malli ja rekisteritunnus', 'Vikakoodi, jos tiedossa', 'Airbag-ohjausyksikkö – tuotuna tai postitse lähetettynä'],
    faq: [
      {
        q: 'Miksi vikakoodi ei poistu testerillä?',
        a: 'Kun ohjausyksikkö on lukittunut esimerkiksi tallennetun törmäystiedon vuoksi, vikakoodia ei voida poistaa tavallisella diagnostiikkatesterillä. Silloin ohjausyksikkö on korjattava.',
      },
      {
        q: 'Kuinka nopeasti airbag-yksikkö korjataan?',
        a: 'Airbag-yksikön korjaukseen kuluu yleensä noin kaksi tuntia.',
      },
      {
        q: 'Kuuluuko crash data -nollaus takuuseen?',
        a: 'Ei. Airbag-ohjausyksikön crash data -resetointi ei kuulu takuun piiriin. Muut korjauspalvelut kuuluvat takuuseen takuuehtojen mukaisesti.',
      },
    ],
    seo: {
      title: 'Airbag-yksikön korjaus Joensuu – palaako airbag-valo? | in-TEK',
      description:
        'Airbag-valo ei sammu? Korjaamme turvatyynyjen ohjausyksiköt valmistajasta riippumatta, myös crash data -lukitukset (esim. Volvo CFFF, VAG 65535, Mazda B1231). Yleensä noin 2 tunnissa.',
    },
  },
  {
    id: 'virtalukot',
    slug: 'virtalukot-ja-rattilukot',
    name: 'Virta- ja rattilukon korjaus',
    short: 'Virta-/rattilukko',
    icon: 'steering',
    title: 'Sähköisen virtalukon ja rattilukon korjaus yhden työpäivän sisällä',
    summary: 'Ohjaus lukossa, avainta ei tunnisteta tai auto ei käynnisty – esim. Mercedes ESL/EZS ja Audi J518.',
    lead:
      'Nykyautoissa sähköinen virtalukko ja rattilukko ovat osa käynnistyksenestoa. Kun lukko vikaantuu, auto ei välttämättä käynnisty lainkaan. Korjaamme virta- ja rattilukot yhden työpäivän sisällä ja annamme lukoille 12 kuukauden takuun.',
    facts: [
      { label: 'Korjausaika', value: '1 työpäivä', note: 'Virta- ja rattilukot korjataan yhden työpäivän sisällä.' },
      { label: 'Takuu', value: '12 kk', note: 'Korjatuille lukoille.' },
      { label: 'Tarvitsemme', value: '1 toimiva avain', note: 'Virtalukon korjaukseen tarvitaan yksi toimiva avain.' },
    ],
    listTitle: 'Tyypillisiä oireita',
    list: ['Mittariston virrat eivät mene päälle', 'Ohjauspyörä on lukossa', 'Avainta ei tunnisteta', 'Auto ei käynnisty'],
    chipsTitle: 'Esimerkkejä korjattavista lukoista',
    chips: ['Mercedes ESL', 'Mercedes EZS', 'Audi J518'],
    needs: ['Auton merkki, malli ja rekisteritunnus', 'Yksi toimiva avain', 'Virta- tai rattilukko – tai auto paikan päälle'],
    faq: [
      {
        q: 'Mitä tarvitsette virtalukon korjaukseen?',
        a: 'Virtalukon korjaamista varten tarvitsemme yhden toimivan avaimen. Jos kaikki avaimet ovat kadonneet, teemme myös uudet autonavaimet.',
      },
      {
        q: 'Kuinka kauan korjaus kestää?',
        a: 'Korjaamme virta- ja rattilukot yhden työpäivän sisällä.',
      },
      {
        q: 'Mikä takuu lukoille annetaan?',
        a: 'Annamme korjatuille virta- ja rattilukoille 12 kuukauden takuun.',
      },
    ],
    photo: { id: 'mercedes-avain-konsoli', caption: 'Avaintyö: Mercedes-Benz. Kuva in-TEKin asiakastyöstä.' },
    seo: {
      title: 'Sähköisen virtalukon ja rattilukon korjaus Joensuu | in-TEK',
      description:
        'Ohjaus lukossa tai auto ei käynnisty? Korjaamme sähköiset virta- ja rattilukot (esim. Mercedes ESL/EZS, Audi J518) yhden työpäivän sisällä. Takuu 12 kk.',
    },
  },
  {
    id: 'ohjausyksikot',
    slug: 'muu-auton-elektroniikan-korjaus',
    name: 'Ohjausyksiköt ja muu elektroniikka',
    short: 'Muu ohjausyksikkö',
    icon: 'engine',
    title: 'Moottorinohjaus, vaihteisto, Haldex ja muu auton elektroniikka',
    summary: 'Moottorin ohjausyksiköt ja ohjelmointi, Haldex, xenon, VP44, automaattivaihteisto, Webasto/Eberspächer.',
    lead:
      'Mittaristojen ja virtalukkojen lisäksi erikoisalaamme ovat moottorinohjausyksiköiden korjaukset. Korjaamme myös monia muita auton ohjausyksiköitä merkistä riippumatta. Meillä onnistuvat myös auton diagnostiikka, vianetsintä ja sähkövikojen korjaus.',
    facts: [
      { label: 'Korjausaika', value: '1–3 arkipäivää', note: 'Tyyppiviat. Muuten aika riippuu varaosien saatavuudesta.' },
      { label: 'Takuu', value: '6–24 kk', note: 'Tuotteesta riippuen. Ohjelmistokorjaukset eivät kuulu takuuseen.' },
      { label: 'Automerkit', value: 'Kaikki', note: 'Ohjausyksiköt merkistä riippumatta.' },
    ],
    listTitle: 'Korjattavia ohjausyksiköitä',
    list: [
      'Moottorin ohjauslaitteiden korjaus ja ohjelmointi',
      'Haldex-ohjausyksikkö',
      'Xenon-ohjausyksikkö',
      'PSG VP44 -ohjausyksikkö',
      'Automaattivaihteiston ohjausyksikkö',
      'Webasto- ja Eberspächer-lämmittimet',
      'Ilmastointipaneelit',
      'Muut auton ohjausyksiköt',
    ],
    note: {
      title: 'Diagnostiikka ja sähköviat',
      text: 'Kun vian syy ei ole selvä, aloitetaan vianetsinnästä. Teemme auton diagnostiikan, sähkövikojen korjauksia ja lisävarusteiden asennuksia toimipisteessämme Joensuussa.',
    },
    needs: ['Auton merkki, malli ja rekisteritunnus', 'Ohjausyksikön tiedot, vian oireet ja vikakoodit', 'Yksikkö – tuotuna tai postitse lähetettynä'],
    faq: [
      {
        q: 'Korjaatteko ohjausyksikköä, jota ei ole listalla?',
        a: 'Listalla ovat yleisimmät korjauskohteet. Korjaamme myös muita autojen ohjausyksiköitä – kerro yksikön tiedot ja vian oireet, niin kerromme, onnistuuko korjaus.',
      },
      {
        q: 'Kuuluuko ohjelmointi takuuseen?',
        a: 'Ohjelmiston korjaukset eivät kuulu takuun piiriin. Muille korjauspalveluille annamme 6–24 kuukauden takuun tuotteesta riippuen.',
      },
    ],
    photo: { id: 'audi-ohjelmointi', caption: 'Diagnostiikka- ja ohjelmointilaite kytkettynä asiakkaan autoon in-TEKin tiloissa.' },
    seo: {
      title: 'Auton ohjausyksiköiden ja elektroniikan korjaus Joensuu | in-TEK',
      description:
        'Moottorin ohjausyksiköiden korjaus ja ohjelmointi, Haldex-, xenon-, VP44- ja vaihteistoyksiköt, Webasto/Eberspächer ja ilmastointipaneelit. Myös diagnostiikka ja sähköviat.',
    },
  },
  {
    id: 'avaimet',
    slug: 'autonavaimet',
    name: 'Autonavaimet',
    short: 'Autonavain',
    icon: 'key',
    title: 'Autonavaimet Joensuussa – korjaus, vara-avain ja uusi avain kadonneen tilalle',
    summary: 'Rikkinäiset kuoret ja kaukosäätimet, vara-avaimet ja uudet avaimet kaikkiin merkkeihin.',
    lead:
      'Onko avaimen kuori haljennut, eikö kaukosäädin toimi tai ovatko kaikki avaimet kadonneet? Korjaamme, teemme ja ohjelmoimme autonavaimet merkistä riippumatta – myös silloin, kun yhtään avainta ei ole jäljellä.',
    facts: [
      { label: 'Kytkimen tai lähettimen vaihto', value: 'Jopa 1 h', note: 'Varastossa kattava valikoima avainten kuoria.' },
      { label: 'Takuu uudelle avaimelle', value: '1 vuosi', note: 'Teemme avaimet merkistä riippumatta.' },
      { label: 'Avaintyypit', value: 'Kaikki', note: 'Mekaaninen, Smart ja Keyless Go.' },
    ],
    listTitle: 'Avainpalvelut',
    list: [
      'Rikkinäisen avainkuoren vaihto',
      'Kaukosäätimen kytkimen tai lähettimen vaihto',
      'Vara-avaimen teettäminen ja ohjelmointi',
      'Uusi avain, kun kaikki avaimet ovat kadonneet',
      'Mercedes FBS2–FBS3 -avaimet autoihin, jotka ovat vanhempia kuin 06/2013',
    ],
    chipsTitle: 'Varastossa avaimia näihin merkkeihin',
    chips: [
      'Audi',
      'BMW',
      'Fiat',
      'Mazda',
      'Mercedes-Benz',
      'Mitsubishi',
      'Lexus / Toyota',
      'Kia / Hyundai',
      'Peugeot / Citroën',
      'Renault',
      'VW / SEAT / Škoda',
      'Volvo',
    ],
    needs: ['Auton merkki, malli ja vuosimalli', 'Ohjelmointia varten auto paikan päälle – tai käynnistyksenestoon liittyvä moottorinohjainlaite'],
    faq: [
      {
        q: 'Kaikki avaimet ovat kadonneet – onnistuuko uusi avain?',
        a: 'Onnistuu. Teemme uuden avaimen myös silloin, kun avaimet ovat hukassa. Avaimen ohjelmointia varten tarvitaan joko auto paikan päälle tai käynnistyksenestoon liittyvä moottorinohjainlaite.',
      },
      {
        q: 'Kauanko avaimen korjaus kestää?',
        a: 'Varastostamme löytyy kattava valikoima avainten kuoria, ja kytkimen tai lähettimen vaihto onnistuu jopa tunnin sisällä.',
      },
      {
        q: 'Teettekö avaimia Mercedes-Benziin?',
        a: 'Teemme uudet Mercedes FBS2–FBS3 -avaimet, kun auto on vanhempi kuin 06/2013.',
      },
      {
        q: 'Onko uudella avaimella takuu?',
        a: 'Kyllä. Uudelle avaimelle annamme vuoden takuun.',
      },
      {
        q: 'Pitääkö käynnistä sopia etukäteen?',
        a: 'Soita meille, niin sovitaan sopiva aika. Puhelimitse saat myös tietoa hinnoittelusta.',
      },
    ],
    seo: {
      title: 'Autonavaimet Joensuu – avaimen korjaus ja uusi avain | in-TEK',
      description:
        'Autonavaimen korjaus, vara-avain ja uusi avain kadonneen tilalle kaikkiin automerkkeihin. Kytkimen tai lähettimen vaihto jopa tunnin sisällä. Kuurnankatu 40, Joensuu.',
    },
  },
]

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
/** Electronics services (keys have their own page and feature). */
export const electronicsServices = services.filter((s) => s.id !== 'avaimet')
