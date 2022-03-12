import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

import  Converter from './components/Converter';
import Conversion_history from './components/Conversion_history';
import logo from './assets/hatch_studio-logo_combination-white.png';

function App() {
  return (
    <div className="app-container">
      <div className="app-logo">
        <img className="logo" src={logo} alt="Hatch logo"/>
      </div>
      <Router>
      <Routes>
      <Route path="/" element={<Converter />} />
      <Route path="/Conversion_history" element={<Conversion_history />} />
      
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
