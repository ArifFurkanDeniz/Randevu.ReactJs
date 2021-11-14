import React, {useEffect,useState } from 'react'
import ResumeService from '../services/resume.service'

const RenderPdf = (getData) => {
    const [data, setData] = useState();
    useEffect(() => {
     
debugger;
        ResumeService.getPdf(getData.guid,null).then(
            (result) => {
            debugger;
                setData(result.data);
            },
            (error) => {
            
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        
                // setLoading(false);
                // setMessage(resMessage);
            }
        );
      
      //  console.log("Hello World?", data)
      
  
    
  
      // clean up
      
    }, []) // empty array => run only once
  
    return (
      <div>
        <iframe width="100%" height="1000"
          srcDoc={data!=null && data}
        />
      </div>
    )
  }

  export default RenderPdf