import react from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MenuGrid from "../../GlobalComponents/MenuGrid/MenuGrid";
import Input from "../../GlobalComponents/Input/Input";
import Button from "../../GlobalComponents/Button/Button";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import TakeMeButton from "./Components/TakeMeButton";

import './ClientMenu.css'
import axios from "axios";
const port = "http://localhost:5000/quiz/";


const ClientMenu = (props) => {
    const [formatedQuiz, setFormatedQuiz] = useState([]);
    const [inputText, setInputText] = useState("");
    const [searchBy, setSearchBy] = useState(["Name", "Language"]);
    const [quizes, setQuizes] = useState();
    const [selectedOption, setSelectedOption] = useState("Name");
    const location = useLocation();
    const [userId,setUserId]=useState(location.state.userId);
    const nav = useNavigate();

    const changeInput = (value) => {
        setInputText(value.target.value);
    }

    const changed = (value) => {
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
                buttons: <TakeMeButton id={quiz._id} testName={quiz.testName} text={"Take this test"}
                    userId={userId} takeThis={takeTest} />
            }
            newFormatedQuiz.push(newDisplayQuiz);
        });
        setFormatedQuiz(newFormatedQuiz);
    }

    const takeTest = (userId, quizId,name) => {
        let testState = {
            state: {
                userId: userId,
                quizId: quizId
            }
        }
        if(window.confirm(`Are you sure you want to take the test: ${name}?`))
        nav('/ClientTest', testState);


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
        showAll();
    }, []);



    return (<div><h1 className="heading-1">Quizes you can take </h1>
        <div className="clientMenu">
            <div className="inputDiv">
                <Input placeholder="Search" onChange={changeInput} className="searchBar" classNameInput="searchBar" />
                <Button text="Search" action={handleSearch} />
                <DropDownMenu items={searchBy} handleClicked={changed} />
            </div>
            <MenuGrid items={formatedQuiz} />
            <div>
                <Button text="Show all" action={showAll} />
            </div>
        </div>
    </div>)

}
export default ClientMenu;