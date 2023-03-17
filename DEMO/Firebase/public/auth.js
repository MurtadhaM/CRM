firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        document.getElementById("status").innerHTML = "Status: Logged in";
        document.getElementById("user").innerHTML = "User: " + user.displayName;
        document.getElementById("email").innerHTML = "Email: " + user.email;
        document.getElementById("photo").src = user.photoURL || "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";
    } else {
        // No user is signed in.
        document.getElementById("status").innerHTML = "Status: Logged out";
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