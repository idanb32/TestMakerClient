const axios = require('axios');

const TestService = async (testName) => {

    try {
        const body = { searchText:testName, searchBy: "Name" };
        const response = await axios.post('http://localhost:5000/quiz/search', body);
        if (response.data) {
            return response.data[0];
        }
    }
    catch (err) {
        console.log(err);
        return '';
    }
}

export default TestService;