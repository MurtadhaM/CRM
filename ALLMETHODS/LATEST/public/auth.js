        // FirebaseUI config.
        var uiConfig = {
            // Url to redirect to after a successful sign-in.
            'signInSuccessUrl': '/',
            'callbacks': {
                'signInSuccess': function(user, credential, redirectUrl) {
                    if (window.opener) {
                        // The widget has been opened in a popup, so close the window
                        // and return false to not redirect the opener.
                        window.close();
                        return false;
                    } else {
                        // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
                        return true;
                    }
                }
            },
            'signInOptions': [{
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: getEmailSignInMethod(),
                disableSignUp: {
                    status: getDisableSignUpStatus()
                }
            }, {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    size: getRecaptchaMode()
                }
            }, ],
            // Terms of service url.
            'tosUrl': 'https://www.google.com',
            'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
                firebaseui.auth.CredentialHelper.GOOGLE_YOLO : firebaseui.auth.CredentialHelper.NONE,
            'adminRestrictedOperation': {
                status: getAdminRestrictedOperationStatus()
            }
        };



        const initApp = function() {
            // Initialize the FirebaseUI Widget using Firebase.
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            // The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
            // within the element corresponding to the selector specified.
            ui.start('#firebaseui-auth-container', uiConfig);
        };


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("User is signed in.");

            } else {
                console.log("No user is signed in.");

            }
        });



        function getCurrentUser() {

            var user = firebase.auth().currentUser;

            if (user) {
                // User is signed in.
                console.log("User is signed in.");
            } else {
                // No user is signed in.
                console.log("No user is signed in.");
            }

            console.log(user.multiFactor.user.accessToken);


        }
        const authCheck = () => {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    console.log("User is signed in")
                    console.log(user.multiFactor.user)
                } else {
                    // No user is signed in.
                    console.log("User is not signed in")

                }
            });
        }