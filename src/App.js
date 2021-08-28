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
