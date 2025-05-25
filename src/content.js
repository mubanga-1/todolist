// Import necessary function relays from exports
import { createElement, appendChildren, clearElement,
highlight, Todolist, Item } from "./exports.js";

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

// Converts given list items from local storage to an Item object
function convertItems(list) {
    const convertedItems = [];
    for (let i = 0; i < list.length; i++) {
        const {_title, _description, _dueDate, _priority} = list[i];
        convertedItems.push(new Item(_title, _description, _dueDate, _priority));
    }

    return convertedItems;
}

// Used to expand a list item

const resizeElement = (function () {
    let id = null;
    clearInterval(id);

    function expandContent (item, height) {

        const grow = () => {
            const maxHeight = 250;

            if (height === maxHeight) {
                clearInterval(id);
            } else {
                height += 200;
                item.style.height = `${height}px`;
            }
        }
        grow();

        id = setInterval(grow, 1000);
        item.classList.value += " resized";
    }

    function reduceContent (item, height) {

        const shrink = () => {

            if (height === 50) {
                clearInterval(id);
            } else {
                height -= 200;
                item.style.height = `${height}px`;
            }
        }
        shrink();

        id = setInterval(shrink, 1000);

        const classList = item.classList.value.split(" ");
        item.classList.value = classList.filter(item => item !== "resized").join("");
    }

    return { expandContent, reduceContent };

})();


// Used for showing the properties of a list item
function displayInfo(event) {
    const target = event.target;
    const items = document.querySelectorAll("[data-name='item']");

    for (let i = 0; i < items.length; i++) {
        const classList = items[i].classList.value.split(" ");
        const heightValue = items[i].offsetHeight;

        if (items[i] === target) {

            if (classList.includes("resized")) {
                resizeElement.reduceContent(items[i], heightValue);

            } else {
                resizeElement.expandContent(items[i], heightValue);
            }
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

    listWrapper.addEventListener("click", displayInfo);
    list.items = convertItems(list.items);

    // Add list items to listWrapper
    list.items.forEach(item => {
        const listItem = createElement({type: "li", id: `${item.priority}`, classList: ["list-item"], text: `${item.title}`});
        listItem.dataset.name = "item";
        listWrapper.appendChild(listItem);    
    });

    const modifers = createElement({type: "div", id: "item-modifiers", classList: [""], text: ""});
    modifers.dataset.name = "item-modifiers";

    modifers.addEventListener("click", modify);

    // Creating and deleting list items
    const create = createElement({type: "button", id: "create-item", classList: ["item-modifier"], text: "+"});
    const remove = createElement({type: "button", id: "remove-item", classList: ["item-modifier"], text: "-"});

    appendChildren(modifers, [remove, create]);
    appendChildren(header, [heading, modifers]);
    appendChildren(contentContainer, [header, listWrapper]);

}

// Displays the items of the first todolist saved in local storage
function displayFirst(names) {
    const lists = JSON.parse(localStorage.getItem("lists"));
    let firstList = document.querySelector(`[data-name='${names[0]}']`);
    let firstName;

    if (names.length > 0) firstName = lists[names[0]];
    if (firstList) highlight(firstList, "h");
    if (firstName) displayContent(firstName);

}

// Used to add a new List item 
function addItem(list, properites) {
    // Get selected list's items from local storage
    const lists = JSON.parse(localStorage.getItem("lists"));
    const selectedListItems = convertItems(lists[list].items);

    // Create Todolist object and add item to it
    const toDoTemplate = new Todolist(list);
    toDoTemplate.items = toDoTemplate.items.concat(selectedListItems);

    // Extract information from properites
    const [title, description, dueDate, priority] = properites;

    try {
        // Create new item with extracted information
        toDoTemplate.addItem(new Item(title, description, dueDate, priority));

    } catch (err) {
        alert(`${err} in ${list}!`);
    
    }
    
    const newListState = {name: toDoTemplate.name, items: toDoTemplate.items};
    lists[list] = newListState;
    
    localStorage.setItem("lists", JSON.stringify(lists));
}


// Used to get the information from the add item page if all is filled out
function getItemInfo (event) {
    event.preventDefault();

    const titleInfo = document.querySelector("[data-name='title']").value;
    const descriptionInfo = document.querySelector("[data-name='description']").value;
    const dueDateInfo = document.querySelector("[data-name='due-date']").value;
    const priorityInfo = parseInt(document.querySelector("[data-name='priority']").value);

    const listName = document.querySelector(".highlighted").innerText;
    const info = [titleInfo, descriptionInfo, dueDateInfo, priorityInfo];

    if (titleInfo && descriptionInfo && dueDateInfo && priorityInfo) {
        addItem(listName, info);
    }
      
    displayContent(JSON.parse(localStorage.getItem("lists"))[listName]);
    document.querySelector("[data-name='nav-bar']").style.height = `${screen.availHeight}px`;
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
    
    const descriptionElement = createElement({type: "textarea", id: "description-text", classList: [], text: ""});
    descriptionElement.cols = "30";
    descriptionElement.rows = "10";
    descriptionElement.dataset.name = "description";

    const dueDateElement = createElement({type: "input", id: "due-date-input", classList: [], text: ""});
    dueDateElement.type = "date";
    dueDateElement.dataset.name = "due-date";

    const priorityElement = createElement({type: "input", id: "priority-input", classList: [], text: ""});
    priorityElement.type = "number";
    priorityElement.min = "1";
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
            label = createElement({type: "label", id: "", classlist: [], text: "due date:"});
        } 
        label.for = `${element.id}`;

        label.appendChild(formElements[element]);
        wrapper.appendChild(label);

        finalFormElements.push(wrapper);

    }

    // Create button to click and "submit" the data
    const addBtn = createElement({type: "button", id: "add-btn", classlist: [], text: "add"});
    addBtn.dataset.name = "add-button";

    addBtn.addEventListener("click", getItemInfo);
    finalFormElements.push(addBtn);

    appendChildren(createForm, finalFormElements)
    appendChildren(contentContainer, [header, createForm]);
}


export { displayContent, displayFirst };