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
        this.items.forEach(item => {
            titles.push(item.title.toLowerCase());
        });

        if (titles.includes(newItem.title.toLowerCase())) {
            throw Error("Item already exists!");
        }

        this.items.push(newItem);
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
        if (description.length >= 100) {
            this._description = description;
        }
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(dueDate) {
        if (dueDate) {
            this._dueDate = new Date(dueDate);
        }
    }

    get priority() {
        return this._priority; 
    }

    set priority(priority) {
        if (priority >= 1 && priority <= 3) {
            this._priority = priority;
        }
    }
}

export { Todolist, Item };