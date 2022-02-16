import react from "react";
import TextEditor from "../../../../GlobalComponents/TextEditor/TextEditor";
import Icon from "../../../../GlobalComponents/Icon/Icon";

const PosibleAnswer =(props)=>{

    return(<div className="PosibleAnswer">
        <Icon className="fa-solid fa-circle-xmark" onClick={props.removeAnswer} />
        <TextEditor />
    </div>)


}
export default PosibleAnswer;