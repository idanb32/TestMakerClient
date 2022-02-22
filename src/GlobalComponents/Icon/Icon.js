import react from "react";

const Icon =(props)=>{
    const style = {
        color: props.color
    };

   return( <i className={props.className}  style={style} onClick={props.onClick}/>)


}
export default Icon;