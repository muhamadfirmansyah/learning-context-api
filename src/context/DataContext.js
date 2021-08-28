import React, { createContext, useReducer } from 'react';
import { listReducer } from '../reducers/listReducer';

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

    const [lists, dispatch] = useReducer(listReducer, initialState);
    
    return (
        <DataContext.Provider value={{ lists, dispatch }}>
            { props.children }
        </DataContext.Provider>
    )
}