import React from "react";
import { useState, useEffect } from "react";

import MenuGrid from "../../GlobalComponents/MenuGrid/MenuGrid";
import Input from "../../GlobalComponents/Input/Input";
import QuestionNameAndTags from "./Components/QuestionNameAndTags/QuestionNameAndTags";
import The3Buttons from "./Components/The3Buttons/The3Buttons";
import Button from "../../GlobalComponents/Button/Button";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import './MangeQuestion.css'

import axios from "axios";
const port = "http://localhost:5000/question/"

const MangeQuestion = (props) => {
    const [formatedQuestion, setFormatedQuestion] = useState([]);
    const [inputText, setInputText] = useState("");
    const [searchBy, setSearchBy] = useState(["Tags", "Name"]);
    const [questions, setQuestions] = useState();
    const [selectedOption, setSelectedOption] = useState("Tags");


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

    const formatModelClosed = (questionsList) => {
        setFormatedQuestion([]);
        let newFormatedQuestion = [];
        let titles = {
            questionNameAndTag: "Question name and tags",
            questionType: "Question type",
            buttons: ""
        }
        newFormatedQuestion.push(titles);
        questionsList.forEach(question => {
            let newQuestion = {
                questionNameAndTag: <QuestionNameAndTags Tags={question.questionTags} questionName={question.questionName} />,
                questionType: question.questionType,
                buttons: <The3Buttons id={question._id}/>
            }
            newFormatedQuestion.push(newQuestion);
        });
        setFormatedQuestion(newFormatedQuestion);
    }

    const showAll = () => {
        axios.get(port + "getall").then((questionsList) => {
            formatModelClosed(questionsList.data);
            setQuestions(questionsList.data);
        })
            .catch((errorList) => {
                console.log(errorList);
            });
    }

    useEffect(() => {
         showAll();
    }, []);


    return (<div className="MangeQuestionPage">
        <div className="inputDiv">
            <Input placeholder="Search" onChange={changeInput} />
            <Button text="Search" action={handleSearch} />
            <DropDownMenu items={searchBy} handleClicked={changed} />
        </div>
        <MenuGrid items={formatedQuestion} />
        <div>
            <Button text="Add new question" />
            <Button text="Show all" action={showAll} />
        </div>
    </div>)


}

export default MangeQuestion;