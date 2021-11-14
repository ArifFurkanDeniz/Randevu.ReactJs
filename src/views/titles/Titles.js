import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSwitch
} from '@coreui/react'

// import usersData from './UsersData'
import DateService from '../../services/date.service'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const fields = ['Date','Id']

const Dates = () => {

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {

    DateService.getDates().then(
      (result) => {
  
        setUsersData(result.data);
  
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

 

    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  

   const history = useHistory()
   const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
   const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    
  }


  return (
      <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            Date Listesi
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData.length> 0 && usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              // itemsPerPage={2}
              // pagination
              scopedSlots={{
                // 'Guid':
                //   (item) => (
                //     <td>
                //       {/* <CBadge color={getBadge(item.status)}>
                //         {item.status}
                //       </CBadge> */}
                //       <CCol col="6" sm="4" md="2" xl className="mb-2 mb-xl-0">
                //         <CButton  onClick={() => onClickHtml(!largeHtml, item.Guid)}  block variant="outline" color="info">HTML</CButton>
                //       </CCol>
                //       <CCol col="6" sm="4" md="2" xl className="mb-2 mb-xl-0">
                //         <CButton onClick={() => onClickPdf(!largePdf, item.Guid)}  block variant="outline" color="dark">PDF</CButton>
                //       </CCol>
                //     </td>
                //   ),
              }}
            />
                 
          {/* <CPagination
            activePage={currentPage}
            pages={20}
            onActivePageChange={pageChange}
          />
          <br></br> */}
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>          
    </div>

  )
}

export default Dates
