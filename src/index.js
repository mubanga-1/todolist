import "./styles.css";
import { generateSideBar, highlight } from "./exports.js";


generateSideBar();

const lists = document.querySelectorAll("[data-name='list']");


document.querySelector("[data-name='nav-link-wrapper']").addEventListener("click", (event) => {
    let target = event.target;

    for (let i = 0; i < lists.length; i++) {
        let currentList = lists[i];

        if (target === currentList) {
            highlight(currentList, "h");

        } else {
            highlight(currentList);
        }
    }
});