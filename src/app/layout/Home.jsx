import React, {useContext} from 'react';
import {firebaseAuth} from '../../providers/AuthProvider'

const Home = (props) => {

    const {handleSignout, verifyEmail, user} = useContext(firebaseAuth)

  return (
    <div className="container">
      <p>You can see this because you are logged in as "{user ? user.email : ""}"</p>
      <button onClick={handleSignout}>sign out </button>
      <br/>
      {user.emailVerified ? "email verified" : "please verify your email"}
      {user.emailVerified ? null : (<button onClick={verifyEmail}>verify </button>)}
      
    </div>
  );
};

export default Home;