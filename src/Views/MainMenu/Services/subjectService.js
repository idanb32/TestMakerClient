const axios =require('axios')
const port = 3000;

const  SubjectService=async ()=>{



    try{
        const body = { companyID:"6205081a8f0948a7b51e215d"};
        const response = await axios.get('http://localhost:5000/subject/getall');
        if(response.data)
        {
            let arr = [];
            
            response.data.map(element => {
                arr.push(element.subjectName);
                
            });
            
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