import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState(new Date());

  setInterval(() => {
    setState(new Date());
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <p>{state.toLocaleTimeString()}</p>
      </header>
    </div>
  );
}

export default App;
