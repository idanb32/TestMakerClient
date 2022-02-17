import react from "react";
import TextEditor from "../../../../GlobalComponents/TextEditor/TextEditor";

const Editor_w_Validator =(props)=>{

    return(<div className="EditorWValid">
        <TextEditor editorState={props.editorState} setEditorState={props.setEditorState} />
        <div className="errorDisplay"> {props.error ? props.error : ""}</div>
    </div>

    );

}
export default Editor_w_Validator;