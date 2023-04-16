export const View = (() => {
    const pendinglistEl = document.querySelector(".pending-list");
    const completedListEl = document.querySelector(".completed-list");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");

    const renderTodos = (todos) => {
        let pendingTemplate = "";
        let completedTemplate = "";
        todos.forEach((todo) => {
            if (!todo.completed) {
                const liTemplate = `
                <li>
                    <span>${todo.content}</span>
                    <button class="edit-btn" id="${todo.id}">edit</button>
                    <button class="delete-btn" id="${todo.id}">delete</button>
                    <button class="complete-btn" id="${todo.id}">complete</button>
                </li>
                `;
                pendingTemplate += liTemplate;
            } else {
                const liTemplate = `
                <li>
                    <button class="complete-btn" id="${todo.id}">complete</button>
                    <span>${todo.content}</span>
                    <button class="edit-btn" id="${todo.id}">edit</button>
                    <button class="delete-btn" id="${todo.id}">delete</button>
                </li>
                `;
                completedTemplate += liTemplate;
            }
        });
        if (todos.length === 0) {
            pendingTemplate = "<h4>no task to display!</h4>";
            completedTemplate = "<h4>no task to display!</h4>";
        }
        pendinglistEl.innerHTML = pendingTemplate;
        completedListEl.innerHTML = completedTemplate;
    };

    const clearInput = () => {
        inputEl.value = "";
    };

    return {
        renderTodos,
        submitBtnEl,
        inputEl,
        clearInput,
        pendinglistEl,
        completedListEl
    };
})();
