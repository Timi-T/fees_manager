import { faUserShield, faArrowRightFromBracket, faUserGear } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconOption from '../iconOption/iconOption'
import PaneOption from '../paneOption/paneOption'
import './profileDropdown.css'


const ProfileDropdown = () => {
    const navigate = useNavigate()
    return (
        <div id="profile-dropdown-container">
            <div id="left-profile">
                <IconOption iconName={faUserGear} />
                <IconOption iconName={faUserShield} />
                <IconOption iconName={faArrowRightFromBracket} />
            </div>
            <div id="right-profile">
                <PaneOption name={"Profile"}/>
                <PaneOption name={"Admin"}/>
                <div onClick={() => {
                    navigate("/login");
                }}>
                    <PaneOption name={"Logout"}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileDropdown