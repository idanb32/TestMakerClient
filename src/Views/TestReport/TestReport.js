import React from 'react';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import SolvedService from './Services/SolvedService';
import Button from '../../GlobalComponents/Button/Button';
import TestService from './Services/TestService';
import MenuGrid from '../../GlobalComponents/MenuGrid/MenuGrid';
import './TestReport.css'



const TestReport = (props) => {
    const location = useLocation();

    const [testName, setTestName] = useState({})
    const [userSolvedList, setListSolved] = useState([])
    const [formatedQuestion, setFormatedQuestion] = useState([])
    const [numOfSolved, setNumOfSolved] = useState(0);
    const [numOfQuestion, setNumOfQustion] = useState(0);


    const handleShowQ = () => {

        let newFormatedQuestion = [];
        let titles = {
            UserName: "User Name",
            submittedDate: "Submitted",
            numberOfQuestion: "Number of Questions Answered",
            grade: "Grade",
            moveToMe: "Move to a spacific report"
        }
        newFormatedQuestion.push(titles);
        userSolvedList.forEach(user => {
            if (user != null) {
                let newAnwer = {
                    UserName: <label>{user.userName}</label>,
                    submittedDate: <label>{user.dateTaken}</label>,
                    numberOfQuestion: <label>{user.userAnswer.length}</label>,
                    grade: <label>{user.score}</label>,
                    moveToME: <Link to={'/CurrentReport'} state={{ state: { quiz: testName, userName: user.userName, solvedId: user._id, testName: testName.testName } }}> <Button text="Move to me" /> </Link>
                }
                newFormatedQuestion.push(newAnwer);
            }
        });
        return <MenuGrid items={newFormatedQuestion} />
    }

    // need to change to get from state aka un comment the useEffect veriables.

    useEffect(async () => {
        let name = location.state.testName;
        let from = null;
        let to = null;

        if (location.state.hasOwnProperty("fromDatePass"))
            from = location.state.fromDatePass;
        if (location.state.hasOwnProperty("toDatePass"))
            to = location.state.toDatePass;
        let result = await TestService(name);
        setNumOfQustion(result.questions.length)
        setTestName(result);
        let res = await SolvedService(result._id, from, to);
        if (res)
            setNumOfSolved(res.length);
        else
            setNumOfSolved(0);
        setListSolved(res);
    }, [])

    return (
        <div>
            <h1>Test Report: מבחן הערכה</h1>
            <div className="testContainer">

                <div>
                    <div><h4>Summary</h4></div>
                    <div className='testReportFirstLine'>
                        <label>test name: </label><label>{testName.testName}</label>
                        <label> Date of test: </label><label>{testName.date}</label>
                    </div>
                    <div className='testReportFirstLine'>
                        <label>Number of Submission: </label><label>{numOfSolved}</label>
                    </div>
                    <div className='testReportFirstLine'>
                        <label>test ID: </label><label>{testName._id}</label>
                    </div>
                    <div className='testReportFirstLine'>
                        <label>test language: </label><label>{testName.language}</label>
                    </div>
                    <div className='testReportFirstLine'>
                        <label>number of Questions: </label><label>{numOfQuestion}</label>
                    </div>
                    <div className='testReportFirstLine'>
                        <label>passing grade: </label><label>{testName.passingGrade}</label>
                    </div>

                </div>
            </div>

            <div className="solvedTable">
                <div>
                    <h2>Respondent Grades And Answers</h2>
                </div>
                {handleShowQ()}


            </div>

        </div>
    )
}
export default TestReport;