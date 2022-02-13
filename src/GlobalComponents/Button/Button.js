import {React,useState,useEffect} from "react";
import "./Button.css";

function Button(props) {

    const[textProp,setTextProp] = useState(props.text);
    const[buttonColor,setButtonColor]  = useState(props.color);
    const[actionContent,setActionContent] =useState(props.action);
    const [widthSize,setwidthSize] = useState(props.width);
    const [heightSize,setheightSize] = useState(props.height);

    const styles = {

        "background-color": `${buttonColor}`,
        width :`${widthSize}`,
        height: `${heightSize}`,
        "text-color" : `${buttonColor}`

    }


    return(
        <button className='btn'style={styles}>
            {textProp}
        </button>
        )
}
export default Button;