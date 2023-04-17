export const View = (() => {
    const pendinglistEl = document.querySelector(".pending-list");
    const completedListEl = document.querySelector(".completed-list");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");

    const renderTodos = (todos) => {
        let pendingTemplate = "";
        let completedTemplate = "";
        todos.forEach((todo) => {
            const completeButton = `<button class="complete-btn" id="${todo.id}">complete</button>`
            const liTemplate = `
                <span id="todo-${todo.id}">${todo.content}</span>
                <button class="edit-btn" id="${todo.id}">edit</button>
                <button class="delete-btn" id="${todo.id}">delete</button>
            `;
            if (!todo.completed) {
                pendingTemplate += `<li> ${liTemplate} ${completeButton} </li>`;
            } else {
                completedTemplate += `<li> ${completeButton} ${liTemplate} </li>`;;
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

    // Adds a textbox for editing when the edit button is clicked
    // Returns true with the new string if user was editing the content
    // Otherwise, changes the contents to a textbox with the current text content
    const triggerEdit = (id) => {
        const content = document.querySelector(`#todo-${id}`);
        if (content.classList.toggle("editing")) {
            content.innerHTML = `<input type="text" class="textbox" id="input-${id}" value="${content.innerHTML}"></input>`;
            return [false, ""];
        } else {
            const textbox = document.querySelector(`#input-${id}`);
            const newContent = textbox.value;
            content.removeChild(textbox);
            return [true, newContent];
        }
    }

    return {
        renderTodos,
        submitBtnEl,
        inputEl,
        clearInput,
        pendinglistEl,
        completedListEl,
        triggerEdit
    };
})();
