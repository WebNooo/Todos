class Todo{

    constructor() {
        this.itemsLeft = 0;
        this.lastId = 0;
        this.todos = [
            {
                id: 0,
                text: "walk the dog",
                completed: false
            },
            {
                id: 1,
                text: "shopping",
                completed: true
            },
            {
                id: 2,
                text: "write on medium",
                completed: true
            }
        ]
    }

    Add = (text) => {
        let id = this.lastId <= this.todos.length ? this.todos.length+1 : this.lastId+1;
        this.todos.push({id,  text, completed: false});
        this.lastId = id;
    }

    Remove = (id) => {
        this.todos = this.todos.filter(x => x.id !== id)
    }

    Update = (id, text, completed) => {
        this.todos.map(x => {
            if (x.id === id) {
                x.completed = completed;
                x.text = text;
            }
            return x;
        })
    }

    ClearCompleted = () => {
        this.todos = this.todos.filter(x => x.completed === false);
    }

    SelectedAll = (value) => {
        this.todos.map(x => x.completed = value)
    }

    GetItems = (type = 0) => {

        this.itemsLeft = this.todos.filter(x => x.completed === false).length;

        switch (type){
            case 0:
                return this.todos
            case 1:
                return this.todos.filter(x => x.completed === false)
            case 2:
                return this.todos.filter(x => x.completed === true)
        }
    }
}