import React from "react";
import './classDisplay.css'
import { useNavigate } from "react-router-dom";
import DisplayCard from "../displayCard/displayCard";
import BigBtn from "../bigBtn/bigBtn";


const classrooms = [
    {'name': "Primary 1", "description": "The Potters Home School", 'id': 1},
    {'name': "Primary 2", "description": "The Potters Home School", 'id': 2},
    {'name': "Primary 3", "description": "The Potters Home School", 'id': 3},
    {'name': "Primary 4", "description": "The Potters Home School", 'id': 4},
    {'name': "Primary 5", "description": "The Potters Home School", 'id': 5},
    {'name': "Primary 6", "description": "The Potters Home School", 'id': 6},
    {'name': "Primary 7", "description": "The Potters Home School", 'id': 7},
    {'name': "Primary 8", "description": "The Potters Home School", 'id': 8},
    {'name': "Primary 9", "description": "The Potters Home School", 'id': 9},
    {'name': "Primary 10", "description": "The Potters Home School", 'id': 10},
]
const ClassDisplay = () => {
    const navigate = useNavigate()
    return (
    <div id="big-con">
        <div id="schools-header">
            <h1>Classrooms</h1>
        </div>
        <div id="reg-cls" onClick={() => {
                navigate("/register-classroom");
        }}>
            <BigBtn text="Register Classroom" bcolor="rgb(60, 7, 60)" color="white" />
        </div>
        <div id="container">
            {
                classrooms.map( (cls) => {
                    return (
                        <div onClick={() => {
                            navigate("/classrooms/" + cls.id);
                        }}>
                            <DisplayCard name={cls.name} description={cls.description} />
                        </div>
                    )
                })
            }
        </div>
    </div>
)
}

export default ClassDisplay