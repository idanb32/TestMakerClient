const axios = require('axios');


const TestService =async (testName)=>{

    try{
        console.log(testName);
        const body = { searchText:`js test`,searchBy:"Name"};
        const response = await axios.post('http://localhost:5000/quiz/search',body);
        if(response.data)
        {

            console.log(response.data[0]);
            return response.data[0];
            
        }
        }
    catch (err)
        {
        console.log(err);
        return '';
        }





}

export default TestService;