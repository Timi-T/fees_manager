import { faUserShield, faArrowRightFromBracket, faUserGear } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import IconOption from '../iconOption/iconOption'
import PaneOption from '../paneOption/paneOption'
import './profileDropdown.css'


const ProfileDropdown = () => {
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
                <PaneOption name={"Logout"}/>
            </div>
        </div>
    )
}

export default ProfileDropdown