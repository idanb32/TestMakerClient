import React from "react";
import { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const TextEditor = (props) => {
    const [editorState, setEditorState] = useState();
   
    const editor = useRef(null);
    function focusEditor() {
        editor.current.focus();
    }
    return (<div style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
        onClick={focusEditor} >
        <Editor
            editorClassName={"Editor "+ props.classname}
            editorState={editorState}
            onEditorStateChange={setEditorState}
        />
    </div>
    );
}


export default TextEditor;