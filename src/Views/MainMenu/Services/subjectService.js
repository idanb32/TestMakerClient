const axios =require('axios')
const port = 3000;

const  SubjectService=async ()=>{



    try{
        const body = { companyID:"6205081a8f0948a7b51e215d"};
        const response = await axios.post('http://localhost:5000/subject/GetByCompanyId', body);
        if(response.data)
        {
            let arr = [];
            console.log(response.data);
            response.data.forEach(element => {
                arr.push(element.subjectName);
                
            });
            console.log(arr);
            return arr;
            
        }
        }
    catch (err)
        {
        console.log(err);
        return '';
        }


   
    // if(true)
    // {
    //     return ['now','hello','bye','goodbye','nothing']
    // }
    // else{
    //     fetch()
    // }
    
}
export default SubjectService;