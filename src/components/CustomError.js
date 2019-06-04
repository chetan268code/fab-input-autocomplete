import React from 'react'

function CustomError(props) {
    return (
        <div className="no-suggestions">
            <em>{props.msg}</em>
        </div>
    )
}

export default CustomError
