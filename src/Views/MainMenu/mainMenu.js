import { useEffect, useState } from "react";
import BlueLayoutBar from "../../GlobalComponents/BlueLayoutBar/BlueLayoutBar";
import DropDownMenu from "../../GlobalComponents/DropDownMenu/DropDownMenu";
import "./mainMenu.css"
import { Link, useParams,useLocation } from "react-router-dom";
import SubjectService from "./Services/subjectService";



const MainMenu = (props) => {
    const location = useLocation();
    const [userName,setUsername] = useState(location.state.name);
    const [subjectList,setSubjectList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    
      const update =()=>{
          
        return<DropDownMenu key={subjectList.length} className="drop" items={subjectList}  width = "200px" handleClicked={changed}></DropDownMenu> 
       
    } 

    
    const changed = (value) => {
        console.log(value.target.value);
        setSelectedOption(value.target.value);
    }

   
      useEffect(async() => {
        let arr = await SubjectService();
        setSubjectList(arr);
          


        
      },[])


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
                
                <Link className = "btn1" to='/QuestionMenu' state = {{userName : `${userName}`,subject:`${selectedOption}`}}>
                Manage Questions ...
                </Link>
                </div>
                
                <div className = "btn1">
               
                <Link className = "btn" to='/QuizMenu' state = {{userName : `${userName}`,subject:`${selectedOption}`}}>
                Manage Tests ...
                </Link>
                </div>
              
                
                <div className = "btn1">
                

                <Link className = "btn" to='/SearchReport' state = {{userName :`${userName}`,subject:`${selectedOption}`}} >
                    Reports ...
                </Link>
                </div>
            </div>





        </div>
            
        )


}
export default MainMenu;
