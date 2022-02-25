import Button from "../../../../GlobalComponents/Button/Button";
import react from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const The3Buttons =(props)=>{
    const [id,setId] = useState(props.id);
    const [flag,setFlag] = useState(false);

   



    return(<div className="threeButtons">
        <Button text="Show" action={props.showClicked} />
        <Link to={`/EditQuiz`}  state={{ quiz: id }} >
        <Button text="Edit" action={props.editClicked} />
        </Link>
       
        <Button text="Delete" action={props.deleteClicked} />
    </div>)


}
export default The3Buttons;