import axios from "axios";
const port = "http://localhost:5000/subject/Get";



const getSubjectService =async (id)=>{
    try {
        let body = {"id":`${id}`}
        let response = await axios.post(port,body);
        
        return response;
        }
        catch (e)
        {
            console.log(e);
        }

}

export default getSubjectService;
