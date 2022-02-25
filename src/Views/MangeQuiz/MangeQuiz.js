import React from "react";
import { useState, useEffect } from "react";
import { Link ,useLocation} from "react-router-dom";
import MenuGrid from "../../GlobalComponents/MenuGrid/MenuGrid";
import Input from "../../GlobalComponents/Input/Input";
import Button from "../../GlobalComponents/Button/Button";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import The3Buttons from "./Components/The3Buttons/The3Buttons";
import './MangeQuiz.css'

import axios from "axios";
const port = "http://localhost:5000/quiz/"

const MangeQuiz = (props) => {
    const location = useLocation();
    const [formatedQuiz, setFormatedQuiz] = useState([]);
    const [inputText, setInputText] = useState("");
    const [searchBy, setSearchBy] = useState(["Name", "Language"]);
    const [quizes, setQuizes] = useState();
    const [selectedOption, setSelectedOption] = useState("Tags");
    const [subjectOption,setSubjectOption] = useState(location.state.subject);

    const changeInput = (value) => {
        setInputText(value.target.value);
    }

    const changed = (value) => {
        console.log(value.target.value);
        setSelectedOption(value.target.value);
    }

    const handleSearch = async () => {
        let searchRes = await axios.post(port + "search", {
            searchBy: selectedOption,
            searchText: inputText
        })
        formatModelClosed(searchRes.data);
    }

    const formatModelClosed = (quizList) => {
        setFormatedQuiz([]);
        let newFormatedQuiz = [];
        let titles = {
            quizName: "Test name",
            numOfQuestion: "Number of questions",
            lastUpdate: "Last update",
            language: "language",
            buttons: ""
        }
        newFormatedQuiz.push(titles);
        quizList.forEach(quiz => {
            let numOfQuestion = 0;
            if (quiz.hasOwnProperty('questions'))
                 numOfQuestion = quiz.questions.length;
            let newDisplayQuiz = {
                quizName: quiz.testName,
                numOfQuestion: numOfQuestion,
                lastUpdate: quiz.date,
                language: quiz.language,
                buttons: <The3Buttons id={quiz._id}/>
            }
            newFormatedQuiz.push(newDisplayQuiz);
        });
        setFormatedQuiz(newFormatedQuiz);
    }

    const showAll = () => {
        axios.get(port + "GetAll").then((quizList) => {
            formatModelClosed(quizList.data);
            setQuizes(quizList.data);
        })
            .catch((errorList) => {
                console.log(errorList);
            });
    }

    useEffect(() => {
        console.log(subjectOption);
        showAll();
    }, []);


    return (<div className="MangeQuizPage">
        <div className="inputDiv">
            <Input placeholder="Search" onChange={changeInput} />
            <Button text="Search" action={handleSearch} />
            <DropDownMenu items={searchBy} handleClicked={changed} />
        </div>
        <MenuGrid items={formatedQuiz} />
        <div>
            <Link to='/EditQuiz'  >
            <Button text="Add new quiz" />
            </Link>
            
            <Button text="Show all" action={showAll} />
        </div>
    </div>)


}

export default MangeQuiz;