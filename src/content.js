import { createElement, appendChildren } from "./utils.js";


function displayAddForm(list) {

}


// For displaying the contents of a specific todolist
function displayContent(list) {
    // Get content container
    const contentContainer = document.querySelector("[data-name='page-content']");

    // Create header and list elements 
    const header = createElement({type: "div", id: "list-heading", classList: [], text: `${list.title}`});
    const listWrapper  = createElement({type: "ul", id: "list", classList: [], text: ""});

    // Populate list 
    for (let i = 0; i < list.items; i++) {
        const listItem = createElement({type: "li", id: "list-item", classList: [], text: `${list.items[i]}`});
        listWrapper.appendChild(listItem);
    }


    appendChildren(contentContainer, [header, listWrapper]);

}

export { displayContent };