import './styles/style-global.css'
import './styles/style-main.css'
import Header from './comp/Header';
import ScrollTop from './comp/ScrollTop';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './screens/Home';
import Catalog from './screens/Catalog';

function App() {
  return (
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
          <Route exact path="/cart">
            {/* <Cart /> */}
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App;
