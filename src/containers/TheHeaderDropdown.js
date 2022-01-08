import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModal
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthService from '../services/auth.service'
import UserPassword from '../views/users/UserPassword'

const TheHeaderDropdown = () =>{ 

  const history = useHistory()
//const history = useHistory();
const onLogOut = () =>{

  AuthService.logout();
  //console.log(localStorage.getItem("user"));
  //history.push("/login");
  
  history.push("/login");

}



const [passwordId, setPasswordId] = useState(null)
const [showPassword, setshowPassword] = useState(false)
const [showEdit, setshowEdit] = useState(false)
const onClickPassword2 = (showEdit) =>{
  debugger;
  const user = JSON.parse(localStorage.getItem('user'));
  setPasswordId(user.data.userData.id);
  setshowPassword(showEdit);
}

  return (
    <div>
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          {/* <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          /> */}

<CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={100}
        />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" /> 
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" /> 
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" /> 
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" /> 
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" /> 
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" /> 
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" /> 
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem divider /> */}
        <CDropdownItem onClick={() => onClickPassword2(!showPassword)}>
          <CIcon name="cil-settings"  className="mfe-2" /> 
          Şifremi Değiştir
        </CDropdownItem>
        <CDropdownItem onClick={() => onLogOut()}>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Çıkış Yap
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
   
    <CModal 
      show={showPassword} 
      onClose={() => {setshowPassword(!showPassword);}}
      size="m">
      <CModalHeader closeButton>
        <CModalTitle>{passwordId==0?"Kaydet":"Düzenle"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
      {showPassword ? <UserPassword id={passwordId}></UserPassword>:<div></div>}
    
      </CModalBody>
      {/* <CModalFooter>
        <CButton color="secondary" onClick={() => setshowEdit(!showEdit)}>Kapat</CButton>
      </CModalFooter> */}
    </CModal>  
    </div>
  )
}

export default TheHeaderDropdown
