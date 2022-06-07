import React from 'react'
import './paneOption.css'


const PaneOption = (props) => {
    return (
        <div class="pane-option-container">
            <p>{props.name}</p>
        </div>
    )
}

export default PaneOption