import React, {useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom'

import {firebaseAuth} from '../providers/AuthProvider'

import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './layout/Home'

export default function App() {  
  
  const { token, setToken } = useContext(firebaseAuth);
  useEffect(() => {
    if(localStorage.token){
      setToken(localStorage.token);
    };
  });

  console.log(token)
    return (
        <>
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/' render={rProps => token === null ? <Signin /> : <Home />} />
          </Switch>
        </>
    )
}
