import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CChartPie
} from '@coreui/react-chartjs'
import {
  CCardGroup,
  CDataTable,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
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
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cibTwitter,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import DahsboardService from '../../services/dashboard.service'

const fields = ['fullName','email','phone1','genderType']

const backgroundColor =
[
  '#41B883',
  '#E46651',
  '#00D8FF',
  '#AA1B16',
  '#BB1B16',
  '#CC1B16',
  '#DD1B16',
  '#EE1B16',
  '#FF1B16',
  '#GG1B16',
  '#DD1BAA',
  '#41B883',
  '#E46651',
  '#00D8FF',
  '#AA1B16',
  '#BB1B16',
  '#CC1B16',
  '#DD1B16',
  '#EE1B16',
  '#FF1B16',
  '#GG1B16',
  '#DD1BAA',
  '#41B883',
  '#E46651',
  '#00D8FF',
  '#AA1B16',
  '#BB1B16',
  '#CC1B16',
  '#DD1B16',
  '#EE1B16',
  '#FF1B16',
  '#GG1B16',
  '#DD1BAA',
  '#41B883',
  '#E46651',
  '#00D8FF',
  '#AA1B16',
  '#BB1B16',
  '#CC1B16',
  '#DD1B16',
  '#EE1B16',
  '#FF1B16',
  '#GG1B16',
  '#DD1BAA',
  '#41B883',
  '#E46651',
  '#00D8FF',
  '#AA1B16',
  '#BB1B16',
  '#CC1B16',
  '#DD1B16',
  '#EE1B16',
  '#FF1B16',
  '#GG1B16',
  '#DD1BAA',
]
const progressGroupHour = [
  { title: 'Monday', value1: 34},
  { title: 'Tuesday', value1: 56 },
  { title: 'Wednesday', value1: 12},
  { title: 'Thursday', value1: 43},
  { title: 'Friday', value1: 22},
  { title: 'Saturday', value1: 53 },
  { title: 'Sunday', value1: 9 },
]

const progressGroupExample2 = [
  { title: 'Erkek', icon: cilUser, value: 53 },
  { title: 'Kadın', icon: cilUserFemale, value: 33 },
  { title: 'Çift', icon: cilUserFemale, value: 10 },
]

const progressGroupExample3 = [
  { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
  { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
  { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
  { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
]

const progressGroupDirectional = [
  { title: 'Erkek', icon: cilUser, value: 53 },
  { title: 'Kadın', icon: cilUserFemale, value: 33 },
  { title: 'Çift', icon: cilUserFemale, value: 10 },
]

const Dashboard = () => {

  const [DateDayStatisticData, setDateDayStatisticData] = useState([]);
  const [SexStatisticData, setSexStatisticData] = useState([]);
  const [DirectionalStatisticData, setDirectionalStatisticData] = useState([]);
  const [DateHourStatisticData, setDateHourStatisticData] = useState([]);

  const [UserStatisticData, setUserStatisticData] = useState([]);
  const [UserStatisticName, setUserStatisticName] = useState([]);

  const [TownStatisticData, setTownStatisticData] = useState([]);
  const [TownStatisticName, setTownStatisticName] = useState([]);

  const history = useHistory();
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user.data.userData.role[0]!="Admin") {
    
      history.push("/Dates");
    }
    sendApi();

  }, []);

  const sendApi = () =>{
    DahsboardService.DateDayStatistic(date1, date2).then(
      (result) => {
        let _dateDayStatisticData = [];
        let totalDateDayStatistic = 0;
        for (const [key, value] of Object.entries(result.data)) {
          totalDateDayStatistic += parseInt(value);
        }

        for (const [key, value] of Object.entries(result.data)) {
          if(key=="Monday")
          {
            key = "Pazartesi";
          }
          else if(key=="Tuesday")
          {
            key = "Salı";
          }
          else if(key=="Wednesday")
          {
            key = "Çarşamba";
          }  
          else if(key=="Thursday")
          {
            key = "Perşembe";
          }
          else if(key=="Friday")
          {
            key = "Cuma";
          }
          else if(key=="Saturday")
          {
            key = "Cumartesi";
          }
          else if(key=="Sunday")
          {
            key = "Pazar";
          }
          _dateDayStatisticData
          .push(
            {
              title: key, 
              percent:Math.round(parseInt(value) * 100 / totalDateDayStatistic),
              value: ": "+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
             
              icon: null
            })
        }

        setDateDayStatisticData(_dateDayStatisticData);
      },
      (error) => {
    
        const resMessage =
          error.message ||
          error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );

    DahsboardService.SexStatistic(date1, date2).then(
      (result) => {
        let _sexStatisticData = [];
        let totalSexStatistic = 0;
        for (const [key, value] of Object.entries(result.data)) {
          totalSexStatistic += parseInt(value);
        }

       
        for (const [key, value] of Object.entries(result.data)) {

          if (key=="1") {
            key="Erkek"
          }
          else if (key=="2") {
            key="Kadın"
          }  else if (key=="3") {
            key="Çift"
          }
          _sexStatisticData
          .push(
            {
              title: key, 
              percent:Math.round(parseInt(value) * 100 / totalSexStatistic),
              value: ": "+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
             
              icon: null
            })
        }

        setSexStatisticData(_sexStatisticData);
      },
      (error) => {
    
        const resMessage =
          error.message ||
          error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );

    DahsboardService.DirectionalStatistic(date1, date2).then(
      (result) => {
        let _directionalStatisticData = [];
        let totalDirectionalStatistic = 0;
        for (const [key, value] of Object.entries(result.data)) {
          totalDirectionalStatistic += parseInt(value);
        }

       
        for (const [key, value] of Object.entries(result.data)) {
          _directionalStatisticData
          .push(
            {
              title: key, 
              percent:Math.round(parseInt(value) * 100 / totalDirectionalStatistic),
              value: ": "+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
             
              icon: null
            })
        }

        setDirectionalStatisticData(_directionalStatisticData);
      },
      (error) => {
    
        const resMessage =
          error.message ||
          error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );

    DahsboardService.DateHourStatistic(date1, date2).then(
      (result) => {
        let _dateHourStatisticData = [];
        let totalDateHourStatistic = 0;
        for (const [key, value] of Object.entries(result.data)) {
          totalDateHourStatistic += parseInt(value);
        }

        
        for (const [key, value] of Object.entries(result.data)) {
          _dateHourStatisticData
          .push(
            {
              title: key, 
              percent:Math.round(parseInt(value) * 100 / totalDateHourStatistic),
              value: ": "+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
             
              icon: null
            })
        }

        setDateHourStatisticData(_dateHourStatisticData);
      },
      (error) => {
    
        const resMessage =
          error.message ||
          error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );

    DahsboardService.UserStatistic(date1, date2).then(
      (result) => {
        let _userStatisticData = [];
        let _userStatisticName = [];
        let totalUserStatistic = 0;
        for (const [key, value] of Object.entries(result.data)) {
          totalUserStatistic += parseInt(value);
        }

       
        for (const [key, value] of Object.entries(result.data)) {
          _userStatisticData.push(value)
          _userStatisticName.push(key)
        }

        setUserStatisticData(_userStatisticData);
        setUserStatisticName(_userStatisticName);
      },
      (error) => {
    
        const resMessage =
          error.message ||
          error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );

    DahsboardService.TownStatistic(date1, date2).then(
      (result) => {
        let _townStatisticData = [];
        let _townStatisticName = [];
       
        for (const [key, value] of Object.entries(result.data)) {
          _townStatisticData.push(value)
          _townStatisticName.push(key)
        }

        setTownStatisticData(_townStatisticData);
        setTownStatisticName(_townStatisticName);
      },
      (error) => {
    
        const resMessage =
          error.message ||
          error.toString();
  
        // setLoading(false);
        // setMessage(resMessage);
      }
    );
  
  }

  const send = () => {
    sendApi();
  }


var today = new Date();
var dd = String(today.getDate()-7).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd ;

const [date1, setDate1] = useState(today);

const date1Changed = (value) => {
  setDate1(value)
}


const [date2, setDate2] = useState(null);

const date2Changed = (value) => {
  setDate2(value)
}

const clear = () => {
  setDate1(today);
  setDate2('');
}

  return (
    <>
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
              </CForm>
            </CCardBody>
            <CCardFooter>
            <div class="d-flex">
              <div>  <CButton type="submit" size="sm" color="primary" onClick={() => {send();}}><CIcon name="cil-scrubber" /> Gönder</CButton> </div>
              <div>  <CButton type="reset" size="sm" color="danger"  onClick={() => clear()} ><CIcon name="cil-ban"/> Temizle</CButton></div>
            </div>
            </CCardFooter>
          </CCard>
      </CCol>
    </CRow>    
    <CCardGroup columns className = "cols-2" >
     <CCard>
        <CCardHeader>
          Uzman - Danışan
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: backgroundColor,
                data: UserStatisticData
              }
            ]}
            labels={UserStatisticName}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          İkamet - Danışan
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: backgroundColor,
                data: TownStatisticData
              }
            ]}
            labels={TownStatisticName}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
     </CCardGroup>
 
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>İstatistikler</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
        

          
                <CCardHeader>
                  Randevu - Gün
                </CCardHeader>
                {DateDayStatisticData.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
      

                <div className="mb-5"></div>

                <CCardHeader>
                  Randevu - Saat
                </CCardHeader>
                {DateHourStatisticData.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>

                <CCardHeader>
                  Danışan - Cinsiyet
                </CCardHeader>
                {SexStatisticData.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>
                <CCardHeader>
               Yönlendiren - Danışan
                </CCardHeader>
                  {DirectionalStatisticData.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

      </CCardBody>
          </CCard>
        </CCol>
      </CRow>
   </>
  )
}

export default Dashboard
