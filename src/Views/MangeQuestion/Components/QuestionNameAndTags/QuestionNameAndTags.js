import react from "react";
import './QuestionNameAndTags.css';



const QuestionNameAndTags = (props) => {
    const questionName = props.questionName;
    const renderTags = () => {
        let num = 0;
        return props.Tags.map((item) => {
            num++;
            return (<div className="tag" key={item + "num"}>
                {item}
            </div>);
        })
    }
    return (<div className="questionAndTags">
        <div className="questionName">{questionName} </div>
        <div className="tags">
            {renderTags()}
        </div>
    </div>);

}
export default QuestionNameAndTags;