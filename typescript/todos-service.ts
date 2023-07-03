import {Todo} from "./Todo.js";

let todoService: TodoService;

window.onload = function onload() {
    todoService = new TodoService();
    const addButton = document.getElementById("todos-add");
    addButton?.addEventListener('click', () => todoService.add())
}

export default class TodoService {
    private todos: Todo[] = [];

    add() {
        const note = (document.getElementById("todos-input") as HTMLInputElement).value;

        if (!note)
            return;

        const id = this.addTodo(note);
        this.removePlaceholderRow();
        this.createRow(id, note);
        this.clearInput();
    }

    private addTodo(note: string): number {
        const newId = this.todos[this.todos.length - 1]?.id ?? 0 + 1;
        const newTodo = {
            id: newId,
            note: note,
            isCompleted: false
        }
        this.todos.push(newTodo);

        return newId;
    }

    private removePlaceholderRow() {
        const hasExistingTodos = todoService.list(true);
    
        if (hasExistingTodos)
            return;
    
        const placeholderRow = document.getElementById("placeholder-row");
        placeholderRow?.remove();
    }

    private createRow(id: number, note: string) {
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
        table?.appendChild(child);
    
        const newEditButton = document.getElementById(`todo-edit-${id}`);
        newEditButton?.addEventListener('click', () => this.edit(id));
    
        const newRemoveButton = document.getElementById(`todo-remove-${id}`);
        newRemoveButton?.addEventListener('click', () => this.remove(id));
    }

    private clearInput() {
        const input = document.getElementById("todos-input") as HTMLInputElement;
        input.value = "";
    }

    edit(id: number) {
        const exists = this.todos.some(t => t.id === id);

        if (!exists)
            return;

        this.editTodoHtml(id);
    }

    private editTodoHtml(id: number) {
        const saveButton = document.createElement("button");
        saveButton.setAttribute("id", `todo-save-${id}`);
        saveButton.innerText = "Save";
        saveButton.addEventListener('click', () => this.saveEdit(id));
    
        const editButton = document.getElementById(`todo-edit-${id}`);
        editButton?.parentNode?.prepend(saveButton);
        editButton?.remove();
    
        const description = document.getElementById(`todo-description-${id}`);
        const oldDescription = description?.innerText;
        if (description) {
            description.innerHTML = `
                <input type="text" id="todo-text-input-${id}" />
            `;
        }

        const newInput = document.getElementById(`todo-text-input-${id}`) as HTMLInputElement;
        newInput.value = oldDescription ?? "";
    }

    saveEdit(id: number) {
        const note = (document.getElementById(`todo-description-${id}`) as HTMLInputElement);
        const todo = this.todos.find(t => t.id === id);

        if (!todo)
            return;

        todo.note = note.value;

        this.alterSavedHtml(id);
    }

    private alterSavedHtml(id: number) {
        const editButton = document.createElement("button");
        editButton.setAttribute("id", `todo-edit-${id}`);
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => this.edit(id));

        const saveButton = document.getElementById(`todo-save-${id}`);
        saveButton?.parentNode?.prepend(editButton);
        saveButton?.remove();

        const oldDescriptionInput = document.getElementById(`todo-text-input-${id}`);
        const description = document.getElementById(`todo-description-${id}`);
        if (description) {
            description.innerHTML = (oldDescriptionInput as HTMLInputElement).value;
        }
    }

    get(id: number): Todo | undefined {
        const todo = this.todos.find(t => t.id === id);
        return todo;
    }

    list(includeCompleted: boolean): Todo[] {
        if (includeCompleted || this.todos.length === 0)
            return this.todos;

        return this.todos.filter(t => !t.isCompleted);
    }

    remove(id: number) {
        const tr = document.getElementById(`todo-item-${id}`);
        tr?.remove();
    }
}