import React from 'react'

const FormInput = ({ type, placeholder, className, name, value, onChange }) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                className={className}
                name={name}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default FormInput