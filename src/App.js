import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MenuGrid from './GlobalComponents/MenuGrid/MenuGrid';
import MangeQuestion from './Views/MangeQuestion/MangeQuestion';
import MangeQuiz from './Views/MangeQuiz/MangeQuiz';


const App = () => {
  
  return (
    <div className="App">
      in app im sane yay sdsdsdsd
      <MangeQuiz/>
      <Router>

      </Router>
    </div>
  );
}

export default App;
