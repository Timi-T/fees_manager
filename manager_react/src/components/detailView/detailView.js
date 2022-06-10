import React from 'react'
import './detailView.css'
import PaneOption from '../paneOption/paneOption'
import CircleBar from '../circleBar/circleBar'


const DetailView = (props) => {
    return (
        <div id="detail-container">
            <h2>{props.name}</h2>
            {props.description ? <p>{props.description}</p>: <h3>{props.classname}</h3>}
            <div id="detail-table">
                <div id="left-detail">
                    <div id="left-con">
                        <PaneOption name="" bcolor="#B2C1D1" color="white"/>
                        <PaneOption name="No of Students" bcolor="rgb(84, 54, 84)" color="white"/>
                        <PaneOption name="No of Classrooms" bcolor="rgb(84, 54, 84)" color="white"/>
                        <PaneOption name="Fees paid" bcolor="rgb(84, 54, 84)" color="white"/>
                        <PaneOption name="Fees expected" bcolor="rgb(84, 54, 84)" color="white"/>
                    </div>
                </div>
                <div id="right-detail">
                    <div id="right-con">
                        <PaneOption name="" bcolor="#B2C1D1" color="rgb(60, 7, 60)"/>
                        <PaneOption name="150" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
                        <PaneOption name="12" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
                        <PaneOption name="NGN 1,500,000" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
                        <PaneOption name="NGN 2,300,000" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
                    </div>
                    <div id="chart">
                        <CircleBar percentage={"72%"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailView