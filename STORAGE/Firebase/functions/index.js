const functions = require("firebase-functions");

const config = require("./util/config");
const app = require("express")();
const admin = require("firebase-admin");
const { db } = require("./util/admin");
const cors = require("cors");

const $ = require("jquery");
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const firebase = require("firebase/app");
const auth = require("firebase/auth");
const firebaseConfig = require("./util/config");
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails
} = require('./util/validators');





const {
    getAllScreams,
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream
} = require("./handlers/screams");


const {
    signup,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead
} = require("./handlers/users");


app.get("/screams", getAllScreams);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const fileHandler = require("./handlers/fileHandler");
const { onRequest } = require("firebase-functions/v2/https");
const { Auth, getAuth } = require("firebase-admin/auth");



app.get('/Documents',   (req, res) => fileHandler.getAllFiles(req, res));
app.post('/login',  login);
app.post('/signup', signup);
app.get('/user/:handle', getUserDetails);
app.get('/user', getAuthenticatedUser);
app.post('/user/image', uploadImage);
app.post('/user', addUserDetails);
app.post('/notifications', markNotificationsRead);
 


exports.api = functions.https.onRequest(app);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
}
);


