import React, { useState } from "react";
import "./createPayment.css"
import SelectionDropdown from "../selectionDropdown/selectionDropdown";
import BigBtn from "../bigBtn/bigBtn";
import { useNavigate } from "react-router-dom";
import PaneOption from "../paneOption/paneOption";
import { faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CreatePayment = (props) => {
    const navigate = useNavigate()
    const students = [];
    for (let i = 0; i < 256; i++) {
       students.push({name: "Opeyemi Ogunbode", class: "Primary 1", fees: "59%", discount: "N/A", sex: "M", id: i, key: i + 'ope'});
    }
    const [studentList, setStudentList] = useState([]);
    const [searchText, setSearchText] = useState('');

    const SearchStudent = (event) => {
        setSearchText(event.target.value);

        if (event.target.value.length > 0) {
            const currentStudents = students.filter((stu) => {
                const name_id = stu.name + '-' + stu.id;
                return (name_id.toLowerCase().includes(event.target.value));
            })
            setStudentList(currentStudents);
        }
        else {
            setStudentList([]);
        }
    }

    const SelectStudent = (stu) => {
        const selected = document.getElementById("student-dets");
        const stu_name = document.getElementById("det-name");
        const stu_id = document.getElementById("det-id");
        const stu_class = document.getElementById("det-class");
        const pay_amount = document.getElementById("det-amount");
        const input_amount = document.getElementById("payment-amount").value;
        stu_name.innerText = "Name: " + stu.name;
        stu_id.innerText = "ID: " + stu.id;
        stu_class.innerText = "Class: " + stu.class;
        pay_amount.innerText = "Amount: " + input_amount;
        selected.style.display = "flex";

        const selected_stu = document.getElementById("search-stu");
        selected_stu.value = stu.name + ' (' + stu.id + ')'
        setStudentList([]);
    }

    const ResetPayment = () => {
        const selected_stu = document.getElementById("search-stu");
        selected_stu.value = ''
        const selected = document.getElementById("student-dets");
        selected.style.display = "none";
        //Remove the student details from the payment object
    }

    return (
        <div id="school-reg-container">
            <h1 id="reg-school-title">Log Payment</h1>
            <p style={{ color: "grey" }}>Please make sure you have proper evidence of payment</p>
            <form className="school-reg-form">
                <p className="form-text">Depositor name</p>
                <input className="input-field" type="text" placeholder="" name="school-address"></input>
                <p className="form-text">Amount</p>
                <input id="payment-amount" className="input-field" type="number" placeholder="" name="level"></input>
                <p className="form-text">Purpose/Description</p>
                <input className="input-field" type="text" placeholder="" name="level"></input>
                <p className="form-text">Select student</p>
                <input id="search-stu" className="input-field" type="text" placeholder="Search student name and select" name="school-name" onChange={SearchStudent} ></input>
                <div id="students-dropdown">
                    {
                        studentList.map((stu) => {
                            return (
                                <div onClick={() => SelectStudent(stu)} key={stu.id + stu.name}>
                                    <PaneOption name={stu.name + '-' + stu.id} bcolor="whitesmoke" />
                                </div>
                            )
                        })
                    }
                </div>
                <div id="student-dets">
                    <p>You are about to log a payment for the student with the following details...</p>
                    <p className="det" id="det-name"></p>
                    <p className="det" id="det-id"></p>
                    <p className="det" id="det-class"></p>
                    <p className="det" id="det-amount"></p>
                    <p style={{color: "red"}}>
                        Please confirm the details before proceeding
                    </p>
                    <div id="cancel-student" onClick={() => {
                        ResetPayment();
                    }}>
                        Cancel
                    </div>
                </div>
                <p className="form-text" id="sch-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password"></input>
            </form>
            

            <div id="submit-sch" onClick={() => {
                navigate("/payments");
            }}>
                <BigBtn text="Log payment" bcolor="rgb(60, 7, 60)" color="white" />
            </div>
        </div>
    )
}

export default CreatePayment