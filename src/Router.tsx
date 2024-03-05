import { HashRouter, Route, Routes } from 'react-router-dom'

import PageHome from './page/PageHome'
import PageAbout from './page/PageAbout'
import PageCompany from './page/PageCompany'
import PageContact from './page/PageContact'
import PageProduct from './page/PageProduct'
import PageLogin from './page/PageLogin'
import PageAdmin from './page/PageAdmin'

import { PAGE_LABEL, PAGE_LIST } from './utils/CONSTANT'

import Navbar from './components/Navbar'
import Footer from './components/Footer'


const ROUTE_LIST = {
  [PAGE_LABEL.home]: <PageHome />,
  [PAGE_LABEL.company]: <PageCompany />,
  [PAGE_LABEL.contact]: <PageContact />,
  [PAGE_LABEL.about]: <PageAbout />,
  [PAGE_LABEL.product]: <PageProduct />,
  [PAGE_LABEL.login]: <PageLogin />,
  [PAGE_LABEL.admin]: <PageAdmin />,
}

const Router = () => {

  return (<>
    <HashRouter>
      <Navbar />
      <Routes>
        {PAGE_LIST.map((item) => {
          return <Route key={item.label} path={item.url} element={ROUTE_LIST[item.label]} />
        })}
      </Routes>
      <Footer />
    </HashRouter > :
  </>)
}

export default Router