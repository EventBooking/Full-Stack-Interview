"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let todoService;
window.onload = function onload() {
    todoService = new TodoService();
    const addButton = document.getElementById("todos-add");
    addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener('click', () => todoService.add());
};
function removeTodo(id) {
    const tr = document.getElementById(`todo-item-${id}`);
    tr === null || tr === void 0 ? void 0 : tr.remove();
}
class TodoService {
    constructor() {
        this.todos = [];
    }
    add() {
        const note = document.getElementById("todos-input").value;
        if (!note)
            return;
        const id = this.addTodo(note);
        this.removePlaceholderRow();
        this.createRow(id, note);
        this.clearInput();
    }
    addTodo(note) {
        var _a, _b;
        const newId = (_b = (_a = this.todos[this.todos.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0 + 1;
        const newTodo = {
            id: newId,
            note: note,
            isCompleted: false
        };
        this.todos.push(newTodo);
        return newId;
    }
    removePlaceholderRow() {
        const hasExistingTodos = todoService.list(true);
        if (hasExistingTodos)
            return;
        const placeholderRow = document.getElementById("placeholder-row");
        placeholderRow === null || placeholderRow === void 0 ? void 0 : placeholderRow.remove();
    }
    createRow(id, note) {
        const table = document.getElementById("todos-table-body");
        const child = document.createElement("tr");
        child.setAttribute("id", `todo-item-${id}`);
        child.innerHTML = `
            <td id="todo-buttons-${id}">
                <button id="todo-edit-${id}">Edit</button>
                <button id="todo-remove-${id}">Remove</button>
            </td>
            <td class="description-column" id="todo-description-${id}">
                ${note}
            </td>
        `;
        table === null || table === void 0 ? void 0 : table.appendChild(child);
        const newEditButton = document.getElementById(`todo-edit-${id}`);
        newEditButton === null || newEditButton === void 0 ? void 0 : newEditButton.addEventListener('click', () => this.edit(id));
        const newRemoveButton = document.getElementById(`todo-remove-${id}`);
        newRemoveButton === null || newRemoveButton === void 0 ? void 0 : newRemoveButton.addEventListener('click', () => this.remove(id));
    }
    clearInput() {
        const input = document.getElementById("todos-input");
        input.value = "";
    }
    edit(id) {
        const exists = this.todos.some(t => t.id === id);
        if (!exists)
            return;
        this.editTodoHtml(id);
    }
    editTodoHtml(id) {
        var _a;
        const saveButton = document.createElement("button");
        saveButton.setAttribute("id", `todo-save-${id}`);
        saveButton.innerText = "Save";
        saveButton.addEventListener('click', () => this.saveEdit(id));
        const editButton = document.getElementById(`todo-edit-${id}`);
        (_a = editButton === null || editButton === void 0 ? void 0 : editButton.parentNode) === null || _a === void 0 ? void 0 : _a.prepend(saveButton);
        editButton === null || editButton === void 0 ? void 0 : editButton.remove();
        const description = document.getElementById(`todo-description-${id}`);
        const oldDescription = description === null || description === void 0 ? void 0 : description.innerText;
        if (description) {
            description.innerHTML = `
                <input type="text" id="todo-text-input-${id}" />
            `;
        }
        const newInput = document.getElementById(`todo-text-input-${id}`);
        newInput.value = oldDescription !== null && oldDescription !== void 0 ? oldDescription : "";
    }
    saveEdit(id) {
        const note = document.getElementById(`todo-description-${id}`);
        const todo = this.todos.find(t => t.id === id);
        if (!todo)
            return;
        todo.note = note.value;
        this.alterSavedHtml(id);
    }
    alterSavedHtml(id) {
        var _a;
        const editButton = document.createElement("button");
        editButton.setAttribute("id", `todo-edit-${id}`);
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => this.edit(id));
        const saveButton = document.getElementById(`todo-save-${id}`);
        (_a = saveButton === null || saveButton === void 0 ? void 0 : saveButton.parentNode) === null || _a === void 0 ? void 0 : _a.prepend(editButton);
        saveButton === null || saveButton === void 0 ? void 0 : saveButton.remove();
        const oldDescriptionInput = document.getElementById(`todo-text-input-${id}`);
        const description = document.getElementById(`todo-description-${id}`);
        if (description) {
            description.innerHTML = oldDescriptionInput.value;
        }
    }
    get(id) {
        const todo = this.todos.find(t => t.id === id);
        return todo;
    }
    list(includeCompleted) {
        if (includeCompleted || this.todos.length === 0)
            return this.todos;
        return this.todos.filter(t => !t.isCompleted);
    }
    remove(id) {
        const tr = document.getElementById(`todo-item-${id}`);
        tr === null || tr === void 0 ? void 0 : tr.remove();
    }
}
exports.default = TodoService;
