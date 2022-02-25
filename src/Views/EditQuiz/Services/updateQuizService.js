import axios from "axios";
const port = "http://localhost:5000/quiz/Update";



const updateQuizService =async (model)=>{
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

export default updateQuizService;
