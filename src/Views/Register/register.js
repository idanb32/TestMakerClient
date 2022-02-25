import { useState, useEffect } from 'react';
import RegisteService from './Services/registerService';
import BlueLayoutBar from '../../GlobalComponents/BlueLayoutBar/BlueLayoutBar';
import { Link } from 'react-router-dom';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    const [userInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [companyInput, setCompanyInput] = useState("");
    const [userRoleInput, setUserRoleInput] = useState("");

    const [userEror,setUserEror] = useState("");
    const [emailEror,setEmailEror] = useState("");
    const [passwordEror,setPasswordEror] = useState("");
    const [userRoleEror,setUserRoleEror] = useState("");

    const nav = useNavigate();

    function handleChangeUser(e) {
        setUserInput(e.target.value);
    }
    function handleChangePass(e) {
        setPasswordInput(e.target.value);
    }
    function handleChangeEmail(e) {
        setEmailInput(e.target.value);
    }
    function handleChangeCompany(e) {
        setCompanyInput(e.target.value);
    }
    function handleChangeUserRole(e) {
        setUserRoleInput(e.target.value);
    }

    async function register() {
        if(validate())
        RegisteService(userInput, passwordInput, emailInput, companyInput, userRoleInput).
            then((res) => {
                console.log(res);
                if (res.userRole == "Student") {
                    nav('/ClientMenu',{state:{userId: res._id}})
                }
                else {
                    nav('/MainMenu',{state:{name:res.userName}})
                }
            })
            .catch((err) => console.log(err))
    }

    const validate=()=>{
        let flag = true
        if(userInput==""){
            flag=false;
            setUserEror("User name is empty");
        }
        if(passwordInput==""){
            flag=false;
            setPasswordEror("Password is empty");
        }
        if(emailInput==""){
            flag=false;
            setEmailEror("Email adress is empty");
        }
        if(userRoleInput==""){
            flag=false;
            setUserRoleEror("User role is empty");
        }
        return flag;
    }


    return (
        <div>

            <div>
                <BlueLayoutBar pageName="Register"></BlueLayoutBar>
            </div>

            <div className="container">

                <h4>register Form</h4>

                <div className="usernameInput">
                    <label>UserName: </label>
                    <input className="input"
                        type="text" value={userInput} onChange={(e) => handleChangeUser(e)}></input>
                    <div className='errorDisplay'>{userEror} </div>
                </div>

                <div className="PasswordInput">
                    <label>Password : </label>
                    <input className="input" type="text" value={passwordInput} onChange={(e) => handleChangePass(e)}></input>
                    <div className='errorDisplay'>{passwordEror} </div>
                </div>


                <div className="emailInput">
                    <label>Email : </label>
                    <input className="input" type="text" value={emailInput} onChange={(e) => handleChangeEmail(e)}></input>
                    <div className='errorDisplay'>{emailEror} </div>
                </div>


                <div className="companyInput">
                    <label>companyID : </label>
                    <input className="input" value={companyInput} type="text" onChange={(e) => handleChangeCompany(e)}></input>
                </div>


                <div className="userRoleInput">
                    <label>User Role - "Admin" or "Student" :</label>
                    <input className="input" value={userRoleInput} type="text" onChange={(e) => handleChangeUserRole(e)}></input>
                    <div className='errorDisplay'>{userRoleEror} </div>
                </div>

                <div className='registerbuttons'>
                    <button className="registerBtn" onClick={register}>Register</button>
                    <Link to="/"> <button className="registerBtn">Go Back to login </button></Link>
                </div>
            </div>

            <div>

            </div>

        </div>)
}
export default Register;