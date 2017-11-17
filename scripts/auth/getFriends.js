// getFriends - Chris Miller
//Given an ative user - return an Array of the friends userIds

let getActiveUser = require("./getActiveUser")
// const getDatabase = require("../database")

const getFriends = function (db) {
    const activeUserId = getActiveUser().userId

    // const db = getDatabase()
    const friendTable = db.friends
    let friendslist = []
    friendTable.forEach( obj => {
        if (obj.userId === activeUserId) {
            friendslist.push(obj.friendId)
        } else if (obj.friendId === activeUserId) {
            friendslist.push(obj.userId)}
    })  
    return friendslist
}

module.exports = getFriends