import react from "react";
import { useState, useEffect } from "react";
import './nav.css'

const Nav = (props) => {
    const [navValue, setNavValue] = useState(props.value);
    const handleClicked = () => {
        props.onClick(navValue);
    }
  

    return (<div className={"nav " } onClick={handleClicked}>
        {navValue}
    </div>)
}
export default Nav;