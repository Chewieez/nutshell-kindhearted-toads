// Author: Greg Lawrence
// creates the chatWidget

const {makeWidget, defaultWidget} = require("../widgetTemplate")
const getUser = require("../auth/getActiveUser");
const fillChats = require("./fillChats")
const createChatListener = require("./chatEventListener")
const getDatabase = require("../database")


//create new widget object
const chatWidget = makeWidget()

chatWidget.init = function () { 

    // build up a dom string for the additional unique elements for this widget, such as input fields and buttons that will be placed under the nested widgetContainer
    let additionalDomElementString = `
    <input type="text" class="chatWidget__text" placeholder="Chat with your friends">
    <button class="chatWidget__btn widgetBtn">Send</button>
    `

    // initialize new widget and pass in the name of the widget and the addition elements dom string
    defaultWidget.init("chat", additionalDomElementString)
    
    // get the current Active user
    const user = getUser();

    // Add info to the chatWidget
    chatWidget.widgetContainer = "chatWidget";
    // attach active user object to chatWidget
    chatWidget.user = user;
    chatWidget.fillChats = fillChats
    
    // attach the function to fill the chatWidget container with chat messages
    chatWidget.populate = function() {
        getDatabase(DB => {
            debugger
            this.fillChats(DB)
        })
    }
    chatWidget.containerName = "chatContainer"
    
    // run populate() function to start the chatWidget with any chat messages in database
    chatWidget.populate()
    // attach the function to create event listeners to chatWidget object
    chatWidget.createChatListener = createChatListener
    // run function to create event listeners on chatWidget
    chatWidget.createChatListener(chatWidget)
}


module.exports = chatWidget