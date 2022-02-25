import Editor_w_Validator from "../EditQuestion/Components/Editor_W_Validation/Editor_W_Validator";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import { useState, useEffect } from "react";
import Button from "../../GlobalComponents/Button/Button";
import Input from "../../GlobalComponents/Input/Input";
import { Link, useLocation } from "react-router-dom";
import MenuGrid from "../../GlobalComponents/MenuGrid/MenuGrid";
import retriveQuiz from "./Services/retriveQuiz";
import retriveQuestions from "./Services/retriveQuestions";
import QuestionNameAndTags from "../MangeQuestion/Components/QuestionNameAndTags/QuestionNameAndTags";
import './EditQuiz.css'
import saveQuestionsService from './Services/saveQuestionsService'
import getSubjectService from "./Services/getSubjectService";
import updateQuizService from "./Services/updateQuizService";
import retriveSpecificQuestionService from "./Services/retriveSpecificQuestionService";
import AllQuestions from "./Componnets/allQuestions";
const EditQuiz = (props) => 
{
    const location = useLocation();
    const [passedSubject,setPassedSubject] = useState()
    const [qustionList,setQuestionList] = useState([]);
    const [quizLeng,setQuizLen] = useState(["english","hebrew"]);
    const [testType,setTestType] = useState(["predefined","ordinal"]);
    const [totalNumOfQuestion,setTotalNumOfQuestion] = useState(0);
    const [questionListForGrid,setQuestionListForGrid] = useState([]);
    const [loadedQuestionsNames,setLoadedQuestionsNames] = useState()
    
    //Keep track if we are updating a quiz or adding a new one.
    const [isUpdate, setIsUpdate] = useState(false);
    const [flagToAllQuestions,setFlagToAllQuestions] = useState(false);
    const[flagToSelectedQuestions,setFlagToSelectedQuestions] = useState(false)
    //Keep track of the question id
    const [testId,setTestId] = useState();
    const [subjectId,setSubjectId] = useState()
    const [modelOnLoad,setModelOnLoad] = useState({});
    //quiz model states
    const [numberOfQAdded,setNumberOfQAdded] = useState(0);
    const [inputPassGrade,setPassingGrade]= useState('');
    const [testName,setTestName] = useState('');
    const [testQuestionsAdded,setTestQuestionsAdded] = useState([])
    const [headerText,setHeaderText] = useState();
    const [msgOnPass,setMsgOnPass] = useState();
    const [msgOnFail,setMsgOnFail] = useState();
    const [inputLangu,setInputLan] = useState();
    const [inputDate,setInputDate] = useState();
    const [modelToSave,setModelToSave] = useState({
        language : '',
        testName : '',
        passingGrade : '',
        msgOnPassSubject:'',
        msgOnPassBody: '',
        msgOnFailSubject : '',
        msgOnFailBody : '',
        questions:[],
        date :'',
        subjectOfStudying : ''
    });
    

    useEffect(async ()=>{
        setQuestionList([])
        
        if(false){
            setIsUpdate(true);
            //let quiz = location.state.quiz
            
            let res = await retriveQuiz("620528c798e5e4d8ca344d9d");
            let resList = await retriveQuestions()
            let subjName = await getSubjectService(res.subjectOfStudying);
            let result =  await loadedQuestionsNamesHelper(res.questions)
            setTestId(res._id);
            setQuestionList(resList.data)
            orderTheQ(resList.data);
            setTotalNumOfQuestion(resList.data.length)
            setPassedSubject(subjName.data.subjectName);
            setMsgOnPass(res.msgOnPassBody)
            setPassingGrade(res.passingGrade)
            setTestName(res.testName)
            setSubjectId(subjName.data._id)
            setMsgOnFail(res.msgOnFailBody)
            setHeaderText(res.msgOnPassSubject)
            

            if(res.questions == undefined)
            {
                console.log('here');
            setNumberOfQAdded(0)
            }
        }
        else{
            setTestQuestionsAdded([])
            console.log('no id were given to the page - starting from zero');
            let resList = await retriveQuestions()
            setQuestionList(resList.data);
            orderTheQ(resList.data);
            setTotalNumOfQuestion(resList.data.length)
        }
        


    },[retriveQuiz,setIsUpdate])
    
    const loadedQuestionsNamesHelper =async (qustionList)=>{
        let arr= [];
        for await (const question of qustionList){
            console.log('inside'+ question);
            let res = await retriveSpecificQuestionService(question)
            arr.push(`${res.questionName},`)
        }
        console.log(arr);
        setLoadedQuestionsNames(arr);
        return true
    }


    const orderTheQ = (qustionList)=>{
        setQuestionListForGrid([])
        console.log("inside order");
        let arr = []
        let titles = {
            title: "Currently showing -- questions",
            buttons : ""
        }
        arr.push(titles);
      
        qustionList.forEach((e)=>{
            console.log(e.questionTags);
          let newQuestions = {
            adding: <button  onClick={()=>(addQuestionToList(e._id))}>Add</button> , 
            questionNameAndTag: <QuestionNameAndTags  Tags={e.questionTags} questionName={e.questionName} />,
            buttons: <Button text="Show"></Button>
           }
           console.log(newQuestions)
           arr.push(newQuestions)
        })
       
        console.log(qustionList);
        setQuestionListForGrid(arr);
    }

    const setItemsOnLoadWithID =(model)=>{
        setModelOnLoad(model.data)
        setTotalNumOfQuestion();
        orderTheQ();
    }

    const addQuestionToList =async (id)=>{
        console.log(testQuestionsAdded);
        const match = testQuestionsAdded.find(element => {
            if (element.includes(id)) {
              return false;
            }
          });
        if(match){
            console.log('already have this Q!');
        }
        else{
        console.log('clicked question  ' + id);
        let arr = testQuestionsAdded;
        arr.push(id)
        await loadedQuestionsNamesHelper(arr)
        setTestQuestionsAdded(arr)
        setNumberOfQAdded(testQuestionsAdded.length);
       }
    }

    const changedTestType = (value) => {
        setTestType(value.target.value);

    }
    
    const changedLengu = (value) => {
        setQuizLen(value.target.value);
        setInputLan(value.target.value);

    }
    

    const handelShowQuiz=()=>{
      
    }
    const handelShowOnlySelected=()=>{
        //setFlagToSelectedQuestions(!flagToSelectedQuestions)
    }
    const handelShowAllQuestions=()=>{
        setFlagToAllQuestions(!flagToAllQuestions)
      
    }
    const handelSaveQuiz=()=>{
      
    }
    const saveQuiz = ()=>{
       if(isUpdate)
       {
        let quiz={
            id:testId,
            language :quizLeng,
            testName : testName,
            passingGrade :inputPassGrade,
            msgOnPassSubject : headerText,
            msgOnPassBody : msgOnPass,
            msgOnFailSubject : msgOnFail,
            msgOnFailBody : msgOnFail,
            questions : testQuestionsAdded,
            date :Date.now(),
            subjectOfStudying : subjectId
        }
        updateQuizService(quiz);

       }
       else
       {
        if(validtion()) 
       {
       let quiz={
            language :"english",
            testName : testName,
            passingGrade :inputPassGrade,
            msgOnPassSubject : msgOnPass,
            msgOnPassBody : msgOnPass,
            msgOnFailSubject : msgOnFail,
            msgOnFailBody : msgOnFail,
            questions : testQuestionsAdded,
            date :Date.now(),
            subjectOfStudying : "something"
        }
        saveQuestionsService(quiz)
       }
        }

    }

    const validtion = ()=>{
        let flag = true
        if(testName == '')
        {
            flag = false;
            console.log('hre');
        }
        if(inputPassGrade == '')
        {
            flag = false;
            console.log('hre');
        }
        if(headerText == '')
        {
            flag = false;
            console.log('hre');
        }
        if(msgOnPass == '')
        {
            flag = false;
            console.log('hre');
        }
        if(msgOnFail == '')
        {
            flag = false;
            console.log('hre');
        }
        if(numberOfQAdded <= 0)
        {
            flag = false;
            console.log('hre');
        }
        return flag;
    }
    const handleTestName=(value)=>{
        setTestName(value.target.value);
    }

    const handlePassGrade=(value)=>{
        setPassingGrade(value.target.value);
    }
    
    const handelNextQuestions=()=>{

    }

    const handleHeaderTextChanged=(text)=>{
        setHeaderText(text.getCurrentContent().getPlainText());
       
    }
    const handleMssOnPassTextChanged=(text)=>{
        setMsgOnPass(text.getCurrentContent().getPlainText());
    }
    const handleMssOnFailTextChanged=(text)=>{
        setMsgOnFail(text.getCurrentContent().getPlainText());
    }
    


    return(
        <div>

            <h1>NewTest</h1>
            {flagToAllQuestions?<AllQuestions questionList = {qustionList}></AllQuestions>:<div></div>}
            {false?<AllQuestions questionList = {loadedQuestionsNames}></AllQuestions>:<div></div>}
            <div className="generalTestDeatails">

            <div className="fieldOfStudy">
                    <label>field Of Study:{passedSubject}</label>
                    {}
                    <label></label>
                    {/* <Input value={testName} onChange={handleTestName} /> */}
                </div>
               
                <div className="field">
                    <label>Languege :</label>
                    <DropDownMenu items={quizLeng} handleClicked={changedLengu}></DropDownMenu>
                </div>

                <div className="testType">
                    <label>test Type :</label>
                    <DropDownMenu items={testType} handleClicked={changedTestType}></DropDownMenu>
                </div>

                <div className="testName">
                    <label>test Name :</label>
                    {}
                    <Input value={testName} onChange={handleTestName} />
                </div>

                <div className="passingGrade">
                    <label>passing Grade :</label>
                    {}
                    <Input value={inputPassGrade} onChange={handlePassGrade} />
                </div>

                <div className="ShowAnswer">
                    <label>Show correct Answers</label>
                    <Input type="radio"></Input>
                </div>

                <div className="headerTextEditor">
                    <label>Header:</label>
                    <Editor_w_Validator changeAnswer={handleHeaderTextChanged}
                     default={isUpdate?`${headerText}`:`Header Text`} />
                </div>

                <div className="passsingTestMssTextEditor">
                    <label>Messege to Show on Passing:</label>
                    <Editor_w_Validator changeAnswer={handleMssOnPassTextChanged}
                     default={isUpdate?`${msgOnPass}`:`Messege on Passing the Test`} />
                </div>
                <div className="failTestMssTextEditor">
                    <label>Messege to Show on Passing:</label>
                    <Editor_w_Validator changeAnswer={handleMssOnFailTextChanged}
                    default={isUpdate?`${msgOnFail}`:'Messege on Failing the Test'} />
                </div>

                
                

            </div>

            <div className="questionContainer">
                <div className="topLine">
                    <h3 >Questions</h3>
                </div>
                
                <div className="upperQuestion">
                    <div>Note:this test is set to be</div>
                </div>
                <div className="selectQuestion">
                    <h4>select the questions that you want to includ in the test:</h4>
                    <div></div>
                    
                    <MenuGrid items ={questionListForGrid}></MenuGrid>
                    <div className="buttonLine">
                        Showing {totalNumOfQuestion} of {totalNumOfQuestion}   
                        <Button text='Next' width='65px' height = '20px' action = {handelNextQuestions}></Button>
                        <Button text='Show Selected Only' width='200px' height = '20px' action = {handelShowOnlySelected}></Button>
                        <Button text='Show All Questions' width='200px' height = '20px' action = {handelShowAllQuestions}></Button>
                    </div>
                    <div>The test will includ {numberOfQAdded} questions in total </div>
                    <div className="inTestNames">questions that in the test - {loadedQuestionsNames}</div>
                </div>

            </div>

            <div className="actionButton">
                <Link to={"/QuestionMenu"}>
                    <Button text='Back' width='65px' height = '20px' />
                </Link>


                <Button text='Show' width='65px' height = '20px' action={handelShowQuiz}></Button>
                <Button text='Save' width='65px' height = '20px' action={saveQuiz}></Button>
            </div>

            </div>
            )
    }

       
 
 
export default EditQuiz;