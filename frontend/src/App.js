
import React from 'react';
import RepoGrid from './RepoGrid';
import RepoChart from './RepoChart';

function App() {
  return (
    <div>
      <RepoChart repo="freeCodeCamp/freeCodeCamp" />
      <RepoGrid />
    </div>
  );
}

export default App;
