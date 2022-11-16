import React, {useEffect} from 'react'
import {v4 as uuidv4} from "uuid";
import { useFormik } from "formik"

const Form = ({todos, setTodos, editTodo, setEditTodo}) => {
    
    const formik = useFormik({
        initialValues: {
            todoText: '',
        },
        onSubmit: values => {

        // handle form submission
            if(!editTodo){
                setTodos([...todos, {id: uuidv4(), title: values.todoText, completed: false}])
                formik.setFieldValue("todoText", "")
            }
            else{
                updateTodo(values.todoText, editTodo.id, editTodo.completed)
                formik.setFieldValue("todoText", "")
            }
        },
    });

    // const onInputChange = (event) => {
    //     setInput(event.target.value)
    // }

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? {title, id, completed} : todo
        )
        setTodos(newTodo);
        setEditTodo("");
    }

    useEffect(() => {
        // console.log(editTodo)
        if(editTodo){
            formik.setFieldValue("todoText", editTodo.title)
        }
        else{
            formik.setFieldValue("")
        }
    }, [editTodo])

    // const onFormSubmit = (event) => {
    //     event.preventDefault()
    //     if(!editTodo){
    //         setTodos([...todos, {id: uuidv4(), title: input, completed: false}])
    //         setInput("");
    //     }
    //     else{
    //         updateTodo(input, editTodo.id, editTodo.completed)
    //     }
        
    // }

    return(
        <form onSubmit={formik.handleSubmit} className="todo-form">
            <input type="text"
             placeholder="Add a todo" 
             className= {editTodo ? 'todo-input edit' : 'todo-input'}
             name='todoText'
             value={formik.values.todoText}
             required
             onChange={formik.handleChange}
             />
             {editTodo ? <button type="submit" className='todo-button edit'>Update</button> : <button type="submit" className='todo-button'>Add</button>}
        </form>
    )
}
export default Form