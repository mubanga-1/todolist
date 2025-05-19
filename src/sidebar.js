// Import createElement and appendChildren function from utils.js
import { createElement, appendChildren} from "./utils.js";

const todolists = ["todolist1", "todolist2", "todolist3", "todolist4", "todolist5"];


function generateSideBar() {
    const sidebar = document.querySelector('[data-name="nav-bar"]');

    const header = createElement({type: "div", id: "nav-header", classList: [], text: ""});
    const heading = createElement({type: "div", id: "nav-heading", classList: [], text: "Projects"});
    const modifier = createElement({type: "div", id: "modifiers", classList: [], text: ""});
    appendChildren(header, [heading, modifier]);
    

    const add = createElement({type: "div", id: "create", classList: [], text: "+"});
    const remove = createElement({type: "div", id: "delete", classList: [], text: "-"});
    appendChildren(modifier, [remove, add]);


    sidebar.appendChild(header);



    const navElementWrapper = createElement({type: "div", id: "nav-links", classList: [], text: ""});
    sidebar.appendChild(navElementWrapper);

    for (let i = 0; i < todolists.length; i++) {
        const newListButton = createElement({type: "div", id: "", classList: ["list"], text: `${todolists[i]}`});
        navElementWrapper.appendChild(newListButton);

    }
}


export { generateSideBar };