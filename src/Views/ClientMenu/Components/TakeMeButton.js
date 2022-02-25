import react, { useEffect, useState } from "react";
import './TakeMeButton.css'

const TakeMeButton = (props) => {
    const [id, setId] = useState();
    const [userId, setUserId] = useState();
    const [testName,setTestName]=useState();

    useEffect(() => {
        setId(props.id);
        setUserId(props.userId);
        setTestName(props.testName);
    }, [])

    const handleClicked = () => {
        props.takeThis(userId, id,testName);
    }

    return (<button onClick={handleClicked} className='takeMeBtn'>
        {props.text}
    </button>)
}

export default TakeMeButton;