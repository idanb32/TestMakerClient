import './App.css';
import React from 'react';
import {  BrowserRouter, Route, Routes, Switch} from 'react-router-dom';

import MangeQuestion from './Views/MangeQuestion/MangeQuestion';
import MangeQuiz from './Views/MangeQuiz/MangeQuiz';
import Register from './Views/Register/register';
import MainMenu from './Views/MainMenu/mainMenu';
import LoginPage from './Views/Login/login';
import ClientTest from './Views/ClientTest/ClientTest';
import ClientFinishedTest from './Views/ClientFinishedTest/ClientFinishedTest';
import EditQuestion from './Views/EditQuestion/EditQuestiom';
import ClientMenu from './Views/ClientMenu/ClientMenu';
import EditQuiz from './Views/EditQuiz/EditQuiz';
import SearchReport from './Views/SearchReport/SearchReport';
import TestReport from './Views/TestReport/TestReport';
import CurrentReport from './Views/CurrentReport/CurrentReport';


const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}>
          
          </Route>
          <Route path="/MainMenu" element={<MainMenu />}>
            
          </Route>
          <Route path="/Register" element={<Register />}>
            
          </Route>
          <Route path='/QuizMenu' element={<MangeQuiz />}> </Route>
          <Route path='/QuestionMenu'  element={<MangeQuestion />} ></Route>
          <Route path='/EditQuestion'  element={<EditQuestion />} ></Route>
          <Route path='/EditQuiz'  element={<EditQuiz />} ></Route>
          <Route path='/ClientTest'  element={<ClientTest  />} ></Route>
          <Route path='/FinishedTest'  element={<ClientFinishedTest />} ></Route>
          <Route path='/ClientMenu'  element={<ClientMenu />} ></Route>
          <Route path='/CurrentReport'  element={<CurrentReport />} ></Route>
          <Route path='/SearchReport'  element={<SearchReport  />} ></Route>
          <Route path='/TestReport'  element={<TestReport  />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
