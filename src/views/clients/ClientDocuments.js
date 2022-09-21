import React, { useRef,useState, useEffect } from 'react'
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
import pdfIconImage from '../../assets/icons/pdf.png'
import fileIconImage from '../../assets/icons/file.png'


// const { page } = useParams();

const ClientDocuments = (data) => {
    const inputRef = useRef(null);
    const [downloadAllLink, setDownloadAllLink] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [files, setFiles] = useState(null);
    const [folderName, setFolderName] = useState('');
    const [openedFolder, setOpenedFolder] = useState(null);


  useEffect(() => {

    DocumentService.downloadAll("Clients/"+data.id).then(
      (result) => {
          setDownloadAllLink(result.data.data);
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

     send();
   
 
  
  }, [files]);

  const folderNameChanged = (value) => {
    setFolderName(value)
  }

  const onClickDeleteFolder = (path) =>{
    DocumentService.deleteFolder(path).then(
      (result) => {
          setOpenedFolder(null);
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
        debugger;
        onClickOpenFolder(openedFolder);
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

  
  const onClickOpenFolder = (element) =>{

      DocumentService.openFolder(element.path).then(
        (result) => {
          setOpenedFolder(element);
          setFiles(result.data);
     
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


  const [editUrl, setEditUrl] = useState(null)
  const [showEdit2, setshowEdit2] = useState(false)
  const [editType, setEditType] = useState(0)
  const onClickEdit = (showEdit2, url, type) =>{

    setEditUrl(url);
    setshowEdit2(showEdit2);
    setEditType(type);
  }

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    
		setSelectedFile(event.target.files);
	}


  const handleSubmission = (path) => {
  
    selectedFile.forEach(element => {
      const formData = new FormData();

		formData.append('File', element);
    formData.append('Path', path);

    DocumentService.upload(formData).then(
      (result) => {

        setTimeout(function () {
        
          onClickOpenFolder(openedFolder);
       
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

    });
    
    inputRef.current.value = null;
	};
//   const clear = () => {

//   }
  return (
    <div>
      <CFormGroup row>
                  <CCol xs="12" md="2">
                  <CButton type="submit" size="sm" color="primary" onClick={() => {onClickCreateFolder()}}><CIcon name="cil-scrubber" /> Klasör Oluştur</CButton>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CInput id="text-input" name="folderName"  onChange={(e) => folderNameChanged(e.target.value)}  value={folderName} />
                  </CCol>
                  <CCol xs="12" md="6">
                  {downloadAllLink && <a href={downloadAllLink} download="asd">Tümümü İndir</a>}
                  
                  </CCol>
    </CFormGroup>
      

        <CCardBody >
       <h2>Klasörler</h2>
        <CFormGroup row>
              {documents.length > 0 && documents.map((element, index) => (  
         //  <div style={{ display: 'block', minWidth: 320, padding:10, float: 'left' }}> 
  
         <CCol xs="12" md="3">
         <CListGroup className="mb-2" layout={'horizontal${"-sm"}'} >
           <CListGroupItem  active onClick={() => {onClickOpenFolder(element, index)}} >
           {" " +element.name + " "} 
             </CListGroupItem>
         </CListGroup>
          <br />
          </CCol>
         //  </div>
             ))}  

          </CFormGroup>
          {openedFolder && <h2>{openedFolder.name}</h2>}
          <CFormGroup row>
          
                  { files && files.map((element2) => (
    
              <CCard style={{ width: '10rem' }}>
                         { (element2.fileName.toLowerCase().includes('.jpg') || element2.fileName.toLowerCase().includes('.jpeg') || element2.fileName.toLowerCase().includes('.png') || element2.fileName.toLowerCase().includes('.jfif')) ? 
                  <img  onClick={() => onClickEdit(!showEdit2, element2.url, 0)} style={{cursor:'pointer'}} width="100%" src={element2.url}></img> : 
                  <img  onClick={() => element2.fileName.toLowerCase().includes('.pdf') ? onClickEdit(!showEdit2, element2.url, 1) : null} style={{cursor:'pointer'}} width="100%" src={element2.fileName.toLowerCase().includes('.pdf') ? pdfIconImage : fileIconImage}></img>  }
                  

              {/* <CCardImage orientation="top" src="/images/react.jpg" /> */}
              <CCardBody>
             
                <CCardText>
                <a href={element2.url} target="_blank">  {element2.fileName}       </a> 
                </CCardText>
                <CButton size="sm" color="danger" onClick={() => {onClickDeleteDocument(element2.publicId)}} >Sil</CButton>
              </CCardBody>
              </CCard>
              )) 
          }
            
         </CFormGroup>
         
         { openedFolder && 
       <CFormGroup row>
          <input ref={inputRef} type="file" name="file"  onChange={changeHandler}  multiple  />
          <div>
              <button name={openedFolder.name} onClick={() =>handleSubmission(openedFolder.path)}>Gönder</button>
          </div>
          <CButton size="sm" color="danger" onClick={() => {onClickDeleteFolder(openedFolder.path)}}>Klasörü Sil</CButton>
          </CFormGroup>
       }
         
       </CCardBody>
       <CModal 
        show={showEdit2} 
        onClose={() => {setshowEdit2(!showEdit2);}}
        size="xl"
      >
        <CModalHeader closeButton>
          {/* <CModalTitle>{editId==0?"Kaydet":"Düzenle"}</CModalTitle> */}
        </CModalHeader>
        <CModalBody>
        {editType == 0 ? <img style={{"width" : "100%"}} src={editUrl} ></img>:<div></div>}
        {editType == 1 ? <iframe src={editUrl} width="100%" height="1000px" />:<div></div>}   
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
        </CModalFooter> */}
      </CModal>       
    </div>
           
  )
}

export default ClientDocuments
