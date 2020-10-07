import React, { useContext, useState } from 'react';
import { firebaseAuth } from '../../providers/AuthProvider'
import { withRouter } from 'react-router-dom'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css';

const ResetPassword = (props) => {
  const { sendPasswordReset } = useContext(firebaseAuth);

  const [formState, setFormState] = useState(0);
  const [inputs, setInputs] = useState({ email: '' });
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState("loading");
    await sendPasswordReset(inputs.email).then((res)=>{
      handleSuccess(res);
    }).catch(err=>{
      handleError(err);
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const handleSuccess = (res) => {
    setFormState("success");
  }

  const handleError = (err) => {
    setFormState("error");
    setError(err.message);
    console.log("Error:", err);
  }

  return (
    <div className="form">
      <h1>Reset Password</h1>
      <p>What's your email?</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="email address" name="email" onChange={handleChange} value={inputs.email} required />
        {error !== null ? <p className="error">{error}</p> : null}
        <ProgressButton type="submit" state={formState} controlled={false}>
          Send Reset Link
        </ProgressButton>
        <p className="message"><a href="/signin">Go back to login</a></p>
      </form>
    </div>
  );

};

export default withRouter(ResetPassword);

