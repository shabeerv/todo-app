import React from 'react'

const ButtonComponent = (props) => {
    return (
        <button form={props.form} type={props.type} className={props.className}>{props.text}</button> 
    )
}
export default ButtonComponent