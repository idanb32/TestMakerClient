import './App.css';
import React from 'react';
import {  BrowserRouter, Route, Routes, Switch} from 'react-router-dom';

import MenuGrid from './GlobalComponents/MenuGrid/MenuGrid';
import MangeQuestion from './Views/MangeQuestion/MangeQuestion';
import MangeQuiz from './Views/MangeQuiz/MangeQuiz';
import Register from './Views/Register/register';
import MainMenu from './Views/MainMenu/mainMenu';
import LoginPage from './Views/Login/login';

import EditQuestion from './Views/EditQuestion/EditQuestiom';


const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}>
          
          </Route>
          <Route path="/MainMenu" element={<MainMenu />}>
            
          </Route>
          <Route path="/Register" element={<Register />}>
            
          </Route>
          <Route path='/QuizMenu' element={<MangeQuiz />}> </Route>
          <Route path='/QuestionMenu'  element={<MangeQuestion />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
