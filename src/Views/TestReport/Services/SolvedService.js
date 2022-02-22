const axios = require('axios');


const SolvedService =async (testName)=>{

    try{
        console.log(testName);
        const body = { searchText:`js test`,searchBy:"Name"};
        const response = await axios.get('http://localhost:5000/solvedQuestion/GetAll');
        if(response.data)
        {
            console.log(response.data);
            let arr =[];
            response.data.map(res=>{
                if(res.testId)
                {
                     arr.push(res);
                }
            })
            
            return arr;
            
        }
        }
    catch (err)
        {
        console.log(err);
        return '';
        }
}

export default SolvedService;