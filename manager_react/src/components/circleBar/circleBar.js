import React from 'react'
import './circleBar.css'


const CircleBar = (props) => {
    return (
        <div id="bar-container">
            <div id="outer-circle">
                <div id="inner-circle">
                    <div id="percentage">
                        {props.percentage}
                    </div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="180px" height="180px" id="progress-bar">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="90" cy="90" r="80" stroke-linecap="round" />
            </svg>
        </div>
    )
}

export default CircleBar

/*
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="180px" height="180px" id="progress-bar">
                <defs>
                    <linearGradient id="GradientColor">
                    <stop offset="0%" stop-color="#e91e63" />
                    <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="90" cy="90" r="80" stroke-linecap="round" />
            </svg>
*/