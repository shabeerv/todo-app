import React, {useEffect} from 'react'
import {v4 as uuidv4} from "uuid"
import { useFormik } from "formik"
import FormInput from './common/FormInput'
import SubmitButton from './common/SubmitButton'

const Form = ({todos, setTodos, editTodo, setEditTodo}) => {
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
        // eslint-disable-next-line
    }, [editTodo])

    const customStyle = {inputEdit: 'todo-input edit', todoInput: 'todo-input', addButton: 'todo-button', editButton: 'todo-button edit', }

    return (
        <div>
            <form 
                onSubmit={formik.handleSubmit} 
                className="todo-form"
            >
            <FormInput 
                type="text"
                placeholder="Add a todo"
                className={editTodo ? customStyle.inputEdit : customStyle.todoInput}
                name="todoText"
                value={formik.values.todoText}
                onChange={formik.handleChange}
            />
            <SubmitButton 
                className={editTodo ? customStyle.editButton : customStyle.addButton} 
                text={editTodo ? "Update" : "Add"}
            /> 
            {formik.touched.todoText && formik.errors.todoText ? <div className="errorMsg">{formik.errors.todoText}</div> : null}
            </form>
        </div>
    )
}

export default Form