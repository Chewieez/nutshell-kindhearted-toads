//Get User Name - Chris Miller
//Given a user name - Query the database to find userName


const getUserId = function(userId, db) {
    const  userTable = db.users
    let user = userTable.find(x => x.id === userId)
    return user.userName
}

module.exports = getUserId