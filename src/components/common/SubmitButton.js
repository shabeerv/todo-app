import React from 'react'

const SubmitButton = ({ className, text }) => {
    return (
        <button 
            type="submit" 
            className={className}>
            {text}
        </button> 
    )
}

export default SubmitButton