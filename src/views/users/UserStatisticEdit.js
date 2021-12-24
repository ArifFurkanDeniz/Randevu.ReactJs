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

import DahsboardService from '../../services/dashboard.service'

//const fields = ['ClientName','count']

const UserStatisticEdit = (userId) => {


  const [usersData, setUsersData] = useState([]);
 
  const fields = ['Danışan','Gelme Sayısı']

  const history = useHistory();
  useEffect(() => {

    sendApi();

  }, []);

  const sendApi = () =>{
 
    DahsboardService.UserClientStatistic(userId).then(
      (result) => {
        var newDates = []
debugger;
        result.data.forEach(element => {

          newDates.push(
          {
            "Danışan" : element.clientName,
            "Gelme Sayısı" : element.count,
          });
        });

        setUsersData(newDates);
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

 


  return (
    <>
  
  
    <CRow>
        <CCol>
          <CCard>

            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              // itemsPerPage={2}
              // pagination
            
            />

        
          <br></br>
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>     
   </>
  )
}

export default UserStatisticEdit
