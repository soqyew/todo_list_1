import React from 'react';
import TodoItem from './todoItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      title: '',
      description: '',
      showCompleted: true,
      errorMessage: '',
    };
  }

  handleAdd = () => {
    const { title, description } = this.state;

    if (title.trim() === '') {
      this.setState({ errorMessage: 'Название задачи не может быть пустым.' });
      return;
    }
    if (title !== title.trim()) {
      this.setState({ errorMessage: 'Название задачи не может начинаться или заканчиваться пробелами.' });
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description,
      completed: false,
      timestamp: new Date().toLocaleString(),
    };

    this.setState((prevState) => ({
      todos: prevState.todos.concat(newTodo),
      title: '',
      description: '',
      errorMessage: '',
    }));
  };

  handleToggle = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleFilter = () => {
    this.setState((prevState) => ({
      showCompleted: !prevState.showCompleted,
    }));
  };
  handleEdit = (id, newTitle, newDescription) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo
      ),
    }));
  };

  render() {
    const { todos, title, description, showCompleted, errorMessage } = this.state;

    
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    const displayedTodos = showCompleted ? [...incompleteTodos, ...completedTodos] : incompleteTodos;

    return (
      <div className="todo-list">
        <h1>TODO List</h1>
        <input 
          type="text" 
          placeholder="Task name" 
          value={title} 
          onChange={(e) => this.setState({ title: e.target.value })} 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => this.setState({ description: e.target.value })} 
        />
        <button onClick={this.handleAdd}>Add</button>
        <button onClick={this.handleFilter}>
          {showCompleted ? 'Only unfulfilled' : 'Show all'}
        </button>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <div className="todo-items">
          {displayedTodos.map((item) => (
            <TodoItem 
              key={item.id} 
              item={item} 
              onToggle={this.handleToggle} 
              onDelete={this.handleDelete} 
              onEdit={this.handleEdit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;