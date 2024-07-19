import React from 'react'

const ModelBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    classname,
    type
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={`bg-yellow-200 text-black font-semibold p-2 rounded-lg ${classname}`}
    >
    {
        children ? ( <> <span> {text }</span> {children} </>) : (<>{text}</>)
    }
    
    </button>
  )
}

export default ModelBtn
