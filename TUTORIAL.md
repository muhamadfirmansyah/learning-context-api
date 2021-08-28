### Membuat Context Data

```js
// App.js

import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>Context API</h4>
      </header>

      <main>
        <Todos />
      </main>
    </div>
  );
}

export default App;
```

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { DataProvider } from './context/DataContext'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

```js
// src/components/Todos.js

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
```

```js
// src/context/DataContext.js

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
```


---

# Menambah Data ke Context

```js
// src/components/Form.js

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
```

```js
// src/context/DataContext.js

    const add = (data) => {
        const newItem = {
            id: lists.length + 1,
            title: data
        }

        const newList = [...lists, newItem];

        setLists(newList)
    } 
```

---

### Menghapus Data di Context

```js
// src/components/Todos.js

    //
    const { remove, lists } = useContext(DataContext)

    const removeItem = (id) => {
        remove(id)
    }

    //
    <button onClick={() => removeItem(item.id)}>remove</button>
```

```js
// src/context/DataContext.js

    //
    const remove = (id) => {
        setLists(lists.filter(item => item.id !== id));
    }

    //
    <DataContext.Provider value={{ lists, add, remove }}>
```

---

### Menggunakan Reducer dan Action

```js
// src/components/Form.js

    const { dispatch } = useContext(DataContext);

    const submit = (e) => {
        e.preventDefault();

        const action = {
            type: "ADD",
            payload: text
        }

        dispatch(action);
        setText("");
    }
```

```js
// src/components/Todos.js

    const { lists, dispatch } = useContext(DataContext)

    const removeItem = (id) => {
        const action = {
            type: "DEL",
            payload: id
        }

        dispatch(action)
    }
```

```js
// src/context/DataContext.js

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
```

```js
// src/reducers/listReducer.js
export const listReducer = (state, action) => {
    const {type, payload} = action

    switch (type) {
        case "DEL":
            return state.filter((item) => item.id !== payload)

        case "ADD":
            const newItem = {
                id: state.length + 1,
                title: payload
            }

            return [...state, newItem];

        default:
            return state;
    }
}
```