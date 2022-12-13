import React from 'react'
import './profileIcon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const ProfileIcon = () => {
    //Icon for user profile

    const ToggleProfileDropdown = () => {
        const dropdown = document.getElementById("profile-dropdown-container")
        const rightProfile = document.getElementById("right-profile")
        const leftProfile = document.getElementById("left-profile")
        if (dropdown.style.height !== "135px") {
            dropdown.style.height = "135px"
            setTimeout(() => {
                rightProfile.style.display = "block"
                leftProfile.style.display = "flex"
            }, 300)
        }
        else {
            dropdown.style.height = "0px"
            setTimeout(() => {
                rightProfile.style.display = "none"
                leftProfile.style.display = "none"
            }, 100)
        }
    }

    return (
        <div id="profile-icon-container" onClick={ToggleProfileDropdown}>
            <FontAwesomeIcon icon={faUser} size="lg" color="rgb(60, 7, 60)" />
        </div>
    )
}

export default ProfileIcon