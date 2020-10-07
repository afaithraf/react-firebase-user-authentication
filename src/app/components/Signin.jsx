import React, { useContext, useState } from 'react';
import { firebaseAuth } from '../../providers/AuthProvider'
import { withRouter } from 'react-router-dom'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css';

const Signin = (props) => {
  const { handleSignin, handleSocialLogin } = useContext(firebaseAuth);

  const [formState, setFormState] = useState('');
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('executing:', 'Signin>handleSubmit');
    setFormState('loading');
    await handleSignin(inputs.email, inputs.password).then((res) => {
      handleSuccess(res);
    }).catch((err) => {
      handleError(err);
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    console.log(inputs)
    setInputs(prev => ({ ...prev, [name]: value }))
  }
  const handleSuccess = (res) => {
    console.log('executing:', 'Signin>handleSuccess');
    console.log("Signin Success: ", res);
    setFormState('success');
    setTimeout(() => {
      props.history.push('/')
    }, 500);
  }
  const handleError = (err) => {
    console.log('executing:', 'Signin>handleError');
    setFormState('error');
    setError(err.message);
    console.log("Error:", err);
  }
  const handleFbLogin = async () => {
    await handleSocialLogin("facebook").then((res) => {
      handleSuccess(res);
    }).catch((err) => {
      handleError(err);
    })
  }
  const handleGGLogin = async () => {
    await handleSocialLogin("google").then((res) => {
      handleSuccess(res);
    }).catch((err) => {
      handleError(err);
    })
  }

  return (
    <div className="form">
      <h1>Login</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="email address" name="email" onChange={handleChange} value={inputs.email} required/>
        <input type="password" placeholder="password" name="password" onChange={handleChange} value={inputs.password} required/>
        {error !== null ? <p className="error-text">{error}</p> : null}
        <ProgressButton type="submit" state={formState} controlled={true}>
          Login
        </ProgressButton>
        <p className="message"><a href="/signup">Sign Up</a> |  <a href="resetpassword">Forgot password?</a></p>
      </form>
      <h4>Or</h4>
      <div className="social">
        <button className="facebook" onClick={handleFbLogin}>Continue with Facebook</button>
        <button className="google" onClick={handleGGLogin}>Continue with Google</button>
      </div>
    </div>
  );
}

export default withRouter(Signin);

