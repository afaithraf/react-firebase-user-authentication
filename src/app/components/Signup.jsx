import React, { useContext, useState } from 'react';
import { firebaseAuth } from '../../providers/AuthProvider'
import { withRouter } from 'react-router-dom'

const Signup = (props) => {
  const { handleSignup, handleSocialLogin } = useContext(firebaseAuth);

  const [loading, setLoading] = useState(0);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('executing:', 'Signup>handleSubmit');
    setLoading(1);
    await handleSignup(inputs.email, inputs.password).then((res) => {
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
    console.log('executing:', 'Signup>handleSuccess');
    console.log("Signup Success: ", res);
    props.history.push('/')
  }
  const handleError = (err) => {
    console.log('executing:', 'Signup>handleError');
    setLoading(0);
    setError(err.message);
    console.log("Error:", err);
  }
  const handleFbLogin = async () => {
    await handleSocialLogin("facebook").then((res)=>{
      handleSuccess(res);
    }).catch((err) => {
      handleError(err);
    })
  }
  const handleGGLogin = async () => {
    await handleSocialLogin("google").then((res)=>{
      handleSuccess(res);
    }).catch((err) => {
      handleError(err);
    })
  }
  if (loading) {
    return (
      <div className="form">
        <h1>Loading</h1>
      </div>
    )
  } else {
    return (
      <div className="form">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="email address" name="email" onChange={handleChange} value={inputs.email} />
          <input type="password" placeholder="password" name="password" onChange={handleChange} value={inputs.password} />
          {error !== null ? <p className="error">{error}</p> : null}
          <button type="submit">Create</button>
          <p className="message">Already registered? <a href="/signin">Sign In</a></p>
        </form>
        <h4>Or</h4>
        <div className="social">
          <button className="facebook" onClick={handleFbLogin}>Continue with Facebook</button>
          <button className="google" onClick={handleGGLogin}>Continue with Google</button>
        </div>
      </div>
    );
  }
};

export default withRouter(Signup);

