import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
    const location = useLocation();

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
                buttons: <The3Buttons id={question._id} deleteClicked={deleteClicked} />
            }
            newFormatedQuestion.push(newQuestion);
        });
        setFormatedQuestion(newFormatedQuestion);
    }

    const deleteClicked = (id) => {
        let windowRes = window.confirm("Are you sure you want to delete this question?");
        if (windowRes) {
            axios.post(port + "Delete", { id: id })
                .then(async (resault) => {
                    await showAll();
                })
                .catch(err => console.log(err))
        }
    }

    const showAllSub = (subject) => {
        if (subject)
            axios.post(port + "getallSubject", { subject: subject }).then((questionsList) => {
                formatModelClosed(questionsList.data);
                setQuestions(questionsList.data);
            })
                .catch((errorList) => {
                    console.log(errorList);
                });
        else {

        }
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
        if (location.state.subject)
            showAllSub(location.state.subject);
        else
            showAll();
    }, []);




    return (<div><h1 className="heading-1">Mange Question </h1>
        <div className="MangeQuestionPage">
            <div className="inputDiv">
                <Input placeholder="Search" onChange={changeInput} className="searchBar" classNameInput="searchBar" />
                <DropDownMenu items={searchBy} handleClicked={changed} />
                <Button text="Search" action={handleSearch} />
            </div>
            <MenuGrid items={formatedQuestion} />
            <div className="mangeQuestionBtn">
                <Link to={`/EditQuestion`}>
                    <Button text="Add new question" />
                </Link>
                <Button text="Show all" action={showAll} />
            </div>
        </div>
    </div>)


}

export default MangeQuestion;