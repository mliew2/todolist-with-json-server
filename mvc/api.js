export const APIs = (() => {
    const baseUrl = "http://localhost:3000";
    const todoPath = "todos"

    const createTodo = (newTodo) => {
        return fetch([baseUrl, todoPath].join("/"), {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    };

    const deleteTodo = (id) => {
        return fetch([baseUrl, todoPath, id].join("/"), {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const getTodos = () => {
        return fetch([baseUrl, todoPath].join("/")).then((res) => res.json());
    };

    const updateTodo = (updatedTodo, id) => {
        return fetch([baseUrl, todoPath, id].join("/"), {
            method: "PUT",
            body: JSON.stringify(updatedTodo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((res) => res.json());
    };

    return {
        createTodo,
        deleteTodo,
        getTodos,
        updateTodo
    };
})();