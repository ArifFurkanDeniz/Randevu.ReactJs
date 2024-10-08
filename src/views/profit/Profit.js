import { MultiSelect } from "react-multi-select-component";
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
  CSwitch,
  CListGroup,
  CListGroupItem,
  CBadge
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

import ProfitService from '../../services/profit.service'
import UserService from '../../services/user.service'
import ProfitEdit from './ProfitEdit'

const fields = ['fullName','email','phone1','genderType']

const Profit = () => {

  const [DateDayStatisticData, setDateDayStatisticData] = useState([]);
  const [SexStatisticData, setSexStatisticData] = useState([]);
  const [DirectionalStatisticData, setDirectionalStatisticData] = useState([]);
  const [DateHourStatisticData, setDateHourStatisticData] = useState([]);

  const [UserStatisticData, setUserStatisticData] = useState([]);
  const [UserStatisticName, setUserStatisticName] = useState([]);

  const [TownStatisticData, setTownStatisticData] = useState([]);
  const [TownStatisticName, setTownStatisticName] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const [costTotal, setCostTotal] = useState([]);
  const [costUser, setCostUser] = useState([]);
  const [costTest, setCostTest] = useState([]);
  const [costKDV, setCostKDV] = useState([]);

  const fields = ['Uzman', 'Uzman Ücreti', 'Test Ücreti', 'Kasa Ücreti', 'KDV Ücreti', 'Toplam Ücret','Id']
  const user2 = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  useEffect(() => {

    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        document.getElementById("submit").click(); 
  
      }
    };
    document.addEventListener("keydown", listener);

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




    sendApi();

  }, []);

  const sendApi = () =>{
 
    ProfitService.ProfitStatistic(date1, date2, user).then(
      (result) => {
        var newDates = []
        let totalCostUser = 0;
        let totalCostTest = 0;
        let totalCostCase = 0;
        let totalCostKDV = 0;
        result.data.forEach(element => {
          totalCostUser += element.costUser;
          totalCostTest += element.costTest;
          totalCostCase += element.costCase;
          totalCostKDV += element.kdv;
          newDates.push(
          {
            "Uzman" : element.userName,
            "Uzman Ücreti" : element.costUser,
            "Test Ücreti" : element.costTest,
            "Kasa Ücreti" : element.costCase,
            "KDV Ücreti" : element.kdv,
            "UserId" : element.userId,
            // "id" : element.id,
            "Toplam Ücret" : element.costCase + element.costTest + element.costUser
          });
        });

        setCostUser(totalCostUser);
        setCostTest(totalCostTest);
        setCostKDV(totalCostKDV);
        setCostTotal(totalCostCase);
   

        setProfitData(newDates);
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

    ProfitService.ProfitTotalDetail(date1, date2, user).then(
      (result) => {
        var costStatuses = []

        result.data.forEach(element => {

          costStatuses.push(
          {
            CostStatus : element.costStatus,
            TotalCost : element.costCase + element.costTest + element.costUser
          });
        });

        setStatusData(costStatuses);
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

  const send = () => {
    sendApi();
  }


  var today = new Date();

today = addDays(today, -7);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd ;

var today2 = new Date();

var dd = String(today2.getDate()).padStart(2, '0');
var mm = String(today2.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today2.getFullYear();

today2 = yyyy + '-' + mm + '-' + dd ;

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const [date1, setDate1] = useState(today);

const date1Changed = (value) => {
  setDate1(value)
}


const [date2, setDate2] = useState(today2);

const date2Changed = (value) => {
  setDate2(value)
}

const [user, setUser] = useState([]);
const userChanged = (value) => {
  setUser(value)
}

const [showEdit, setshowEdit] = useState(false)
const [editId, setEditId] = useState(null)
const onClickEdit = (showEdit, id) =>{
  debugger;
  setEditId(id);
  setshowEdit(showEdit);
}

const clear = () => {
  setDate1(today);
  setDate2('');
  setUser('');
}

  return (
    <>
           <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
           Kazanç Listesi
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
            

                { (user2.data.userData.role[0] =="Admin") && 
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="date-input">Uzman</CLabel>
                  </CCol>
                  <CCol xs="12" md="4">
                  {/* <CSelect custom name="select" id="select" onChange={(e) => userChanged(e.target.value)} value={user}>
                 <option value="0">Seçiniz</option>
                    {usersData.map(item => (
                      <option
                        key={item.fullName}
                        value={item.id}
                      >
                        {item.fullName}
                      </option>
                    ))}
                  </CSelect> */}
                   <MultiSelect
                    options={ Array.from(usersData, function (item) {
                      return { label: item.fullName, value: item.id }
                  })}
                    value={user}
                    onChange={setUser}
                    labelledBy="Seçiniz"
                  />
                  </CCol>
                  </CFormGroup> 
                }
          
              </CForm>
            </CCardBody>
            <CCardFooter>
            <div class="d-flex">
              <div>  <CButton id="submit" name="submit" type="submit" size="sm" color="primary" onClick={() => {send();}}><CIcon name="cil-scrubber" /> Gönder</CButton> </div>
              <div>  <CButton type="reset" size="sm" color="danger"  onClick={() => clear()} ><CIcon name="cil-ban"/> Temizle</CButton></div>
            </div>
            </CCardFooter>
          </CCard>
      </CCol>
    </CRow>    
  
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            <div class="d-flex">
          
              <div class="ml-auto">Toplam Uzman Ücreti : <strong>{costUser}</strong></div>
              { (user2.data.userData.role[0] =="Admin") &&  <div class="ml-auto">Toplam Test Ücreti : <strong>{costTest}</strong></div>}
              { (user2.data.userData.role[0] =="Admin") && <div class="ml-auto">Toplam Kasa Ücreti : <strong>{costTotal}</strong></div>}
              { (user2.data.userData.role[0] =="Admin") && <div class="ml-auto">KDV : <strong>{costKDV}</strong></div>}
              { (user2.data.userData.role[0] =="Admin") &&
              <div class="ml-auto">Toplam Ücret : <strong>{costUser  + costTest + costTotal}</strong>
              <ul>
              {statusData.map(item => (  
                <li>  
                {item.CostStatus} : <strong> {item.TotalCost}  </strong>
                </li>  
              ))} 
              </ul>
              </div>}
              <div  class="ml-auto"></div>
              
            </div>
     
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={profitData}
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
                'Id':
                  (item) => (
                    <td>
                      {/* <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge> */}
                       <CButtonGroup>
                        <CButton color="secondary" onClick={() => onClickEdit(!showEdit, item.UserId)}>Detay</CButton>
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
{/*                  
          <CPagination 
            activePage={currentPage}
            pages={totalPage}
            onActivePageChange={pageChange}
          /> */}
        
          <br></br>
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>     
    <CModal 
        show={showEdit} 
        onClose={() => {setshowEdit(!showEdit);}}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>Detay</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {showEdit ? <ProfitEdit date1={date1} date2={date2} id={editId} ></ProfitEdit>:<div></div>}
      
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
        </CModalFooter> */}
      </CModal>     

      

   </>
  )
}

export default Profit
