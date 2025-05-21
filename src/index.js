// Side effect import styles.css
import "./styles.css";

// Import relays from exports
import { highlight, displayElement, 
createList, deleteList, getListNames, 
generateNav , displayContent, displayFirst } from "./exports.js";

// Add lists array for containing todolist objects to local storage if not already there 
const listsContainer = "lists";

if (!localStorage.getItem(listsContainer)) {
    localStorage.setItem(listsContainer, JSON.stringify({}));;
}


// Get wrapper for create and delete buttons
const modifiercontainer = document.querySelector("[data-name='modifier-wrapper']");

// Form wrapper for input field and submit button 
const formWrapper = document.querySelector("[data-name='name-input']");

// Get input field and submit button for small form for creating new list and deleting old lists
const nameInput = document.querySelector("[data-name='list-name']");
const submitBtn = document.querySelector("[data-name='submit']");

// Store the container, input field and submit button in array for better use
const displayElements = [formWrapper, nameInput, submitBtn];

// Used to determine whether to delete or create a todolist
let operation;


// Check which button was clicked apply appropriate functionality
modifiercontainer.addEventListener("click", (event) => {
    let target = event.target;
    let btnNames = ["create", "delete"];

    // If the id of the target clicked on is in btnNames display a small form
    if (btnNames.includes(target.id)) {
        operation = target.id;

        // Display all display elements upon the detecting the user's click
        displayElements.forEach(element => {
            if (element.dataset.name === "name-input") {
                displayElement(element, "v", "flex");
                element.style.flexDirection = "column";
                element.style.gap = "1rem";

            }
            else displayElement(element, "v");
        });      

        submitBtn.innerText = target.id;
    }
});

// When submit button is clicked create or delete list if nameInput is given a valid value
submitBtn.addEventListener("click", () => {

    const listNames = getListNames();

    // If the value of the nameInput is not empty create or delete list mentioned  
    if (nameInput.value) {
        if (operation === "create") {
            if (!listNames.includes(nameInput.value)) createList(nameInput.value);
            else alert(`${nameInput.value} already exists!!`);

        } else {
            if (listNames.includes(nameInput.value)) deleteList(nameInput.value);
            else alert("List does not exist!");

        }
        
        // Clear input fields and hide form
        nameInput.value = "";
        displayElements.forEach(element => displayElement(element, "i"));

        // Regenerate the nav-links
        generateNav();

    // Else alert the user to enter a name into the input field
    } else (
        window.alert("Enter list name!")
    )
});

// Get elements that contain list names
const listElements = document.querySelectorAll(".list");

// Functionality for visually toggling between list options
document.querySelector("[data-name='nav-link-wrapper']").addEventListener("click", (event) => {
    let target = event.target;
    const lists = JSON.parse(localStorage.getItem("lists"));

    // Highlight target and unhighlight previous target
    for (let i = 0; i < listElements.length; i++) {
        let currentList = listElements[i];

        if (target === currentList) {
            highlight(currentList, "h");
            displayContent(lists[`${target.innerText}`]);

        } else {
            highlight(currentList);
        }
    }
});