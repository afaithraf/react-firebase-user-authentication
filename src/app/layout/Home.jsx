import React, {useContext} from 'react';
import {firebaseAuth} from '../../providers/AuthProvider'

const Home = (props) => {

    const {handleSignout, user} = useContext(firebaseAuth)

  return (
    <div className="container">
      <p>You can see this because you are logged in as "{user ? user.email : ""}"</p>
      <button onClick={handleSignout}>sign out </button>
    </div>
  );
};

export default Home;