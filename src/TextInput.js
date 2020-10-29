import React from 'react';

const TextInput = (props) => {
    return (
        <div className="text-input">

            <input type="text" className="form-control" {...props} />

        </div>
    );
}

export default TextInput;