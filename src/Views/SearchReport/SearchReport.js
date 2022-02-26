import React from 'react';
import getSubjectByName from '../EditQuiz/Services/getSubjectByName';
import {useLocation,useNavigate  } from "react-router-dom";
import {useState,useEffect} from 'react';
import DropDownMenu from '../../GlobalComponents/DropDownMenu/DropDownMenu';
import SolvedQuizService from './Services/solvedQuizService';
import Button from '../../GlobalComponents/Button/Button';
import retriveListOfTest from './Services/retriveListOfTest';

const SearchReport = (props) =>{
    
const navigate = useNavigate();

const location = useLocation();
const [testList,setTestList] = useState([]);
const [flagForList,setFlagForList] = useState(false)
const [flag,setFlag] = useState(false);
const [testName,setTestName] = useState('');
const [selectedOption, setSelectedOption] = useState('');
const [subject,setSubject] = useState(location.state.subject);
const [userName,setUserName] = useState(location.state.userName);
const [fromDate,setfromDate] = useState();
const [toDate,setToDate] = useState();
const [allTimeState,setAllTimeState] = useState(false);



const changed = (value) => {
    console.log(value.target.value);
    setSelectedOption(value.target.value);
}

const dropDown = ()=>{
     
    if(testList.length>0)
    return  <DropDownMenu  width ="200px" items = {testList} handleClicked={changed}></DropDownMenu>
    else 
    return <label>{testList}</label>
}

const handleBack = () => {
    return navigate(-1);

}
const handleGenerateReport = () => {
    return navigate('/TestReport',{state:{testName:selectedOption,fromDatePass:fromDate,toDatePass:toDate}});

}
const anyEvent=()=>{
console.log('clicked');

}
function onChangeValue(event) {
    
    setAllTimeState(!allTimeState);
    console.log(allTimeState);
  }
const makeList =(list)=>{
    let arr = [];
    if(list.length>0)
    {
        list.forEach((e)=>{
            arr.push(e.testName)
        })
        return arr

    }
    else{
        return list.testName;
    }
  
}

useEffect(async() =>{
    //let result = await SolvedQuizService();
   let subId = await getSubjectByName(subject);
   if(subId == undefined)
   {
    setTestName('nothing found')
    setFlag(true);
   }
   else{
    let list = await retriveListOfTest(subId._id);
   if(list.length>1)
    { 
        let readyList =  makeList(list);
        setTestList(readyList);
        setFlagForList(true);
    }
   else if(list.length==1)
    {
        console.log(list[0].testName);
        setTestName(`${list[0].testName}`);
        setFlag(true);
    }
    else if(list.length == 0)
    {
        setTestName('nothing found')
        setFlag(true);
    }
    }
    },[setTestList])

    return(
            <div>
                <h1>{userName} subject :{subject}</h1>
                <div className = "container">
                    <div className="selectTest">
                        <label>Select Test:</label>
                        {flagForList?dropDown():<label></label>}
                        {flag?<label>{testName}</label>:<label></label>}
                    </div>
                    <div className="selectDate">
                        <label>Date Range</label>
                        <label>From:</label>
                        <input type="date" onChange={event => setToDate(event.target.value)}></input>
                        <label>To:</label>
                        <input type="date" onChange={event => setfromDate(event.target.value)}></input>
                    </div>
                    <div>Or</div>
                    <div>
                      
                        <label>Any date in the past</label>
                    </div>
                    <div onChange={onChangeValue}>
                    <input type="radio" value="true" name="onOff" checked={allTimeState === true} /> on
                    <input type="radio" value="false" name="onOff" checked={allTimeState === false}/> off
                    </div>
                    <div>
                        
                        <Button text="<<Back" color='black' action={handleBack} ></Button>
                        <Button text="Genarate Report" action={handleGenerateReport} ></Button>

                    </div>
                    <div> date:{fromDate}</div>
                    <div> date:{toDate}</div>

                </div>


            </div>
            
            )
}
export default SearchReport;


