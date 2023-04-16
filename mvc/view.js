export const View = (() => {
    const todolistEl = document.querySelector(".todo-list");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");

    const renderTodos = (todos) => {
        let todosTemplate = "";
        todos.forEach((todo) => {
            const liTemplate = `<li><span>${todo.content}</span><button class="delete-btn" id="${todo.id}">delete</button></li>`;
            todosTemplate += liTemplate;
        });
        if (todos.length === 0) {
            todosTemplate = "<h4>no task to display!</h4>";
        }
        todolistEl.innerHTML = todosTemplate;
    };

    const clearInput = () => {
        inputEl.value = "";
    };

    return { renderTodos, submitBtnEl, inputEl, clearInput, todolistEl };
})();