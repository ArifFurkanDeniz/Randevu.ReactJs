import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
  CSwitch,
  CButtonGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import ClientsData from './ClientsData'
import ClientService from '../../services/client.service'
import ClientEdit from '../../views/clients/ClientEdit.js'

//const fields = ['fullName','email','phone1','genderType','id']
const fields = ['No','Ad Soyad','Email','Telefon','Cinsiyet','id']



const Clients = () => {

  const [page, setPage] = useState(1)
  const [ClientsData, setClientsData] = useState([]);

  useEffect(() => {

    if(page>=1)
    {
      sendApi();
    }


    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  

   const history = useHistory()
   const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
   const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
   const _totalPage = Number(0);


   const sendApi = () =>{

    ClientService.getClients(page, fullName, year).then(
      (result) => {
        setTotalPage(result.data.totalPage);
        setTotalItem(result.data.totalItem);
        let newClients = [];
        result.data.data.forEach(element => {
          newClients.push({
            "Ad Soyad":element.fullName,
            "Email" : element.email,
            "Telefon" : element.phone1,
            "Cinsiyet" : element.genderType,
            "id":element.id,
            "No":element.no
          });
        });
        setClientsData(newClients);
  
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

   const [totalPage, setTotalPage] = useState(_totalPage)
   const [totalItem, setTotalItem] = useState(0)


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/clients?page=${newPage}`)
     setPage(newPage)
  }

  const [fullName, setFullName] = useState(null);
  const [year, setYear] = useState(null);

  const fullNameChanged = (value) => {
    setFullName(value)
  }
  const yearChanged = (value) => {
    setYear(value)
  }

  const send = () => {
    pageChange(1);
    sendApi();
  }

  const clear = () => {
    setFullName('');
    setYear('');
  }

  const [editId, setEditId] = useState(null)
  const [showEdit, setshowEdit] = useState(false)
  const onClickEdit = (showEdit,id) =>{

    setEditId(id);
    setshowEdit(showEdit);
  }

  const [showDelete, setShowDelete] = useState(false)
  const onClickDelete = (showDelete,id) =>{
    setEditId(id);
    setShowDelete(showDelete);
  }

  const [showModal, setShowModal] = useState(false)
  const deleteDate = () =>{
    
    ClientService.deleteDate(editId).then(
      (result) => {
        setShowModal(true);
        sendApi();
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
    setShowDelete(!showDelete);
  }

  return (
      <div>
              <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
            Danışan Listesi
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
             
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Ad Soyad</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="text-input"  onChange={(e) => fullNameChanged(e.target.value)} value={fullName} />
                    {/* <CFormText>This is a help text</CFormText> */}
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Yıl</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="text-input"  onChange={(e) => yearChanged(e.target.value)} value={year} />
                    {/* <CFormText>This is a help text</CFormText> */}
                  </CCol>
                </CFormGroup>
            
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={() => {send();}}><CIcon name="cil-scrubber" /> Gönder</CButton> 
              <CButton type="reset" size="sm" color="danger" onClick={() => clear()} ><CIcon name="cil-ban" /> Temizle</CButton>
            </CCardFooter>
          </CCard>
      </CCol>
    </CRow>
      <CRow>
        <CCol>
          <CCard>
          <CCardHeader>
            <div class="d-flex">
              <div></div>
              <div class="ml-auto">Toplam kayıt : <strong>{totalItem}</strong></div>
            </div>
     
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={ClientsData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              scopedSlots={{
                'Cinsiyet':
                (item) =>(
                  <td>
                      {item.Cinsiyet == 1?"Erkek":item.Cinsiyet == 2?"Kadın":item.Cinsiyet == 3?"Çift":"Seçilmedi"}
                  </td>
                ),
                'id':
                (item) => (
                  <td>
                     <CButtonGroup>
                      <CButton color="secondary" onClick={() => onClickEdit(!showEdit, item.id)}>Düzenle</CButton>
                      <CButton color="secondary" onClick={() => onClickDelete(!showDelete,item.id)}>Sil</CButton>
                    </CButtonGroup>
                  </td>
                ),
              }}
            />
                 
          <CPagination
            activePage={currentPage}
            pages={totalPage}
            onActivePageChange={pageChange}
          />
          <br></br>
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>   
    <CModal 
        show={showEdit} 
        onClose={() => {setshowEdit(!showEdit); sendApi();}}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>{editId==0?"Kaydet":"Düzenle"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showEdit ? <ClientEdit id={editId}></ClientEdit>:<div></div>}
      
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
        </CModalFooter> */}
      </CModal>       
      <CModal 
        show={showDelete} 
        onClose={() => setShowDelete(!showDelete)}
        size="s"
      >
        <CModalHeader closeButton>
          <CModalTitle>Sil</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {<div>Danışanı silmek istediğinize emin misiniz?</div>}
        </CModalBody>
        <CModalFooter>
        <CButton color="primary" onClick={() => { deleteDate();}}>Evet</CButton>
          <CButton color="secondary" onClick={() => setShowDelete(!showDelete)}>Hayır</CButton>
        </CModalFooter>
      </CModal>    
      <CModal 
        show={showModal} 
        onClose={() => setShowModal(!showModal)}
        size="s"
      >
        <CModalHeader closeButton>
          <CModalTitle>Başarılı</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div>Danışan silinmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal>       
    </div>

  )
}

export default Clients
