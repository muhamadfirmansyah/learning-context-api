import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Todos = () => {
    const {lists} = useContext(DataContext)

    return (
        <div>
            <ul>
                { lists.map((item) => 
                    <li key={item.id}>
                        {item.title}
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default Todos;