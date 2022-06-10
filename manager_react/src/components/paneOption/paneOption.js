import React from 'react'
import './paneOption.css'


const PaneOption = (props) => {
    return (
        <div className="pane-option-container" style={{backgroundColor: props.bcolor, color: props.color}}>
            <p>{props.name}</p>
        </div>
    )
}

export default PaneOption