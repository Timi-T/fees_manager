import React from 'react'
import './stuRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import SelectionDropdown from '../selectionDropdown/selectionDropdown'


const StuRegForm = () => {

    return (
        <div id="student-reg-container">
            <h1 id="reg-student-title">The Potter's Home School</h1>
            <form className="student-reg-form">
                <h2 className="form-title">Register student</h2>
                <p className="form-text">First name</p>
                <input className="input-field" type="text" placeholder="" name="first-name"></input>
                <p className="form-text">Last name (surname)</p>
                <input className="input-field" type="text" placeholder="" name="last-name"></input>
                <p className="form-text">Age</p>
                <input className="input-field" type="text" placeholder="" name="age"></input>
                <p className="form-text">Sex</p>
                <input className="input-field" type="text" placeholder="" name="sex"></input>
                <p className="form-text">Parent's phone no.</p>
                <input className="input-field" type="text" placeholder="" name="phone-no"></input>
                <p className="form-text">Applied discount (optional)</p>
                <input className="input-field" type="number" placeholder="" name="discount" ></input>
                <SelectionDropdown dropdownName="student classroom" mode="single" />
                <p style={{color: "grey"}}>If you don't see the desired classroom from the dropdown, please proceed to create a new classroom before registering the student</p>
                <p className="form-text" id="stu-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password"></input>
            </form>
            <div id="submit-stu"><BigBtn text="Register" bcolor="rgb(60, 7, 60)" color="white" /></div>
        </div>
    )
}

export default StuRegForm