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
        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = event.target.id;
                console.log("id", typeof id);
                model.deleteTodo(+id).then((data) => {
                    state.todos = state.todos.filter((todo) => todo.id !== +id);
                });
            }
        });
    };

    const bootstrap = () => {
        init();
        handleSubmit();
        handleDelete();
        state.subscribe(() => {
            view.renderTodos(state.todos);
        });
    };
    return {
        bootstrap,
    };
})(View, Model); //ViewModel