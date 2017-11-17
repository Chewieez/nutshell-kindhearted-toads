/**
 * Krys Mathis
 * Gets task data from the database for the user
 */
// const database = require("../database");
const getActiveUser = require("../auth/getActiveUser");

const getTasks = function(db) {
    const user = getActiveUser();
  
    let tasks = db.tasks || []
    let filteredTasks = tasks
        .filter(t=> t.userId === user.userId && !t.completed)
        .sort((f,s)=> f.id - s.id);

    return filteredTasks;
    
}

module.exports = getTasks;