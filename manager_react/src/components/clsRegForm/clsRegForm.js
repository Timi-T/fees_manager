/*import React from 'react'
import './clsRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import SelectionDropdown from '../selectionDropdown/selectionDropdown'
import { useNavigate } from 'react-router-dom'


const ClsRegForm = () => {

    const navigate = useNavigate()
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
            <div id="submit-cls" onClick={() => {
                navigate("/classrooms");
            }}>
                <BigBtn text="Add classroom" bcolor="rgb(60, 7, 60)" color="white" />
            </div>
        </div>
    )
}

export default ClsRegForm*/



import React from 'react'
import './clsRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import SelectionDropdown from '../selectionDropdown/selectionDropdown'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Loader } from "../Loader/Loader";

const ClassRegForm = () => {
    const navigate = useNavigate();
    const itemsRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    const createClassroom = (event) => {
      setIsLoading(true);
      event.preventDefault();
      const schoolName = localStorage.currentSchool;
      const classTeacher = event.target.classTeacher.value;
      const fees = event.target.fees.value;
      const password = event.target.password.value;
      const classroomName = itemsRef.current.getItems();
      const clsInfo = JSON.stringify({ classTeacher, schoolName, fees, classroomName: classroomName[0], password });
      
      alertMessage('', 'none', 'red');
      fetch('http://localhost:5002/api/v1/create-classroom', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: clsInfo
      })
      .then((response) => {
        if (response.ok) { 
            response.json().then((message) => {
              alertMessage(message.success, 'block', 'green');
              setTimeout(() => {
                setIsLoading(false);
                navigate('/classrooms');
              }, 2000);
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setTimeout(() => {
                    setIsLoading(false);
                    alertMessage(message.error, 'block', 'red');
                }, 2000);
            })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      });
    }
    const createClsForm = 
        <div id="class-reg-container">
            <form className="class-reg-form" onSubmit={createClassroom}>
                <h2 className="form-title">Add classroom</h2>
                <p className="form-text">Class Teacher</p>
                <input className="input-field" type="text" placeholder="" name="classTeacher" required></input>
                <p className="form-text">Fees per child</p>
                <input className="input-field" type="text" placeholder="" name="fees" required></input>
                <SelectionDropdown dropdownName="classrooms" custom={true} mode='single' ref={itemsRef} />
                <p className="form-text" id="cls-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password" required></input>
                <div id="submit-cls">
                    <BigBtn text="Add classroom" bcolor="rgb(60, 7, 60)" color="white" />
                </div>
            </form>
        </div>
    return (
        <div id="class-reg-container">
            <h1 id="reg-class-title">{localStorage.currentSchool}</h1>
            <div id="login-signup-msg">
                <h3 id="err-msg"></h3>
            </div>
            { isLoading ? <Loader loadingText={"Creating classroom..."} /> : createClsForm}
        </div>
    )
}

export default ClassRegForm