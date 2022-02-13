import {React,useState,useEffect} from "react";
import "./BlueLayoutBar.css";

function BlueLayoutBar(props) {


    const [flag,setFlag] = useState(false);
    const [pageName,setPageName] = useState(props.pageName);

    

    useEffect(() => {
        if(pageName != null)
        setFlag(true);

    })

    

  return (
    <div>
      <div className="blueLayout">
            <div className ="inside">
          Administion System {"-   " +pageName.toString()}
              </div>
        </div>
    </div>
  );
}

export default BlueLayoutBar;
