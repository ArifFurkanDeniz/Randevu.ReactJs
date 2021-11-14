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
  CModalTitle
} from '@coreui/react'

// import usersData from './UsersData'
import FormService from '../../services/form.service'
import RenderHtml from '../../mycomponents/renderHtml'
import RenderPdf from '../../mycomponents/renderPdf'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}


const fields = ['Kullanıcı','FormAdı','TemplateAdı','Tarih','Guid']

const Forms = () => {
  const [usersData, setUsersData] = useState([]);
  const [largeHtml, setLargeHtml] = useState(false)
  const [largePdf, setLargePdf] = useState(false)
  const [guidHtml, setGuidHtml] = useState(null)
  const [guidPdf, setGuidPdf] = useState(null)

const onClickHtml = (modal, guid) =>{

    setLargeHtml(modal);
    setGuidHtml(guid);
  }

  const onClickPdf = (modal, guid) =>{

    setLargePdf(modal);
    setGuidPdf(guid);
  }

  useEffect(() => {

    FormService.getForms().then(
      (result) => {
  
        let _usersData = [];
        result.data.forEach(element => {
 
          _usersData.push({
            Kullanıcı:element.WebUser.FullName,
            FormAdı:element.FormName,
            TemplateAdı:element.Resume.Title,
            Guid:element.Guid,
            Tarih:element.CreatedDate
          });
        });
        setUsersData(_usersData);
  
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
             Oluşturulan CV'ler
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
                'Guid':
                  (item) => (
                    <td>
                      {/* <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge> */}
                      <CCol col="6" sm="4" md="2" xl className="mb-2 mb-xl-0">
                        <CButton  onClick={() => onClickHtml(!largeHtml, item.Guid)}  block variant="outline" color="info">HTML</CButton>
                      </CCol>
                      <CCol col="6" sm="4" md="2" xl className="mb-2 mb-xl-0">
                        <CButton onClick={() => onClickPdf(!largePdf, item.Guid)}  block variant="outline" color="dark">PDF</CButton>
                      </CCol>
                    </td>
                  ),
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


    <CModal 
        show={largeHtml} 
        onClose={() => setLargeHtml(!largeHtml)}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>HTML</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {largeHtml ? <RenderHtml guid={guidHtml}></RenderHtml>:<div></div>}
      
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLargeHtml(!largeHtml)}>Kapat</CButton>
        </CModalFooter>
      </CModal>

      <CModal 
        show={largePdf} 
        onClose={() => setLargePdf(!largePdf)}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>HTML</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {largePdf ? <RenderPdf guid={guidPdf}></RenderPdf>:<div></div>}
      
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLargePdf(!largePdf)}>Kapat</CButton>
        </CModalFooter>
      </CModal>
          
    </div>

  )
}

export default Forms
