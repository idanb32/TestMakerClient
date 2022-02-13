import { React,useEffect,useState } from "react";
import GreenLine from "./GreenLine";

function DropDownMenu(props) {
  
    
    const [arrayOfopt,setArray] = useState(['ssss','wwww']);
    const [numOfopt,setNumofOpt] = useState(arrayOfopt.length);
    const [options,setOptions] = useState();
    const [dropDownwidthSize,setWidthSize] = useState(props.width);
    const [dropDownheightSize,setHeightSize] = useState(props.height);
    const [flagGreen , setFlagGreen] = useState(false);
    
  useEffect(() => {
      if(numOfopt > 0)
        {
            setOptions (arrayOfopt.map((option) =>
        <option>{option}</option>
            ))
        }
  })
  
  const styles = 
  {
      width : `${dropDownwidthSize}`,
      height :  `${dropDownheightSize}`,
  }
  const styles2 = 
  {
      width : `${dropDownwidthSize}`,
      height :  `${dropDownheightSize}`,
  }
  
    return (
    <div>
        {
        flagGreen ? 
        <select className = "noGreen" style={styles}>
            {options} 
            <GreenLine></GreenLine>
        </select>
        
        :
        <select className = "green" style={styles2}>
            {options} 
            <GreenLine></GreenLine>
        </select>
        }
     
        
    </div>
  );
}

export default DropDownMenu;
