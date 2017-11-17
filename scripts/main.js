//const getDatabase = require("./database")
const appInit = require("./auth/appInit")
const dbEventHandler = require("./dbEvent") // necessary to add the event listeners


// Commented out with refactor to use ajax to call database from json file and not local storage
// if(!getDatabase()){
//     const populateDB = require("./factories/populate_database")
//     populateDB()
// }

appInit();



