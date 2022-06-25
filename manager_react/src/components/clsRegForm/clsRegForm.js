import React from 'react'
import './clsRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import SelectionDropdown from '../selectionDropdown/selectionDropdown'


const ClsRegForm = () => {

    return (
        <div id="class-reg-container">
            <h1 id="reg-class-title">The Potter's Home School</h1>
            <form className="class-reg-form">
                <h2 className="form-title">Add classroom</h2>
                <p className="form-text">Class teacher</p>
                <input className="input-field" type="text" placeholder="" name="sclass-teacher"></input>
                <p className="form-text">Fees per child</p>
                <input className="input-field" type="number" placeholder="" name="class-fees"></input>
                <SelectionDropdown dropdownName="classrooms" mode="single" custom={true}/>
                <p className="form-text" id="cls-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password"></input>
            </form>
            <div id="submit-cls"><BigBtn text="Add classroom" bcolor="rgb(60, 7, 60)" color="white" /></div>
        </div>
    )
}

export default ClsRegForm