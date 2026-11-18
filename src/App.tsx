import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { ServicePage } from './pages/ServicePage'
import { Keys } from './pages/Keys'
import { MailIn } from './pages/MailIn'
import { Warranty } from './pages/Warranty'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { electronicsServices } from './data/services'

/** Original in-tek.fi URL slugs are preserved so production needs no redirects. */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="palvelut" element={<Services />} />
        {electronicsServices.map((s) => (
          <Route key={s.id} path={s.slug} element={<ServicePage id={s.id} />} />
        ))}
        <Route path="autonavaimet" element={<Keys />} />
        <Route path="postikorjaus" element={<MailIn />} />
        <Route path="takuuehdot" element={<Warranty />} />
        <Route path="yhteystiedot" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
