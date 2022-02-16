import { useEffect, useState } from "react";
import BlueLayoutBar from "../GlobalComponents/BlueLayoutBar/BlueLayoutBar";
import DropDownMenu from "../GlobalComponents/DropDownMenu/DropDownMenu";
import "./mainMenu.css"
import { Link, useParams,useLocation } from "react-router-dom";
import SubjectService from "./Services/subjectService";


const MainMenu = (props) => {
    const location = useLocation();
    const [userName,setUsername] = useState(location.state.name);
    const [subjectList,setSubjectList] = useState([]);
    
          console.log(location.state.name);
    
    const update =()=>{
       
        return<DropDownMenu key={subjectList.length} className="drop" items={subjectList}  width = "200px"></DropDownMenu> 
            
        
    } 

   
      useEffect(() => {
          //console.log(this.props.match.params.id);
          


        if(subjectList != SubjectService()){
          let x =  SubjectService();
          setSubjectList(
              x
          )
          console.log(5);}
      },[userName])


    return(
        <div>
            <div>
                <BlueLayoutBar pageName={userName}></BlueLayoutBar>
            </div>

            <h4 className="headlingMain">
            Main Menu
            </h4>
            <div className="container">
                <div className="listStudy">
                    <div className="field">Choose a field of study:</div>
                    {update()}
                    {/* <DropDownMenu className="drop" items={subjectList}  width = "200px"></DropDownMenu>  */}
                </div>
                <div className = "btn1">
                
                <Link className = "btn1" to='/ManageQuestions' state = {{userName : `${userName}`,subject:`${subjectList}`}}>
                Manage Questions >>
                </Link>
                </div>
                
                <div className = "btn1">
               
                <Link className = "btn" to='/ManageTests' state = {{userName : `${userName}`,subject:`${subjectList}`}}>
                Manage Tests >>
                </Link>
                </div>
              
                
                <div className = "btn1">
                

                <Link className = "btn" to='/Reports' state = {{userName :`${userName}`,subject:`${subjectList}`}} >
                    Reports >>
                </Link>
                </div>
            </div>





        </div>
            
        )


}
export default MainMenu;
