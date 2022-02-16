import react from "react";
import Editor_w_Validator from "./Components/Editor_W_Validation/Editor_W_Validator";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import PosibleAnswer from "./Components/posibleAnswer/posibleAnswer";




const EditQuestion = ()=> {

    return(<div className="EditQuestion">
        <div className="QuestionType">
            Question Type:
            <DropDownMenu />
        </div>
        <div className="QuestionText">
            Question text: 
            <Editor_w_Validator />
        </div>
        <div>line</div>
        <PosibleAnswer />
    </div>
        
    );

}

export default EditQuestion;