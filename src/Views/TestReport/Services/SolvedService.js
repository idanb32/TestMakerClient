const axios = require('axios');


const SolvedService = async (id, from, to) => {
    try {
        console.log(from);
        console.log(to);
        if (from != null && to != null) {
            const response = await axios.post('http://localhost:5000/solvedQuestion/GetAllWithUserName', { id: id, from: from, to: to });
            if (response.data) {
                return response.data;
            }
        }
    }
    catch (err) {
        console.log(err);
        return '';
    }
}

export default SolvedService;