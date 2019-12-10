import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import './App.css';


import firebase from './firebase';
import ButtonAppBar from './AppBar';
import Login from './Login'


const App = () => {


  // useEffect(() => {
  //   console.log('effect');

  // })

  const [usr, setUsr] = useState(false)

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const name = user.displayName;
      const email = user.email;
      const pphotoUrl = user.photoURL;
      const eemailVerified = user.emailVerified;
      const uuid = user.uid;
      setUsr(user)
      console.log('user app', usr);
    } else {
      setUsr(false)
      console.log('user app', usr);
    }
  });
  let redir = !usr ? <Redirect to="/login" /> : <Redirect to="/" />

  return (
    <div className="App">
      {redir}
      <ButtonAppBar />
      {/* <Switch> */}
      <Route path='/' exact />
      {/* <Route path='/login' exact render={(props => <div>login</div>)} /> */}
      <Route path='/login' component={Login} />
      {/* </Switch> */}

    </div>
  );
}


export default App;
