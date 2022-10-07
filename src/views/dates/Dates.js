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

const Dates = () => {

  const [page, setPage] = useState(1)

  const [datesData, setDatesData] = useState([]);
  const [dateGroupsData, setDateGroupsData] = useState([]);
  const [usersData, setUsersData] = useState([]);


  useEffect(() => {

    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        document.getElementById("submit").click(); 
  
      }
    };
    document.addEventListener("keydown", listener);
    // return () => {
    //   document.removeEventListener("keydown", listener);
    // };

    if(page>=1)
    {
      UserService.getUsers().then(
        (result) => {
          setUsersData(result.data.data);
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
  
      var user1s = []
      if (user1_1 != null && user1_1 != 0){
        user1s.push(user1_1);
      }
    

      if(!isGroup)
      sendApi(orderByUserName);
      else
      sendApiForGroup();
    }
   


    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

   const history = useHistory()
   const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
   const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
   const _totalPage = Number(0);

   const sendApi = (orderByUser) =>{

    var user1s = []
    if (user1_1 != null && user1_1 != 0) {
      user1s =user1_1;
    }
    var user2s = [];
    if (user2 != null && user2 != 0) {
      user2s = user2;
    }

    DateService.getDates(page,date1,date2,user1s,user2s,client, orderByUser, isFree).then(
      (result) => {
        setTotalPage(result.data.totalPage);
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

   const sendApiForGroup = () =>{

    var user1s = [];
    if (user1_1 != null && user1_1 != 0) {
      user1s = user1_1;
    }
    var user2s = [];
    if (user2 != null && user2 != 0) {
      user2s = user2;
    }

    DateService.getDatesForGroup(page,date1,date2,user1s,user2s,client, isFree).then(
      (result) => {
        setTotalPage(result.data.totalPage);
        setTotalItem(result.data.totalItem);

        var newDates = []
        result.data.data.forEach(element => {
          newDates.push(
          {
            "Danışan" : element.client,
            "Uzman1" : element.user,
            "Tekrar Sayısı" : element.count 
          });
        });
        setDateGroupsData(newDates);
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
    currentPage !== newPage && history.push(`/dates?page=${newPage}`)
    setPage(newPage)
  }

  


  const [client, setClient] = useState(null);

  const clientNameChanged = (value) => {
    setClient(value)
  }


  const [isFree, setIsFree] = useState(true);

  const isFreeChanged = (value) => {
    setIsFree(!isFree)
  }


  const [user1_1, setUser1_1] = useState([]);

  const user1_1Changed = (value) => {

    setUser1_1(value)
  }



  const [user2, setUser2] = useState([]);

  const user2Changed = (value) => {
    setUser2(value)
  }


  var today2 = new Date();

var dd = String(today2.getDate()).padStart(2, '0');
var mm = String(today2.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today2.getFullYear();

today2 = yyyy + '-' + mm + '-' + dd ;

  const [date1, setDate1] = useState(today2);

  const date1Changed = (value) => {
    setDate1(value)
  }

  const [date2, setDate2] = useState(null);

  const date2Changed = (value) => {
    setDate2(value)
  }

  const [orderByUserName, setOrderByUserName] = useState(false)
  const [isGroup, setIsGroup] = useState(false)

  const send = () => {
    setOrderByUserName(false);
    setIsGroup(false);
    pageChange(1);
    sendApi(false);
  }

  const orderByUserClick = () => {
    setOrderByUserName(true);
    setIsGroup(false);
    pageChange(1);
    sendApi(true);
  }

  const groupClick = () => {
    setIsGroup(true);
    pageChange(1);
    sendApiForGroup(true);
  }

  const clear = () => {
    setOrderByUserName(false);
    setClient('');
    setUser1_1([]);
    setUser2([]);
    setDate1('');
    setDate2('');
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const [editId, setEditId] = useState(null)
  const [showEdit, setshowEdit] = useState(false)
  const onClickEdit = (showEdit,id) =>{
    
    setEditId(id);
    setshowEdit(showEdit);
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

  const [showModal, setShowModal] = useState(false)
  const deleteDate = () =>{
    
    DateService.deleteDate(editId).then(
      (result) => {
        setShowModal(true);
        sendApi(orderByUserName);
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
           Randevu Listesi
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="date-input">Başlangıç</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={(e) => date1Changed(e.target.value)} value={date1} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="date-input">Bitiş</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={(e) => date2Changed(e.target.value)} value={date2}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
              
                
               

                
               { (user.data.userData.role[0] =="Admin") && <>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Uzman 1</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <MultiSelect
                    options={ Array.from(usersData, function (item) {
                      return { label: item.fullName, value: item.id }
                  })}
                    value={user1_1}
                    onChange={setUser1_1}
                    labelledBy="Seçiniz"
                  />
                  </CCol>
                   </>}

                  <CCol md="2">
                    <CLabel htmlFor="text-input">Uzman 2</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <MultiSelect
                    options={ Array.from(usersData, function (item) {
                      return { label: item.fullName, value: item.id }
                  })}
                    value={user2}
                    onChange={setUser2}
                    labelledBy="Seçiniz"
                  />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Danışan</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" name="text-input"  onChange={(e) => clientNameChanged(e.target.value)} value={client} />
                    {/* <CFormText>This is a help text</CFormText> */}
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">İzinleri Gizle</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
             
                      <input type="checkbox"  onChange={(e) => isFreeChanged(e.target.value)}></input>
            
                  </CCol>
                </CFormGroup>
            
              </CForm>
            </CCardBody>
            <CCardFooter>
            <div class="d-flex">
              <div>  <CButton id="submit" name="submit" type="submit" size="sm" color="primary" onClick={() => {send();}}><CIcon name="cil-scrubber" /> Gönder</CButton> </div>
             { user.data.userData.role[0] =="Admin" &&   <div><CButton type="submit" size="sm" color="primary" onClick={() => {orderByUserClick();}}><CIcon name="cil-scrubber" /> Uzmana Göre Sırala</CButton></div> } 
              {/* <div><CButton type="submit" size="sm" color="primary" onClick={() => {groupClick();}}><CIcon name="cil-scrubber" /> Grupla</CButton></div> */}
              <div>  <CButton type="reset" size="sm" color="danger"  onClick={() => clear()} ><CIcon name="cil-ban"/> Temizle</CButton></div>
              <div class="ml-auto"> <CButton type="button" size="sm" color="success"  onClick={() => onClickEdit(!showEdit,0)} ><CIcon name="cil-arrow-right"/> Ekle</CButton></div>
            </div>
            </CCardFooter>
          </CCard>
      </CCol>
    </CRow>
    
      { !isGroup && <CRow>
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
                    
                    {item.isFree ?<span style={{color: "red"}}>İzin</span>:item.Danışan}
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
                 
          <CPagination 
            activePage={currentPage}
            pages={totalPage}
            onActivePageChange={pageChange}
          />
        
          <br></br>
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>     }
    { isGroup &&  <CRow>
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
           
              items={dateGroupsData}
              fields={groupFields}
              hover
              striped
              bordered
              size="sm"
              // itemsPerPage={2}
              // pagination
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
    </CRow> }  
    <CModal 
        show={showEdit} 
        onClose={() => {setshowEdit(!showEdit); sendApi(orderByUserName);}}
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

export default Dates
