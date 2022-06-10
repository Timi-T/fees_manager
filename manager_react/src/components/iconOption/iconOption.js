import React from "react"
import './iconOption.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const IconOption = (props) => {
    return (
        <div className="icon" >
            <FontAwesomeIcon icon={props.iconName} color="white" />
        </div>
    )
}

export default IconOption