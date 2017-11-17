// Author: Sean Williams
//Purpose: Find user and set session storage with needed info


const { validateUser, validateNewUser } = require("./loginValidation")



const login = function (userName, email, DB) {
    
    const user = validateUser(userName, email, DB.users)

    if (user) {
        const storedUserInfo = JSON.stringify({ "userId": user.id, "userName": user.userName, "isEditing": false })
        sessionStorage.setItem("userInfo", storedUserInfo)
        return true
    }
    else {
        return false
    }
    
}

module.exports = login