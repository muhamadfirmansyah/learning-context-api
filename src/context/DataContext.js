import React, { createContext, useState } from 'react';

// Export Context
export const DataContext = createContext();

// Data
const initialState = [
    {
        id: 1,
        title: 'This is title one',
    }
]

// Provider : agar komponen bisa mengunakan context
export const DataProvider = (props) => {

    const [lists, setLists] = useState(initialState);

    const add = (data) => {
        const newItem = {
            id: lists.length + 1,
            title: data
        }

        const newList = [...lists, newItem];

        setLists(newList)
    }

    const remove = (id) => {
        setLists(lists.filter(item => item.id !== id));
    }
    
    return (
        <DataContext.Provider value={{ lists, add, remove }}>
            { props.children }
        </DataContext.Provider>
    )
}