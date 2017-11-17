//Event Widget Init - Chris Miller
//Initialize event widget and add methods

const getEvents = require("./getEvents")
const getUser = require("../auth/getActiveUser")
const generateEventContent = require("./generateEventContent")
const addlisteners = require("./addlisteners")
const {makeWidget, defaultWidget} = require("../widgetTemplate")
const autoScroll = require("../autoScroll")
const getDatabase = require("../database")

//create new widget object
const eventWidget = makeWidget()

eventWidget.init = function() {

    // build up a dom string for the additional unique elements for this widget, such as input fields and buttons that will be placed under the nested widgetContainer
    let additionalElementDomString = `
        <div class="eventWidget__btn-container">
            <button class="eventWidget__btn eventWidget__btn-create">Create Event</button>
            <button class="eventWidget__btn eventWidget__btn-save eventWidget__btn-hidden">Save Event</button>
        </div>
    `

    // initialize new widget and pass in the name of the widget and the addition elements dom string
    defaultWidget.init("events", additionalElementDomString)

    const user = getUser();
    
    const fillEvents = function() {
        getDatabase(DB => {    
            let events = getEvents(user, DB)
            generateEventContent(events, DB)
            autoScroll(this.containerName)
        })
    }

    eventWidget.widgetContainer = "eventsWidget"
    eventWidget.user = user
    eventWidget.populate = fillEvents
    eventWidget.containerName = "eventsContainer"
    eventWidget.addlisteners = addlisteners
    eventWidget.addlisteners(eventWidget)
    eventWidget.populate()
}

module.exports = eventWidget;

