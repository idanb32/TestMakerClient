const axios = require('axios');


const SolvedService = async (id) => {
    try {
        const response = await axios.post('http://localhost:5000/solvedQuestion/GetSolvedOfQuiz', { id: id });
        if (response.data) {
            return response.data;
        }
    }
    catch (err) {
        console.log(err);
        return '';
    }
}

export default SolvedService;