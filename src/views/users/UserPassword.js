import React, { useState, useEffect } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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

import UserService from '../../services/user.service'


// const { page } = useParams();

const UserPassword = (data) => {
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState({
        password: null,
     });

     useEffect(() => {

      if(data.id != 0)
           UserService.getUser(data.id).then(
             (result) => {
                 setUser(result.data);
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
       
       }, []);

  const changeHandler = e => {
    setUser({...user, [e.target.name]: e.target.value})
 }

 

  const send = () => {
    UserService.savePassword(user).then(
        (result) => {
            setShowModal(true);
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

//   const clear = () => {

//   }
  return (
      <div>
       <CRow>
        <CCol xs="12" md="12">
          <CCard>
            {/* <CCardHeader>
              Basic Form
              <small> Elements</small>
            </CCardHeader> */}
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Şifre</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput id="text-input" name="password" type="password"  onChange={(e) => changeHandler(e)}  />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={() => {send();}}><CIcon name="cil-scrubber" /> Kaydet</CButton> 
              {/* <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" onClick={() => clear()} /> Temizle</CButton> */}
            </CCardFooter>
          </CCard>
      </CCol>
    </CRow>
    <CModal 
        show={showModal} 
        onClose={() => setShowModal(!showModal)}
        size="s"
      >
        <CModalHeader closeButton>
          <CModalTitle>Başarılı</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div>Şifre güncellenmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal> 
     </div>

  )
}

export default UserPassword
