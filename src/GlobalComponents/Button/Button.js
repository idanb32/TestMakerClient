import { React, useState, useEffect } from "react";
import "./Button.css";

function Button(props) {

    const [buttonColor, setButtonColor] = useState(props.color);
    const [backGroundcolor, setbackGroundcolor] = useState(props.backGroundcolor);
    const [widthSize, setwidthSize] = useState(props.width);
    const [heightSize, setheightSize] = useState(props.height);
    const styles = {

        "backgroundColor": `${backGroundcolor}`,
        "width": `${widthSize}`,
        "height": `${heightSize}`,
        "textColor": `${buttonColor}`

    }
 

    return (
        <button className='MainButton' style={styles} onClick={props.action}>
            {props.text}
        </button>
    )
}
export default Button;