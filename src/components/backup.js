import React, {useEffect} from 'react'
import {v4 as uuidv4} from "uuid";
import { useFormik } from "formik"

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {
    
    const formik = useFormik({
        initialValues: {
            todoinput: '',
        },
        onSubmit: values => {
        // handle form submission
        },
    });

    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? {title, id, completed} : todo
        )
        setTodos(newTodo);
        setEditTodo("");
    }

    useEffect(() => {
        if(editTodo){
            setInput(editTodo.title)
        }
        else{
            setInput("")
        }
    }, [setInput, editTodo])

    const onFormSubmit = (event) => {
        event.preventDefault()
        if(!editTodo){
            setTodos([...todos, {id: uuidv4(), title: input, completed: false}])
            setInput("");
        }
        else{
            updateTodo(input, editTodo.id, editTodo.completed)
        }
        
    }

    return(
        <form onSubmit={onFormSubmit} className="todo-form">
            <input type="text"
             placeholder="Add a todo" 
             className= {editTodo ? 'todo-input edit' : 'todo-input'}
             name='todoinput'
             value={input}
             required
             onChange={onInputChange}
             />
             {editTodo ? <button className='todo-button edit'>Update</button> : <button className='todo-button'>Add</button>}
        </form>
    )
}
export default Form