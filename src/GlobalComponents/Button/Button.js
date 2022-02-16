import { React, useState, useEffect } from "react";
import "./Button.css";

function Button(props) {

    const [textProp, setTextProp] = useState(props.text);
    const [buttonColor, setButtonColor] = useState(props.color);
    const [backGroundcolor, setbackGroundcolor] = useState(props.backGroundcolor);
    const [actionContent, setActionContent] = useState(props.action);
    const [widthSize, setwidthSize] = useState(props.width);
    const [heightSize, setheightSize] = useState(props.height);

    const styles = {

        "backgroundColor": `${backGroundcolor}`,
        "width": `${widthSize}`,
        "height": `${heightSize}`,
        "textColor": `${buttonColor}`

    }


    return (
        <button className='btn' style={styles} onClick={props.action}>
            {textProp}
        </button>
    )
}
export default Button;