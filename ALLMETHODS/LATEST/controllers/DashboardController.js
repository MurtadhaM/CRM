
import { async } from "@firebase/util";
import admin  from "firebase-admin";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
async function saveImageMessage(file) {
    try {
      
      // 1 - We add a message with a loading icon that will get updated with the shared image.
      const messageRef = await addDoc(collection(getFirestore(), 'messages'), {
        name: getUserName(),
        imageUrl: LOADING_IMAGE_URL,
        profilePicUrl: getProfilePicUrl(),
        timestamp: serverTimestamp()
      });

    } catch (error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    }  
      // 2 - Upload the image to Cloud Storage.
      const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${file.name}`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);
      
      // 3 - Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef).catch((error) => {
        console.error('There was an error getting a download URL for the file:', error);
      })

      /**
       * MISC - You can also access the file’s metadata.
       */
 
      // The file’s Storage URI.
      const path = fileSnapshot.metadata.fullPath;
      // The file’s size in bytes.
      const size = fileSnapshot.metadata.size;
      // The file’s content type.
      const contentType = fileSnapshot.metadata.contentType;


      await crea

      // 4 - Update the chat message placeholder with the image’s URL.
      await updateDoc(messageRef,{
        imageUrl: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath
      });
    };


    /**
     *   1 - We add a message with a loading icon that will get updated with the shared image.
     */

    
  
    const updateProfile = async (req, res) => {
      let code = 400;
      let message = "start";

      try{
        const {displayName, photoURL} = req.body;
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
      } catch(e) {
        code = e.code;
        message = e.message;
        console.log(e);
        }

        console.log(code, message);
        res.status(code).json({message: message, code: code});
    }

    

   

  const home =async (req, res) => { 
    console.log("dashboard");

    // Check if user is logged in
    if (!req.session) {
      console.log("No session");
      res.redirect('/');
    } else {
      console.log("Session");
      console.log(req.session);
      res.render('dashboard', {user: req.session});
    }
  }
  
  const Upload =async (req, res) => {
    // check if file is present
    let code = 400;
    let message = "start";

    try{
    if (!req.file) {
      console.log("No file received");
      return res.send({"code": 401, "message": "No file received"});
    } else {
      console.log(`file received: ${req.file.name}`);
      console.log(req.file);  
      console.log("uploading.....");
  await    saveImageMessage(req.file);
      console.log("uploaded");
    }
 

  } catch(e) {
    code = e.code;
    message = e.message;
    console.log(e);
    }
    
    console.log(code, message);
    res.status(code).json({message: message, code: code});
  }



  
export { home, saveImageMessage, Upload, updateProfile}
export default { home, saveImageMessage, Upload, updateProfile }