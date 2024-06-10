import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentComponent from './Main_Menu/Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentComponent />} />
      </Routes>
    </Router>
  );
}
export default App;