// Creates a new Element with greater ease
function createElement(elementObject) {
    let newElement;
    if (elementObject.type) {
        newElement = document.createElement(`${elementObject.type}`);
    }

    newElement.id = elementObject.id;
    newElement.classList = elementObject.classList;
    newElement.innerText = elementObject.text;

    return newElement;
}

// Appends multiple children to an element
function appendChildren(element, children) {
    children.forEach(child => {
        element.appendChild(child);
    });
}

// Used to visually highlight or unhighlight element by modification of its color properties
function highlight(element, flag="r") {
    if (flag === "h"){
        element.style.backgroundColor = "#fff";
        element.style.color = "#000";
    } else {
        element.style.backgroundColor = "";
        element.style.color = "";
    }
}

// Used to display or hide a given element
function displayElement(element, flag="i", method="block") {
    if (flag === "v") {
        element.style.display = method;
    } else {
        element.style.display = "none";
    }
}

// Creates a new List and stores it in the lists object in local storage
function createList(name) {
    const lists = JSON.parse(localStorage.getItem("lists"));
    lists[name] = {name, items: []};

    localStorage.setItem("lists", JSON.stringify(lists));
}

// Deletes a list from local storage
function deleteList(name) {
    const lists = JSON.parse(localStorage.getItem("lists"));
    const newState = {};

    for (let list in lists) {
        if (name !== list) {
            newState[list] = lists[list];
        }    
    }

    localStorage.setItem("lists", JSON.stringify(newState));
}

function getListNames() {
    const names = [];
    const lists = JSON.parse(localStorage.getItem("lists"));
    
    for (let list in lists) {
        names.push(list);
    }

    return names
}

// Use for clearing an element of all it's children
function clearElement(element) {
    let selector;
    element.id ? selector = "#" + element.id : selector = "." + element.className;

    const children = document.querySelectorAll(`${selector} > *`);
    children.forEach(child => {
        element.removeChild(child);
    });
}

export { createElement, appendChildren, highlight
, displayElement, createList, deleteList, getListNames, clearElement };