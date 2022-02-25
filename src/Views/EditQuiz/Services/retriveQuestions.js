import axios from "axios";
const port = "http://localhost:5000/question/GetAll";



const retriveQuestions =async ()=>{
    try {
        let response = await axios.get(port);
        console.log(response);
        return response;
        }
        catch (e)
        {
            console.log(e);
        }

}

export default retriveQuestions;
