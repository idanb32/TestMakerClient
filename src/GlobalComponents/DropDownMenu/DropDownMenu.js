import React from "react";
import { useEffect, useState } from "react";

function DropDownMenu(props) {


    const [arrayOfopt, setArrayOfopt] = useState(props.items);
    const [numOfopt, setNumofOpt] = useState(props.items.length);
    const [options, setOptions] = useState();
    const [dropDownwidthSize, setWidthSize] = useState(props.width);
    const [dropDownheightSize, setHeightSize] = useState(props.height);
    const [flagGreen, setFlagGreen] = useState(false);

    useEffect(() => {
        setArrayOfopt();
        setNumofOpt(arrayOfopt.length); 

        if (numOfopt > 0) {
            setOptions(arrayOfopt.map((option) => {
                return <option value={option} key={option} className="option">{option}</option>
            }))
        }
    }, [ setNumofOpt, props.items])

    const styles =
    {
        width: `${dropDownwidthSize}`,
        height: `${dropDownheightSize}`,
    }
    const styles2 =
    {
        width: `${dropDownwidthSize}`,
        height: `${dropDownheightSize}`,
    }

    return (
        <div>
            {
                flagGreen ?
                    <select className="noGreen" style={styles} onChange={props.handleClicked} >
                        {options}
                    </select>

                    :
                    <select className="green" style={styles2} onChange={props.handleClicked}>
                        {options}
                    </select>
            }
        </div>
    );
}

export default DropDownMenu;
