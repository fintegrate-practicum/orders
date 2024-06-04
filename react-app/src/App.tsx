import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentComponent from './Main_Menu/Menu';
import Men_Page from './Main_Menu/Men_Page';
import Boys_Page from './Main_Menu/Boys_Page';
import Girls_Page from './Main_Menu/Girls_Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentComponent />} />
        <Route path="/Men_Page" element={<Men_Page />} />
        <Route path="/Boys_Page" element={<Boys_Page />} />
        <Route path="/Girls_Page" element={<Girls_Page />} />
      </Routes>
    </Router>
  );
}
export default App;