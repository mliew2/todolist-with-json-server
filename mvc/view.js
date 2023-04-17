export const View = (() => {
    const pendinglistEl = document.querySelector(".pending-list");
    const completedListEl = document.querySelector(".completed-list");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");

    const renderTodos = (todos) => {
        let pendingTemplate = "";
        let completedTemplate = "";
        todos.forEach((todo) => {
            const editIcon ='<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>';
            const deleteIcon ='<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>';
            const arrowLeftIcon ='<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>';
            const arrowRightIcon ='<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>';
            
            const liTemplate = `
                <span id="todo-${todo.id}">${todo.content}</span>
                <button class="edit-btn" id="${todo.id}">${editIcon}</button>
                <button class="delete-btn" id="${todo.id}">${deleteIcon}</button>
            `;
            if (!todo.completed) {
                const completeButton = `<button class="complete-btn" id="${todo.id}">${arrowRightIcon}</button>`
                pendingTemplate += `<li> ${liTemplate} ${completeButton} </li>`;
            } else {
                const completeButton = `<button class="complete-btn" id="${todo.id}">${arrowLeftIcon}</button>`
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
