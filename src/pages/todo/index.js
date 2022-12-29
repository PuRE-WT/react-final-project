import React from "react";
import {TodoService} from "./service";

export class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: '',
      todos: [],
      todoService: new TodoService()
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos() {
    const todos = [...this.state.todoService.todos];
    todos.sort((prev, next) => {
      if (prev.done) {
        return 1;
      }
      return -1;
    })
    this.setState({
      todos: todos
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      todo: ''
    })
    this.state.todoService.addTodo({
      id: Date.now(),
      task: this.state.todo
    });
    this.refreshTodos();
  }

  handleClickDone(e, todo) {
    if (e.target.checked) {
      this.state.todoService.doneTodo(todo.id);
      this.refreshTodos();
    }
  }

  handleClickRemove(todo) {
    this.state.todoService.deleteTodo(todo.id);
    this.refreshTodos();
  }

  render() {
    return (
      <div className={'container'}>
        <h1 className={'mt-2'}>Todo List</h1>
        <form
          className={'border-bottom border-5 pb-4'}
          onSubmit={this.handleSubmit}>
          <div className={'d-flex mt-2'}>
            <input
              value={this.state.todo}
              onChange={e => {
                this.setState({
                  todo: e.target.value
                })
              }}
              required
              placeholder={'Task'} className={'form-control me-2'} />
            <button className={'btn btn-primary'}>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </form>
        <div className={'p-2 mt-2'}>
          {this.state.todos.map(todo => {
            return (
              <div key={todo.id} className={'p-3 bg-secondary d-flex rounded mb-2'}>
                <h4
                  style={{
                    maxWidth: '60%',
                    wordBreak: 'break-all'
                  }}
                  className={'text-white m-0 me-auto'}>
                  {todo.task}
                </h4>
                <input
                  checked={todo.done}
                  disabled={todo.done}
                  onChange={e => this.handleClickDone(e, todo)}
                  className="form-check-input me-2"
                  id={todo.id}
                  type="checkbox"
                   />
                <label
                  style={{textDecoration: todo.done ? 'line-through' : ''}}
                  className={'text-white me-2'} htmlFor={todo.id}>Done</label>

                {todo.done && <i onClick={() => this.handleClickRemove(todo)} className="bi bi-trash3-fill text-danger"></i>}
              </div>
            )
          })}
          {this.state.todos.length === 0 && (
            <div className="alert alert-primary" role="alert">
              You didn't have any todo!
            </div>
          )}
        </div>
      </div>
    )
  }
}

