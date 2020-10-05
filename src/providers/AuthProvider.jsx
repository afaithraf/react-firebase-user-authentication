import React, {useState} from 'react';
import {authMethods} from '../firebase/authMethods'

const AuthProvider = (props) => {

    const [inputs, setInputs] = useState({email: '', password: ''});
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);

    const handleSignup = () => {
        console.log('handleSignup')
        authMethods.signupWithEmail(inputs.email, inputs.password, setErrors, setToken);
        console.log(errors) 
    }

    const handleSignin = () => {
      console.log('handleSignin!!!!')
      authMethods.signinWithEmail(inputs.email, inputs.password, setErrors, setToken)
      console.log(errors, token)
    }

    const handleSignout = () => {
      authMethods.signout(setErrors, setToken)
    }
  
    return (
      <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        handleSignout,
        token,
        setToken,
        inputs,
        setInputs,
        errors,
      }}>
        {props.children}
  
      </firebaseAuth.Provider>
    );
};

export default AuthProvider;

export const firebaseAuth = React.createContext()



