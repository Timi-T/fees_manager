import React from 'react'
import './mainDisplay.css'


const MainDisplay = (props) => {
    return (
        <div id="main">
            {props.display}
        </div>
    )
}

export default MainDisplay