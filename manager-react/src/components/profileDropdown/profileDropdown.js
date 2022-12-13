import { faUserShield, faArrowRightFromBracket, faUserGear } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconOption from '../iconOption/iconOption'
import PaneOption from '../paneOption/paneOption'
import './profileDropdown.css'


const ProfileDropdown = () => {
    const navigate = useNavigate();
    const logout = () => {
      fetch('http://localhost:5002/api/v1/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      .then((response) => {
        if (response.ok) {
          response.json().then((message) => {
            localStorage.removeItem('user');
            document.cookie = "auth_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem('currentSchool');
            navigate('/login');
          })
        } else if (response.status === 401) {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
    return (
        <div id="profile-dropdown-container">
            <div id="left-profile">
                <IconOption iconName={faUserGear} />
                <IconOption iconName={faUserShield} />
                <IconOption iconName={faArrowRightFromBracket} />
            </div>
            <div id="right-profile">
                <div onClick={() => {
                  navigate('/profile');
                }}>
                  <PaneOption name={"Profile"}/>
                </div>
                <PaneOption name={"Admin"}/>
                <div onClick={() => {
                    logout();
                }}>
                    <PaneOption name={"Logout"}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileDropdown