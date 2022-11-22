import React, {useEffect} from 'react'
import {v4 as uuidv4} from "uuid"
import { useFormik } from "formik"
import FormInput from './common/FormInput'
import SubmitButton from './common/SubmitButton'
import * as Yup from "yup"

const Form = ({todos, setTodos, editTodo, setEditTodo}) => {
    const formik = useFormik({
        initialValues: {
            todoText: '',
        },
        
        onSubmit: (values, actions) => {
            if(!editTodo){
                setTodos([...todos, {id: uuidv4(), title: values.todoText, completed: false}])
                // actions.resetForm({
                //     values: {
                //         todoText: ''
                //     }
                // })

                formik.setFieldValue('todoText', "", false)
            }
            else{
                updateTodo(values.todoText, editTodo.id, editTodo.completed)
                formik.setFieldValue('todoText', "", false)
            }
        },

        validationSchema: Yup.object().shape({
            todoText: Yup.string()
            .required("Required"),
        }),
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
            formik.setFieldValue("todoText", "")
        }
        // eslint-disable-next-line
    }, [editTodo])

    const customStyle = {inputEdit: 'todo-input edit', todoInput: 'todo-input', addButton: 'todo-button', editButton: 'todo-button edit', }
    const temp  = [{id: 1, type: "text", placeholder: "add a todo"}]

    const formInput = temp.map(item => { return <FormInput
        type={item.type}
        placeholder={item.placeholder}
        className={editTodo ? customStyle.inputEdit : customStyle.todoInput}
        name="todoText"
        value={formik.values.todoText}
        onChange={formik.handleChange}
        />
    })

    return ( 
        <form 
            onSubmit={formik.handleSubmit} 
            className="todo-form">

            {formInput}
                
            <SubmitButton 
                className={editTodo ? customStyle.editButton : customStyle.addButton}
                text={editTodo ? "Update" : "Add"}
            /> 
            {formik.touched.todoText && formik.errors.todoText && <li className="errorMsg">{formik.errors.todoText}</li>}
        </form>
    )
}

export default Form