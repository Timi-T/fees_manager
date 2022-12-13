import React from 'react'
import './scrollBox.css'


const ScrollBox = (props) => {
    return (
        <div id="box">
            {props.widgets.map((widget) => {
                return (widget)
            })}
        </div>
    )
}

export default ScrollBox