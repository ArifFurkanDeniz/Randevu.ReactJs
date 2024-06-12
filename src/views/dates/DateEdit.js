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
    const [showRoomControlModal, setShowRoomControlModal] = useState(false)
    const [showUserControlModal, setShowUserControlModal] = useState(false)
    const [dateId, setDateId] = useState(null)
    const [percent, setPercent] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [date, setDate] = useState({
      Id : 0,
      dateTime: null,
      clientId: 0,
      user1Id: null,
      user2Id: null,
      roomId: null,
      comingCaseId: null,
      directional: null,
      costUser: 0,
      costTest:0,
      kdv:0,
      costCase: 0,
      costStatus: 0,
      statusId : 0,
      isFree: user.data.userData.role[0] =="Uzman"?true:false,
      dateHour : 0,
      dateHour2 : 0,
      categoryId : 1
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
            setDateId(data.id);
            
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

  const percentChangeHandler = () =>{

    let data= percent; 
    if (data != null ||data != "") {
     if(date.costTest == null || date.costTest ==''){
      date.costTest = 0;
     }
     if(date.kdv == null || date.kdv ==''){
      date.kdv = 0;
     }
     if(totalPrice== null || totalPrice ==''){
      setTotalPrice(0);
     }
     if(date.costUser == null || date.costUser ==''){
      date.costUser = 0;
     }
      setDate({...date, ["costUser"]: parseInt((parseInt(totalPrice) - parseInt(date.costTest) - parseInt(date.kdv)) * data / 100),  ["costCase"] : (parseInt(totalPrice) - (parseInt(date.costTest) + (parseInt(date.kdv)+  parseInt((parseInt(totalPrice) - parseInt(date.costTest) - parseInt(date.kdv)) * data / 100))))});
    }
 }

  const changeHandler = e => {

    let data= e.target.value; 
    if (e.target.value == "") {
      data = null;
    }
    if (e.target.name == "totalPrice") {
      setTotalPrice('');
      setPercent('');
    }

    
    setDate({...date, [e.target.name]: data})
 }

 const saveDate = () =>{
 
  date.isFree = (date.isFree=="true" || date.isFree)?true:false;
  if (date.isFree) {
    date.clientId = null;
  }

  DateService.save(date).then(
    (result2) => {
        setShowRoomControlModal(false);
        setShowUserControlModal(false);
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


    if (status==1)
    {
      date.id = 0;
      date.costStatus = 0;
    }
 
    date.isFree = (date.isFree=="true" || date.isFree)?true:false;

    debugger;
    if (date.isFree) {
      date.clientId = null;


      if (date.dateHour != 0 && date.dateHour2 == 0) {

      DateService.save(date).then(
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
      else if (date.dateHour != 0 && date.dateHour2 != 0) {

        debugger;
        if(parseInt(date.dateHour2.split(':')[0])<=parseInt(date.dateHour.split(':')[0]) && parseInt(date.dateHour2.split(':')[1])<=parseInt(date.dateHour.split(':')[1]))
        return;

        let loop = false;
        let today = new Date(2019, 3, 24,  parseInt(date.dateHour.split(':')[0]),  parseInt(date.dateHour.split(':')[1]), 0);

        debugger;
        do {
     
            DateService.save(date).then(
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

      date.dateTime = date.dateTime.split('T')[0];
      today.addHours(.5);

     let hour =  today.getHours();

     let minute =  today.getMinutes();


     if (hour == parseInt(date.dateHour2.split(':')[0]) && minute == parseInt(date.dateHour2.split(':')[1]))
      {
       loop = true;
     }
     else{
       date.dateHour = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');
     }
        }
        while (loop == false); 
      }

    }
else
{



    let userControl = false;
    let roomControl = false;


    DateService.dateUserControl(date.id, date.user1Id, date.dateTime, date.dateHour).then(
      (result) => {
        
         if (result.data.status == true) {
          userControl = true;
        
         }
         else
         {
          setShowUserControlModal(true);
         }

         DateService.dateRoomControl(date.id, date.roomId, date.dateTime, date.dateHour).then(
          (result) => {
          
             if (result.data.status == true) {
               roomControl = true;
            
             }
             else
             {
              setShowRoomControlModal(true);
             }

       
             if (userControl && roomControl) {

                 DateService.save(date).then(
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

  const getClients = () =>{
    ClientService.getClients(null, null, null, null,true).then(
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

  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
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
                  <option value="21:30">21:30</option>
                  <option value="22:00">22:00</option>
                  <option value="22:30">22:30</option>
                  <option value="23:00">23:00</option>
                  <option value="23:30">23:30</option>
                  </CSelect>
                   </CCol>
                   </CFormGroup>
                   { date.isFree && <CFormGroup row>
                   <CCol md="6"></CCol>
                   <CCol md="2">
                    <CLabel htmlFor="text-input">Saat</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="dateHour2" id="select" onChange={(e) => changeHandler(e)} value={date.dateHour2}>
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
                   </CFormGroup>}
         
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
                  <CCol xs="12" md="2">
                  <CInput id="text-input" name="costUser"  onChange={(e) => changeHandler(e)} value={date.costUser} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Tutar Test</CLabel>
                  </CCol>
                  <CCol xs="12" md="2">
                  <CInput id="text-input" name="costTest"  onChange={(e) => changeHandler(e)} value={date.costTest} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">KDV</CLabel>
                  </CCol>
                  <CCol xs="12" md="2">
                  <CInput id="text-input" name="kdv"  onChange={(e) => changeHandler(e)} value={date.kdv} />
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Tutar Kasa</CLabel>
                  </CCol>
                  <CCol xs="12" md="2">
                  <CInput id="text-input" name="costCase"  onChange={(e) => changeHandler(e)} value={date.costCase} />
                
                  </CCol>
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Toplam Ücret</CLabel>
                  </CCol>
                  <CCol xs="12" md="2">
                  <CInput id="text-input" name="percent" type="number" placeholder='Toplam Ücret'  onChange={(e) => setTotalPrice(e.target.value)} value = {totalPrice} />
                  <CInput id="text-input" name="percent" type="number" placeholder='%'  onChange={(e) => setPercent(e.target.value)} value = {percent} />
                  <CButton  type="button" size="sm" color="primary" onClick={() => {percentChangeHandler();}}>Uygula</CButton>
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
                 <option value="1">Ödendi - Nakit</option>
                 <option value="2">Ödendi - EFT</option>
                 <option value="3">Ödendi - EFT (Fatura)</option>
                 <option value="4">Ödendi - Kredi Kartı</option>
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
                  <CCol md="2">
                    <CLabel htmlFor="text-input">Kategori</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  <CSelect custom name="categoryId" id="select" onChange={(e) => changeHandler(e)} value={date.categoryId}>
                 <option value="1">Psikoterapi Çocuk/Ergen</option>
                 <option value="2">Psikoterapi Yetişkin</option>
                 <option value="3">Psikoterapi Çift</option>
                 <option value="4">Özel Eğitim</option>
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
              {(user.data.userData.role[0] =="Admin" || date.isFree ) && <CButton type="submit" size="sm" color="primary" onClick={() => {send(0);}}><CIcon name="cil-scrubber" /> Kaydet</CButton> }
              {user.data.userData.role[0] =="Admin"  && dateId!=0 && dateId!=null &&    <CButton type="submit" size="sm" color="success" onClick={() => {send(1);}}><CIcon name="cil-scrubber" /> Yeni Randevu</CButton> }
           
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
        show={showUserControlModal} 
        onClose={() => setShowUserControlModal(!showUserControlModal)}
        size="s"
      >
        <CModalHeader closeButton>
          <CModalTitle>Uzman Çakışma Uyarısı</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div>Seçtiğiniz tarihte seçtiğiniz uzman doludur. Devam etmek istiyor musunuz?</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="primary" onClick={() => saveDate()}>Evet</CButton>
          <CButton color="secondary" onClick={() => setShowUserControlModal(!showUserControlModal)}>Hayır</CButton>
        </CModalFooter> 
      </CModal> 

      <CModal 
        show={showRoomControlModal} 
        onClose={() => setShowRoomControlModal(!showRoomControlModal)}
        size="s"
      >
        <CModalHeader closeButton>
          <CModalTitle>Oda Çakışma Uyarısı</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div>Seçtiğiniz tarihte seçtiğiniz oda doludur. Devam etmek istiyor musunuz?</div>     
        </CModalBody>
  <CModalFooter>
          <CButton color="primary" onClick={() => saveDate()}>Evet</CButton>
          <CButton color="secondary" onClick={() => setShowRoomControlModal(!showRoomControlModal)}>Hayır</CButton>
        </CModalFooter> 
      </CModal> 
     </div>

  )
}

export default DateEdit
