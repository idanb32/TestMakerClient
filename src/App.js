import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Line from './GlobalComponents/Line/Line';
import MenuGrid from './GlobalComponents/MenuGrid/MenuGrid';



const App = () => {
  const item = {
    language: "new english",
    testName: "js test",
    passingGrade: 90,
    msgOnPassSubject: "pass",
    msgOnPassBody: "pass body",
    msgOnFailSubject: "new fail",
    msgOnFailBody: "new fail body",
    btn: <button >coolBtn</button>
  }
  const item1 = {
    language: "new english",
    testName: "js test",
    passingGrade: 90,
    msgOnPassSubject: "pass",
    msgOnPassBody: "pass body",
    msgOnFailSubject: "new fail",
    msgOnFailBody: "new fail body",
    btn: <button >coolBtn</button>
  }
  const item3 = {
    language: "new english",
    testName: "js test",
    passingGrade: 90,
    msgOnPassSubject: "pass",
    msgOnPassBody: "pass body",
    msgOnFailSubject: "new fail",
    msgOnFailBody: "new fail body",
    btn:[
       <button >coolBtn</button>,
       <button >coolBtn</button>,
       <button >coolBtn</button>
    ]
  }
  const item2 = {
    language: "language",
    testName: "testName",
    passingGrade: "passingGrade",
    msgOnPassSubject: "msgOnPassSubject",
    msgOnPassBody: "msgOnPassBody",
    msgOnFailSubject: "msgOnFailSubject",
    msgOnFailBody: "msgOnFailBody",
    btn: ""
  }
  const items = [item2, item1, item, item3]
  return (
    <div className="App">
      in app im sane yay sdsdsdsd
      <MenuGrid items={items} />
      <Router>

      </Router>
    </div>
  );
}

export default App;
