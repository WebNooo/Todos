const todo = new Todo()

const filterButtons = document.getElementsByName("filter");
const todoList = document.getElementsByClassName("todo__body")[0];
const footer = document.getElementsByClassName("todo__footer")[0];
const clear = document.getElementsByClassName("clear_complete")[0];
const box = document.getElementsByClassName("box")[0];
const selectAll = document.getElementsByName("select-all")[0];

let renderType = 0;
let isEdit = false;

//event for adding new item by press key `Enter`
document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        let text = document.getElementsByName("todo_text");
        if (text[0].value.length > 0) {
            todo.Add(text[0].value);
            renderItem()
            text[0].value = ""
        }
    }
})

//clear all completed items
clear.addEventListener("click", () => {
    todo.ClearCompleted();
    renderItem();
})

//select all
selectAll.addEventListener("change", () => {
    todo.SelectedAll(selectAll.checked);
    renderItem();
})

//update text item
const EditText = (item) => {
    todo.Update(item.id, item.text, item.completed)
    renderItem();
    isEdit = false;
}

//create new item in list
const createItem = (item) => {

    //create main element `item`
    let element = Object.assign(document.createElement("div"), {className: "item"})

    //create checkbox with event
    let checkBox = Object.assign(document.createElement("input"), {
        type: "checkbox",
        checked: item.completed,
        onchange: () => {
            todo.Update(item.id, item.text, !item.completed);
            renderItem()
        }
    });

    //create element for show text and his editing
    let text = Object.assign(document.createElement("div"), {
        innerHTML: item.text,
        className: `item__text ${item.completed ? 'completed' : ''}`,
        ondblclick: () => {
            if (!isEdit) {
                text.innerHTML = `<input class="text_edit" id="editText" type="text" value="${item.text}"  />`;
                const textEditor = document.getElementById("editText");

                //event for input. if focus out then end editing
                textEditor.addEventListener("focusout", (e) => {
                    item.text = textEditor.value;
                    EditText(item);
                })

                //event for input. if press key `Enter` then end editing
                textEditor.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        item.text = textEditor.value;
                        EditText(item);
                    }
                })
                isEdit = true;
            }
        }

    });

    //create element with event for remove item by id
    let remove = Object.assign(document.createElement("div"), {
        className: `item__remove`,
        onclick: () => {
            todo.Remove(item.id);
            isEdit = false;
            renderItem()
        }
    });

    let label = document.createElement("label");
    label.appendChild(checkBox);
    label.appendChild(document.createElement("span"));

    element.appendChild(label);
    element.appendChild(text);
    element.appendChild(remove);
    return element;
}

//render list items
const renderItem = () => {
    //clear items list
    todoList.innerHTML = "";

    //get items by filter
    let items = todo.GetItems(renderType);

    //set value for select all checkbox
    selectAll.checked = todo.itemsLeft < 1 && todo.todos.length > 0;

    //append items in list
    items.forEach(b => {
        todoList.appendChild(createItem(b))
    })

    //show message if items count < 1 but collection not empty
    if (items.length < 1) {
        todoList.appendChild(Object.assign(document.createElement("div"), {
            innerHTML: "Todos not found...",
            className: "item empty"
        }))
    }

    //show\hide filter panel if collection empty
    if (todo.todos.length < 1) {
        footer.classList.add("hidden")
        todoList.classList.add("hidden")
        box.classList.add("hidden")
    } else {
        footer.classList.remove("hidden")
        todoList.classList.remove("hidden")
        box.classList.remove("hidden")
    }

    //set counter item
    document.getElementsByClassName("items_count")[0].innerHTML = todo.itemsLeft;
}

//load items on page load
renderItem();

//add event on filter buttons
filterButtons.forEach(x => {
    x.addEventListener("click", () => {
        renderType = parseInt(x.value);
        renderItem()
    })
})

