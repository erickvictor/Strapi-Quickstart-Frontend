import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
