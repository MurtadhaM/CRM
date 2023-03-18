import { async } from "@firebase/util";
import admin from "firebase-admin";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
async function saveImageMessage(file) {
    try {


    } catch (e) {
        console.log(e);
    }
}


/**
 *   1 - We add a message with a loading icon that will get updated with the shared image.
 */



const updateProfile = async(req, res) => {
    let code = 400;
    let message = "start";

    try {
        const { displayName, photoURL } = req.body;
        console.log(displayName, photoURL);
        await updateProfile(getAuth().currentUser, {
            displayName: displayName,
            photoURL: photoURL
        }).then(() => {
            // Update successful
            console.log('Update successful');
            code = 200;
            message = "success";
        }).catch((error) => {
            // An error occurred
            console.log(error);
            code = 400;
            message = error.message;
        });
    } catch (e) {
        code = e.code;
        message = e.message;
        console.log(e);
    }

    console.log(code, message);
    res.status(code).json({ message: message, code: code });
}





const home = async(req, res) => {
    console.log("dashboard");

    // Check if user is logged in
    if (!req.session) {
        console.log("No session");
        res.redirect('/');
    } else {
        console.log("Session");
        console.log(req.session);
        res.render('dashboard', { user: req.session });
    }
}

const Upload = (req, res) => {
    // check if file is present
    let code = 400;
    let message = "Upload FILE";

    try {
        if (!req.file) {
            console.log("No file received");
            res.send({ "code": 401, "message": "No file received" });
        } else {
            console.log(`file received: ${req.file.name}`);
            console.log(req.file);
            console.log("uploading.....");
            saveImageMessage(req.file);
            console.log("uploaded");

            res.send({ "code": 200, "message": "File uploaded successfully" });
        }


    } catch (e) {
        code = e.code;
        message = e.message;
        console.log(e);
        res.send({ "code": code, "message": message });

    }

    console.log(code, message);
    res.status(code).json({ message: message, code: code });
}




export { home, saveImageMessage, Upload, updateProfile }
export default { home, saveImageMessage, Upload, updateProfile }