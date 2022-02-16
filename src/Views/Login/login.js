import { React,useState,useEffect } from "react";
import Button from "../GlobalComponents/Button/Button";
import { Link } from "react-router-dom";
import BlueLayoutBar from "../GlobalComponents/BlueLayoutBar/BlueLayoutBar";
import "./login.css";
import LoginService from "./Services/LoginService";

const LoginPage =(history)=> {

const [userValue,setUserValue] = useState('');
const [userPassword,setUserPassword]= useState('');
const [logedIn,setLogedIn] = useState(false);

const [serverLog,setserverLog] = useState(false);


function handleChangeUser(e) {
    console.log("change name");
    setLogedIn(false);
    setUserValue(e.target.value);
  }
  function handleChangePass(e) {
    console.log("change password");
    setLogedIn(false);
    setUserPassword(e.target.value);
  }
 async function submit(){

   let result = await LoginService(userValue,userPassword);
   console.log(result);
   if(result)
   {
       setLogedIn(true);
       //let link =document.createElement( )
       //document.getElementById('logInDiv').div.appendChild(link);
   }
  }


  useEffect((e)=>{
      if(logedIn)
      {
        console.log(serverLog);
        setserverLog(true);
      }


  },[logedIn])


const headers = 50;

    return(
        <div>
        <div className="BarContainer">
            <BlueLayoutBar pageName = "Login Page"></BlueLayoutBar>
        </div>

        <h4 className = "headlingLogin">Login</h4>

        <div className = "tagCont" >Please complete the following form to begin:</div>
        <div className = "container">

        

        <div className="inputContainer">
        <div className="emailInput">
        <label>Email : </label>
        <input className= "input1" value={userValue} name="firstName"
        type = "text" onChange={(e) => handleChangeUser(e)}></input>
        </div>

        <div className="PasswordInput">
        <label>Password : </label>
        <input className= "input2" value={userPassword} type = "text" name="password" onChange={(e) => handleChangePass(e)}></input>
        </div>
        <Link to="/forgotPassword"  className = "forgot">
        Forgot your password?
        </Link>

        <div id="logInDiv" className = "btn2"  onClick={submit}>
        <Button  color = 'grey' text = "Submit" width = '100px' height = '30px'></Button>
        {serverLog ? (<Link to="/MainMenu" state={{name:`${userValue}`}} > Go to main Menu</Link>):(<div></div>)}
        </div>

        <div>
        <Link to="/Register"  className = "singUp">
        SignUp
        </Link>
        </div>
        
        </div>



        </div>




        </div>)
}

export default LoginPage;