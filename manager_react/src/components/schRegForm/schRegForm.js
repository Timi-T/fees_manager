import React from 'react'
import './schRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import SelectionDropdown from '../selectionDropdown/selectionDropdown'


const SchoolRegForm = () => {
    return (
        <div id="school-reg-container">
            <h1 id="reg-school-title">Register School</h1>
            <form className="school-reg-form">
                <p className="form-text">School name</p>
                <input className="input-field" type="text" placeholder="" name="school-name"></input>
                <p className="form-text">School address</p>
                <input className="input-field" type="text" placeholder="" name="school-address"></input>
                <p className="form-text">Level (Primary/Secondary)</p>
                <input className="input-field" type="text" placeholder="" name="level"></input>
                <SelectionDropdown dropdownName="classrooms" custom={true} />
                <p className="form-text" id="sch-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password"></input>
            </form>
            

            <div id="submit-sch"><BigBtn text="Create school" bcolor="rgb(60, 7, 60)" color="white" /></div>
        </div>
    )
}

const RegClassrooms = () => {
    return (
        <div></div>
    )
}

export default SchoolRegForm