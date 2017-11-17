// Author: Greg Lawrence
// This module populates chatWidget with current message data from database

const getDatabase = require("../database")
const autoScroll = require("../autoScroll")
const validate = require("./validate")


// function to check if the message that is passed in is a private message
const isPrivate = function (msg) {
    // check if the message object includes a recepient (rcp) key
    if (msg.rcp) {
        return true
    } else {
        return false
    }
}


const fillChats = function () {
    let workingThis = this;
    // get the freshest database
    // const DB = getDatabase()
    getDatabase(function(database) { 
        // store the database in a variable
        const DB = database

        // create a string to post to Dom for each chat message
        let chatMsgDomString = ""
    
        // get access to userName attached to the userId to display next to each message
        // iterate through messages array and look at each message
        DB.messages.forEach(msg => {
            // match up the userId attached to each message with a userId from user Table to get the username of the author of the message
            const messageAuthor = DB.users.find(user => {
                return msg.userId === user.id
            })
            // take the time stamp of the chat message and format so the user can read it
            let readableTimeStamp = new Date(msg.timeStamp).toLocaleString()
    
            // check if the message is a private message
            if (isPrivate(msg)) {
                
                // check if the username the user is using to send a private message is a valid username, meaning it exists in the database. 
                validate(msg, DB.users)
                
                // check if the author of the message is the current Active user OR the recipient of the message is the current Active user
                if (messageAuthor.id === workingThis.user.userId || msg.rcp.toLowerCase() === workingThis.user.userName.toLowerCase()) {
                    // populate chat msg container dom string with data from each chat message
                    chatMsgDomString += `
                    <p class="chatWidget__msgTimeStamp">${readableTimeStamp}</p><p class="chatWidget__msg isPrivate" data-msg-id="${msg.id}"><span class="chatWidget__author" data-author-id="${messageAuthor.id}" data-author="${messageAuthor.userName}">${messageAuthor.userName}:</span><span class="chatWidget__content" data-msg-id="${msg.id}"> ${msg.content}</span>
                    `
                }
            } else {
                // populate chat msg container dom string with data from each chat message
                chatMsgDomString += `
                <p class="chatWidget__msgTimeStamp">${readableTimeStamp}</p><p class="chatWidget__msg" data-msg-id="${msg.id}"><span class="chatWidget__author" data-author-id="${messageAuthor.id}" data-author="${messageAuthor.userName}">${messageAuthor.userName}:</span><span class="chatWidget__content" data-msg-id="${msg.id}"> ${msg.content}</span>
                `
            }
            
            
            // check if the current Active user is the author of the message, if so, add edit button
            if (workingThis.user.userId === messageAuthor.id) {
                
                chatMsgDomString += `<button class="chatWidget__editBtn btn hidden" id="editBtn_${msg.id}" data-msg-id="${msg.id}" data-author="${msg.userId}">Edit</button>
                `
            }
            chatMsgDomString += "</p>"
        })
    
        // get control of container for list of chat messages
        let chatContainerEl = document.querySelector(".chatContainer")
        // populate chat container with dom string
        chatContainerEl.innerHTML = chatMsgDomString
        // run autoScroll function automatically scroll to the bottom of the list of messages 
        autoScroll(workingThis.containerName)

    })

}


module.exports = fillChats