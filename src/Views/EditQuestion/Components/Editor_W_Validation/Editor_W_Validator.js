import react from "react";
import TextEditor from "../../../../GlobalComponents/TextEditor/TextEditor";
import { useState,useEffect } from "react";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';



const Editor_w_Validator = (props) => {
    const [editor, setEditor] = useState();

    const handleChange = (text) => {
        setEditor(text);
        props.changeAnswer(text);
    }

    useEffect(()=>{
        setEditor(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(`<p>${props.default}</p>`)
        )));
    },[props.default])

    return (<div className="EditorWValid">
        <TextEditor editorState={editor} setEditorState={handleChange}  />
        <div className="errorDisplay"> {props.error ? props.error : ""}</div>
    </div>

    );

}
export default Editor_w_Validator;