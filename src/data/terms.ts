/**
 * Warranty and delivery terms – in-tek.fi/takuuehdot + the 2019 service form PDF
 * (typos corrected, company form updated to Oy). Customer must confirm before production.
 */
export interface TermsSection {
  id: string
  title: string
  paragraphs: string[]
}

export const termsSections: TermsSection[] = [
  {
    id: 'takuu',
    title: 'Takuu',
    paragraphs: [
      'in-TEK Oy myöntää kaikille korjauspalveluille takuun. Takuuaika on 6–24 kuukautta tuotteesta riippuen.',
      'Mikäli laite tai yksikkö ei korjauksen jälkeen tule kuntoon, palautamme asiakkaalle korjaushinnan tilille, mutta veloitamme 40 euron tarkistusmaksun. Takuun todentamiseksi on säilytettävä kuitti.',
      'in-TEKin vastuu rajoittuu korjauksen tai palvelun hintaan. in-TEK Oy ei vastaa korjausyrityksen mahdollisesti aiheuttamista muista kuluista. Takuu ei kata osan irrotuksen ja asennuksen kuluja asiakkaalla tai kolmannella osapuolella.',
      'in-TEK Oy:n työtakuu ei kata asiakkaan tai kolmansien osapuolten aiheuttamia asennusvirheitä, väärinkäyttöä tai muita virheitä tai vaurioita. Työtakuu raukeaa, jos laite tai ohjausyksikkö on korjauksen jälkeen avattu tai rikottu asiakkaan tai ulkopuolisen toimesta.',
      'Ohjelmiston korjaukset eivät kuulu takuun piiriin. Airbag-ohjausyksikön crash data -resetointi ei kuulu takuun piiriin.',
    ],
  },
  {
    id: 'korjausaika',
    title: 'Korjausaika ja toimitus',
    paragraphs: [
      'Korjaamme laitteet ja yksiköt (tyyppiviat) 1–3 arkipäivässä. Muissa tapauksissa korjausaika riippuu varaosien saatavuudesta. Viivästystilanteessa asiakkaalle ilmoitetaan korjausaikataulusta.',
      'Korjauksen jälkeen laite tai yksikkö lähetetään takaisin asiakkaalle seuraavana päivänä.',
    ],
  },
  {
    id: 'sailytys',
    title: 'Säilyttäminen',
    paragraphs: [
      'Korjattavaksi toimitettua laitetta tai tuotetta säilytetään enintään 6 kuukautta. Mikäli laite tai tuote jää noutamatta 6 kuukauden jälkeen, se kierrätetään.',
    ],
  },
]

/** Service-specific warranty periods stated on the service pages. */
export const serviceWarranties = [
  { label: 'Mittaristot', value: '6–24 kk' },
  { label: 'ABS-ohjausyksiköt', value: '6–12 kk' },
  { label: 'Virta- ja rattilukot', value: '12 kk' },
  { label: 'Uudet autonavaimet', value: '1 vuosi' },
  { label: 'Muut korjauspalvelut', value: '6–24 kk' },
]
