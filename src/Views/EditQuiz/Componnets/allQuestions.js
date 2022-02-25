import { useEffect,useState,react } from "react";
import './allQuestions.css'

const AllQuestions =(props)=>{

    const [questionList,setQuestionList] = useState([]);

    useEffect(()=>{
        setQuestionList(props.questionList)
    })

    const makeQuestionTabel = ()=>{
        console.log(questionList);
        if(questionList == undefined)
        {
            return <div>no Questions in The test Were Found...</div>
        }
        if(questionList)
        {
        let arr = []
        let num = 1;
        questionList.forEach(element => {
            let question = <div className="question">{num}.{element.questionName}<label className="sideLeft">type of :{element.questionType}</label></div>
                num++;
            arr.push(question)
        });
        return arr
        }
        else {
            let arr = []
            let num = 1;
        questionList.forEach(element => {
            let question = <div className="question">{num}.{element.questionName}<label className="sideLeft">type of :{element}</label></div>
                num++;
            arr.push(question)
        });
        return arr
        }

    }



    return(
    <div className="">
           <div className="onTop">
               <h4 className="header">Collection of Questions</h4>
               {makeQuestionTabel()}
           </div>
    </div>
    )
}

export default AllQuestions;