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
    
    return (
        <DataContext.Provider value={{ lists }}>
            { props.children }
        </DataContext.Provider>
    )
}