import React, {useContext} from 'react';
import {firebaseAuth} from '../../providers/AuthProvider'

const Home = (props) => {

    const {handleSignout} = useContext(firebaseAuth)

  return (
    <div>
      only if logged
      <button onClick={handleSignout}>sign out </button>
    </div>
  );
};

export default Home;