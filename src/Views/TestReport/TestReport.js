import React from 'react';

import {useLocation,useNavigate  } from "react-router-dom";
import {useState,useEffect} from 'react';
import SolvedService from './Services/SolvedService';
import Button from '../../GlobalComponents/Button/Button';
import TestService from './Services/TestService';
import MenuGrid from '../../GlobalComponents/MenuGrid/MenuGrid';


const TestReport = (props)=>{
const location = useLocation();

const [testName,setTestName] = useState({})
const [userSolvedList,setListSolved] = useState([])
const [formatedQuestion,setFormatedQuestion] = useState([])


// "_id": "62052835a0510f7ecf01df0e",
// "language": "english",
// "testName": "js test",
// "passingGrade": 90,
// "msgOnPassSubject": "pass",
// "msgOnPassBody": "pass body",
// "msgOnFailSubject": "fail",
// "msgOnFailBody": "fail body",
// "date": "2022-02-10T14:59:01.516Z",
// "subjectOfStudying": "62052834a0510f7ecf01df04",

const handleShowQ= ()=>{
   
    let newFormatedQuestion = [];
    let titles = {
        ID: "ID",
        responded: "Responded",
        submittedDate: "Submitted",
        numberOfQuestion : "Number of Questions Answered",
        grade : "Grade"
    }
    newFormatedQuestion.push(titles);
    userSolvedList.forEach(user => {
        let newAnwer = {
            ID: <label>{user.userId}</label>,
            responded: <label>{user.userId}</label>,
            submittedDate: <label>{user.dateTaken}</label>,
            numberOfQuestion : <label>{user.userAnswer.length}</label>,
            grade : <label>{user.score}</label>
        }
        newFormatedQuestion.push(newAnwer);
    });
    setFormatedQuestion(newFormatedQuestion)

}
useEffect(async()=>{
    let result = await TestService('testName');
    console.log(result);
    setTestName(result);
    let res = await SolvedService(result._id);
    console.log(res);
    setListSolved(res);
    handleShowQ();
},[])

    return(
        <div>
            <h1>Test Report: מבחן הערכה</h1>
            <div className="testContainer">
                
                <div>
            <div><h4>Summary</h4></div>
            <div>
            <label>test name:</label><label>{testName.testName}</label>
            <label>DateRange name:</label><label>{testName.date}</label>
            </div>
            <div>
            <label>test code:</label><label></label>
            <label>Number of Submission:</label><label></label>
            </div>
            <div>
            <label>test ID:</label><label>{testName._id}</label>
            <label>Number of Submission passed:</label><label></label>
            </div>
            <div>
            <label>test type:</label><label></label>
            <label>passing presentage:</label><label></label>
            </div>
            <div>
            <label>number of Questions:</label><label></label>
            <label>avgrage grade:</label><label></label>
            </div>
            <div>
            <label>passing grade:</label><label>{testName.passingGrade}</label>
            <label>median grade:</label><label></label>
            </div>
            
            </div>
            </div>

            <div className="solvedTable">
                <div>
                    <h2>Respondent Grades And Answers</h2>
                </div>
                <div>
                    click a name from the list to see the reponden test<Button text="Show Question" action={handleShowQ}></Button>
                </div>
               
                <MenuGrid items={formatedQuestion} />

            </div>

        </div>
    )
}
export default TestReport;