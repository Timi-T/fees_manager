import React from 'react'
import './detailView.css'
import PaneOption from '../paneOption/paneOption'
import CircleBar from '../circleBar/circleBar'


const DetailView = (props) => {


    let options;
    let info;
    let title;
    let description;
    if (props.view === "school") {
        title = props.obj.name
        description = props.obj.address
        options =
            <div id="left-con">
                <PaneOption name="" bcolor="#B2C1D1" color="white"/>
                <PaneOption name="No of Students" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="No of Classrooms" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Fees paid" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Fees expected" bcolor="rgb(60, 7, 60)" color="white"/>
            </div>

        info =
        <div id="right-con">
            <PaneOption name="" bcolor="#B2C1D1" color="rgb(60, 7, 60)"/>
            <PaneOption name={props.obj.no_of_stu} bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name={props.obj.no_of_cls} bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name={props.obj.fees_paid} bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name={props.obj.fees_expected} bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
        </div>
    } else if (props.view === "classroom") {
        //title = props.obj.schName
        //description = props.obj.name
        options =
            <div id="left-con">
                <PaneOption name="" bcolor="#B2C1D1" color="white"/>
                <PaneOption name="Class Teacher" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="No of Students" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Fees paid" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Fees expected" bcolor="rgb(60, 7, 60)" color="white"/>
            </div>

        info =
        <div id="right-con">
            <PaneOption name="" bcolor="#B2C1D1" color="rgb(60, 7, 60)"/>
            <PaneOption name="Mr Opeyemi" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="12" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="NGN 135,000" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="NGN 201,000" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
        </div>
    } else if (props.view === "student") {
        //title = props.obj.schName
        //description = props.obj.name
        options =
            <div>
                <PaneOption name="" bcolor="#B2C1D1" color="white"/>
                <PaneOption name="Student Name" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Class" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Age" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Sex" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Fees Paid" bcolor="rgb(60, 7, 60)" color="white"/>
                <PaneOption name="Fees Expected" bcolor="rgb(60, 7, 60)" color="white"/>
            </div>

        info =
        <div id="right-con">
            <PaneOption name="" bcolor="#B2C1D1" color="rgb(60, 7, 60)"/>
            <PaneOption name="Timilehin" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="Primary 5" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="10" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="Male" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="NGN 35,000" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
            <PaneOption name="NGN 42,000" bcolor="whitesmoke" color="rgb(60, 7, 60)"/>
        </div>
    }

    return (
        <div id="detail-container">
            <h1 id="detail-title">{title}</h1>
            <p>{description}</p>
            <div id="detail-table">
                <div id="left-detail">
                    {options}
                </div>
                <div id="right-detail">
                    {info}
                    <div id="chart">
                        <CircleBar percentage={"72%"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailView