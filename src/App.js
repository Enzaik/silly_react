import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';


import firebase from './firebase';
import ButtonAppBar from './AppBar';
import Login from './Login'


class App extends Component {

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("users").add({
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().born}`);
      });
    });
  }

  render() {
    return (
      <div className="App">
        <>
          <ButtonAppBar />
          {/* <Switch> */}
            <Route path='/' exact render={(props => <div>root</div>)} />
            {/* <Route path='/login' exact render={(props => <div>login</div>)} /> */}
            <Route path='/login' exact component={Login}/>
          {/* </Switch> */}
        </>
      </div>
    );
  }

}

export default App;
