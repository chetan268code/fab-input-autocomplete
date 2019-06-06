import React from 'react';
import Autocomplete from "./components/Autocomplete";

function App() {
  return (
    <div className="input-wrapper" data-test="input-wrapper">
      <h1 className="heading" data-test="heading">Search for Hotels !!</h1>
      <Autocomplete throttle={1000} locations={true} establishments={true} />
    </div>
  );
}

export default App;