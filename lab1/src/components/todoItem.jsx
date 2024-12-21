import React from 'react';
import editIcon from './edit-icon.png';
import deleteIcon from './delete-icon.png';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false, 
      isEditing: false,
      title: props.item.title,
      description: props.item.description,
    };
  }
  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleSave = () => {
    const { title, description } = this.state;
    const { item, onEdit } = this.props;

    onEdit(item.id, title, description); 
    this.setState({ isEditing: false });
  };

  render() {
    const { item, onToggle, onDelete } = this.props;
    const { isHovered,isEditing, title, description } = this.state;

    return (
      <div 
        className="todo-item" 
        onMouseEnter={() => this.setState({ isHovered: true })} 
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <input 
          type="checkbox" 
          checked={item.completed} 
          onChange={() => onToggle(item.id)} 
        />
       <div className="todo-details">
          {isEditing ? (
            <>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => this.setState({ title: e.target.value })} 
              />
              <textarea 
                value={description} 
                onChange={(e) => this.setState({ description: e.target.value })} 
              />
              <button onClick={this.handleSave}>Save</button>
            </>
          ) : (
            <>
              <span className={item.completed ? 'completed' : ''}>{item.title}</span>
              <p className="description">{item.description}</p>
            </>
          )}
        </div>
        <span className="timestamp">{item.timestamp}</span>
        {isHovered && !isEditing && (
          <div className="action-buttons">
            <button onClick={this.handleEdit}>
              <img src={editIcon} alt="Редактировать" />
            </button>
            <button className="delete-btn" onClick={() => onDelete(item.id)}>
              <img src={deleteIcon} alt="Удалить" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TodoItem;