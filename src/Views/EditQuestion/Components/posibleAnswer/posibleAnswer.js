import react from "react";
import { useState,useEffect } from "react";
import TextEditor from "../../../../GlobalComponents/TextEditor/TextEditor";
import Icon from "../../../../GlobalComponents/Icon/Icon";
import Input from "../../../../GlobalComponents/Input/Input";
import './posibleAnswer.css'
import { EditorState, ContentState, convertFromHTML } from 'draft-js';


const PosibleAnswer = (props) => {
    const [answerText, setAnswerText] = useState();
    const [renderMe, setRenderMe] = useState(true);


    const handleChange = (text) => {
        setAnswerText(text);
        props.changeAnswer(props.value, text);
    }
    const handleRemoveMe = () => {
        props.removeAnswer(props.value)
        setRenderMe(false);
    }
    useEffect(()=>{
        setAnswerText(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(`<p>${props.default}</p>`)
        )));
    },[props.default])


    const renderAnswer = () => {
        if (renderMe)
            return (<div className="PosibleAnswer" key={`PosibleAnswer${props.value}`}>
                Answer :
                <Icon className="fa-solid fa-circle-xmark" onClick={handleRemoveMe} />
                <TextEditor editorState={answerText} setEditorState={handleChange} />
                <Input className="radioInput" type="radio"
                    value={props.value} onClick={props.onChange}
                    checked={props.checked(props.value)} />
            </div>)
        return <></>    
    }

    return ( renderAnswer()  )


}
export default PosibleAnswer;