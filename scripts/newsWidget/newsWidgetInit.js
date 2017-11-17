// Author: Sean Williams
//Purpose: Create the news widget and set up its inital state





const {makeWidget, defaultWidget} = require("../widgetTemplate")
const getUser = require("../auth/getActiveUser")
const fillFunc = require("./fill")
const getNews = require("./getNews")
const addEvents = require("./eventListeners");
const getDatabase = require("../database")
const getFriends = require("../auth/getFriends")

const newsWidget = makeWidget()


newsWidget.init = () => {
    //create new widget object

    // build up a dom string for the additional unique elements for this widget, such as input fields and buttons that will be placed under the nested widgetContainer

    let additionalElementDomString = "<button class='newsWidget__btn-add'>New Article</button>";

    // initialize new widget and pass in the name of the widget and the addition elements dom string
    defaultWidget.init("news", additionalElementDomString)
    newsWidget.container = document.querySelector(".newsContainer")
    newsWidget.user = getUser();
    newsWidget.getNews = getNews;
    newsWidget.fill = fillFunc;

    newsWidget.populate = function () {
        getDatabase(DB => {
            let friends = getFriends(DB)
            let news = this.getNews(DB, friends)
            this.fill(news)
        })
    }
    // newsWidget.populate = function () {
    //     this.fill(this.getNews())
    // }
    newsWidget.populate()
    addEvents(newsWidget)
}


module.exports = newsWidget