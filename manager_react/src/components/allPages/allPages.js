import React from "react";
import PageLayout from "../pageLayout/pageLayout";
import Header from "../header/Header";
import WelcomePage from "../welcomePage/welcomePage";
import StudentDisplay from "../studentsDisplay/studentsDisplay";
import StuRegForm from "../stuRegForm/stuRegForm";
import SchRegForm from "../schRegForm/schRegForm"
import ClsRegForm from "../clsRegForm/clsRegForm"
import PageAside from "../pageAside/pageASide"
import DetailView from "../detailView/detailView";
import LoginPage from "../loginPage/loginPage";
import SignupPage from "../signupPage/signupPage";
import SchoolsDisplay from "../schoolsDisplay/schoolsDisplay";
import ClassDisplay from "../classDisplay/classDisplay";
import BigBtn from "../bigBtn/bigBtn";
import { useNavigate } from "react-router-dom";
import PaymentsDisplay from "../paymentsDisplay/paymentsDisplay";
import CreatePayment from "../createPayment/createPayment";


export const Home = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<WelcomePage name={"Opeyemi"} />}/>
        </div>
    )
}

export const Login = () => {
    return (
        <div>
            <LoginPage />
        </div>
    )
}

export const Signup = () => {
    return (
        <div>
            <SignupPage />
        </div>
    )
}

export const Students = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<StudentDisplay />} />
        </div>
    )
}
//<PageLayout display={<StudentDisplay />} />

export const RegisterStudent = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<StuRegForm />} />
        </div>
    )
}

export const Schools = () => {
    return  (
        <div>
            <Header />
            <PageLayout display={<SchoolsDisplay />} />
        </div>
    )
}

export const RegisterSchool = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<SchRegForm />} />
        </div>
    )
}

export const Classrooms = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<ClassDisplay />} />
        </div>
    )
}

export const Payments = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<PaymentsDisplay />} />
        </div>
    )
}

export const MakePayment = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<CreatePayment/>} />
        </div>
    )
}

export const RegisterClassroom = () => {
    return (
        <div>
            <Header />
            <PageLayout display={<ClsRegForm />} />
        </div>
    )
}

export const ViewSchool = (props) => {
    const obj = {name: "The Potter's Home School", address: "25 Akinsola, Dopemu, Lagos",
           no_of_stu: 150, no_of_cls: 13, fees_paid: "1,700,000", fees_expected: "2,300,000"}
    //Use the school id to query the api
    const schoolID  = props.id;
    const navigate = useNavigate()
    const options = <div id="manage-options">
        <div onClick={() => {
            navigate("/students");
        }}>
            <BigBtn text="View Students" />
        </div>
        <div onClick={() => {
            navigate("/classrooms");
        }}>
            <BigBtn text="View Classrooms" />
        </div>
        <div onClick={() => {
            navigate("/payments");
        }}>
            <BigBtn text="View Payments" />
        </div>
        <BigBtn text="Edit School" />
        <BigBtn text="Delete School" bcolor="rgb(60, 7, 60)" color="white" />
    </div>
    return (
        <div>
            <Header />
            <PageLayout display={<DetailView obj={obj} view="school" />} />
            <PageAside obj={obj} view="school" options={options} />
        </div>
    )
}

export const ViewStudent = (props) => {
    const obj = {name: "The Potter's Home School", address: "25 Akinsola, Dopemu, Lagos",
           no_of_stu: 150, no_of_cls: 13, fees_paid: "1,700,000", fees_expected: "2,300,000"}
    //Use the student id to query the api
    const studentID  = props.id;
    const navigate = useNavigate();
    const options = <div id="manage-options">
        <div onClick={() => {
            navigate("/make-payment")
        }}>
            <BigBtn text="Make Payment" />
        </div>
        <div onClick={() => {
            navigate("/payments");
        }}>
            <BigBtn text="View Payments" />
        </div>
        <BigBtn text="Edit Student" />
        <BigBtn text="Delete Student" bcolor="rgb(60, 7, 60)" color="white" />
    </div>
    return (
        <div>
            <Header />
            <PageLayout display={<DetailView obj={obj} view="student" />} />
            <PageAside obj={obj} view="student" options={options} />
        </div>
    )
}

export const ViewClassroom = (props) => {
    const obj = {name: "The Potter's Home School", address: "25 Akinsola, Dopemu, Lagos",
           no_of_stu: 150, no_of_cls: 13, fees_paid: "1,700,000", fees_expected: "2,300,000"}
    //Use the student id to query the api
    const studentID  = props.id;
    const navigate = useNavigate()
    const options = <div id="manage-options">
        <div onClick={() => {
            navigate("/students");
        }}>
            <BigBtn text="View Students" />
        </div>
        <div onClick={() => {
            navigate('/payments');
        }}>
            <BigBtn text="View Payments" />
        </div>
        <BigBtn text="Edit Classroom" />
        <BigBtn text="Delete Classroom" bcolor="rgb(60, 7, 60)" color="white" />
    </div>
    return (
        <div>
            <Header />
            <PageLayout display={<DetailView obj={obj} view="classroom" />} />
            <PageAside obj={obj} view="classroom" options={options} />
        </div>
    )
}