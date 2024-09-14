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

import ProfitService from '../../services/profit.service'




const ProfitEdit = (data) => {


  const [profitData, setProfitData] = useState([]);
const [costTotal, setCostTotal] = useState([]);
const [costUser, setCostUser] = useState([]);
  const fields = ['Danışan', 'Randevu Tarihi', 'Uzman Ücreti', 'Test Ücreti', 'Kasa Ücreti', 'KDV Ücreti', 'Toplam Ücret', 'Ödeme Durumu']


  useEffect(() => {
    ProfitService.ProfitDetail(data.date1, data.date2, data.id).then(
      (result) => {
        var newDates = []
        let totalCostUser = 0;
        let totalCostTest = 0;
        let totalCostCase = 0;
        result.data.forEach(element => {
          totalCostUser += element.costUser;
          totalCostTest += element.costTest;
          totalCostCase += element.costCase;
          newDates.push(
          {
            "Danışan" : element.clientName,
            "Randevu Tarihi" : element.dateDate,
            "Uzman Ücreti" : element.costUser,
            "Test Ücreti" : element.costTest,
            "Kasa Ücreti" : element.costCase,
            "KDV Ücreti" : element.kdv,
            "Ödeme Durumu" : element.costStatus,
            // "id" : element.id,
            "Toplam Ücret" : element.costCase + element.costTest + element.costUser
          });
        });

        setCostUser(totalCostUser);
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




  }, []);

  return (
    <>  
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            <div class="d-flex">
          
              <div class="ml-auto">Toplam Uzman Ücreti : <strong>{costUser}</strong></div>
              <div class="ml-auto">Toplam Kasa Ücreti : <strong>{costTotal}</strong></div>
              <div class="ml-auto">Toplam Ücret : <strong>{costUser + costTotal}</strong></div>
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
              // pagination}
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

   </>
  )
}

export default ProfitEdit
