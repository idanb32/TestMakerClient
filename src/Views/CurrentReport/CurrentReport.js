import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Icon from "../../GlobalComponents/Icon/Icon";
import MenuGrid from "../../GlobalComponents/MenuGrid/MenuGrid";
import Button from "../../GlobalComponents/Button/Button";

import './CurrentReport.css'

const port = 'http://localhost:5000/solvedQuestion/';
const Quizport = 'http://localhost:5000/quiz/';

const CurrentReport = () => {
    const nav = useNavigate();
    const { state } = useLocation();
    const [userName, setUserName] = useState();
    const [quizQuestions, setQuiz] = useState();
    const [userAnswer, setUserAnswers] = useState([]);
    const [score, setScore] = useState();
    const [dateTaken, setDateTaken] = useState();
    const [testName, setTestName] = useState();
    const [firstRender,setFirstRender] = useState(true);

    const renderQuestion = () => {
        if(firstRender) return
        let tmp2 = [];
        let labels = { question: "Question name", answers: "User answers" };
        console.log(quizQuestions);
        let tmp = quizQuestions.map((item) => {
            console.log(item);
            let answers = getAnswerForQuestion(item.id);
            let returnME = {
                question: <label>{item.questionName}: </label>,
                answers: answers
            }
            return returnME;
        });
        tmp.unshift(labels)
        return <MenuGrid items={tmp} />;
    }

    const getAnswerForQuestion = (id) => {
        let tmp = userAnswer.map((item) => {
            if(item==null || item === 'undefiend') return
            if (item.question == id) {
                let newItem = <div className="answer">{item.answer + " "} <Icon className={item.isCorrect ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"}
                    color={item.isCorrect ? "green" : "red"} /> </div>
                return newItem;
            }
        })
        return tmp;
    }


    useEffect(async () => {
        if (!state.state) return;
        let solvedQuiz = await axios.post(port + "get", { id: state.state.solvedId });
        let tmp = await axios.post(Quizport + "GetQuizQuestion", { id: state.state.quiz._id });
        console.log(tmp.data);
        console.log(solvedQuiz.data.userAnswer);
        setUserAnswers(solvedQuiz.data.userAnswer);
        setUserName(state.state.userName);
        setQuiz(tmp.data);
        setScore(solvedQuiz.data.score)
        setDateTaken(solvedQuiz.data.dateTaken);
        setTestName(state.state.testName)
        setFirstRender(false);
    }, [])

    return (<div className="currentReport">
        <div className="testInfo">
            <label>Test name : {testName}</label>
            <label>User name : {userName}</label>
            <label>Score  : {score}</label>
            <label>dateTaken  : {dateTaken}</label>
        </div>
        {renderQuestion()}
        <Link to="/TestReport" state={{ testName:testName }}>
            <button  > Move back</button>
        </Link>
    </div>)
}
export default CurrentReport;