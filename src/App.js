import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import './App.css';


import firebase from './firebase';
import ButtonAppBar from './AppBar';
import Login from './Login'


const App = () => {
      return (
      <div className="App">
        <>
          <ButtonAppBar />
          {/* <Switch> */}
          <Route path='/' exact />
          {/* <Route path='/login' exact render={(props => <div>login</div>)} /> */}
          <Route path='/login'  component={Login} />
          {/* </Switch> */}
        </>
      </div>
    );
}


export default App;
