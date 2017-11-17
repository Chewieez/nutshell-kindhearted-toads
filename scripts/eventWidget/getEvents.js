//getEvents - Chris Miller
//Pull all events from data base to be displayed - 

// const database = require("../database");
const getFriends = require("../auth/getFriends");

const getEvents = function(user, DB) {
    
    //generate neccessary info
    let db = DB
    let userId = user.userId
    let friendsList = getFriends(DB)
    let eventsAttending = db.eventJoin.filter(el => el.userId === userId)
    let eventsAttendingIds = eventsAttending.map(el => el.eventId)
    let events = db.events
    let filteredEvents = []
    
    events.forEach( event => {
        
        //add a property of the miliseconds from the current time that the event takes place
        //we will use this to not display any events in the past, negative values, and sort by date
        event.upcoming = Date.parse(event.eventDate.replace(/-/g, "/")) - Date.now()
        if (event.upcoming > 0) {

            event.creator = false
            event.attending = false
            event.display = false

            //ammend values if you are the creator of the event
            if (event.userId === userId) {
                event.creator = true
                event.attending = true
                event.display = true
                event.style = "event--primary"
                
                
            //ammend values if you are attending the event
            } else if (eventsAttendingIds.includes(event.id)) {
                event.eventJoin = eventsAttending.find(x => x.eventId === event.id).id || "ack"
                event.attending = true
                event.display = true
                event.style = "ownedByFriend event--secondary"

            //ammend values if a friend created the event but you are not attending
            } else if (friendsList.includes(event.userId)) {
                event.display = true
                event.style = "ownedByFriend event--tertiary"
            }

            filteredEvents.push(event)
        }
        
    })

    // console.log(filteredEvents)
    return filteredEvents
}

module.exports = getEvents;