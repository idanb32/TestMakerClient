import react from "react";
import Editor_w_Validator from "./Components/Editor_W_Validation/Editor_W_Validator";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import PosibleAnswer from "./Components/posibleAnswer/posibleAnswer";
import { useState, useEffect } from "react";
import Button from "../../GlobalComponents/Button/Button";
import Input from "../../GlobalComponents/Input/Input";
import './EditQuestiom.css'
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const port = "http://localhost:5000/question/";



const EditQuestion = (props) => {
    // Check if its a one a asnwer question  or not and save the correct answer/s.
    const [questionType, setQuestionsType] = useState(["One answer", "Multipule answers"]);
    const [selectedType, setSelectedType] = useState("One answer");
    const [correctOption, setCorrectOption] = useState("");
    const [correctOptions, setCorrectOptions] = useState([]);
    // Save the number of answer the user is inputing, have two prop for it to make sure that the adding and removing of answers works fins.
    const [numOfAnswer, setNumOfAnswer] = useState(4);
    const [numOfAnswer2, setNumOfAnswer2] = useState(4);
    //Save the answers themself
    const [answers, setAnswers] = useState([]);
    //save the question itself.
    const [questionText, setQuestionsText] = useState("");
    //subject name
    const [subject, setSubject] = useState("");
    const [textBelow, setTextBelow] = useState("");
    //Validation msg
    const [error, setError] = useState();
    //keep track if the question should be displayed as horizntoal or vertical.
    const [horizontalOption, setHorizontalOption] = useState();
    //Question tags, sepereted by ' '.
    const [tags, setTags] = useState("");
    //validation for answers , tags , horzintal and subject
    const [answerError, setAnswerError] = useState("");
    const [tagsError, setTagsError] = useState("");
    const [horizontalTagsError, setHorizontalTagsError] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [textBelowError, setTextBelowError] = useState("");
    //Keep track if its the first render to make sure we dont validate for no reason.
    const [firstRender, setFirstRender] = useState(true);
    //Keep track if we are updating a question or adding a new one.
    const [isUpdate, setIsUpdate] = useState(false);
    //Keep track of the question id
    const [questionId, setQuestionId] = useState();
    //Keep the default value for the question text
    const [defaultQuestion, setDefaultQuestion] = useState("");

    const location = useLocation();



    //On effect check if we came from edit and if so saves the state of the question we edit and display it.
    useEffect(() => {
        if (location.state) {
            let question = location.state.question2;
            setIsUpdate(true);
            setQuestionId(question._id);
            handleSetTags(question.questionTags);
            let updateAnswers = question.questionAnswers.map((item) => item.answer);
            setAnswers(updateAnswers);
            setNumOfAnswer(updateAnswers.length);
            setNumOfAnswer2(updateAnswers.length);
            if (question.questionType == "singleAnswer") {
                setSelectedType("One answer");
            }
            else {
                setSelectedType("Multipule answers");
            }
            if (question.horizontal) {
                setHorizontalOption("horizontal");
            }
            else {
                setHorizontalOption("vertical");
            }
            setTextBelow(question.textBelow);
            setSubject(question.subject.subjectName);
            setDefaultQuestion(question.questionName);
            setQuestionsText(question.questionName);
        }
    }, [setDefaultQuestion, setNumOfAnswer, setNumOfAnswer2])

    const handleSetTags = (tags) => {
        let tagsString = tags.join(",");
        setTags(tagsString);
    }

    const changeTags = (e) => { setTags(e.target.value) }

    const changeSubject = (e) => { setSubject(e.target.value) }

    const changeTextBelow = (e) => { setTextBelow(e.target.value) }

    const handleQuestionTextChanged = (text) => {
        setQuestionsText(text.getCurrentContent().getPlainText());
    }
    //for the one answer or many answer drop down menu
    const changed = (value) => {
        setSelectedType(value.target.value);

    }

    const horizontalChecked = (value) => {
        return horizontalOption == value;
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

    const horizontalClicked = (e) => {
        let value = e.currentTarget.value;
        setHorizontalOption(value);
    }

    const handleRadioClicked = (e) => {
        let value = e.currentTarget.value;
        if (selectedType == "One answer") {
            setCorrectOption(value);
        }
        else {
            let tmp = [...correctOptions]
            if (tmp.includes(value)) {
                let newTmp = tmp.filter(e => e !== value)
                setCorrectOptions(newTmp);
            }
            else {
                tmp.push(value)
                setCorrectOptions(tmp);
            }
        }
    }

    const addAnswer = () => {
        setNumOfAnswer(numOfAnswer + 1);
        setNumOfAnswer2(numOfAnswer2 + 1);
    }

    //to remove an answer by it position
    const removeMe = (position) => {
        let tmp = answers;
        tmp[position] = "delted";
        setAnswers(tmp);
        if (selectedType == "One answer") {
            if (correctOption == position)
                setCorrectOption(-1);
        }
        else {
            let tmpCorrectAnswers = [...correctOptions]
            if (tmpCorrectAnswers.includes(position)) {
                let newTmp = tmpCorrectAnswers.filter(e => e !== position)
                setCorrectOptions(newTmp);
            }
        }
        setNumOfAnswer2(numOfAnswer2 - 1);
    }

    const handleAnswerChanged = (position, text) => {
        let tmp = answers;
        tmp[position] = text.getCurrentContent().getPlainText();
        setAnswers(tmp);
    }

    const renderAnswers = () => {
        let arrayOfAnswers = [];
        for (let index = 0; index < numOfAnswer; index++) {
            let element = <PosibleAnswer value={`${index}`}
                checked={isAnswerSelected}
                onChange={handleRadioClicked}
                changeAnswer={handleAnswerChanged}
                removeAnswer={removeMe}
                default={answers[index] ? answers[index] : ""} />
            arrayOfAnswers.push(element);
        }
        return arrayOfAnswers;
    }
    const getQuestionAnswers = () => {
        if (selectedType == "One answer") {
            let questionAnswerFormated = answers.map((item) => {
                let indexOfItem = answers.indexOf(item);
                let IsCorrect = indexOfItem == correctOption;
                if (item != 'delted')
                    return ({
                        answer: item,
                        IsCorrect: IsCorrect
                    })
            });
            let filterArr = questionAnswerFormated.filter(i => i != 'undefined' && i != null)
            return filterArr;
        }
        else {
            let questionAnswerFormated = answers.map((item) => {
                let indexOfItem = answers.indexOf(item);
                let IsCorrect = correctOptions.includes(`${indexOfItem}`);
                if (item != 'delted')
                    return ({
                        answer: item,
                        IsCorrect: IsCorrect
                    })

            });
            let filterArr = questionAnswerFormated.filter(i => i != 'undefined' && i != null)
            return filterArr;
        }
    }

    const saveClicked = () => {
        if (valdiate()) {
            let tagArr = tags.split(" ");
            let isHorizntoal = horizontalOption == "horizontal";
            let chosenQuestionType;
            if (selectedType == "One answer")
                chosenQuestionType = "singleAnswer"
            else
                chosenQuestionType = "multiAnswer";
            let questionAnswersArr = getQuestionAnswers();
            if (isUpdate) {
                let question = {
                    id: questionId,
                    questionName: questionText,
                    questionTags: tagArr,
                    questionAnswers: questionAnswersArr,
                    questionType: chosenQuestionType,
                    horizontal: isHorizntoal,
                    textBelow: textBelow,
                    subject: subject
                }
                axios.post(port + "Update", question).then((result) => {
                })
                    .catch(error => console.log(error));
            }
            else {
                let question = {
                    questionName: questionText,
                    questionTags: tagArr,
                    questionAnswers: questionAnswersArr,
                    questionType: chosenQuestionType,
                    horizontal: isHorizntoal,
                    textBelow: textBelow,
                    subject: subject
                }
                axios.post(port + "Add", question).then((result) => {
                })
                    .catch(error2 => console.log(error2));
            }
        }
    }

    //validation for the form
    const valdiate = (msg) => {
        if (firstRender) {
            setFirstRender(false)
            return;
        }
        setAnswerError("");
        let flag = true;
        if (questionText == "") {
            setError("Question is empty")
            flag = false;
        }
        else {
            setError("")
        }
        if (subject == "") {
            setSubjectError("Subject is empty")
            flag = false;
        }
        else {
            setSubjectError("");
        }
        if (textBelow == "") {
            setTextBelowError("Text below is empty")
            flag = false;
        }
        else {
            setTextBelowError("");
        }
        if (horizontalOption == null) {
            flag = false;
            setHorizontalTagsError("Please choose horizontal or vertical")
        }
        else {
            setHorizontalTagsError("");
        }
        if (tags == "") {
            flag = false;
            setTagsError("Please enter tag, or tags")
        }
        else {
            setTagsError("");
        }
        let answerMsg = "";
        if (answers.length == 0 || answers == null || answers == 'undefiend') {
            flag = false;
            answerMsg = "Please make sure that all the answers are filled. ";
            setAnswerError(answerMsg);
        }
        else {
            answers.forEach(element => {
                if (element == 'undefiend' || element == null || element == "") {
                    flag = false;
                    answerMsg = "Please make sure that all the answers are filled. ";
                    setAnswerError(answerMsg);
                }
            });
        }
        if (selectedType == "One answer") {
            if (correctOption == "") {
                answerMsg += "Please selecet the correct answer"
                setAnswerError(answerMsg);
                flag = false;
            }
        }
        else {
            if (correctOptions.length == 0 || correctOptions == null || correctOptions == undefined) {
                answerMsg += "Please selecet the correct answer"
                setAnswerError(answerMsg);
                flag = false;
            }
        }
        return flag;
    }

    return (<div> <h1 className="heading-1">Edit or add question</h1>
        <div className="EditQuestion">
            <div className="QuestionType">
                Question Type:
                <DropDownMenu items={questionType} handleClicked={changed} />
            </div>
            <div className="QuestionText">
                Question :
                <Editor_w_Validator changeAnswer={handleQuestionTextChanged}
                    error={error} default={defaultQuestion} />
            </div>
            <div className="answersWrapper">
                {renderAnswers()}
                <div className="errorDisplay">{answerError}</div>
                <Button text="Add answer" action={addAnswer} />
            </div>
            <div className="verticalOrHor">
                Horizontal or vertical:
                <div>Horizontal:<Input type="radio" value="horizontal"
                    checked={horizontalChecked("horizontal")}
                    onClick={horizontalClicked} />
                </div>
                <div>Vertical:<Input type="radio" value="vertical"
                    checked={horizontalChecked("vertical")}
                    onClick={horizontalClicked} />
                </div>
                <div className="errorDisplay">{horizontalTagsError}</div>
            </div>
            <div className="editQuestionInputsWrapper">
                <div className="tags">
                    Tags:<Input value={tags} onChange={changeTags} />
                    <div className="errorDisplay">{tagsError}</div>
                </div>
                <div className="Subject">
                    Subject:<Input value={subject} onChange={changeSubject} />
                    <div className="errorDisplay">{subjectError}</div>
                </div>
                <div className="textBelow">
                    Text below the question:<Input value={textBelow} onChange={changeTextBelow} />
                    <div className="errorDisplay">{textBelowError}</div>
                </div>
            </div>
            <div className="editQuizButtons">
                <Link to={"/QuestionMenu"} state={{subject:subject}}>
                    <Button text="Back" />
                </Link>
                <Button text="Save" action={saveClicked} />
            </div>
        </div>
    </div>);
}

export default EditQuestion;