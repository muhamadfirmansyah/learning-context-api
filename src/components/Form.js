import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

const Form = () => {
    const [text, setText] = useState("");

    const { add } = useContext(DataContext);    

    const submit = (e) => {
        e.preventDefault();

        add(text);
        setText("");
    }

    return (
        <form onSubmit={submit}>
            <input type="text" value={text} placeholder="Enter new list" onChange={(e) => setText(e.target.value)} />
            <button>Add</button>
        </form>
    )
}

export default Form;