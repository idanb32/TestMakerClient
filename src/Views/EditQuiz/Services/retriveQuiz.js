import axios from "axios";
const port = "http://localhost:5000/quiz/Get";



const retriveQuiz =async (id)=>{
    try {
        let body ={"id":id}
        let response = await axios.post(port,body);
        console.log(response.data.questions);
        return response.data;
        }
        catch (e)
        {
            console.log(e);
        }

}

export default retriveQuiz;
