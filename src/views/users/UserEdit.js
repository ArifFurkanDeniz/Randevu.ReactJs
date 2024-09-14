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

const UserEdit = (data) => {
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState({
        fullName: null,
        email: null,
        title: null,
        phone: null,
        role: 0
     });

  useEffect(() => {

 if(data.id != 0)
      UserService.getUser(data.id).then(
        (result) => {
          if (result.data.userRoles.length !=0) {
            result.data.role = result.data.userRoles[0].roleId;
          }
        
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
    UserService.save(user).then(
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
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Ad Soyad</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="fullName"  onChange={(e) => changeHandler(e)} value={user.fullName} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="email"  onChange={(e) => changeHandler(e)} value={user.email} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Ünvan</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="title"  onChange={(e) => changeHandler(e)} value={user.title} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Telefon</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="phone"  onChange={(e) => changeHandler(e)} value={user.phone} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                <CCol md="2">
                    <CLabel htmlFor="text-input">Role</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="role" id="select" onChange={(e) => changeHandler(e)} value={user.role}>
                 <option value="">Seçiniz</option>
                 <option value="3">Uzman</option>
                 <option value="2">Admin</option>
                 <option value="5">Sekreter</option>
                  </CSelect>
                  </CCol>
                </CFormGroup>
                {/* <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Rol</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="select" id="select" onChange={(e) => changeHandler(e.target.value)} value={user.role}>
                 <option value="0">Seçiniz</option>
                 <option value="2">Admin</option>
                 <option value="3">Uzman</option>
                  </CSelect>
                  
                  </CCol>
                </CFormGroup> */}
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
            <div>Kullanıcı güncellenmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal> 
     </div>

  )
}

export default UserEdit
