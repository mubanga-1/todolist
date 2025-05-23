// Import necessary function relays from exports
import { createElement, appendChildren, clearElement,
getListNames, highlight, displayContent, displayFirst } from "./exports.js";


// Contains functionality for switching between todolists when one is clicked on
function switchTab(event) {
    // Get elements that contain list names
    const listElements = document.querySelectorAll(".list");

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
}

// Used to generate navigation links
function generateNav() {
    const lists = getListNames();
    const navLinks = document.querySelector("[data-name='nav-link-wrapper']");
    clearElement(navLinks);

    const listNames = [];

    for (let list of lists) {
        const newListButton = createElement({type: "div", id: "", classList: ["list"], text: `${list}`});
        newListButton.dataset.name = list;
        navLinks.appendChild(newListButton);
        listNames.push(list);
    }

    // Functionality for visually toggling between list options
    navLinks.addEventListener("click", switchTab);
    displayFirst(listNames);
    document.querySelector("data-name['nav-bar']").style.height = `${screen.availHeight}px`;
}

// Used to display the todolists and other elements of the sidebar
function generateSideBar() {
    // Select sidebar element from template.html
    const sidebar = document.querySelector('[data-name="nav-bar"]');
    sidebar.style.height = `${screen.availHeight}px`;

    // Create header section for sidebar
    const header = createElement({type: "div", id: "nav-header", classList: [], text: ""});
    const heading = createElement({type: "div", id: "nav-heading", classList: [], text: "Projects"});
    const modifier = createElement({type: "div", id: "modifiers", classList: [], text: ""});
    modifier.dataset.name = "modifier-wrapper";

    // Input container for input used for creating or deleting todolists
    const listNameContainer = createElement({type: "div", id: "name-input", classList: ["input-wrapper"], text: ""});
    listNameContainer.dataset.name = "name-input"; 

    // Input used to name new list or name list to delete
    const listName = createElement({type: "input", id: "list-name", classList: [], text: ""});
    listName.setAttribute("autocomplete", "off");
    listName.dataset.name = "list-name";

    const submitBtn = createElement({type: "button", id: "submit-name", classList: ["submit-btn"], text: ""});
    submitBtn.dataset.name = "submit"

    appendChildren(listNameContainer, [listName, submitBtn]);

    // Add heading and modifier to header section
    appendChildren(header, [heading, modifier]);
    
    // Add buttons for adding and removing todolists to 
    const add = createElement({type: "button", id: "create", classList: [], text: "+"});
    const remove = createElement({type: "button", id: "delete", classList: [], text: "-"});
    appendChildren(modifier, [remove, add]);


    appendChildren(sidebar, [header, listNameContainer]);

    // Add navigation element wrapper in to sidebar
    const navElementWrapper = createElement({type: "div", id: "nav-links", classList: [], text: ""});
    navElementWrapper.dataset.name = "nav-link-wrapper";
    sidebar.appendChild(navElementWrapper);

    generateNav();
}

export { generateSideBar, generateNav };