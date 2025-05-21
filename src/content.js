import { createElement, appendChildren, clearElement, highlight } from "./utils.js";


// For displaying the contents of a specific todolist
function displayContent(list) {
    // Get content container
    const contentContainer = document.querySelector("[data-name='page-content']");

    clearElement(contentContainer);

    // Create header and list elements 
    const header = createElement({type: "div", id: "list-header", classList: [], text: ""});
    const heading = createElement({type: "div", id: "list-heading", classList: [], text: `${list.name}`});

    const listWrapper  = createElement({type: "ul", id: "list", classList: [], text: ""});

    const modifers = createElement({type: "div", id: "item-modifiers", classList: [""], text: ""});

    // Creating and deleting list items
    const create = createElement({type: "button", id: "create-item", classList: ["item-modifier"], text: "+"});
    const remove = createElement({type: "button", id: "remove-item", classList: ["item-modifier"], text: "-"});

    appendChildren(modifers, [remove, create]);
    appendChildren(header, [heading, modifers])

    // Populate list 
    for (let i = 0; i < list.items; i++) {
        const listItem = createElement({type: "li", id: "list-item", classList: [], text: `${list.items[i]}`});
        listWrapper.appendChild(listItem);
    }


    appendChildren(contentContainer, [header, listWrapper]);

}

// Displays the items of the first todolist saved in local storage
function displayFirst(names) {
    const lists = JSON.parse(localStorage.getItem("lists"));

    highlight(document.querySelector(`[data-name='${names[0]}']`), "h");   
    displayContent(lists[names[0]]);
}


function displayAddForm(list) {

}


export { displayContent, displayFirst };