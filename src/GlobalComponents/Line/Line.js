import React from "react";
import "./Line.css";


const Line = (props) => {

    const renderLine = () => {
        let splitProps = Object.keys(props.item);
        let num = 0;
        return splitProps.map(i => {
            num++;
            return (<div className="PartLine" key={num}>
                {props.item[i]}
            </div>);
        });
    }



    return (<div className={props.background + "Line Line"} onClick={props.onClick}>
        {renderLine()}
    </div>
    )
}


export default Line;
