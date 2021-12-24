import React, { useState, useEffect } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import {
  CButton,
  CCard,
  
  CCardBody,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
  CCardLink,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CDataTable,
  CRow,
  CPagination,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import DocumentService from '../../services/document.service'


// const { page } = useParams();

const ClientDocuments = (data) => {


    const [documents, setDocuments] = useState([]);
    const [folderName, setFolderName] = useState('');
  useEffect(() => {

    send();
 
  
  }, []);

  const folderNameChanged = (value) => {
    setFolderName(value)
  }

  const onClickDeleteFolder = (path) =>{
    DocumentService.deleteFolder(path).then(
      (result) => {
          send();
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
  }

  const onClickDeleteDocument = (publicId) =>{
    DocumentService.deleteDocument(publicId).then(
      (result) => {
          send();
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
  }
  const onClickCreateFolder = () =>{

    let request = {
      Name : folderName,
      RootFolderName : data.id
    }

    
    if (folderName != null && folderName != "") 
    {
      DocumentService.createFolder(request).then(
        (result) => {
            setFolderName(''); 
            send();
       
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
    }
   

  }

//   const changeHandler = e => {
//       
//     setDocuments({...client, [e.target.name]: e.target.value})
//  }

 

  const send = () => {
    DocumentService.getFolders(data.id).then(
      (result) => {

        setDocuments(result.data);
        
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
  }

  

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    
		setSelectedFile(event.target.files[0]);
	}


  const handleSubmission = (path) => {
    
    
    const formData = new FormData();

		formData.append('File', selectedFile);
    formData.append('Path', path);

    DocumentService.upload(formData).then(
      (result) => {

        setTimeout(function () {
        
            send();
       
      }, 2000);
      
        
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

	};
//   const clear = () => {

//   }
  return (
    <div>
      <CFormGroup row>
                  <CCol md="3">
                  <CButton type="submit" size="sm" color="primary" onClick={() => {onClickCreateFolder()}}><CIcon name="cil-scrubber" /> Klasör Oluştur</CButton>
                  </CCol>
                  <CCol xs="12" md="3">
                  <CInput id="text-input" name="folderName"  onChange={(e) => folderNameChanged(e.target.value)}  value={folderName} />
                  </CCol>
    </CFormGroup>
      

        <CCardBody >
        <CFormGroup row>
              {documents.length>0 && documents.map((element) => (  
         //  <div style={{ display: 'block', minWidth: 320, padding:10, float: 'left' }}> 
  
         <CCol xs="12" md="4">
         <CListGroup className="mb-2" layout={'horizontal${"-sm"}'} >
           <CListGroupItem  active >
          
   
           {" " +element.name + " "} 
        
             </CListGroupItem>

          {element.documents.map((element2) => (
              <CListGroupItem>
              <a href={element2.url} target="_blank">  {element2.fileName} </a>
                <CButton size="sm" color="danger" onClick={() => {onClickDeleteDocument(element2.publicId)}} >Sil</CButton>
              </CListGroupItem>
          ))}
          
           <CListGroupItem> 
          
           <input type="file" name="file" onChange={changeHandler}   />

           {/* <CButton size="sm" color="secondary"  onClick={onClickUpload(element.path)} >+</CButton>    */}
           <div>
				<button name={element.name} onClick={() =>handleSubmission(element.path)}>Gönder</button>
			</div>
           <CButton size="sm" color="danger" onClick={() => {onClickDeleteFolder(element.path)}}>Klasörü Sil</CButton>
           </CListGroupItem>
         </CListGroup>
       

  </CCol>
         //  </div>
          
       
         
             ))}  
             </CFormGroup>
          
         
       </CCardBody>
    </div>
           
  )
}

export default ClientDocuments
