import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((view, model) => {
    const state = new model.State();
    const init = () => {
        model.getTodos().then((todos) => {
            todos.reverse();
            state.todos = todos;
        });
    };

    const handleSubmit = () => {
        view.submitBtnEl.addEventListener("click", (event) => {
            /* 
                1. read the value from input
                2. post request
                3. update view
            */
            const inputValue = view.inputEl.value;
            model.createTodo({ content: inputValue }).then((data) => {
                state.todos = [data, ...state.todos];
                view.clearInput();
            });
        });
    };

    const handleDelete = () => {
        //event bubbling
        /* 
            1. get id
            2. make delete request
            3. update view, remove
        */
        view.pendinglistEl.addEventListener("click", (event) => deleteLogic(event));
        view.completedListEl.addEventListener("click", (event) => deleteLogic(event));
    };

    const deleteLogic = (event) => {
        if (event.target.className === "delete-btn") {
            const id = event.target.id;
            console.log("id", id, typeof id);
            model.deleteTodo(+id).then((data) => {
                state.todos = state.todos.filter((todo) => todo.id !== +id);
            });
        }
    };

    const handleComplete = () => {
        view.pendinglistEl.addEventListener("click", (event) => completeLogic(event));
        view.completedListEl.addEventListener("click", (event) => completeLogic(event));
    };

    const completeLogic = (event) => {
        if (event.target.className === "complete-btn") {
            const id = event.target.id;
            console.log("id", id, typeof id);
            let index = state.todos.findIndex((todo) => {
                return +todo.id === +event.target.id;
            });
            state.todos[index].completed = !state.todos[index].completed;
            model.updateTodo(event.target.id, state.todos[index]).then((todo) => {
                state.todos = [...state.todos];
            });
        }
    }

    const handleEdit = () => {
        view.pendinglistEl.addEventListener("click", (event) => editLogic(event));
        view.completedListEl.addEventListener("click", (event) => editLogic(event));
    };

    const editLogic = (event) => {
        if (event.target.className === "edit-btn") {
            const id = event.target.id;
            const [editing, newContent] = view.triggerEdit(id);
            if (!editing) {
                let index = state.todos.findIndex((todo) => {
                    return +todo.id === +id;
                });
                state.todos[index].content = newContent;
                model.updateTodo(event.target.id, state.todos[index]).then((todo) => {
                    state.todos = [...state.todos];
                });
            }
        }
    }

    const bootstrap = () => {
        init();
        handleSubmit();
        handleDelete();
        handleComplete();
        handleEdit();
        state.subscribe(() => {
            view.renderTodos(state.todos);
        });
    };
    return {
        bootstrap,
    };
})(View, Model); //ViewModel