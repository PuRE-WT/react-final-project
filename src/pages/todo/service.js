
export class TodoService {
  constructor() {
    const localTodos = localStorage.getItem('todos');
    this.todos = localTodos ? JSON.parse(localTodos) : [];
  }

  syncToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.syncToLocalStorage();
  }

  doneTodo(todoId) {
    this.todos = this.todos.map(todo => {
      if (todo.id === todoId) {
        todo.done = true;
      }
      return todo;
    });
    this.syncToLocalStorage();
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    this.syncToLocalStorage();
  }
}

