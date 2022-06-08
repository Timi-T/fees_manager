import React from 'react'
import './paneOption.css'


const PaneOption = (props) => {
    return (
        <div className="pane-option-container">
            <p>{props.name}</p>
        </div>
    )
}

export default PaneOption