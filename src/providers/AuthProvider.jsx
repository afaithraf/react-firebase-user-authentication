import React, {useState} from 'react';
import {authMethods} from '../firebase/authMethods'

const AuthProvider = (props) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});

    const handleSignup = authMethods.signupWithEmail.bind([], setToken, setUser);
    const handleSignin = authMethods.signinWithEmail.bind([], setToken, setUser);
    const handleSignout = authMethods.signout.bind([], setToken, setUser);
    const handleSocialLogin = authMethods.signInWithProvider.bind([], setToken, setUser);


  
    return (
      <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        handleSignout,
        token,
        setToken,
        handleSocialLogin,
        user
      }}>
        {props.children}
  
      </firebaseAuth.Provider>
    );
};

export default AuthProvider;

export const firebaseAuth = React.createContext()



