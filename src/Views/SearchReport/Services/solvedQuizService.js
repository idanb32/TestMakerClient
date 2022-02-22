
const axios =require('axios')


const SolvedQuizService= async()=>{

    try{
        const body = { _id:"620508eb26bf31fcc3b0cc50"};
        const response = await axios.get('http://localhost:5000/quiz/GetAll');
        if(response.data)
        {


            let arr = [];
            
            response.data.map(element => {
                if(element.subjectOfStudying == "620508ea26bf31fcc3b0cc42")
                arr.push(element.testName);
                
            });
            console.log(arr);
            return arr;
            
        }
        }
    catch (err)
        {
        console.log(err);
        return '';
        }


}



export default SolvedQuizService;