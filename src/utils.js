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


function highlight(element, flag="r") {
    if (flag === "h"){
        element.style.backgroundColor = "#fff";
        element.style.color = "#000";
    } else {
        element.style.backgroundColor = "";
        element.style.color = "";
    }
}

function displayElement(element, flag="i") {
    if (flag === "v") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

export { createElement, appendChildren, highlight, displayElement };