/**
 * Krys Mathis
 * The purpose of this function is to navigate the user through the login
 * process.
 */
const login = require("./login");
const createNewUser = require("./createNewUser");
const dashboardInit = require("../dashboardInit");
const Toaster = require("../toaster/toaster");
const getDatabase = require("../database")

// elements you would click
const btnLogin = document.querySelector(".login__button-login");
const btnCreate = document.querySelector(".login__button-create");
const loginLink = document.querySelector(".welcome__link");

const toaster = Toaster();
// function to navigate through login
const addEvents = () => {
    
    document.addEventListener("click", (event) => {

        // page elements to toggle visible and invisible
        const welcomePage = document.querySelector(".welcome");
        const loginPage = document.querySelector(".login");

        // Handle navigating to the login page
        if (event.target === loginLink) {
            welcomePage.style.display = "none";
            loginPage.style.display = "flex";
        }

        // get elements and values
        const username = document.querySelector(".login__username").value;
        const usernameEl = document.querySelector(".login__username");
        const email = document.querySelector(".login__email").value;
        const emailEl = document.querySelector(".login__email");

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }



        // handle the login button errors
        if (event.target === btnLogin) {
            
            if (username.length < 1) {
                toaster.makeToast("please enter a valid username",5000);
                toaster.makeToast("Oops...",2000)
                usernameEl.focus();
                return;
            }

            if (!validateEmail(email)) {
                toaster.makeToast("please enter a valid email",5000)
                toaster.makeToast("Oops...",2000)
                emailEl.focus();
                return;
            }

            getDatabase(DB => {
                // if validate user
                if (login(username, email, DB)) {
                    // save user to session 
                    dashboardInit();
                    // show dashboard
                } else {    // else show error
                    toaster.makeToast("username/email does not exist",7000);
                    usernameEl.focus();
                }
            })



            // if (getDatabase(useLogin) {
            //     dashboardInit();
            // } else {
            //     //display inline error message
            //     //message.innerHTML = "username/email does not exist"
            //     toaster.makeToast("username/email does not exist",7000);
            //     usernameEl.focus();
            // }
        }



        // handle the create button errors
        if (event.target === btnCreate) {
            if (username.length === 0) {
                toaster.makeToast("please enter a username");
                usernameEl.focus();
                return;
            }

            if (!validateEmail(email)) {
                toaster.makeToast("please enter your emaill");
                emailEl.focus();
                return;
            }

            if (createNewUser(username, email)) {
                dashboardInit();
            } else {
                // your username or email matches an existing user
                toaster.makeToast("username/email already exists",7000);
                usernameEl.focus();
            }
        }

    })
}

module.exports = addEvents;