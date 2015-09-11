/*
  Todos app.

  Consists of a form and a list of todo elements.

  Each todo has a text and a done property. To be able to remove a todo again
  each element has an internal id. Both the todo elements and the last id are
  stored in the state of the Todos component.

  If a server where used to store the elements permanentlz an additional server
  side id would have to be added to synch the client with the server.

*/

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Todo = React.createClass({
  onRemoveClick: function(e) {
    e.preventDefault();
    this.props.todoAPI.onTodoRemove(this.props.todoId);
  },
  onTodoDone: function(e) {
    this.props.todoAPI.onTodoDone(this.props.todoId);
  },
  render: function() {
    return (
      <div className="todo">
        {this.props.done
          ? <input type="checkbox" checked={true} disabled="disabled" />
          : <input type="checkbox" checked={false}
              onChange={this.onTodoDone} id={"todo-" + this.props.todoId}
            />
        }
        <label htmlFor={"todo-" + this.props.todoId}
        >{this.props.children}</label>
        {this.props.done
          ? <button onClick={this.onRemoveClick}>Remove</button>
          : null
        }
      </div>
    );
  },
});

var TodosList = React.createClass({
  render: function () {
    var todosEntries = this.props.todos.map(function(todo, index) {
      return (
        <Todo done={todo.done} todoId={todo.id} todoAPI={this.props.todoAPI}
          key={index}
        >
          {todo.text}
        </Todo>
      );
    }, this);
    return (
      <div className="todos-list">
        <ReactCSSTransitionGroup transitionName="todos-list">
          {todosEntries}
        </ReactCSSTransitionGroup>
      </div>
    );
  },
});

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var todoText = React.findDOMNode(this.refs.todoText);
    this.props.onTodoSubmit({text: todoText.value.trim(), done: false});
    todoText.value = "";
  },
  render: function() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="New todo" ref="todoText" />
        <input type="submit" value="Add" />
      </form>
    );
  },
});

var Todos = React.createClass({
  getInitialState: function() {
    // Todo entry: {text: "", done: false, id: 123, realID: 123}
    // TODO: realID is not implemented, but should then be the server/DB side
    // id of the todo element.
    // TODO: issue a request to the server to get all todo elements, setting
    // and advancing the local index (lastIndex variable in this.state).
    return {todos: [], lastIndex: 0};
  },
  handleTodoSubmit: function(newTodo) {
    var todos = this.state.todos;
    var lastIndex = this.state.lastIndex;
    lastIndex++;
    newTodo.id = lastIndex;
    todos.push(newTodo);
    // TODO: notify server, on response undo or set realID
    this.setState({todos: todos, lastIndex: lastIndex});
  },
  markTodoDone: function(todoId) {
    var todos = this.state.todos;
    var index = todos.findIndex(e => e.id === todoId);
    if (index >= 0) {
      todos[index].done = true;
      // TODO: notify server, undo action if that fails.
    }
    else {
      console.log("Could not mark todo as done. ID not found: " + todoId);
    }
    this.setState({todos: todos});
  },
  removeTodo: function(todoId) {
    var todos = this.state.todos;
    var index = todos.findIndex(e => e.id === todoId);
    if (index >= 0) {
      todos.splice(index, 1);
      // TODO: notify server, undo remove if that fails
    }
    else {
      console.log("Could not remove. ID not found: " + todoId);
    }
    this.setState({todos: todos});
  },
  render: function() {
    var todoAPI = {
      onTodoRemove: this.removeTodo,
      onTodoDone: this.markTodoDone,
    }
    var left = this.state.todos.reduce((s, e) => s + (e.done ? 0 : 1), 0);
    return (
      <section className="todos-container">
        <div className="title-add-container">
          <h1>Todos</h1>
          <hr className="divider-title"/>
          <TodoForm onTodoSubmit={this.handleTodoSubmit} />
        </div>
        <div className="todos-list-container">
          <TodosList todos={this.state.todos} todoAPI={todoAPI} />
          <hr />
          <div className="todos-count">
            {(left === 0
              ? <span>no items left</span>
              : (left == 1
                ? <span>1 item left</span>
                : <span>{left} items left</span>
              )
            )}
          </div>
        </div>
      </section>
    );
  },
});
