import react from "react";
import Editor_w_Validator from "./Components/Editor_W_Validation/Editor_W_Validator";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import PosibleAnswer from "./Components/posibleAnswer/posibleAnswer";
import { useState } from "react";
import Button from "../../GlobalComponents/Button/Button";
import { render } from "@testing-library/react";



const EditQuestion = () => {
    const [questionType, setQuestionsType] = useState(["One answer", "Multipule answers"]);
    const [selectedType, setSelectedType] = useState("One answer");
    const [correctOption, setCorrectOption] = useState();
    const [correctOptions, setCorrectOptions] = useState([]);
    const [numOfAnswer, setNumOfAnswer] = useState(4);
    const [answers, setAnswers] = useState([]);
    
    const changed = (value) => {
        setSelectedType(value.target.value);
    }

    const isAnswerSelected = (value) => {
        if (selectedType == "One answer") {
            return correctOption == value;
        }
        else {
            let flag = correctOptions.includes(value);
            return flag;
        }
    }

    const handleRadioClicked = (e) => {
        let value = e.currentTarget.value;
        console.log(`got into handleRadio, ${value}`)
        if (selectedType == "One answer") {
            setCorrectOption(value);
            console.log(correctOption)
        }
        else {
            let tmp = [...correctOptions]
            if (tmp.includes(value)) {
                let newTmp = tmp.filter(e => e !== value)
                console.log(newTmp);
                setCorrectOptions(newTmp);
            }
            else {
                tmp.push(value)
                console.log(tmp);
                setCorrectOptions(tmp);
            }
        }
    }

    const addAnswer =()=>{
        setNumOfAnswer(numOfAnswer + 1);
    }

    const handleAnswerChanged =(position,text)=>{

        let  tmp = answers;
        tmp[position] = text;
        setAnswers(tmp);
        console.log(tmp);

    }

    const renderAnswers = () => {
        let arrayOfAnswers = [];

        for (let index = 0; index < numOfAnswer; index++) {
            let element = <PosibleAnswer value={`${index}`}
                checked={isAnswerSelected}
                onChange={handleRadioClicked}
                changeAnswer ={handleAnswerChanged} />
            arrayOfAnswers.push(element);
        }
        return arrayOfAnswers;

    }


    return (<div className="EditQuestion">
        <div className="QuestionType">
            Question Type:
            <DropDownMenu items={questionType} handleClicked={changed} />
        </div>
        <div className="QuestionText">
            Question text:
            <Editor_w_Validator />
        </div>
        <hr />
        {renderAnswers()}
        <Button text="Add answer" action={addAnswer} />
    </div>

    );

}

export default EditQuestion;