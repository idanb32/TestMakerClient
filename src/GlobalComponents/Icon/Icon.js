import react from "react";

const Icon =(props)=>{
    const style = {
        color: props.color
    };

    <i className={props.className}  style={style} onClick={props.onClick}/>

}
export default Icon;