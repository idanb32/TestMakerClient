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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}>
          
          </Route>
          <Route path="/MainMenu" element={<MainMenu />}>
            
          </Route>
          <Route path="/Register" element={<Register />}>
            
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
