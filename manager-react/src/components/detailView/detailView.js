import React, { useEffect } from 'react'
import './DetailView.css'
//import PaneOption from '../PaneOption/PaneOption'
import CircleBar from '../circleBar/circleBar'
import { Loader } from "../Loader/Loader";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PreviousIcon from '../PreviousIcon/PreviousIcon';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

export const getDate = (dateString, fulldate=false) => {

    // Get year, month, and day part from the date
    const date = new Date(dateString);
    if (!fulldate) {
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });
        // Generate yyyy-mm-dd date string
        const formattedDate = day + "-" + month + "-" + year;
        return formattedDate;
    } else {
        // Generate full date string
        return date.toUTCString();
    }
}

export const money = (amount) => {
    const amountStr = String(amount)
    let i = amountStr.length - 1;
    let j = 1;
    let cash = '';
    while (i > -1) {
        cash = amountStr[i] + cash;
        if (i && j % 3 === 0) {
            cash = ',' + cash;
        }
        i--;
        j++;
    }
    return cash;
}

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
      fetch(`${BACKEND_HOST}/${props.queryObj.resource}/${props.queryObj.filter}?schoolName=${localStorage.currentSchool}`, {
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
                        { 'Level': data.level },
                        { 'No of Students': data.noOfStudents },
                        { 'No of Classrooms': data.noOfClassrooms },
                        { 'Total Fees paid': `NGN ${money(data.totalFees)}` },
                        { 'Total Fees expected': `NGN ${money(0)}` },
                        { 'Address': data.address },
                        { 'School ID': data._id },
                        { 'Date created': getDate(data.createdAt, true) },
                        { 'Last updated': getDate(data.updatedAt, true) },
                    ]
                } else if (props.view === "classroom") {
                    percentage = 15;
                    options = [
                        { 'School': localStorage.currentSchool },
                        { 'Class Teacher': data.classTeacher },
                        { 'No of Students': data.noOfStudents },
                        { 'class Fees': `NGN ${money(data.classFees)}` },
                        { 'Total Fees paid': `NGN ${money(data.totalFees)}`},
                        { 'Total Fees expected': `NGN ${money(data.totalFeesExpected)}` },
                        { 'Classroom ID': data._id },
                        { 'Date created': getDate(data.createdAt, true) },
                        { 'Last updated': getDate(data.updatedAt, true) },
                    ]
                } else if (props.view === "student") {
                    percentage = 10;
                    options = [
                        { 'School': localStorage.currentSchool },
                        { 'Class': data.classroom },
                        { 'Age': data.age },
                        { 'Sex': data.sex },
                        { 'Discount': data.discount },
                        { 'Parent phone': data.phoneNo },
                        { 'Total Fees paid': `NGN ${money(data.totalPaidFees)}` },
                        { 'Total Fees Expected': `NGN ${money(data.totalFeesExpected)}` },
                        { 'Student ID': data._id },
                        { 'Date created': getDate(data.createdAt, true) },
                        { 'Last updated': getDate(data.updatedAt, true) },
                    ]
                } else if (props.view === "payment") {
                    percentage = 100;
                    options = [
                        { 'Student name': data.studentName },
                        { 'Student class': data.studentClass },
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
                <div id='prev-icon'>
                    <PreviousIcon path={-1} />
                </div>
                {isLoading ? <Loader loadingText={'Loading...'} /> : table }
            </div>
        </div>
    )
}

export default DetailView