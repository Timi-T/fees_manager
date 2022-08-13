import React from 'react';
import '../styles/global.css';
import { Home, RegisterStudent, RegisterSchool, RegisterClassroom, Students, Schools, ViewSchool, Login, Signup, ViewStudent, Classrooms, ViewClassroom, Payments, MakePayment } from './allPages/allPages';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom"

function App() {
  const { studentID } = useParams()
  const { schoolID } = useParams()
  const { classID } = useParams()
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/students" element={<Students />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-classroom" element={<RegisterClassroom />} />
        <Route path="/register-school" element={<RegisterSchool />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/students/:studentID" element={<ViewStudent id={studentID}/>} />
        <Route path="/classrooms/:classID" element={<ViewClassroom id={classID} />} />
        <Route path="/schools/:schoolID" element={<ViewSchool id={schoolID} />} />
      </Routes>
    </Router>
  )
}

//<Route path="/schools/:schoolID/students" element={<Students group="school" id="schoolID" />} />
//<Route path="/schools/:schoolID/classrooms" element={<Classrooms group="school" id="schoolID" />} />
//<Route path="/schools/:schoolID/payments" element={<Payments group="school" id="schoolID" />} />

//<Route path="/schools/:schoolID/students/:studentID" element={<Students group="school" id="schoolID" />} />
//<Route path="/schools/:schoolID/classrooms/:classID" element={<Classrooms group="school" id="schoolID" />} />
//<Route path="/schools/:schoolID/payments/:paymentID" element={<Payments group="school" id="schoolID" />} />

//<Route path="/schools/:schoolID/classrooms/:classID/students" element={<Classrooms group="class" id="schoolID" />} />
//<Route path="/schools/:schoolID/classrooms/:classID/payments" element={<Payments group="class" id="schoolID" />} />

//<Route path="/schools/:schoolID/students/:studentID/payments" element={<Payments group="class" id="schoolID" />} />

//<Route path="/schools/:schoolID/register-student" element={<Students group="school" id="schoolID" />} />
//<Route path="/schools/:schoolID/register-classroom" element={<Classrooms group="school" id="schoolID" />} />
//<Route path="/schools/:schoolID/make-payment" element={<Payments group="school" id="schoolID" />} />

//edit school
//edit class
//edit student

//delete school
//delete class
//delete student

//<Route path="/classrooms/:classID/students" element={<Classrooms />} />
//<Route path="/students" element={<Students />} />

export default App;