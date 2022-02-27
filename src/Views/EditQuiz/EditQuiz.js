import Editor_w_Validator from "../EditQuestion/Components/Editor_W_Validation/Editor_W_Validator";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import { useState, useEffect, useRef } from "react";
import Button from "../../GlobalComponents/Button/Button";
import Input from "../../GlobalComponents/Input/Input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuGrid from "../../GlobalComponents/MenuGrid/MenuGrid";
import retriveQuiz from "./Services/retriveQuiz";
import retriveQuestions from "./Services/retriveQuestions";
import QuestionNameAndTags from "../MangeQuestion/Components/QuestionNameAndTags/QuestionNameAndTags";
import "./EditQuiz.css";
import saveQuestionsService from "./Services/saveQuestionsService";
import getSubjectService from "./Services/getSubjectService";
import updateQuizService from "./Services/updateQuizService";
import retriveSpecificQuestionService from "./Services/retriveSpecificQuestionService";
import AllQuestions from "./Componnets/allQuestions";
import getSubjectByName from "./Services/getSubjectByName";
import { set } from "draft-js/lib/EditorState";
import axios from "axios";
const port = "http://localhost:5000/question/";

const EditQuiz = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("Name");
  const [inputSearchText, setInputSearchText] = useState("");
  const [searchBy, setSearchBy] = useState(["Name", "Language"]);
  const [passedSubject, setPassedSubject] = useState();
  const [qustionList, setQuestionList] = useState([]);
  const [quizLeng, setQuizLen] = useState(["english", "hebrew"]);
  const [testType, setTestType] = useState(["predefined", "ordinal"]);
  const [totalNumOfQuestion, setTotalNumOfQuestion] = useState(0);
  const [questionListForGrid, setQuestionListForGrid] = useState([]);
  const [loadedQuestionsNames, setLoadedQuestionsNames] = useState([]);
  const [flagEmptyField, setFlagEmptyField] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [arrayBiggerThan10, setArrayBiggerThan10] = useState(false);
  const [indexOFBiggerThan10, setIndexOFBiggerThan10] = useState(0);
  const indexRef = useRef(0);

  //validation for answers , tags , horzintal and subject
  const [nameError, setNameError] = useState("");
  const [languegeError, setLanguegeError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [questionListError, setQuestionListError] = useState("");
  const [headerError, setHeaderError] = useState("");
  const [onPassError, setOnPassError] = useState("");
  const [onFailError, setOnFailError] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  //Keep track if we are updating a quiz or adding a new one.
  const [isUpdate, setIsUpdate] = useState(false);
  const [flagToAllQuestions, setFlagToAllQuestions] = useState();
  const [flagToSelectedQuestions, setFlagToSelectedQuestions] = useState(false);
  //Keep track of the question id
  const [testId, setTestId] = useState();
  const [subjectId, setSubjectId] = useState();
  const [modelOnLoad, setModelOnLoad] = useState({});
  const [userId, setUserId] = useState(location.state.userId);
  //quiz model states
  const [numberOfQAdded, setNumberOfQAdded] = useState(0);
  const [inputPassGrade, setPassingGrade] = useState("");
  const [testName, setTestName] = useState("");
  const [testQuestionsAdded, setTestQuestionsAdded] = useState([]);
  const [headerText, setHeaderText] = useState();
  const [msgOnPass, setMsgOnPass] = useState();
  const [msgOnFail, setMsgOnFail] = useState();
  const [inputLangu, setInputLan] = useState("english");
  const [inputFieldOfStudy, setInputFieldOfStudy] = useState();
  const [fieldOfStudyId, setFieldOfStudyId] = useState();
  const [inputTestType, setInputTestType] = useState("");

  useEffect(async () => {
    setQuestionList([]);
    if (location.state.quiz != null) {
      setIsUpdate(true);
      let res = await retriveQuiz(`${location.state.quiz}`);
      let resList = await retriveQuestions();
      let subjName = await getSubjectService(res.subjectOfStudying);
      let result = await loadedQuestionsNamesHelper(res.questions);
      setTestId(res._id);
      setQuestionList(resList.data);
      orderTheQ(resList.data);
      setTotalNumOfQuestion(resList.data.length);
      setPassedSubject(subjName.data.subjectName);
      setMsgOnPass(res.msgOnPassBody);
      setPassingGrade(res.passingGrade);
      setTestName(res.testName);
      setSubjectId(subjName.data._id);
      setMsgOnFail(res.msgOnFailBody);
      setHeaderText(res.msgOnPassSubject);

      if (res.questions == undefined) {
        setNumberOfQAdded(0);
      }
    } else {
      if (location.state.subject == `undefined` || location.state.subject == "") {
        window.alert('couldnt find subject redirecting you to main menu sorry :(')
        navigate('/MainMenu', { state: { name: userId } });
      }
      setInputFieldOfStudy(location.state.subject);
      let subjectId = await getSubjectByName(location.state.subject);

      setFieldOfStudyId(subjectId._id);
      setFlagEmptyField(false);
      setTestQuestionsAdded([]);
      let resList = await retriveQuestions();
      setQuestionList(resList.data);
      orderTheQ(resList.data);
      setTotalNumOfQuestion(resList.data.length);
    }

    setFirstRender(false);
  }, []);

  const loadedQuestionsNamesHelper = async (qustionList) => {
    let arr = [];
    let arr2 =[]
    for (const question of qustionList) {
      let res = await retriveSpecificQuestionService(question);
      arr.push(`${res.questionName},`);
      arr2.push(res._id);
    }
    setLoadedQuestionsNames(arr);
    setTestQuestionsAdded(arr2);
    return true;
  };

  const orderTheQ = (qustionList) => {
    setQuestionListForGrid([]);

    let arr = [];
    let titles = {
      title: `Currently showing ${qustionList.length} questions`,
      buttons: "",
    };
    arr.push(titles);
    if (qustionList.length > 10) {
      setArrayBiggerThan10(true);
      indexRef.current = 0;
      for (var i = 0; i < 10; i++) {
        let e = qustionList[i];
        let newQuestions = {
          adding: <button onClick={() => addQuestionToList(e._id)}>Add</button>,
          questionNameAndTag: (
            <QuestionNameAndTags
              Tags={e.questionTags}
              questionName={e.questionName}
            />
          ),
        };
        arr.push(newQuestions);
      }
    } else {
      qustionList.forEach((e) => {
        let newQuestions = {
          adding: <button onClick={() => addQuestionToList(e._id)}>Add</button>,
          questionNameAndTag: (
            <QuestionNameAndTags
              Tags={e.questionTags}
              questionName={e.questionName}
            />
          ),
        };
        arr.push(newQuestions);
      });
    }
    setQuestionListForGrid(arr);
  };

  const setItemsOnLoadWithID = (model) => {
    setModelOnLoad(model.data);
    setTotalNumOfQuestion();
    orderTheQ();
  };

  const addQuestionToList = async (id) => {
    const match = testQuestionsAdded.find((element) => {
      if (element.includes(id)) {
        return true;
      }
    });
    if (match) {
      console.log("already have this Q!");
    }
    else {
      let arr = testQuestionsAdded;
      arr.push(id);
      await loadedQuestionsNamesHelper(arr);
      setTestQuestionsAdded(arr);
      setNumberOfQAdded(testQuestionsAdded.length);
    }

  };

  const changedTestType = (value) => {
    setInputTestType(value.target.value);
  };

  const changedLengu = (value) => {
    setQuizLen(value.target.value);
    setInputLan(value.target.value);
    setLanguegeError("");
  };

  const changed = (value) => {
    setSelectedOption(value.target.value);
  };
  const changeInput = (value) => {
    setInputSearchText(value.target.value);
  };
  const handleSearch = async () => {
    let searchRes = await axios.post(port + "search", {
      searchBy: selectedOption,
      searchText: inputSearchText,
    });
    orderTheQ(searchRes.data);
  };

  const handelShowOnlySelected = () => {
    orderTheQ(qustionList);
  };
  const handelShowAllQuestions = () => {
    setFlagToSelectedQuestions(!flagToSelectedQuestions);
    setFlagToAllQuestions(false);
  };
  const handlefieldOfStudy = (value) => {
    setInputFieldOfStudy(value.target.value);
  };
  const saveQuiz = () => {
    if (firstRender == false) {
      if (isUpdate) {
        let quiz = {
          id: testId,
          language: inputLangu,
          testName: testName,
          passingGrade: inputPassGrade,
          msgOnPassSubject: headerText,
          msgOnPassBody: msgOnPass,
          msgOnFailSubject: msgOnFail,
          msgOnFailBody: msgOnFail,
          questions: testQuestionsAdded,
          date: Date.now(),
          subjectOfStudying: subjectId,
        };
        updateQuizService(quiz);
        window.alert("Updated quiz!");
      } else {
        if (validtion()) {
          let quiz = {
            language: inputLangu,
            testName: testName,
            passingGrade: inputPassGrade,
            msgOnPassSubject: msgOnPass,
            msgOnPassBody: msgOnPass,
            msgOnFailSubject: msgOnFail,
            msgOnFailBody: msgOnFail,
            questions: testQuestionsAdded,
            date: Date.now(),
            subjectOfStudying: fieldOfStudyId,
          };
          saveQuestionsService(quiz);
          window.alert("quiz has been saved!");
        }
      }
    }
  };

  const validtion = () => {
    let flag = true;
    if (testName === "") {
      flag = false;
      setNameError("Name is Empty");
    } else {
      setNameError("");
    }
    if (inputLangu == "") {
      flag = false;
      setLanguegeError("Languege is Empty");
    } else {
      setLanguegeError("");
    }
    if (inputPassGrade == "") {
      flag = false;
      setGradeError("Grade is Empty");
    } else {
      setGradeError("");
    }
    if (headerText == "") {
      flag = false;
      setHeaderError("Missing A header To The Test");
    } else {
      setHeaderError("");
    }
    if (msgOnPass == "") {
      flag = false;
      setOnPassError("Missing on Pass");
    } else {
      setOnPassError("");
    }
    if (msgOnFail == "") {
      flag = false;
      setOnFailError("Missing on Fail Text");
    } else {
      setOnFailError("");
    }
    if (numberOfQAdded <= 0) {
      flag = false;
      setQuestionListError("No Questions In the Quiz");
    } else {
      setQuestionListError("");
    }

    if (flag == false) {
      let windowRes = window.confirm(
        "Cant Add Test Cuz of The folowing:" +
        `${questionListError}` +
        `${onFailError}` +
        "\n" +
        `${onPassError}` +
        "\n" +
        `${gradeError}` +
        "\n" +
        `${nameError}` +
        "\n"
      );
      if (windowRes) {
      }
    }
    return flag;
  };
  const handleTestName = (value) => {
    setTestName(value.target.value);
    setNameError("");
  };

  const handlePassGrade = (value) => {
    setPassingGrade(value.target.value);
    setGradeError("");
  };

  const handelResetQuestionsInTest = async () => {
    let tmp = [];
    await setLoadedQuestionsNames(tmp);
    await setTestQuestionsAdded(tmp);
    setNumberOfQAdded(0)
  };

  const handelNextQuestions = () => {
    if (firstRender == false) {
      if (arrayBiggerThan10) {
        indexRef.current = indexRef.current + 10;
        makeNewQuestionGrid("next");
      }
    }
  };

  const handelBackQuestions = () => {
    if (firstRender == false) {
      if (arrayBiggerThan10 == false) {
        return;
      }
      indexRef.current = indexRef.current - 10;
      makeNewQuestionGrid("back");
    }
  };
  const makeNewQuestionGrid = (op) => {
    setQuestionListForGrid([]);
    let arr = [];
    let titles = {
      title: `Currently showing ${indexRef.current}-${indexRef.current + 10
        } questions`,
      buttons: "",
    };
    arr.push(titles);

    if (op == "next") {
      var range = indexRef.current;

      //indexRef.current =range + 10;
      for (var i = range; i < range + 10; i++) {
        if (qustionList[i] == null) {
          break;
        }
        let e = qustionList[i];
        let newQuestions = {
          adding: <button onClick={() => addQuestionToList(e._id)}>Add</button>,
          questionNameAndTag: (
            <QuestionNameAndTags
              Tags={e.questionTags}
              questionName={e.questionName}
            />
          ),
        };
        arr.push(newQuestions);
      }
      setQuestionListForGrid(arr);
    } else {
      var range = indexRef.current;
      //indexRef.current =range - 10;
      for (var i = range; i < range + 10; i++) {
        if (qustionList[i] == null) {
          break;
        }
        let e = qustionList[i];
        let newQuestions = {
          adding: <button onClick={() => addQuestionToList(e._id)}>Add</button>,
          questionNameAndTag: (
            <QuestionNameAndTags
              Tags={e.questionTags}
              questionName={e.questionName}
            />
          ),
        };
        arr.push(newQuestions);
      }
      setQuestionListForGrid(arr);
    }
  };

  const handleHeaderTextChanged = (text) => {
    setHeaderText(text.getCurrentContent().getPlainText());
  };
  const handleMssOnPassTextChanged = (text) => {
    setMsgOnPass(text.getCurrentContent().getPlainText());
  };
  const handleMssOnFailTextChanged = (text) => {
    setMsgOnFail(text.getCurrentContent().getPlainText());
  };

  return (<div>
    <h1>Edit/Make New Test</h1>
    {flagToSelectedQuestions ? (
      <AllQuestions questionList={qustionList}></AllQuestions>
    ) : (
      <div></div>
    )}
    {/* {false?<AllQuestions questionList = {loadedQuestionsNames}></AllQuestions>:<div></div>} */}
    <div className="generalTestDeatails">
      <div className="fieldOfStudy">
        <label>
          field Of Study:
          {flagEmptyField ? (
            passedSubject
          ) : (
            <Input value={inputFieldOfStudy} onChange={handlefieldOfStudy} />
          )}
        </label>
        { }

        {/* <Input value={testName} onChange={handleTestName} /> */}
      </div>

      <div className="field">
        <label>Languege :</label>
        <DropDownMenu
          items={quizLeng}
          handleClicked={changedLengu}
        ></DropDownMenu>
        <label className="errorDisplay">{languegeError}</label>
      </div>

      <div className="testType">
        <label>test Type :</label>
        <DropDownMenu
          items={testType}
          handleClicked={changedTestType}
        ></DropDownMenu>
      </div>

      <div className="testName">
        <label>test Name :</label>
        { }
        <Input value={testName} onChange={handleTestName} />
        <label className="errorDisplay">{nameError}</label>
      </div>

      <div className="passingGrade">
        <label>passing Grade :</label>
        <Input value={inputPassGrade} onChange={handlePassGrade} />
        <label className="errorDisplay">{gradeError}</label>
      </div>

      <div className="ShowAnswer">
        <label>Show correct Answers</label>
        <Input type="radio"></Input>
      </div>

      <div className="headerTextEditor">
        <label>Header:</label>
        <label className="errorDisplay">{headerError}</label>
        <Editor_w_Validator
          changeAnswer={handleHeaderTextChanged}
          default={isUpdate ? `${headerText}` : `Header Text`}
        />
      </div>

      <div className="passsingTestMssTextEditor">
        <label>Messege to Show on Passing:</label>
        <label className="errorDisplay">{onPassError}</label>
        <Editor_w_Validator
          changeAnswer={handleMssOnPassTextChanged}
          default={isUpdate ? `${msgOnPass}` : `Messege on Passing the Test`}
        />
      </div>
      <div className="failTestMssTextEditor">
        <label>Messege to Show on Passing:</label>
        <label className="errorDisplay">{onFailError}</label>
        <Editor_w_Validator
          changeAnswer={handleMssOnFailTextChanged}
          default={isUpdate ? `${msgOnFail}` : "Messege on Failing the Test"}
        />
      </div>
    </div>

    <div className="questionContainer">
      <div className="topLine">
        <h3>Questions</h3>
      </div>

      <div className="upperQuestion">
        <div>Note:this test is set to be "{inputTestType}"</div>
        <ul>
          <li>All the questions u select will be in the test</li>
          <li>all repdents each respondent to recive </li>
        </ul>
      </div>
      <div className="selectQuestion">
        <h4>select the questions that you want to includ in the test:</h4>
        <div>
          <label>Fillter by content</label>{" "}
          <Input
            placeholder="Search"
            onChange={changeInput}
            className="searchBar"
            classNameInput="searchBar"
          />
          <Button text="Search" action={handleSearch} />
          <DropDownMenu items={searchBy} handleClicked={changed} />
        </div>

        <MenuGrid items={questionListForGrid}></MenuGrid>
        <div className="buttonLine">
          Showing {totalNumOfQuestion} of {totalNumOfQuestion}
          {arrayBiggerThan10 ? (
            <Button
              text="Back"
              width="65px"
              height="20px"
              action={handelBackQuestions}
            ></Button>
          ) : (
            ""
          )}
          <Button
            text="Next"
            width="65px"
            height="20px"
            action={handelNextQuestions}
          ></Button>
          <Button
            text="Reset Search"
            width="200px"
            height="20px"
            action={handelShowOnlySelected}
          ></Button>
          <Button
            text="Show All Questions"
            width="200px"
            height="20px"
            action={handelShowAllQuestions}
          ></Button>
          <Button
            text="Reset Questions in Test"
            width="200px"
            height="20px"
            action={handelResetQuestionsInTest}
          ></Button>
        </div>
        <div>The test will includ {numberOfQAdded} questions in total </div>
        <div className="inTestNames">
          questions that in the test - {loadedQuestionsNames}
          <label className="errorDisplay">{questionListError}</label>
        </div>
      </div>
    </div>

    <div className="actionButton">
      <Link to={"/QuizMenu"} state={{ subject: passedSubject, userName: userId }}>
        <Button text="Back" width="65px" height="20px" />
      </Link>

      <Button
        text="Save"
        width="65px"
        height="20px"
        action={saveQuiz}
      ></Button>
    </div>
  </div>
  );
};

export default EditQuiz;
