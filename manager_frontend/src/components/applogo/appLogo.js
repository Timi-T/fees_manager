import React from 'react'
import './appLogo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons'



const AppLogo = () => {
    //Logo for website
    return (
        <div id="app-logo-container">
            <a href="">
                <FontAwesomeIcon icon={faPeopleRoof} size="2x" color="purple" />
            </a>
        </div>
    )
}

export default AppLogo