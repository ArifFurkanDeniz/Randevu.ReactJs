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
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import UsersData from './UsersData'
import UserService from '../../services/user.service'
import UserEdit from '../../views/users/UserEdit.js'
import UserStatisticEdit from '../../views/users/UserStatisticEdit'
import UserPassword from '../../views/users/UserPassword'

const fields = ['Ad Soyad','Email','Ünvan','Rol','id']
//const fields = ['fullName','email','phone1','genderType','id']



const Users = () => {

  const [page, setPage] = useState(1)
  const [UsersData, setUsersData] = useState([]);

  useEffect(() => {

    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        document.getElementById("submit").click(); 
  
      }
    };
    document.addEventListener("keydown", listener);

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

    UserService.getUsers(page, fullName).then(
      (result) => {
        setTotalPage(result.data.totalPage);

        let newUsers = [];
        result.data.data.forEach(element => {
          newUsers.push({
            "Ad Soyad" : element.fullName,
            "Email" : element.email,
            "Ünvan": element.title,
            "Rol" : element.role,
            "id" : element.id
          });
        });
        setUsersData(newUsers);
  
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


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
     setPage(newPage)
  }

  const [fullName, setFullName] = useState(null);

  const fullNameChanged = (value) => {
    setFullName(value)
  }

  const send = () => {
    pageChange(1);
    sendApi();
  }

  const clear = () => {
    setFullName('');
  }

  const [editId, setEditId] = useState(null)
  const [showEdit, setshowEdit] = useState(false)
  const onClickEdit = (showEdit,id) =>{
    setEditId(id);
    setshowEdit(showEdit);
  }

  const [passwordId, setPasswordId] = useState(null)
  const [showPassword, setshowPassword] = useState(false)
  const onClickPassword = (showEdit,id) =>{
    setPasswordId(id);
    setshowPassword(showEdit);
  }


  const [showStatistic, setshowStatistic] = useState(false)
  const onClickStatistic = (showEdit,id) =>{
    setEditId(id);
    setshowStatistic(showEdit);
  }

  const [showDelete, setShowDelete] = useState(false)
  const onClickDelete = (showDelete,id) =>{
    setEditId(id);
    setShowDelete(showDelete);
  }

  const [showModal, setShowModal] = useState(false)
  const deleteUser = () =>{
    
    UserService.deleteUser(editId).then(
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
            Uzman Listesi
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
                </CFormGroup>
            
              </CForm>
            </CCardBody>
            <CCardFooter>
            <div class="d-flex">
              <div>  <CButton id="submit" name="submit" type="submit" size="sm" color="primary" onClick={() => {send();}}><CIcon name="cil-scrubber" /> Gönder</CButton> </div>
              <div>  <CButton type="reset" size="sm" color="danger"  onClick={() => clear()} ><CIcon name="cil-ban"/> Temizle</CButton></div>
              <div class="ml-auto"> <CButton type="button" size="sm" color="success"  onClick={() => onClickEdit(!showEdit,0)} ><CIcon name="cil-arrow-right"/> Ekle</CButton></div>
            </div>
            </CCardFooter>
  
    
      
          </CCard>
      </CCol>
    </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
            <CDataTable
              items={UsersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              // itemsPerPage={2}
              // pagination
              scopedSlots={{
                // 'Randevu Tarihi':
                // (item) => (
                //   <td>
                //       {item.dateTime}
                //   </td>
                // )
                'id':
                  (item) => (
                    <td>
                      {/* <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge> */}
                       <CButtonGroup>
                        <CButton color="secondary" onClick={() => onClickEdit(!showEdit,item.id)}>Düzenle</CButton>
                        <CButton color="secondary" onClick={() => onClickPassword(!showEdit,item.id)}>Şifre Değiştir</CButton>
                        <CButton color="secondary" onClick={() => onClickStatistic(!showStatistic,item.id)}>İstatistik</CButton>
                        <CButton color="secondary" onClick={() => onClickDelete(!showDelete,item.id)}>Sil</CButton>
                      </CButtonGroup>
                      {/* <CCol col="3" sm="4" md="2" xl className="mb-1 mb-xl-0">
                        <CButton   block variant="outline" color="info">Düzenle</CButton>
                        <CButton   block variant="outline" color="info">Sil</CButton>
                        <CButton  onClick={() => onClickHtml(!largeHtml, item.Guid)}  block variant="outline" color="info">HTML</CButton>
                      </CCol> */}
                 
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
        {showEdit ? <UserEdit id={editId}></UserEdit>:<div></div>}
      
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
        </CModalFooter> */}
      </CModal>     

      <CModal 
        show={showStatistic} 
        onClose={() => {setshowStatistic(!showStatistic);}}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>İstatistik</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showStatistic ? <UserStatisticEdit id={editId}></UserStatisticEdit>:<div></div>}
      
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
        </CModalFooter> */}
      </CModal>     

      <CModal 
        show={showPassword} 
        onClose={() => {setshowPassword(!showPassword); }}
        size="m"
      >
        <CModalHeader closeButton>
          <CModalTitle>{editId==0?"Kaydet":"Düzenle"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showPassword ? <UserPassword id={passwordId}></UserPassword>:<div></div>}
      
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
            <div>Kullanıcı silinmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal> 
    </div>

  )
}

export default Users
