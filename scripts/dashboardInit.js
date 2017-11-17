/**
 * Krys Mathis
 * Purpose is to handle initializing the structure for the dashboard
*/

const taskWidget = require("./taskWidget/taskWidgetInit")
const friendsWidget = require("./friendsWidget/friendsWidgetInit")
const chatWidget = require("./chatWidget/chatWidgetInit")
const newsWidget = require("./newsWidget/newsWidgetInit")
const eventWidget = require("./eventWidget/eventWidgetInit")
const global = require("./globalRefresh")
const generateNavbar = require("./navbar/generateNavbar")
const Toaster = require("./toaster/toaster");
const getUser = require("./auth/getActiveUser");

// get page elements
const welcome = document.querySelector(".welcome");
const login = document.querySelector(".login");
const dashboard = document.querySelector(".dashboard");
const message = document.querySelector(".login__user-message");
const navbar = document.querySelector(".nutshellNavbar")
const toaster = Toaster();


// control what elements exist on the page
const dashboardInit = function() {


    // display welcome message
    const user = getUser();
    document.title = user.userName + "'s Nutshell"

    
    // populate navbar with items
    generateNavbar()

    
    // unhide navbar dom element
    navbar.style.display = "flex"
    
    // show/hide related dom elements
    message.innerHTML = "";
    welcome.style.display = "none";
    login.style.display = "none";
    dashboard.style.display = "block";

    // initialize each dashboard widget
    chatWidget.init()
    newsWidget.init()
    taskWidget.init()
    friendsWidget.init()
    eventWidget.init()
    
    // populate each widget with content
    global.set([newsWidget, taskWidget, chatWidget, eventWidget, friendsWidget])

    // show toast message
    toaster.makeToast(`We've freshened up the widgets for you ${user.userName}`,3000);
}



module.exports = dashboardInit;