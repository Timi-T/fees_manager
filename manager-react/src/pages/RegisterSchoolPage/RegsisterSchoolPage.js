import './RegisterSchoolPage.css';
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import BigBtn from '../../components/BigBtn/BigBtn';
import PreviousIcon from '../../components/PreviousIcon/PreviousIcon';
import React from 'react';
import SelectionDropdown from '../../components/SelectionDropdown/SelectionDropdown';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const RegsisterSchoolPage = () => {
  const navigate = useNavigate();
  const itemsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

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
    fetch(`${BACKEND_HOST}/create-school`, {
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
      <div id='prev-icon'>
        <PreviousIcon path={-1} />
      </div>
      <h1 id="reg-school-title">Register School</h1>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      { isLoading ? <Loader loadingText={"Creating school..."} /> : createSchForm}
    </div>
  )
}

export default RegsisterSchoolPage;
