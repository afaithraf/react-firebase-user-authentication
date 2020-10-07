import React, {useContext, useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import {firebaseAuth} from '../providers/AuthProvider'

import Signup from './components/Signup'
import Signin from './components/Signin'
import ResetPassword from './components/ResetPassword'
import Home from './layout/Home'

export default function App() {  
  
  const { token, setToken, user, getCurrentUser } = useContext(firebaseAuth);
  useEffect(() => {
    if(localStorage.token){
      setToken(localStorage.token);
    };
    getCurrentUser();
  });

    return (
        <>
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <PrivateRoute authed={!(token === null)} path='/' component={Home} />
          </Switch>
        </>
    )
}


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
    />
  )
}