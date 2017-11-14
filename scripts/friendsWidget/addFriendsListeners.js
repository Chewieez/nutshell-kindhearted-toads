/**
 * Krys Mathis
 * Event listeners for friends widget
 */

const getUsers = require("./getUsers");
const resetSearch = require("./resetSearch");
const isFriend = require("./checkFriendship");
const addFriend = require("./addFriend");
const Toaster = require("../toaster/toaster");
const global = require("../globalRefresh");

const addFriendsListeners = (widget) => {
    let toaster = Toaster();
    let result = {}
    let users = [];
    let readyToCommit = false;
    const commitButton = document.querySelector(".friendsWidget__btn-commit");
    const userMessage = document.querySelector(".friendsWidget__user-comment");
    const friendsInput = document.querySelector(".friendsWidget__input");
    const friendsSearchResults = document.querySelector(".friendsWidget__search-results");
    const inputBox = document.querySelector(".friendsWidget__inputContainer")
    
    const friendsWidget = document.querySelector(".friendsWidget");
    // the delete button functionality
    friendsWidget.addEventListener("click", (e)=>{

        if (e.target.className.includes("friend__btn-delete")) {
            // debugger
            const parent = e.target.parentNode;
            const id = parseInt(parent.dataset.friendshipId);
            widget.delete("friends", id)
            setTimeout(() => global.refresh(), 200);
        }
    });

    document.querySelector(".friendsWidget__btn-add").addEventListener("click",() =>{
        // display the input fields
        inputBox.style.display = "inline";
        resetSearch("Type to Search");
        // prepopulate the users array with the current users
        users = getUsers();
        friendsInput.focus();
        readyToCommit = false;

    })

    // When the user clicks away from the friends seach box while a 
    // friend has not been identified
    friendsInput.addEventListener("focusout", (e)=> {
        // if the commitButton is still hidden OK to hide
        if (commitButton.style.display === "none") {
            inputBox.style.display = "none";
        }
        readyToCommit = false;
    });

    document.querySelector(".friendsWidget__input").addEventListener("keyup",(e) => {
        
        //let currentResults = document.querySelector(".friendsWidget__search-results").textContent;
        let searchString = e.target.value.toLowerCase();

        if (searchString.length === 0) {
            resetSearch("");
            return;
        }
        
        searchUsers = users.find(u=> u.userName.toLowerCase().includes(searchString.toLowerCase()));
        
        if (searchUsers) {
            result = searchUsers;
            const searchResults = `${searchUsers.userName}: ${searchUsers.email}`;
            friendsSearchResults.textContent = searchResults;
            userMessage.textContent = "";
            if (userMessage.classList.contains("friendsWidget--red")) {
                userMessage.classList.toggle("friendsWidget--red");
            }
            if (isFriend(searchUsers.id)) {
                commitButton.style.display = "none";
                userMessage.textContent = "Already friends..."
            } else {
                readyToCommit = true;
                commitButton.style.display = "";    
            }

        } else {
            friendsSearchResults.textContent = "";
            userMessage.textContent = "No User Found";
            
            if (!userMessage.classList.contains("friendsWidget--red")) {
                userMessage.classList.toggle("friendsWidget--red");
            }
            commitButton.style.display = "none";
            readyToCommit = false;
        }

        // enter key behavior
        if (e.keyCode === 13 && readyToCommit) {
            addFriend(result,widget);
            global.refresh()
        }
        
    })
    
    document.querySelector(".friendsWidget__btn-commit").addEventListener("click",() => {
        if (result) {
            addFriend(result,widget);
            global.refresh()
        }
    })



}

module.exports = addFriendsListeners;