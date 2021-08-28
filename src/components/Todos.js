import React, { useContext } from 'react';
import { del } from '../actions/listAction';
import { DataContext } from '../context/DataContext';

const Todos = () => {
    const { lists, dispatch } = useContext(DataContext)

    const removeItem = (id) => {
        dispatch(del(id))
    }

    return (
        <div>
            <ul>
                { lists.map((item) => 
                    <li key={item.id}>
                        {item.title}
                        <button onClick={() => removeItem(item.id)}>remove</button>
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default Todos;