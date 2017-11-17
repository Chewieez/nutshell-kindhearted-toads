/**
 * Krys Mathis
 * Init of friends widget
 */
const {makeWidget, defaultWidget} = require("../widgetTemplate")
const getFriends = require("./getFriends");
const displayFriends = require("./displayFriends");
const addFriendsListeners = require("./addFriendsListeners");
const getDatabase = require("../database")


const friendsWidget = makeWidget()

//create new widget object
friendsWidget.init = function() {

    // build up a dom string for the additional unique elements for this widget, such as input fields and buttons that will be placed under the nested widgetContainer

    let additionalElementDomString = `
        <div class="friendsWidget__user-interaction">
        <button class="friendsWidget__btn-add widgetBtn">Add a friend</button>
        <span class="friendsWidget__inputContainer">
            <input type="text" class="friendsWidget__input" placeholder="Search for a user">
            <button class="friendsWidget__btn-commit widgetBtn">Commit</button>
            <span class="friendsWidget__user-comment"></span>
            <div class="friendsWidget__search-results">Type To Search</div>
        </span>
        </div>
        `

    // initialize new widget and pass in the name of the widget and the addition elements dom string
    defaultWidget.init("friends", additionalElementDomString)

    friendsWidget.populate = function(){
        getDatabase(DB => {
            const friends = getFriends(DB)
            displayFriends(friends)
        })
    }

    friendsWidget.populate();
    addFriendsListeners(friendsWidget);
}

module.exports = friendsWidget
