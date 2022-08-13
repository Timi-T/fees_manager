import React from "react";
import "./schoolsDisplay.css"
import DisplayCard from "../displayCard/displayCard";
import { useNavigate } from "react-router-dom";
import BigBtn from "../bigBtn/bigBtn";


const schools = [
                    {'name': "The Lordsfield Schools 1", "description": "1 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 2", "description": "2 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 3", "description": "3 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 4", "description": "4 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 5", "description": "5 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 6", "description": "6 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 7", "description": "7 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 8", "description": "8 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 9", "description": "9 Olusola street Agege Lagos"},
                    {'name': "The Lordsfield Schools 10", "description": "10 Olusola street Agege Lagos"},
]
const SchoolsDisplay = () => {
    const navigate = useNavigate()
    return (
        <div id="big-con">
            <div id="schools-header">
                    <h1>Your Schools</h1>
            </div>
            <div id="reg-sch" onClick={() => {
                navigate("/register-school");
            }}>
                <BigBtn text="Register school" bcolor="rgb(60, 7, 60)" color="white" />
            </div>
            <div id="container">
                {
                    schools.map( (sch) => {
                        return (
                            <div onClick={() => {
                                navigate("/schools/" + sch.id);
                            }}>
                                <DisplayCard name={sch.name} description={sch.description} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SchoolsDisplay