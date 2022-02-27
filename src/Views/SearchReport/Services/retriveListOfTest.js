import axios from "axios";
const port = "http://localhost:5000/quiz/searchBySubject";



const retriveListOfTest =async (id)=>{
    try {
        let body = {"subjectId":`${id}`}
        let response = await axios.post(port,body);
        console.log(response.data);
        return response.data;
        }
        catch (e)
        {
            console.log(e);
        }

}

export default retriveListOfTest;
