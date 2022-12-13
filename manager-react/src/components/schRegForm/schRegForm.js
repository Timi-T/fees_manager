import React from 'react'
import './schRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import SelectionDropdown from '../selectionDropdown/selectionDropdown'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Loader } from "../Loader/Loader";

const SchoolRegForm = () => {
    const navigate = useNavigate();
    const itemsRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    const createSchool = (event) => {
      setIsLoading(true);
      event.preventDefault();
      const schoolName = event.target.schoolName.value;
      const address = event.target.schoolAddress.value;
      const level = event.target.level.value;
      const password = event.target.password.value;
      const classrooms = itemsRef.current.getItems();
      const schInfo = JSON.stringify({ name: schoolName, address, level, password, classrooms });
      
      alertMessage('', 'none', 'red');
      fetch('http://localhost:5002/api/v1/create-school', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: schInfo
      })
      .then((response) => {
        if (response.ok) { 
            response.json().then((message) => {
              alertMessage(message.success, 'block', 'green');
              setTimeout(() => {
                setIsLoading(false);
                navigate('/schools');
              }, 2000);
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setIsLoading(false);
                alertMessage(message.error, 'block', 'red');
            })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      });
    }
    const createSchForm = 
        <div id="school-reg-container">
            <form className="school-reg-form" onSubmit={createSchool}>
                <p className="form-text">School name</p>
                <input className="input-field" type="text" placeholder="" name="schoolName" required></input>
                <p className="form-text">School address</p>
                <input className="input-field" type="text" placeholder="" name="schoolAddress" required></input>
                <p className="form-text">Level (Primary/Secondary)</p>
                <select className="level-dropdown" name='level' required>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Tertiary">Tertiary</option>
                  <option value="Other">Other</option>
                </select>
                <SelectionDropdown dropdownName="classrooms" custom={true} ref={itemsRef} />
                <p className="form-text" id="sch-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password" required></input>
                <div id="submit-sch">
                    <BigBtn text="Create school" bcolor="rgb(60, 7, 60)" color="white" />
                </div>
            </form>
        </div>
    return (
        <div id="school-reg-container">
            <h1 id="reg-school-title">Register School</h1>
            <div id="login-signup-msg">
                <h3 id="err-msg"></h3>
            </div>
            { isLoading ? <Loader loadingText={"Creating school..."} /> : createSchForm}
        </div>
    )
}

export default SchoolRegForm