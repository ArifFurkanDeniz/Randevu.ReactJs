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
// import RoomsData from './RoomsData'
import RoomService from '../../services/room.service'
import RoomEdit from '../../views/rooms/RoomEdit.js'

//const fields = ['title','id']
const fields = ['Oda Adı','id']



const Rooms = () => {

  const [page, setPage] = useState(1)
  const [RoomsData, setRoomsData] = useState([]);

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

    RoomService.getRooms(page, title).then(
      (result) => {
        setTotalPage(result.data.totalPage);

        let newRooms = [];
        result.data.data.forEach(element => {
          newRooms.push({
            "Oda Adı":element.title,
            "id" : element.id
          });
        });
        setRoomsData(newRooms);
  
      },
      (error) => {
    
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );

   }

   const [totalPage, setTotalPage] = useState(_totalPage)


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/rooms?page=${newPage}`)
     setPage(newPage)
  }

  const [title, setTitle] = useState(null);

  const roomChanged = (value) => {
    setTitle(value)
  }

  const send = () => {
    pageChange(1);
    sendApi();
  }

  const clear = () => {
    setTitle('');
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
  const deleteUser = () =>{
    
    RoomService.deleteUser(editId).then(
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
            Oda Listesi
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
             
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Oda Adı</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="text-input"  onChange={(e) => roomChanged(e.target.value)} value={title} />
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

            <CCardBody>
            <CDataTable
              items={RoomsData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              scopedSlots={{
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
        {showEdit ? <RoomEdit id={editId}></RoomEdit>:<div></div>}
      
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
        {<div>Kullanıcıyı silmek istediğinize emin misiniz?</div>}
        </CModalBody>
        <CModalFooter>
        <CButton color="primary" onClick={() => { deleteUser();}}>Evet</CButton>
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
            <div>Oda silinmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal>         
    </div>

  )
}

export default Rooms
