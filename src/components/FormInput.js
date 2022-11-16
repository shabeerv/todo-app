import React from 'react'

const FormInput = (props) => {
    return (
        <>
        <input type = {props.type}
            placeholder = {props.placeholder}
            className = {props.className}
            name = {props.name}
            value = {props.value}
            onChange={props.onChange}
        />
        </>
    )
}
export default FormInput