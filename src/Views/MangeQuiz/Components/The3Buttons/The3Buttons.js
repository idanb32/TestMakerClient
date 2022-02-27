import Button from "../../../../GlobalComponents/Button/Button";
import react from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const The3Buttons = (props) => {
    const [id, setId] = useState(props.id);
    const [flag, setFlag] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    const handleDeleteClicked = () => {
        if (firstRender)
            props.deleteClicked(id);
        else
            setFirstRender(true);
    }




    return (<div className="threeButtons">
        <Link to={`/EditQuiz`} state={{ quiz: id, subject: "" }} >
            <Button text="Edit" action={props.editClicked} />
        </Link>
        <Button text="Delete" action={handleDeleteClicked} />
    </div>)


}
export default The3Buttons;