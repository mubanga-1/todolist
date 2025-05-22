import { createElement, appendChildren, clearElement, highlight } from "./utils.js";

// Checks if on the list item modifiers is clicked
function modify(event)  {
    const target = event.target;

    // Get ids of the modifiers
    const modifierElements = document.querySelectorAll(".item-modifier");
    const validIds = [];

    // Add each id to validIds array
    modifierElements.forEach(modifier => {
        validIds.push(modifier.id);
    });

    // Perform operation based off of the id
    if (validIds.includes(target.id)) {
        if (target.id === "create-item") {
            displayAddForm(document.querySelector(".list-heading").innerText);
        } else {

        }
    } 

}


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

    modifers.addEventListener("click", modify);

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
    // Get content container and clear it of all contents
    const contentContainer = document.querySelector("[data-name='page-content']");
    clearElement(contentContainer);

    // Create header for containing heading 
    const header = createElement({type: "div", id: "create-header", classList: [], text: ""});

    // Create heading for todolist creation page
    const heading = createElement({type: "div", id: "list-item", classList: ["list-heading"], text: `Add item to ${list}`});
    header.appendChild(heading);

    // Create form for collection of data for making list item
    const createForm = createElement({type: "form", id: "", classList: [], text: ""});
    createForm.autocomplele = "off";

    // Create elements for form fields
    const titleElement = createElement({type: "input", id: "title-input", classList: [], text: ""});
    titleElement.dataset.name = "title";
    
    const descriptionElement = createElement({type: "textarea", id: "description-text", classList: [], text: ""})
    descriptionElement.dataset.name = "description";

    const dueDateElement = createElement({type: "input", id: "due-date-input", classList: [], text: ""});
    dueDateElement.type = "date";
    dueDateElement.dataset.name = "due-date";

    const priorityElement = createElement({type: "input", id: "priority-input", classList: [], text: ""});
    priorityElement.dataset.name = "priority";

    // Create form elements objects further processing of contents
    const formElements = {
        title: titleElement,
        description: descriptionElement,
        dueDate: dueDateElement,
        priority: priorityElement,
    }

    // Create array to store final form of form elements when fully processed
    const finalFormElements = [];

    // For each element in form elements object add it to a label and add the label to a wrapper
    for (let element in formElements) {
        const wrapper = createElement({type: "div", id: "", classList: ["input-wrapper"], text: ""});

        let label;
        if (element !== "dueDate") {
            label = createElement({type: "label", id: "", classList: [], text: `${element}:`});
        } else {
            label = createElement({type: "label", id: "", classlist: [], text: "due date"});
        } 
        label.for = `${element.id}`;

        label.appendChild(formElements[element]);
        wrapper.appendChild(label);

        finalFormElements.push(wrapper);

    }

    // Create button to click and "submit" the data
    const addBtn = createElement({type: "button", id: "add-btn", classlist: [], text: "add"});
    addBtn.dataset.name = "add-button";

    finalFormElements.push(addBtn);

    appendChildren(createForm, finalFormElements)
    appendChildren(contentContainer, [header, createForm]);
}


export { displayContent, displayFirst, displayAddForm };