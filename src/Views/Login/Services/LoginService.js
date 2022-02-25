const axios = require('axios')
const port = 3000;

const LoginService = async (userName, password) => {

    let user = userName;
    let pass = password;
    try {
        const body = { userName: user, userPassword: pass };
        const response = await axios.post('http://localhost:5000/user/GetLogin', body);
        if (response.data) {
            console.log(response.data);
            return response.data;

        }
    }
    catch (err) {
        console.log(err);
        return false;
    }

}
export default LoginService;