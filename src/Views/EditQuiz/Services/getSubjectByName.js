import axios from "axios";
const port = "http://localhost:5000/subject/GetSubjectByName";



const getSubjectByName =async (name)=>{
    try {
        let body = {"subjectName":`${name}`}
        let response = await axios.post(port,body);
     
        return response.data[0];
        }
        catch (e)
        {
            console.log(e);
        }

}

export default getSubjectByName;
