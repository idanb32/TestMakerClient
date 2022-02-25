import axios from "axios";
const port = "http://localhost:5000/quiz/Add";



const retriveQuiz =async (model)=>{
    console.log(model);
    
    try {
        let response = await axios.post(port,model);
        console.log(response);
        }
        catch (e)
        {
            console.log(e);
        }

}

export default retriveQuiz;
