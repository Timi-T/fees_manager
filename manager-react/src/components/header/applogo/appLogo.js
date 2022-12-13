import React, { useState } from 'react'
import './appLogo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons'



const AppLogo = (props) => {
    //Logo for website
    
    return (
        <div id="app-logo-container">
            <a href="/">
                <FontAwesomeIcon icon={faPeopleRoof} size="2x" color="whitesmoke" />
            </a>
            <h4 id="current-school">{props.school}</h4>
        </div>
    )
}

export default AppLogo