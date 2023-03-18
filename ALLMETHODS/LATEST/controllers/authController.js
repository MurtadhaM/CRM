import { auth } from '../config.js';
import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import {}
from './../errors/index.js';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { firebaseAuth } from './middlewareController.js';
import { async } from '@firebase/util';
import session, { Cookie } from 'express-session';

const logout = (req, res) => {
    try {
        // Firebase logout

        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Signed out')
            res.status(200).end(JSON.stringify({ message: 'Signed out' }));


        }).catch((error) => {
            // An error happened.
            console.log(error)
            res.status(400).send(JSON.stringify({ message: error.message }));


        });


        res.status(302).end(JSON.stringify({ message: 'REDICRECT' }));

    } catch (e) {
        console.log(e);
        res.status(402).end(JSON.stringify({ message: e.message }));

    }



};



const loginWithToken = (req, res) => {
    try {

        console.log(req.session)
        res.end(JSON.stringify({ status: 'success' }));


    } catch (e) {
        console.log(e);
        res.status(402).end(JSON.stringify({ message: e.message }));


    }

};


const login = (req, res) => {
    let code = 400;
    let message = "login";
    let user;
    let token = null;
    try {

        const { email, password } = req.body;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log('User Logged In')
                code = 200;
                message = "success";


                req.session = userCredential.user;


                user = userCredential.user;
                console.log(userCredential.user)

                res.cookie('idToken', { maxAge: 60 * 60 * 24 * 5 * 1000, httpOnly: true, secure: true, idToken: userCredential.user.getIdToken() });
                res.status(200).send(JSON.stringify({ message: message, code: code, user: user, token: token }));
                userCredential.user.getIdToken().then((idToken) => {
                    console.log(idToken)





                }).catch((error) => {
                    // Handle error
                    console.log(error)
                });

            })
            .catch((error) => {
                code = error.code;
                message = error.message;
                console.log(error.code, error.message);
            });
    } catch (e) {
        code = e.code;
        message = e.message;
        console.log(e.code, e.message);
    }


};





const signup = async(req, res) => {
    let code = 400;
    let message = "start";

    try {
        const body = req.body
        console.log(body)
        const { email, password } = req.body;
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log('User Registered')
                code = 200;
                message = "success";



            })
            .catch((error) => {
                code = error.code;
                message = error.message;
                console.log(error.code, error.message);

            });
    } catch (e) {
        code = e.code;
        message = e.message;
    }

    console.log(code, message);
    res.status(code).json({ message: message, code: code });
};



const profile = (req, res) => {
    if (!req.session) {
        res.redirect("/login");
        return;
    }

    const user = req.session.user;
    console.log("user", user);
    console.log("profile");
    res.render("profile");
};



const reset = async(req, res) => {
    // Popup the password reset screen
    let code = 400;
    let message = "start";

    try {
        const email = req.body || req.query || req.params;
        const actionCodeSettings = {
            url: 'http://localhost:3000/reset',
            handleCodeInApp: false,
        };


        const result = await sendPasswordResetEmail(auth,
                email.email, actionCodeSettings)
            .then(function() {
                console.log("email sent");
                code = 200;
                message = "success";
            })
            .catch(function(error) {
                code = error.code;
                message = error.message;
                console.log({ message: message, code: code });
            });
    } catch (error) {
        code = error.code;
        message = error.message;
        console.log({ message: message, code: code });
    }

    res.status(code).json({ message: code });
};


export default { login, signup, profile, reset, logout, loginWithToken };