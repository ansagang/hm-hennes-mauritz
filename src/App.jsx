import './styles/style-global.css'
import './styles/style-main.css'
import './styles/style-animation.css'
import './styles/style-adaptive.css'
import Header from './comp/Header';
import Footer from './comp/Footer';
import ScrollTop from './comp/ScrollTop';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './screens/Home';
import Catalog from './screens/Catalog';
import Cart from './screens/Cart';
import Product from './screens/Product';
import NotFound from './screens/NotFound';
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ScrollTop />
        <Header />
        <main id="main">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/catalog">
              <Catalog />
            </Route>
            <Route exact path="/catalog-product-:id">
              <Product />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;
