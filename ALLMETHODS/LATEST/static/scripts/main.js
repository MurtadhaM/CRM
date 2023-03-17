function populateNav() {
    let links = ['Dashboard', 'Clients', 'Documents', 'Settings'];
    $('.sidebar-link').each(function(index) {
        $(this).attr('href', links[index]);
        $(this).value = (links[index]);
    });

    $('.RowTitle').each(function(index) {
        $(this).text(links[index]);
    });


    for (var i = 0; i < $('.RowTitle').length; i++) {
        $('.RowTitle').eq(i).attr('id', links[i]);

    }
}
// LoadedDom 

$(document).on('DOMContentLoaded', function() {
    populateNav()
    $('#popup').hide();
    $('.addOrder').click(function() {
        $('#popup').show();
    });
    $('.close-btn').click(function() {
        $('#popup').hide();
    });


});

$(document).on('load', function() {



    //set up links
    populateNav();
    $('#popup').hide();

    //set up action listeners
    setupActionListeners();
    //check if user is logged in AXIOS
    axios.get('/auth/user').then((response) => {
        console.log(response.data);
        if (response.data.user) {
            console.log("user is signed in");
        } else {
            console.log("user is not signed in");
            window.location.href = "/";
        }
    }).catch((error) => {
        console.log(error);
    });

    $('.close-btn').click(function() {
            $('#popup').hide();
        }


    );

    $('.addOrder').click(function() {
        $('#popup').show();
    });



});


/**
 *  Populate the links in the navigation bar
 */


/** 
 * 
 * Setup Action Listeners
 * */
function setupActionListeners() {
    document.getElementById("Dashboard").addEventListener("click", logout);
}

/**
 * Logout the user
 * */
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}



/**
 * Toggle the popoup
 */


function togglePopup() {
    $('.popup').show();
}
$('.close-btn').click(function() {
    $('.popup').hide();
});



/**
 *  Change the Nav Bar based on the page
 */
function Check_Auth() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("user is signed in");

            // }
        } else {
            // No user is signed in.
            console.log("user is not signed in");
            window.location.href = "index.html";
        }
    });
}