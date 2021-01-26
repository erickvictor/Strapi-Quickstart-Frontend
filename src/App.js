import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Create from './pages/Create'
import Nav from './components/Nav'
import SinglePost from './pages/SinglePost'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create' exact component={Create} />
          <Route path='/:id' exact component={SinglePost} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
