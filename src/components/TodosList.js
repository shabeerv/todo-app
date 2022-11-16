import React from "react";
import {RiCloseCircleLine } from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'

const TodosList = ({ todos, setTodos, setEditTodo }) => {

    const handleEdit = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id)
        setEditTodo(findTodo)
    }

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if(item.id === todo.id) {
                    return {...item, completed: !item.completed}
                }
                return item;
            })
        )
    }

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id} className={todo.completed ? 'todo-row complete' : 'todo-row'}>
                    <div key={todo.id} onClick={() => handleComplete(todo)}>
                        {todo.title}
                    </div>
                    <div className="icons">
                        <RiCloseCircleLine 
                            onClick={() => handleDelete(todo)}
                            className='delete-icon'
                        />
                        <TiEdit
                            onClick={() => handleEdit(todo)}
                            className="edit-icon"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TodosList