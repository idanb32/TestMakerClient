import React, { useEffect } from 'react';
import Input from '../../../../GlobalComponents/Input/Input';
import { useState } from 'react';
import './QuestionDisplay.css'


const QuestionDisplay = (props) => {
    const [question, setQuestion] = useState(props.question);
    const [oneAnswer, setOneAnswer] = useState();
    const [correctOption, setCorrectOption] = useState();
    const [correctOptions, setCorrectOptions] = useState([]);
    const [firstRender, setFirstRender] = useState(false);
    const [questionNo, setQuestionNo] = useState(props.questionNum);
    const [horizntoal, setHorizntoal] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState([]);

    useEffect(() => {
        setQuestion(props.question);
        handleCorrectAnswers(props.question.questionAnswers);
        if (props.question.questionType == "singleAnswer")
            setOneAnswer(true);
        else
            setOneAnswer(false);
        if (props.question.horizontal) {
            setHorizntoal('horizontal');
        }
        else {
            setHorizntoal('vertical');
        }
    }, [props.question])

    const handleCorrectAnswers = (answerList) => {
        let tmp = [];
        for (let item of answerList) {
            if (item)
                if (item.IsCorrect)
                    tmp.push(item._id);
        }
        setCorrectAnswers(tmp);
    }

    const isInputCheked = (value) => {
        if (oneAnswer) {
            return correctOption == value;
        }
        else {
            let flag = correctOptions.includes(value);
            return flag;
        }
    }
    const handleAnswerChanged = (e) => {
        let value = e.currentTarget.value;
        if (oneAnswer) {
            setCorrectOption(value);
            props.handleAnswer(value);
        }
        else {
            let tmp = [...correctOptions];
            if (tmp.includes(value)) {
                let newTmp = tmp.filter(i => i !== value);
                setCorrectOptions(newTmp);
                props.handleAnswer(newTmp);
            }
            else {
                tmp.push(value);
                setCorrectOptions(tmp);
                props.handleAnswer(tmp);
            }
        }
    }
   

    const renderAnswers = () => {
        return question.questionAnswers.map((item) => {
            return (<div className='answerWrapper'>
                <div className='answerText'>{item.answer} </div>
                <Input type="radio" checked={isInputCheked(item._id)}
                    onClick={handleAnswerChanged} value={item._id}
                />
            </div>)
        });
    }

    return (<div className={'QuestionDisplay '}>
        <div className='questionText'>{question.questionName}</div>
        <div className={'answers ' + horizntoal}> {renderAnswers()} </div>
    </div>

    );


}
export default QuestionDisplay;
