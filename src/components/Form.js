import React, {useEffect} from 'react'
import {v4 as uuidv4} from "uuid";
import { useFormik } from "formik"
import FormInput from './FormInput';
import ButtonComponent from './ButtonComponent'

const Form = ({todos, setTodos, editTodo, setEditTodo}) => {
    
    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? {title, id, completed} : todo
        )
        setTodos(newTodo);
        setEditTodo("");
    }

    useEffect(() => {

        if(editTodo) {
            formik.setFieldValue("todoText", editTodo.title)
        }
        else {
            formik.setFieldValue("")
        }
    }, [editTodo])


    const formik = useFormik({
        initialValues: {
            todoText: '',
        },
        onSubmit: values => {

            if(!editTodo){
                setTodos([...todos, {id: uuidv4(), title: values.todoText, completed: false}])
                formik.setFieldValue("todoText", "")
            }
            else{
                updateTodo(values.todoText, editTodo.id, editTodo.completed)
                formik.setFieldValue("todoText", "")
            }
        },

        validate: () => {
            const errors = {};
            if (!formik.values.todoText) {
            errors.todoText = "Required";
            } 
            return errors;
        },
    });


    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="todo-form">
                {editTodo ? 
                    <FormInput 
                        type ="text"
                        placeholder="Add a todo" 
                        className='todo-input edit'
                        name='todoText'
                        value={formik.values.todoText}
                        onChange={formik.handleChange}
                    />
                    :
                    <FormInput 
                        type ="text"
                        placeholder="Add a todo" 
                        className= 'todo-input'
                        name='todoText'
                        value={formik.values.todoText}
                        onChange={formik.handleChange}
                    />
                }
                {formik.touched.todoText && formik.errors.todoText ? <div className='errorMsg'>{formik.errors.todoText}</div> : null}
                {editTodo ? <ButtonComponent type="submit" className="todo-button edit" text="Update"  /> : <ButtonComponent type="submit" className="todo-button" text="Add"  />}
            </form>
        </div>
    )
}
export default Form