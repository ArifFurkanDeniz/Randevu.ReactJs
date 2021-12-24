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
import { CFormTextarea } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ClientService from '../../services/client.service'
import DateService from '../../services/date.service'
import RoomService from '../../services/room.service'
import UserService from '../../services/user.service'
import ClientEdit from '../../views/clients/ClientEdit.js'
import ComingCaseService from '../../services/comingCase.service'

const user = JSON.parse(localStorage.getItem('user'));

// const { page } = useParams();

const DateEdit = (data) => {

    // const [isFree, setIsFree] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [clientsData, setClientsData] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const [comingCasesData, setComingCasesData] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showControlModal, setShowControlModal] = useState(false)
    const [date, setDate] = useState({
      dateTime: null,
      clientId: 0,
      user1Id: null,
      user2Id: null,
      roomId: null,
      comingCaseId: null,
      directional: null,
      costUser: 0,
      costCase: 0,
      costStatus: 0,
      isFree: user.data.userData.role[0] =="Uzman"?true:false
     });

  useEffect(() => {


    // if (user.data.userData.role[0] =="Admin") 
    // {
    //   date.isFree = true;
    //   setDate(date);
    // }
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

    RoomService.getRooms().then(
      (result) => {
        setRoomsData(result.data.data);
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

    ComingCaseService.getComingCases().then(
      (result) => {
        setComingCasesData(result.data);
      },
      (error) => {
    
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );
    



    getClients();
 
      if(data.id != 0)
      DateService.getDate(data.id).then(
        (result) => {

            setDate(result.data);
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

    let data= e.target.value; 
    if (e.target.value == "") {
      data = null;
    }
    setDate({...date, [e.target.name]: data})
 }

 const saveDate = () =>{

  let newDate = {
    dateTime: null,
    clientId: 0,
    user1Id: null,
    user2Id: null,
    roomId: null,
    comingCaseId: null,
    directional: null,
    costUser: 0,
    costCase: 0,
    costStatus: 0,
    isFree: false
  }

  newDate.id = date.id;
  newDate.dateTime = date.dateTime + 'T'+ date.dateHour + ':00';
  newDate.clientId = date.clientId;
  newDate.user1Id = date.user1Id;
  newDate.user2Id = date.user2Id;
  newDate.roomId = date.roomId;
  newDate.directional = date.directional;
  newDate.costUser = date.costUser;
  newDate.costCase = date.costCase;
  newDate.costStatus = date.costStatus;
  newDate.description = date.description;
  newDate.comingCaseId = date.comingCaseId;
  debugger;
  newDate.isFree = (date.isFree=="true" || date.isFree)?true:false;
  if (newDate.isFree) {
    newDate.clientId = null;
  }

  DateService.save(newDate).then(
    (result2) => {
        setShowControlModal(false);
        setShowModal(true);
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

  const send = (status) => {


    let newDate = {
      dateTime: null,
      clientId: 0,
      user1Id: null,
      user2Id: null,
      roomId: null,
      comingCaseId: null,
      directional: null,
      costUser: 0,
      costCase: 0,
      costStatus: 0,
      isFree: false
    }

    if (status=0) {
      newDate.id = date.id;
    }
 
    newDate.dateTime = date.dateTime + 'T'+ date.dateHour + ':00';
    newDate.clientId = date.clientId;
    newDate.user1Id = date.user1Id;
    newDate.user2Id = date.user2Id;
    newDate.roomId = date.roomId;
    newDate.directional = date.directional;
    newDate.costUser = date.costUser;
    newDate.costCase = date.costCase;
    newDate.costStatus = date.costStatus;
    newDate.description = date.description;
    newDate.comingCaseId = date.comingCaseId;
    newDate.isFree = (date.isFree=="true" || date.isFree)?true:false;
    debugger;
    if (newDate.isFree) {
      newDate.clientId = null;
    }
    



    DateService.dateControl(newDate.id, newDate.roomId, newDate.dateTime).then(
      (result) => {
       
         if (result.data.status == true) {
          DateService.save(newDate).then(
            (result2) => {
                setShowModal(true);
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
         else
         {
          setShowControlModal(true);
         }
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

  const getClients = () =>{
    ClientService.getClients().then(
      (result) => {
        setClientsData(result.data.data);
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

  const [editId, setEditId] = useState(null)
  const [showEdit, setshowEdit] = useState(false)
  const onClickEdit = (showEdit,id) =>{

    setEditId(id);
    setshowEdit(showEdit);
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
                  <span> İzin</span>
                </CCol>
                <CCol md="4">
                  
                 { date.isFree && <input type="radio" name="isFree" id="flexCheckDefault" checked value={true} onChange={(e) => changeHandler(e)}/>}
                 { !date.isFree && <input type="radio" name="isFree" id="flexCheckDefault"  value={true} onChange={(e) => changeHandler(e)}/>}
                  </CCol>
                  <CCol md="2">
                  {/* <span> İzin</span>
                <input type="checkbox" id="flexCheckDefault"/> */}
                </CCol>
                <CCol md="4">
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Tarih</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CInput id="text-input" type="date" name="dateTime"  onChange={(e) => changeHandler(e)} value={date.dateTime} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Saat</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="dateHour" id="select" onChange={(e) => changeHandler(e)} value={date.dateHour}>
                  <option value="0">Seçiniz</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                  <option value="16:00">16:00</option>
                  <option value="16:30">16:30</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                  </CSelect>
                   </CCol>
                </CFormGroup>
                <CFormGroup row>
                {!date.isFree && <>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Danışan</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                  <CSelect custom name="clientId" id="select" onChange={(e) => changeHandler(e)} value={date.clientId}>
                 <option value="0">Seçiniz</option>
                    {clientsData.map(item => (
                      <option
                        key={item.fullName}
                        value={item.id}
                      >
                        {item.fullName}
                      </option>
                    ))}
                  </CSelect>
                
                   </CCol>
            
                   <CCol  xs="12" md="1">
                   <CButtonGroup>
                      <CButton color="success" onClick={() => onClickEdit(!showEdit,0)}  >+</CButton>
                      <CButton color="secondary" onClick={() => onClickEdit(!showEdit, date.clientId)}>...</CButton>
                    </CButtonGroup>
                   </CCol>

                   </>}
                   {!date.isFree && <>
                    <CCol md="2">
                    <CLabel htmlFor="text-input">Oda</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="roomId" id="select" onChange={(e) => changeHandler(e)} value={date.roomId}>
                 <option value="">Seçiniz</option>
                    {roomsData.map(item => (
                      <option
                        key={item.title}
                        value={item.id}
                      >
                        {item.title}
                      </option>
                    ))}
                  </CSelect>
                  </CCol>
                     </>}
                  
                 
                </CFormGroup>
                <CFormGroup row>
                  {user.data.userData.role[0] =="Admin" && <>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Uzman 1</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="user1Id" id="select" onChange={(e) => changeHandler(e)} value={date.user1Id}>
                 <option value="">Seçiniz</option>
                    {usersData.map(item => (
                      <option
                        key={item.fullName}
                        value={item.id}>
                        {item.fullName}
                      </option>
                    ))}
                  </CSelect>
                  </CCol></>
                  }
                
                  {!date.isFree && <>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Uzman 2</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="user2Id" id="select" onChange={(e) => changeHandler(e)} value={date.user2Id}>
                 <option value="">Seçiniz</option>
                    {usersData.map(item => (
                      <option
                        key={item.fullName}
                        value={item.id}
                      >
                        {item.fullName}
                      </option>
                    ))}
                  </CSelect>
                  </CCol>
                  </>}
                </CFormGroup>
                {!date.isFree && <>
                <CFormGroup row>
               
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Tutar Uzman</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CInput id="text-input" name="costUser"  onChange={(e) => changeHandler(e)} value={date.costUser} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Tutar Kasa</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CInput id="text-input" name="costCase"  onChange={(e) => changeHandler(e)} value={date.costCase} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                <CCol md="2">
                    <CLabel htmlFor="text-input">Yönlendiren Kişi</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CInput id="text-input" name="directional"  onChange={(e) => changeHandler(e)} value={date.directional} />
                  </CCol>
                
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Ödeme Durumu</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="costStatus" id="select" onChange={(e) => changeHandler(e)} value={date.costStatus}>
                 <option value="0">Ödenmedi</option>
                 <option value="1">Ödendi</option>
                  </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                <CCol md="2">
                    <CLabel htmlFor="text-input">Geliş Nedeni</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="comingCaseId" id="select" onChange={(e) => changeHandler(e)} value={date.comingCaseId}>
                 <option value="">Seçiniz</option>
                    {comingCasesData.map(item => (
                      <option
                        key={item.title}
                        value={item.id}
                      >
                        {item.title}
                      </option>
                    ))}
                  </CSelect>
                  </CCol>
                
               
                </CFormGroup>
                    </>}
                <CFormGroup row>
                <CCol md="2">
                    <CLabel htmlFor="text-input">Açıklama</CLabel>
                  </CCol>
                  <CCol xs="12" md="10">
                  <textarea name="description" class="form-control" onChange={(e) => changeHandler(e)} value={date.description} />
              
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={() => {send(0);}}><CIcon name="cil-scrubber" /> Kaydet</CButton> 
              {editId!=0 && editId!=null &&    <CButton type="submit" size="sm" color="success" onClick={() => {send(1);}}><CIcon name="cil-scrubber" /> Yeni Randevu</CButton> }
           
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
            <div>Randevu güncellenmiştir.</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(!showModal)}>Tamam</CButton>
        </CModalFooter> 
      </CModal> 

      <CModal 
        show={showEdit} 
        onClose={() => {setshowEdit(!showEdit);  getClients(); }}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>{editId==0?"Kaydet":"Düzenle"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showEdit ? <ClientEdit id={editId}></ClientEdit>:<div></div>}
      
        </CModalBody>

      </CModal>        
      <CModal 
        show={showControlModal} 
        onClose={() => setShowControlModal(!showControlModal)}
        size="s"
      >
        <CModalHeader closeButton>
          <CModalTitle>Çakışma Uyarısı</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div>Seçtiğiniz tarihte seçtiğiniz oda doludur. Devam etmek istiyor musunuz?</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="primary" onClick={() => saveDate()}>Evet</CButton>
          <CButton color="secondary" onClick={() => setShowControlModal(!showControlModal)}>Hayır</CButton>
        </CModalFooter> 
      </CModal> 
     </div>

  )
}

export default DateEdit
