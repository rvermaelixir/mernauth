import './App.css';
import store from './store'
import { Provider } from 'react-redux'
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import setAuthToken from './helpers';
import {BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import {authRoutes, customerRoutes} from './components/routing';
setAuthToken(localStorage.token)

const App = ({auth}) => {
  useEffect(()=> {
    return () => store.dispatch(loadUser(auth))
  }, [])

  return(
    <Provider store={store}>
      <div className='page'>
      <Router>
        <div className="container">
            <Navbar />
            <Routes>
              {customerRoutes}
              {authRoutes}
            </Routes>
          </div>
      </Router>
      </div>
    </Provider>
  )
}

export default App;
