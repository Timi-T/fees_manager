import React from "react"
import './iconOption.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const IconOption = (props) => {
    return (
        <div class="icon" >
            <FontAwesomeIcon icon={props.iconName} color="white" />
        </div>
    )
}

export default IconOption