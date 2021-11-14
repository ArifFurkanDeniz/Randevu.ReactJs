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

import ClientService from '../../services/client.service'


// const { page } = useParams();

const ClientEdit = (data) => {
  debugger;
    const [showModal, setShowModal] = useState(false)
    const [client, setClient] = useState({
        fullName: null,
        phone1: null,
        phone2: null,
        genderType: 0,
        school: null,
        schoolPhone: null,
        mother: null,
        father: null,
        town: null,
        email: null,
     });

  useEffect(() => {

 
      ClientService.getClient(data.id).then(
        (result) => {
            setClient(result.data);
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
      debugger;
    setClient({...client, [e.target.name]: e.target.value})
 }

 

  const send = () => {
    ClientService.save(client).then(
        (result) => {
            setShowModal(true);
        },
        (error) => {
      debugger;
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
                    <CInput id="text-input" name="fullName"  onChange={(e) => changeHandler(e)} value={client.fullName} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Cinsiyet</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="genderType" id="select" onChange={(e) => changeHandler(e)} value={client.genderType}>
                 <option value="">Seçiniz</option>
                 <option value="1">Erkek</option>
                 <option value="2">Kadın</option>
                 <option value="3">Çift</option>
                  </CSelect>
                   
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">1.Telefon</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="phone1"  onChange={(e) => changeHandler(e)} value={client.phone1} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">2.Telefon</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CInput id="text-input" name="phone2"  onChange={(e) => changeHandler(e)} value={client.phone2} />
                  
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Okul</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="school"  onChange={(e) => changeHandler(e)} value={client.school} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Okul Telefonu</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="schoolPhone"  onChange={(e) => changeHandler(e)} value={client.schoolPhone} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Anne Adı</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="mother"  onChange={(e) => changeHandler(e)} value={client.mother} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Baba Adı</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="father"  onChange={(e) => changeHandler(e)} value={client.father} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">İlçe</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="town"  onChange={(e) => changeHandler(e)} value={client.town} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">E-mail</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="father"  onChange={(e) => changeHandler(e)} value={client.email} />
                  </CCol>
                </CFormGroup>
                {/* <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Rol</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="select" id="select" onChange={(e) => changeHandler(e.target.value)} value={client.role}>
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

export default ClientEdit
