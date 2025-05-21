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
function displayElement(element, flag="i") {
    if (flag === "v") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// Creates a new List and stores it in the lists object in local storage
function createList(name) {
    localStorage.setItem(`lists.${name}`, JSON.stringify({name, items: []}));
}

// Deletes a list from local storage
function deleteList(name) {
    localStorage.removeItem(`lists.${name}`);
}


export { createElement, appendChildren, highlight
, displayElement, createList, deleteList };