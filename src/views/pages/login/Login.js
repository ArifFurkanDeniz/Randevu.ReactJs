import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useForm from "../../../validations/useForm";
import validate from '../../../validations/LoginFormValidationRules';
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthService from '../../../services/auth.service'


const Login = () => {

  const history = useHistory()
  const [message, setMessage] = useState("");

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  function login() {
    setMessage("");
    AuthService.login(values.email, values.password).then(
      (result) => {

        if(!result.data.status)
        {
           setMessage(result.data.message);
        }
        else{
         
          window.location.href="/";
        }
        //  props.history.push("/#/login");
       
       
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // setLoading(false);
        setMessage(resMessage);
      }
    );
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
               
                  <CForm onSubmit={handleSubmit} noValidate>
                    <h1>Giriş</h1>
                    <p className="text-muted">Lütfen hesabınızla giriş yapınız</p>
                    {message && (
                      <CAlert color="danger">
                        <CLink className="alert-link">{message}</CLink>
                      </CAlert>
                    )}
                     {errors.email && (
                      <CAlert color="danger">

                        <CLink className="alert-link">{errors.email}</CLink>
                      </CAlert>
                     )}
                    {errors.password && (
                      <CAlert color="danger">
                        <CLink className="alert-link">{errors.password}</CLink>
                      </CAlert>
                    )}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <CInput autoComplete="off" className={`input ${errors.email && 'is-danger'}`} placeholder="Email" type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                      </CInputGroup>
               
                      
                 
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
          
                  <CInput className={`input ${errors.password && 'is-danger'}`} autoComplete="current-password" placeholder="Password" type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                  </CInputGroup>
              
                   
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Giriş</CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Q Psikoloji Randevu</h2>
                    {/* <p>Arif, Mert ve Yeter dışındakiler boşuna girmeye çalışmasın</p> */}
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
