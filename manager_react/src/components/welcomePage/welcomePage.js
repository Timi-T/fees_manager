import React from 'react'
import BigBtn from '../bigBtn/bigBtn'
import './welcomePage.css'


const WelcomePage = (props) => {
    return (
        <div id="welcome-container">
            <div id="welcome-title">
                <h1>Welcome {props.name}!</h1>
            </div>
            <div id="welcome-text">
                <h2>Let's get you Started!</h2>
                <p>Take a little time to watch this 1 munite video as we guide you through the management process.</p>
            </div>
            <div id="demo-video">
                <video src="./demo.mp4" autoplay controls>
                </video>
            </div>
            <div id="welcome-create-btn">
                <BigBtn text="Create School" color="white" bcolor="rgb(60, 7, 60)" />
            </div>
        </div>
    )
}

export default WelcomePage