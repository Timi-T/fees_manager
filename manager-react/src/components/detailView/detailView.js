import React, { useEffect } from 'react'
import './detailView.css'
import PaneOption from '../paneOption/paneOption'
import CircleBar from '../circleBar/circleBar'
import { Loader } from "../Loader/Loader";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDate, money } from '../paymentsDisplay/paymentsDisplay';

const DetailView = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [table, setTable] = useState('');
    let options;
    let percentage;

    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    useEffect(() => {
      fetch(`http://localhost:5002/api/v1/${props.queryObj.resource}/${props.queryObj.filter}?schoolName=${localStorage.currentSchool}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      .then((response) => {
        if (response.ok) { 
            response.json().then((obj) => {
              setTimeout(() => {
                const data = obj.success;
                if (props.view === "school") {
                    localStorage.setItem('currentSchool', data.name);
                    const headerDisplay = document.getElementById('current-school');
                    headerDisplay.innerHTML = data.name;
                    percentage = 20;
                    options = [
                        { 'No of Students': data.noOfStudents },
                        { 'No of Classrooms': data.noOfClassrooms },
                        { 'Total Fees paid': data.totalFees },
                        { 'Total Fees expected': data.feesExpected },
                        { 'Address': data.address },
                    ]
                } else if (props.view === "classroom") {
                    percentage = 15;
                    options = [
                        { 'Class Teacher': data.classTeacher },
                        { 'No of Students': data.noOfStudents },
                        { 'Total Fees paid': data.totalFees},
                        { 'Total Fees expected': data.totalFeesExpected },
                    ]
                } else if (props.view === "student") {
                    percentage = 10;
                    options = [
                        { 'Class': data.classroom },
                        { 'Age': data.age },
                        { 'Sex': data.sex },
                        { 'Total Fees paid': data.totalPaidFees },
                        { 'Total Fees Expected': data.totalFeesExpected },
                    ]
                } else if (props.view === "payment") {
                    percentage = 100;
                    options = [
                        { 'Student name': data.studentName },
                        { 'Depositor name': data.depositorName },
                        { 'Depositor email': data.email },
                        { 'Purpose': data.purpose },
                        { 'status': data.status },
                        { 'Date': getDate(data.createdAt, true) },
                    ]
                }
            
                setTable(
                    <div id='detail-page'>
                        <div id='detail-circle'>
                            <h1 id="detail-title">{
                                props.view === 'student' ? data.fullname : props.view === 'payment' ? data.referenceNo : data.name
                            }</h1>
                            <CircleBar percentage={props.view ==='payment' ? `NGN ${money(data.amount)}` : `${percentage}%`} />
                        </div>
                        <div id='details'>
                            {
                                options.map((opt) => {
                                    const key = Object.keys(opt)[0]
                                    return (
                                        <div key={key} className='det-text'>
                                            <h5 className='det-left'>{key}</h5>
                                            <h5 className='det-right'>{opt[key]}</h5>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
                setIsLoading(false);
                var r = document.querySelector(':root');
                r.style.setProperty('--percentage', percentage)
              }, 1000)
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setTimeout(() => {
                    setIsLoading(false);
                    alertMessage(message.error, 'block', 'red');
                }, 3000)
            })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        //alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      });
    }, []);

    return (
        <div>
            <div id="detail-container">
                <div id="login-signup-msg">
                    <h3 id="err-msg"></h3>
                </div>
                {isLoading ? <Loader loadingText={'Loading...'} /> : table }
            </div>
        </div>
    )
}

export default DetailView