import axios from "axios";
const port = "http://localhost:5000/question/Get";



const retriveSpecificQuestionService =async (id)=>{
   
   console.log(id);
    try {
        let body = {"id":`${id}`}
        let response = await axios.post(port,body);
        console.log(response);
        return response.data;
        }
        catch (e)
        {
            console.log(e);
        }

}

export default retriveSpecificQuestionService;
