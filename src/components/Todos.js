import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Todos = () => {
    const { remove, lists } = useContext(DataContext)

    const removeItem = (id) => {
        remove(id)
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