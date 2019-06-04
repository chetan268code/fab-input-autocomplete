import React from 'react';
import './css/App.css';
import Autocomplete from "./components/Autocomplete";

function App() {
  return (
    <div className="input-wrapper">
      <h1 className="heading">Search for Hotels !!</h1>
      <Autocomplete throttle={10000} />
    </div>
  );
}

export default App;
