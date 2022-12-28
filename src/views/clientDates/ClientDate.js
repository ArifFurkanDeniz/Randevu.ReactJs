import { MultiSelect } from "react-multi-select-component";
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
  CSwitch,
  CButtonGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import usersData from './UsersData'

import DateService from '../../services/date.service'
import UserService from '../../services/user.service'
import DateEdit from '../../views/dates/DateEdit.js'

const user = JSON.parse(localStorage.getItem('user'));
//const fields = ['dateTime','dateDay','dateHour','client','user1','user2','room','directional','costUser','costCase','id']
let fields = [];
let groupFields = [];
if (user.data.userData.role[0] =="Admin") {
  fields = ['Tarih','Gün','Saat','Danışan','Uzman1','Anne Adı', 'Baba Adı','Oda', 'Geliş Nedeni','Yönlendiren','Uzman Ücreti', 'Kasa Ücreti', "Toplam Ücret",'Ödenme Durumu', 'Açıklama','id']
}
else if (user.data.userData.role[0] =="Uzman") {
  fields = ['Tarih','Gün','Saat','Danışan','Uzman1','Anne Adı', 'Baba Adı','Oda', 'Geliş Nedeni','Yönlendiren','Uzman Ücreti', 'Açıklama','id']
}

groupFields = ['Danışan','Uzman1','Tekrar Sayısı']
// const { page } = useParams();

const ClientDates = (data) => {
    const [datesData, setDatesData] = useState([]);
 
    const [client, setClient] = useState(null);

  useEffect(() => {

    sendApi()
   
  }, []);


  const sendApi = () =>{
 
    DateService.getDates(1,null,null,"","",data.id, null, true, null, null, null, 10000).then(
        (result) => {
  
         setTotalItem(result.data.totalItem);
          var newDates = []
          result.data.data.forEach(element => {
            newDates.push(
            {
              "Tarih" : element.dateTime,
              "Gün" : element.dateDay,
              "Danışan" : element.client,
              "Saat" : element.dateHour,
              "Uzman1" : element.user1,
              // "Uzman2" : element.user2,
              "Anne Adı" : element.mother,
              "Baba Adı" : element.father,
              "Oda" : element.room,
              "Geliş Nedeni": element.comingCase,
              "Yönlendiren" : element.directional,
              "Uzman Ücreti" : element.costUser,
              // "Test Ücreti" : element.costTest,
              "Kasa Ücreti" : element.costCase,
              "id" : element.id,
              "Toplam Ücret" : element.costCase + element.costUser + element.costTest,
              "mobilePhone" : element.mobilePhone,
              "Ödenme Durumu" : element.costStatusDesc,
              "Açıklama" : element.description,
              "isFree":element.isFree
   
            });
          });
          setDatesData(newDates);
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
  const [clientId, setClientId] = useState(null)
  const [editId, setEditId] = useState(null)
  const [showEdit, setshowEdit] = useState(false)
  const [showClient, setshowClient] = useState(false)
  const onClickEdit = (showEdit,id) =>{
    
    setEditId(id);
    setshowEdit(showEdit);
  }




  const [showModal, setShowModal] = useState(false)
  const deleteDate = () =>{
    
    DateService.deleteDate(editId).then(
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

  const onClickSendMessage = (fullName, userName, dateTime, hour, mobilePhone,id) =>{
    let text = "Merhaba, "+ dateTime + " tarihinde "+ hour + "'da "+ userName + " ile olan randevunuza bekliyoruz. Görüşmek üzere.";
    let link = "https://api.whatsapp.com/send?phone=+9"+mobilePhone+"&text="+text;
    window.open(link);

  }


    const [showDelete, setShowDelete] = useState(false)
    const onClickDelete = (showDelete,id) =>{
      setEditId(id);
      setShowDelete(showDelete);
    }
  const [totalItem, setTotalItem] = useState(0)

  return (
      <div>
 
      { <CRow>
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
           
              items={datesData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              // itemsPerPage={2}
              // pagination
              scopedSlots={{
   
                'Gün': (item) => (
             
                 <td>
                      {item.Gün == "Monday"?"Pazartesi":item.Gün == "Tuesday"?"Salı":item.Gün == "Wednesday"?"Çarşamba":item.Gün == "Thursday"?"Perşembe":item.Gün == "Friday"?"Cuma":item.Gün == "Saturday"?"Cumartesi":item.Gün == "Sunday"?"Pazar":""}
                  </td>
             
                ),
                'Danışan':
                (item) => (
                  <td>
                    
                    {item.isFree ?<span style={{color: "red"}}>İzin</span>:<span >{item.Danışan}</span>}
                  </td>
                ),
                      'id':
                (item) => (
         

         
                  <td>

                        <CButtonGroup>
                        {user.data.userData.role[0] =="Admin"?<CButton color="secondary" onClick={() => onClickSendMessage(item.Danışan, item.Uzman1, item.Tarih, item.Saat, item.mobilePhone, item.id)}>Mesaj Gönder</CButton>:""}
                        { !item.isFree && <CButton color="secondary" onClick={() => onClickEdit(!showEdit, item.id)}>{user.data.userData.role[0] =="Admin"?"Düzenle":"Detay"}</CButton>}
                          {user.data.userData.role[0] =="Admin" || item.isFree ?<CButton color="secondary" onClick={() => onClickDelete(!showDelete,item.id)}>Sil</CButton>:""}
                     </CButtonGroup>
                  </td>
                
                ),
              }}
            />
                 
          {/* <CPagination 
            activePage={currentPage}
            pages={totalPage}
            onActivePageChange={pageChange}
          /> */}
        
          <br></br>
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>     }
    <CModal 
        show={showClient} 
        onClose={() => {setshowClient(!showClient);}}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>{"Danışan Randevuları"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showClient ? <ClientDates id={clientId}></ClientDates>:<div></div>}
      
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
        </CModalFooter> */}
      </CModal>  
    <CModal 
        show={showEdit} 
        onClose={() => {setshowEdit(!showEdit); sendApi();}}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>{editId==0?"Kaydet":"Düzenle"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showEdit ? <DateEdit id={editId}></DateEdit>:<div></div>}
      
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
        {<div>Randevuyu silmek istediğinize emin misiniz?</div>}
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
            <div>Randevu silinmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal>    
    </div>

  )
}

export default ClientDates
