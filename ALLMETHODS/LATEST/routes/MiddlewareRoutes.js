import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import authController from '../controllers/authController.js';
import { firebaseAuth } from '../controllers/middlewareController.js';
import {
    hasAdminRole,
    decodeFirebaseIdToken,
    isAuthorized
    ,
    UserController
  } from '../middleware/authMiddleware.js';

  const UserRoute = (router) => {
    // Get all users
    router.route('/users')
      .get(
        decodeFirebaseIdToken,
        isAuthorized,
        hasAdminRole,
        UserController.getAllUsers,
        // Create idToken 
        // Verify idToken
        // Get all users
        authController.login
        
      )
      
  }


  
  export default UserRoute;
  