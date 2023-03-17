$(document).on('DOMContentLoaded', function () {

    populateNav();
   
    


$(document).on('load', function () {
    $('#popup').hide();
    $('.addOrder').click(function() {
        $('#popup').show();
        }
    );
    
    $('.close-btn').click(function() {
        $('#popup').hide();
        }
    );

    $('.addOrder').click(function() {
        $('#popup').show();
        }
    );

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
            }
        );
        
    
    }
    );

});
