import React from 'react';
import './App.css';
import NytFetch from './components/nytFetch';

const App: React.FunctionComponent=()=> {
  return (
    <div className="App">
      <NytFetch />
    </div>
  );
}

export default App;
