const axios = require('axios')
const port = 3000;

const RegisteService =async (userNameInput,passwordInput,emailAdressInput,companyIDInput,userRoleInput)=>{

  
try{
    const body = { userName: userNameInput,userPassword :passwordInput,emailAdress:emailAdressInput,companyID:"6205081a8f0948a7b51e215d",userRole:userRoleInput };
    const response = await axios.post('http://localhost:5000/user/Add', body);
    if(response.data)
    {
        console.log(response.data);
        return true;
        
    }
    }
catch (err)
    {
    console.log(err);
    return false;
    }
    
}
export default RegisteService;