import react from "react";
import { useState } from "react";
import TextEditor from "../../../../GlobalComponents/TextEditor/TextEditor";
import Icon from "../../../../GlobalComponents/Icon/Icon";
import Input from "../../../../GlobalComponents/Input/Input";
import './posibleAnswer.css'


const PosibleAnswer = (props) => {
    const [answerText, setAnswerText] = useState();
    const handleChange = (text) => {
        setAnswerText(text);
        props.changeAnswer(props.value, answerText.getCurrentContent().getPlainText());

    }


    return (<div className="PosibleAnswer">
        Answer Number {props.key}:
        <Icon className="fa-solid fa-circle-xmark" onClick={props.removeAnswer} />
        <TextEditor editorState={answerText} setEditorState={handleChange} />
        <Input className="radioInput" type="radio"
            value={props.value} onClick={props.onChange}
            checked={props.checked(props.value)} />
    </div>)


}
export default PosibleAnswer;