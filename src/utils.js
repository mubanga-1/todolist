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


function appendChildren(element, children) {
    children.forEach(child => {
        element.appendChild(child);
    });
}

export {createElement, appendChildren};