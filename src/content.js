import { createElement, appendChildren, clearElement, highlight } from "./utils.js";


// For displaying the contents of a specific todolist
function displayContent(list) {
    // Get content container
    const contentContainer = document.querySelector("[data-name='page-content']");

    clearElement(contentContainer);

    // Create header and list elements 
    const header = createElement({type: "div", id: "list-header", classList: [], text: ""});
    const heading = createElement({type: "div", id: "", classList: ["list-heading"], text: `${list.name}`});

    const listWrapper  = createElement({type: "ul", id: "list", classList: [], text: ""});

    const modifers = createElement({type: "div", id: "item-modifiers", classList: [""], text: ""});
    modifers.dataset.name = "item-modifiers";

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
    // Get collection of lists from local storage
    const lists = JSON.parse(localStorage.getItem("lists"));
    const selectedList = lists[list];

    // Get content container and clear it of all contents
    const contentContainer = document.querySelector("[data-name='page-content']");
    clearElement(contentContainer);

    // Create header for containing heading 
    const header = createElement({type: "div", id: "create-header", classList: [], text: ""});

    // Create heading for todolist creation page
    const heading = createElement({type: "li", id: "list-item", classList: ["list-heading"], text: "Create an item"});
    header.appendChild(heading);

    // Create form for collection of data for making list item
    const createForm = createElement({type: "form", id: "", classList: [], text: ""});
    createForm.autocomplele = "off";

    // Create elements for form fields
    const titleElement = createElement({type: "input", id: "", classList: [], text: ""});
    
    const descriptionElement = createElement({type: "textarea", id: "", classList: [], text: ""})

    const dueDateElement = createElement({type: "input", id: "", classList: [], text: ""});
    dueDateElement.type = "date";

    const priority = createElement({type: "input", id: "", classList: [], text: ""});

    appendChildren(createForm, [titleElement, descriptionElement, dueDateElement, priority])
    appendChildren(contentContainer, [header, createForm]);
}


export { displayContent, displayFirst, displayAddForm };