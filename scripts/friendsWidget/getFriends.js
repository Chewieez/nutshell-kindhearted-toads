/**
 * Krys Mathis
 * Gets friends data from the database for the user
 * Returns: userid, username and email, friendshipId
 */
const getActiveUser = require("../auth/getActiveUser");

const getFriends = function(db) {
    const user = getActiveUser();
    let filteredUsers = [];
    
    try {
        // let db = database();
        let friends = db.friends;
        let filteredFriends = friends
            .filter(t=> t.userId === user.userId);

        // now you have filteredFriends;
        let users = db.users;
        let individualUser = {};
        filteredFriends.forEach(f=> {
            individualUser = users.find(u=> u.id === f.friendId);
            filteredUsers.push({
                "friendshipId": f.id,
                "userName": individualUser.userName,
                "userId": individualUser.id,
                "email": individualUser.email
            }); 
        });
    } catch (err) {
        console.warn(err);
    }
    return filteredUsers;
}

module.exports = getFriends;