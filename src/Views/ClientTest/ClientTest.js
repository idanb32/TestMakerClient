import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import QuestionDisplay from "./Components/QuestionDisplay/QuestionDisplay";
import Nav from "./Components/nav/nav";
import './ClientTest.css';
const port = "http://localhost:5000/quiz/";
const subPort = "http://localhost:5000/solvedQuestion/";

const ClientTest = (props) => {
    const [quiz, setQuiz] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();
    const [navList, setNavList] = useState(0);
    const [currentNav, setCurrentNav] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [currentUser, setCorrentUser] = useState(props.userId);
    const [amountOfQuestions, setAmountOfQuestions] = useState();
    const nav = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            setCorrentUser(state.userId);
            let quizId = state.quizId;
            axios.post(port + "getWithQuestion", { id: quizId })
                .then((res) => {
                    let getQuiz = res.data;
                    handleRecivedQuiz(getQuiz);
                    setAmountOfQuestions(getQuiz.questions.length)
                })
                .catch((err) => console.log(`in catch ${err}`))
        }
    }, [])


    const handleRecivedQuiz = (quiz) => {
        setQuiz(quiz);
        setNavList(quiz.questions.length + 1);
        let question = quiz.questions[0];
        setCurrentQuestion(question);
    }

    const renderQuestion = () => {
        if (currentQuestion)
            return <QuestionDisplay question={currentQuestion}
                handleAnswer={handleAnswer} />
    }
    const handleAnswer = (id) => {
        console.log(id);
        let tmp = userAnswers;
        tmp[currentNav] = id;
        setUserAnswers(tmp);
    }

    const changeQuestion = (num) => {
        let showMe = quiz.questions[num - 1];
        setCurrentQuestion(showMe);
        setCurrentNav(num - 1);
    }

    const renderSub = () => {
        if (window.confirm("Are you sure you want to submit?"))
            submit();
    }

    const submit = () => {
        let submitMe = {
            userId: currentUser,
            quizId: quiz._id,
            answerArr: userAnswers,
            numOfQuestions: navList - 1
        }

        axios.post(subPort + "Submit", submitMe).
            then((score) => {
                let stateObject = {
                    state: {
                        score: score.data,
                        quiz: quiz
                    }
                }
                nav("/FinishedTest", stateObject);

            })
            .catch((err) => console.log(err))
    }

    const renderNav = () => {
        let tmp = [];
        for (let i = 1; i <= navList; i++) {
            if (i != navList) {
                let item = <Nav onClick={changeQuestion} value={i} className="" />
                tmp.push(item)
            }
            else {
                tmp.push(<Nav value="Submit" onClick={renderSub} />)
            }
        }
        return tmp;
    }


    return (<div> <h1 className="heading-1">Quiz: {quiz ? quiz.testName : ""}</h1>
        <div className="ClientTest">
            {renderQuestion()}
            <div className="navBar">
                {renderNav()}
            </div>
        </div>
    </div>);
}
export default ClientTest;