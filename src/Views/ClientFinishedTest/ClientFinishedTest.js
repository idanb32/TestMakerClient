import react from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../GlobalComponents/Button/Button";
import { Link } from "react-router-dom";

import './ClientFinishedTest.css'

const ClientFinishedTest = (props) => {
    const [quiz, setQuiz] = useState();
    const [score, setScore] = useState();
    const { state } = useLocation();

    useEffect(() => {
        console.log(state)
        setQuiz(state.quiz);
        setScore(state.score);
    }, [])

    const renderMsges = () => {
        if (quiz) {
            if (score >= quiz.passingGrade)
                return (<div className="msgesWrapper passed">
                    <div className="quizName">Quiz: {quiz.testName}</div>
                    <div className="score">Score: {score}</div>
                    <div className="quizHeading">{quiz.msgOnPassSubject}</div>
                    <div className="quizBody">{quiz.msgOnPassBody}</div>
                </div>)
            return (<div className="msgesWrapper failed">
                <div className="quizName">Quiz: {quiz.testName}</div>
                <div className="score">Score: {score}</div>
                <div className="quizHeading">{quiz.msgOnFailSubject}</div>
                <div className="quizBody">{quiz.msgOnFailBody}</div>
            </div>)
        }
    }

    return (<div className="finsishedTest">
        {renderMsges()}
        <Link to='/ClientMenu' >
            <Button text="Move to menu" />
        </Link>
    </div>)
}
export default ClientFinishedTest;