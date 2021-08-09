import './styles/style-global.css'
import Header from './comp/Header';
import ScrollTop from './comp/ScrollTop';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <main id="main">
        <Switch>
          <Route exact path="/">
            {/* <Home /> */}
          </Route>
          <Route exact path="/about">
            {/* <About /> */}
          </Route>
          <Route exact path="/catalog">
            {/* <Catalog /> */}
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App;
