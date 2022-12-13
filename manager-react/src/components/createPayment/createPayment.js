import React, { useState, useEffect } from "react";
import "./createPayment.css"
import SelectionDropdown from "../selectionDropdown/selectionDropdown";
import BigBtn from "../bigBtn/bigBtn";
import { useNavigate } from "react-router-dom";
import PaneOption from "../paneOption/paneOption";
import { faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaystackButton } from "react-paystack";
import { Loader } from "../Loader/Loader";


const CreatePayment = (props) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [email, setEmail] = useState("");
    const [depositorName, setDepositorName] = useState("");
    const [amount, setAmount] = useState("");
    const [purpose, setPurpose] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const publicKey = "pk_test_b94ac4a08afb7a655634ef8d03a0ac3631fc8c03";

    const alertMessage = (message = '', display = '', color = '') => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    useEffect(() => {
        fetch(`http://localhost:5002/api/v1/students?schoolName=${localStorage.currentSchool}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        })
        .then((response) => {
          if (response.ok) { 
              response.json().then((data) => {
                setStudents(data.success);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
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
      }, []);

    const SearchStudent = (event) => {
        setSearchText(event.target.value);

        if (event.target.value.length > 0) {
            const currentStudents = students.filter((stu) => {
                const name_id = stu.fullname + ' - ' + stu._id;
                return (name_id.toLowerCase().includes(event.target.value));
            })
            setStudentList(currentStudents);
        }
        else {
            setStudentList([]);
        }
    }

    const savePayment = (details) => {
        const payInfo = {
            depositorName,
            email,
            studentName,
            studentId,
            studentClass,
            amount: amount / 100,
            purpose,
            schoolName: localStorage.currentSchool,
            refNo: details.reference,
            status: details.status,
            message: details.message,
            transactionNo: details.transaction,
        }
        fetch('http://localhost:5002/api/v1/save-payment', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(payInfo),
        })
        .then((response) => {
          if (response.ok) { 
              response.json().then((data) => {
                setStudents(data.success);
                setTimeout(() => {
                  setIsLoading(false);
                  navigate('/payments');
                }, 1000);
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

    const SelectStudent = (stu) => {
        alertMessage();
        /*const selected = document.getElementById("student-dets");
        const stu_name = document.getElementById("det-name");
        const stu_id = document.getElementById("det-id");
        const stu_class = document.getElementById("det-class");
        const pay_amount = document.getElementById("det-amount");
        const input_amount = document.getElementById("payment-amount").value;
        stu_name.innerText = "Name: " + stu.fullname;
        stu_id.innerText = "ID: " + stu._id;
        stu_class.innerText = "Class: " + stu.classroom;
        pay_amount.innerText = "Amount: " + input_amount;
        selected.style.display = "flex";*/

        const selected_stu = document.getElementById("search-stu");
        selected_stu.value = stu.fullname + ' - ' + '(' + stu.classroom + ') ' + stu._id
        setStudentName(stu.fullname)
        setStudentId(stu._id)
        setStudentClass(stu.classroom);
        setStudentList([]);
    }

    const ResetPayment = () => {
        setStudentName('');
        setStudentId('');
        setStudentClass('');
        //const selected_stu = document.getElementById("search-stu");
        //selected_stu.value = ''
        /*const selected = document.getElementById("student-dets");
        selected.style.display = "none";*/
        //Remove the student details from the payment object
    }

    const componentProps = {
        email,
        amount,
        metadata: {
          depositorName,
          studentName,
          studentId,
        },
        publicKey,
        text: "Pay Fees",
        onSuccess: (res) => {
          //console.log(res)
          alert("Payment successful! Please check for email for a receipt");
          savePayment(res);
        },
        onClose: () => {
            setIsLoading(false);
            alert("Your paymebt will not be completed. Are you sure you want to exit?")
        },
    }

    const completeForm = () => {
        alertMessage('Please fill out form to proceed', 'block', 'red');
    }

    return (
        <div id="sch-reg-container">
            <h1 id="reg-school-title">Make Payment</h1>
            {
                isLoading ? <Loader loadingText={'Loading...'} /> :
                <div id="school-reg-container">
                    {
                        depositorName && email && amount && purpose && studentId && studentName
                        ?
                        <div></div>
                        :
                        <form className="school-reg-form">
                            <p className="form-text">Depositor name</p>
                            <input className="input-field" type="text" placeholder="" name="school-address" required onChange={(e) => { alertMessage(); setDepositorName(e.target.value) } }></input>
                            <p className="form-text">Depositor email</p>
                            <input className="input-field" type="text" placeholder="" name="depositorEmail" required onChange={(e) => { alertMessage();setEmail(e.target.value) } }></input>
                            <p className="form-text">Amount</p>
                            <input id="payment-amount" className="input-field" type="number" placeholder="" name="level" required onChange={(e) => { alertMessage();setAmount(e.target.value * 100) } }></input>
                            <p className="form-text">Purpose/Description</p>
                            <input className="input-field" type="text" placeholder="" name="level" required onChange={(e) => setPurpose(e.target.value)}></input>
                            <p className="form-text">Select student</p>
                            <input id="search-stu" className="input-field" type="text" placeholder="Search student name and select" name="school-name" required onChange={ SearchStudent } ></input>
                            <div id="students-dropdown">
                                {
                                    studentList.map((stu) => {
                                        return (
                                            <div onClick={() => SelectStudent(stu)} key={stu._id + stu.fullname}>
                                                <PaneOption name={stu.fullname + ' - ' + '(' + stu.classroom + ')' } bcolor="whitesmoke" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </form>
                    }
                    {
                        depositorName && email && amount && purpose && studentId && studentName
                        ?
                        <div id="student-dets">
                            <p>You are about to make a payment for the student with the following details...</p>
                            <p className="det" id="det-name">Studen name: {studentName}</p>
                            <p className="det" id="det-id">Student Id: {studentId}</p>
                            <p className="det" id="det-class">Student class: {studentClass}</p>
                            <p className="det" id="det-amount">Amount: {amount}</p>
                            <h4 style={{color: "orange"}}>
                                Please confirm the details before proceeding
                            </h4>
                            <div id="cancel-student" onClick={() => {
                                ResetPayment();
                            }}>
                                Cancel
                            </div>
                        </div>
                        :
                        <div></div>
                    }
                    <div id="login-signup-msg">
                        <h3 id="err-msg"></h3>
                    </div>
                    {
                        depositorName && email && amount && purpose && studentId && studentName
                        ?
                        <div id="submit-pay" type='submit' onClick={(e) => {e.preventDefault(); setIsLoading(true)}}>
                            <PaystackButton {...componentProps} />
                        </div>
                        :
                        <div id="submit-pay" onClick={completeForm}>
                            <BigBtn text="Pay Fees" bcolor="rgb(60, 7, 60)" color="white" />
                        </div>
                    }
                    <h5 id='pay-message'>All payments are processed using <a href="https://paystack.com/" target={'blank'}>Paystack</a> click "Pay Fees" to continue.</h5>
                </div>
            }
        </div>
    )
}

export default CreatePayment

/**<div id="submit-sch" >
                    <BigBtn text="Make payment" bcolor="rgb(60, 7, 60)" color="white" />
                </div> */