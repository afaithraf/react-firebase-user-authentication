import React, {useContext} from 'react';
import {firebaseAuth} from '../../providers/AuthProvider'
import {withRouter} from 'react-router-dom'

const Signin = (props) => {
  const {handleSignin, inputs, setInputs, errors} = useContext(firebaseAuth);
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    await handleSignin();
    props.history.push('/')
  }
  const handleChange = e => {
    const {name, value} = e.target
    console.log(inputs)
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (
    <div className="form">
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="email address" name="email" onChange={handleChange} value={inputs.email} />
        <input type="password" placeholder="password" name="password" onChange={handleChange} value={inputs.password} />
        {errors.length > 0 ? <p className="error">{errors[errors.length - 1]}</p> : null}
        <button>login</button>
        <p className="message">Not registered? <a href="/signup">Create an account</a></p>
      </form>
    </div>
  );
  
};

export default withRouter(Signin);
