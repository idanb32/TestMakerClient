import React from "react";
import Line from "../Line/Line";


const MenuGrid = (props) => {

    const renderLines = () => {
        let num = -1;
        return props.items.map((item) => {
            num=num+1;
            if (num == 0)
                return (<Line item={item} background="orange" onClick = {props.lineClicked}  key={"line"+num} />)
            else if (num % 2 == 0)
                return (<Line item={item} background="gray" onClick = {props.lineClicked} key={"line"+num}/>)
            else
                return (<Line item={item} background="white" onClick = {props.lineClicked} key={"line"+num}/>)
        })
    }

    return (<div className="menuGrid">
        {renderLines()}
    </div>);

}

export default MenuGrid;