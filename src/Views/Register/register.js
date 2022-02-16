import {useState,useEffect} from 'react';
import RegisteService from './Services/registerService';
import BlueLayoutBar from '../GlobalComponents/BlueLayoutBar/BlueLayoutBar';
import { Link } from 'react-router-dom';
import './register.css'

const Register = (props)=>{

    const [userInput,setUserInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");
    const [emailInput,setEmailInput] = useState("");
    const [companyInput,setCompanyInput] = useState("");
    const [userRoleInput,setUserRoleInput] = useState("");

    function handleChangeUser(e)
    {
        setUserInput(e.target.value);
    }
    function handleChangePass(e)
    {
        setPasswordInput(e.target.value);
    }
    function handleChangeEmail(e)
    {
        setEmailInput(e.target.value);
    }
    function handleChangeCompany(e)
    {
        setCompanyInput(e.target.value);
    }
    function handleChangeUserRole(e)
    {
        setUserRoleInput(e.target.value);
    }

   async function register(){
       console.log(passwordInput);

      let result =  await RegisteService(userInput,passwordInput,emailInput,companyInput,userRoleInput);
       console.log(result);
       window.parent.postMessage({message: 'The message is being set up here', hide: 'dbhchat', show: 'dbhchat'}, '*')
       


    }



    return(
        <div>

            <div>
                <BlueLayoutBar pageName="Register"></BlueLayoutBar>
            </div>
                
            <div className="container">

                <h4>register Form</h4>

            <div className="emailInput">
            <label>Email : </label>
            <input className= "input"  
            type = "text" value={userInput} onChange={(e) => handleChangeUser(e)}></input>
            </div>

            <div className="PasswordInput">
            <label>Password : </label>
            <input className= "input"  type = "text"  value={passwordInput} onChange={(e) => handleChangePass(e)}></input>
            </div>

            
            <div className="emailInput">
            <label>email : </label>
            <input className= "input"  type = "text" value={emailInput}  onChange={(e) => handleChangeEmail(e)}></input>
            </div>

            
            <div className="companyInput">
            <label>companyID : </label>
            <input className= "input" value={companyInput} type = "text"  onChange={(e) => handleChangeCompany(e)}></input>
            </div>

            
            <div className="userRoleInput">
            <label>User Role - "Admin" or "Student" :</label>
            <input className= "input" value={userRoleInput}  type = "text"  onChange={(e) => handleChangeUserRole(e)}></input>
            </div>


            <button className="btn" onClick={register}>Register</button>
            <Link to="/login"> Go Back to login</Link>

            </div>

            <div>
                
            </div>

            </div>)
}
export default Register;