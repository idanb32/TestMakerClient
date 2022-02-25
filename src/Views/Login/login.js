import { React, useState, useEffect } from "react";
import Button from "../../GlobalComponents/Button/Button";
import { Link } from "react-router-dom";
import BlueLayoutBar from "../../GlobalComponents/BlueLayoutBar/BlueLayoutBar";
import "./login.css";
import LoginService from "./Services/LoginService";
import { useNavigate } from "react-router-dom";

const LoginPage = (history) => {

  const [userValue, setUserValue] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const nav = useNavigate();

  function handleChangeUser(e) {
    setUserValue(e.target.value);
  }
  function handleChangePass(e) {
    setUserPassword(e.target.value);
  }
  function submit() {

    LoginService(userValue, userPassword).then((result) => {
      console.log(result);
      if (result.userRole == "Admin") {
        nav('/MainMenu');
      }
      else {
        nav('/ClientMenu',{state:{name:result.userName}});
      }
    }).catch((err) => console.log(err));

  }




  const headers = 50;

  return (
    <div>
      <div className="BarContainer">
        <BlueLayoutBar pageName="Login Page"></BlueLayoutBar>
      </div>

      <h4 className="headlingLogin">Login</h4>

      <div className="tagCont" >Please complete the following form to begin:</div>
      <div className="container">



        <div className="inputContainer">
          <div className="emailInput">
            <label>Email : </label>
            <input className="input1" value={userValue} name="firstName"
              type="text" onChange={(e) => handleChangeUser(e)}></input>
          </div>

          <div className="PasswordInput">
            <label>Password : </label>
            <input className="input2" value={userPassword} type="password" name="password" onChange={(e) => handleChangePass(e)}></input>
          </div>
         

          <div id="logInDiv" className="btn2" onClick={submit}>
            <Button color='grey' text="Submit" width='100px' height='30px' action={submit}></Button>
          </div>

          <div>
            <Link to="/Register" className="singUp">
              SignUp
            </Link>
          </div>

        </div>



      </div>




    </div>)
}

export default LoginPage;