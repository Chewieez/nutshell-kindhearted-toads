// Author: Greg Lawrence
// Purpose: to retrieve database from local storage and return it.



function getDatabase (callbackFn) {

    $.ajax({
        "url": "/database/database.json",
        "method": "GET"
    }).then( function(database){

        callbackFn(database)

    }) // end of .then function
} // end of getDatabase function



module.exports = getDatabase;