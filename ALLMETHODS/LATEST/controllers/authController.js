import { auth } from '../config.js';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { firebaseAuth } from './middlewareController.js';
import { async } from '@firebase/util';
import session from 'express-session';

const logout = (req, res) => {
    // Firebase logout
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Signed out')
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
    // Session logout
    req.session.destroy();
    res.redirect('/');


};



const login = (req, next, res) => {
    let code = 400;
    let message = "login";

    try {

        const { email, password } = req.body;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log('User Logged In')
                code = 200;
                message = "success";
                req.session = user;
                req.session.authenticated = true;
                console.log(req.session);
                res.status(code).json({ message: message, user: user });
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

    console.log(code, message);




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


export default { login, signup, profile, reset, logout };