import React from 'react'
import './circleBar.css'


const CircleBar = (props) => {
    return (
        <div id="bar-container">
            <div id="outer-circle">
                <div id="inner-circle">
                    <div id="percentage">
                        <h3>{props.percentage}</h3>
                    </div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px" id="progress-bar">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stopColor="#e91e63" />
                        <stop offset="100%" stopColor="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="97.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export default CircleBar
