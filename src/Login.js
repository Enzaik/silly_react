import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    root: {
        '& .MuiTextField-root': {
            width: 200,
        },
    },
});

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const name = user.displayName;
            const email = user.email;
            const pphotoUrl = user.photoURL;
            const eemailVerified = user.emailVerified;
            const uuid = user.uid;
           // console.log('user added', name, email, pphotoUrl, eemailVerified, uuid);


        } else {
          //  console.log('no user');
        }
    });


const login = e => {
    firebase.auth().signInWithRedirect(provider).then(function (result) {
       // console.log('login');

        // This gives you a Google Access Token. You can use it to access the Google API.
        //  var token = result.credential.accessToken;
        // The signed-in user info.
        //  var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        //   var errorCode = error.code;
        //  var errorMessage = error.message;
        // The email of the user's account used.
        //  var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
    });
}



export default function SimpleCard() {
    const classes = useStyles();
    //  const bull = <span className={classes.bullet}>•</span>;
    const signOut = () => {
        firebase.auth().signOut().then(function () {
          //  console.log('signout')
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (

        <Container maxWidth="sm">
            <form className={classes.root} noValidate autoComplete="off">
                <Button variant="contained" color="primary" onClick={login}>
                    Login
                </Button>

                <Button variant="contained" color="primary" onClick={signOut}>
                    Logout
                </Button>
            </form>
        </Container>

    );
}