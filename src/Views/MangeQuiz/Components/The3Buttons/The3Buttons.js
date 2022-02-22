import Button from "../../../../GlobalComponents/Button/Button";
import react from "react";
import { useState } from "react";


const The3Buttons =(props)=>{
    const [id,setId] = useState(props.id);


    return(<div className="threeButtons">
        <Button text="Show" action={props.showClicked} />
        <Button text="Edit" action={props.editClicked} />
        <Button text="Delete" action={props.deleteClicked} />
    </div>)


}
export default The3Buttons;