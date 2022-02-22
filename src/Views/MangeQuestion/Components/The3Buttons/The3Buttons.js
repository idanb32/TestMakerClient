import Button from "../../../../GlobalComponents/Button/Button";
import react from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditQuestion from "../../../EditQuestion/EditQuestiom";
import axios from "axios";
import './The3Buttons.css'
const port = "http://localhost:5000/question/"

const The3Buttons = (props) => {
    const [id, setId] = useState(props.id);
    const [question, setQuestion] = useState();
    useEffect(() => {
        axios.post(port + "get", { id: id }).then((question) => {
            setQuestion(question.data);
        })
            .catch((errorList) => {
                console.log(errorList);
            });
    }, [])

    return (<div className="threeButtons">
        <div>
            <Button text="Show" action={props.showClicked} />
        </div>
        <div>
            <Link to='/EditQuestion' state={{ question2: question }}>
                <Button text="Edit" />
            </Link>
        </div>
        <div>
            <Button text="Delete" action={props.deleteClicked} />
        </div>
    </div>)


}
export default The3Buttons;