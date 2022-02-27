import Button from "../../../../GlobalComponents/Button/Button";
import react from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditQuestion from "../../../EditQuestion/EditQuestiom";
import Icon from "../../../../GlobalComponents/Icon/Icon";
import axios from "axios";
import './The3Buttons.css';
const port = "http://localhost:5000/question/";

const The3Buttons = (props) => {
    const [id, setId] = useState(props.id);
    const [question, setQuestion] = useState();
    const [firstRender, setFirstRender] = useState(true);
    const [moreDetailes, setMoreDetailes] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [show, setShow] = useState('Show');
    useEffect(() => {
        axios.post(port + "get", { id: id }).then((question) => {
            setQuestion(question.data);
            let tmp = question.data.questionAnswers.map((item) => {
                return {
                    answer: item.answer,
                    isCorrect: item.IsCorrect
                }
            })
            setAnswers(tmp);
        })
            .catch((errorList) => {
                console.log(errorList);
            });
    }, [])

    const handleDeleteClicked = () => {
        if (firstRender)
            props.deleteClicked(id);
        else
            setFirstRender(true);
    }
    const handleShowDetails = () => {
        if (firstRender)
            if (moreDetailes) {
                setShow('Show');
                setMoreDetailes(false);
            }
            else {
                setShow('Hide');
                setMoreDetailes(true);
            }
        else
            setFirstRender(true);
    }

    const renderAnswers = () => {
        if (moreDetailes) {
            return (answers.map((item) => {
                return (<div className="The3ButtonsAnswer">
                    <div>{item.answer}</div>
                    <Icon className={item.isCorrect ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"}
                        color={item.isCorrect ? "green" : "red"} />
                </div>)
            }))

        }

    }

    return (<div className="threeButtons">
        <div className="threeButtonsDeteils">
            {renderAnswers()}
        </div>
        <div>
            <Button text={show} action={handleShowDetails} />
        </div>
        <div>
            <Link to='/EditQuestion' state={{ question2: question }}>
                <Button text="Edit" />
            </Link>
        </div>
        <div>
            <Button text="Delete" action={handleDeleteClicked} />
        </div>
    </div>)


}
export default The3Buttons;