class Todolist {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (name) {
            this._name = name;
        }
    }

    addItem(newItem) {
        const titles = [];
        const priorityNums = [];
        
        this.items.forEach(item => {
            titles.push(item.title.toLowerCase());
            priorityNums.push(item.priority);
        });

        
        if (titles.includes(newItem.title.toLowerCase())) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].title.toLowerCase() === newItem.title.toLowerCase()) {
                    this.items[i] = newItem;
                }
            }

        } else if (priorityNums.includes(newItem.priority)) {
            throw Error("Item with that priority number already exists");
        } else {
            this.items.push(newItem);
        }       
        
    }

    removeItem(item) {
        if (this.items.includes(item)) {
            const itemIndex = this.items.indexOf(item);
            this.items.splice(itemIndex, itemIndex + 1);
        }
    }
}    


class Item {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        if (title && (typeof title === "string")) {
            this._title = title;
        } 
    }

    get description() {
        return this._description;
    }

    set description(description) {
        if (description.length >= 1) {
            this._description = description;
        }
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(dueDate) {
        if (dueDate) {
            let [year, month, day] = dueDate.split("-");
            day = day.split("").slice(0, 2).join("");

            const dateFields = [year, month - 1, day].map(Number);
            this._dueDate = new Date(...dateFields);
        }
    }

    get priority() {
        return this._priority; 
    }

    set priority(priority) {
        if (typeof priority === "number") {
            this._priority = priority;
        }
    }
}

export { Todolist, Item };