import React, { useEffect, useState, componentDidMount } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import PaymentsDisplay from "../paymentsDisplay/paymentsDisplay";
import CreatePayment from "../createPayment/createPayment";
import VerifyEmail from "../verifyEmail/VerifyEmail";
import ResetPwd from "../resetPwd/resetPwd";
import EditStudent from '../editView/editStudent';
import EditSchool from '../editView/editSchool';
import EditClassroom from '../editView/editClassroom';
import ProfilePage from '../profilePage/profilePage';

let globalUser = null;

const GetcurrentUser = async () => {
  const res = await fetch('http://localhost:5002/api/v1/auth/', {
    method: "GET",
    credentials: "include",
  })
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
  return null;
}

export const Home = () => {
    const [currentUser, setcurrentUser] = useState(globalUser);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const getUser = GetcurrentUser;

    const getUserFunc = async () => {
      const user = await getUser();
      setcurrentUser(user);
      setIsLoading(false);
      if (!user) {
        navigate('/login');
      }
    }
    useEffect(() => {
      getUserFunc();
      localStorage.setItem('currentSchool', '');
    }, []);

    if (isLoading) {
      return(<div></div>)
    }

    return(
      <div>
        <WelcomePage name={currentUser ? currentUser.firstname : null} />
      </div>
    )
    // <Header />
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

export const Verify = () => {
    return(
        <div>
            <VerifyEmail />
        </div>
    )
}

export const ResetPass = () => {
    return (
        <div>
            <ResetPwd />
        </div>
    )
}

export const UserProfile = () => {
    return (
        <div>
            <ProfilePage />
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
    const { schoolName } = useParams();
    let queryObj = { resource: 'schools', filter: schoolName.replace(' ', '_') };
    
    // Setting options for school operations
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
        <div onClick={() => {
            navigate(`/schools/${localStorage.currentSchool}/edit`);
        }}>
            <BigBtn text="Edit School"/>
        </div>
        <BigBtn text="Delete School" bcolor="rgb(60, 7, 60)" color="white" />
    </div>

    return (
        <div>
            <Header />
            <PageLayout display={<DetailView queryObj={queryObj} view="school" />} />
            <PageAside queryObj={queryObj} view="school" options={options} />
        </div>
    )
}

export const ViewClassroom = (props) => {

    //Use the student id to query the api
    const { className } = useParams();
    let queryObj = { resource: 'classrooms', filter: className.replace(' ', '_') };

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
        <div onClick={() => {
            navigate(`/classrooms/${className}/edit`);
        }}>
            <BigBtn text="Edit Classroom" />
        </div>
        <BigBtn text="Delete Classroom" bcolor="rgb(60, 7, 60)" color="white" />
    </div>
    return (
        <div>
            <Header />
            <PageLayout display={<DetailView queryObj={queryObj} view="classroom" />} />
            <PageAside queryObj={queryObj} view="classroom" options={options} />
        </div>
    )
}

export const ViewStudent = (props) => {
    //Use the student id to query the api
    const { studentId } = useParams();
    let queryObj = { resource: 'students', filter: studentId };

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
        <div onClick={() => {
            navigate(`/student/${studentId}/edit`)
        }}>
            <BigBtn text="Edit Student" />
        </div>
        <BigBtn text="Delete Student" bcolor="rgb(60, 7, 60)" color="white" />
    </div>
    return (
        <div>
            <Header />
            <PageLayout display={<DetailView queryObj={queryObj} view="student" />} />
            <PageAside queryObj={queryObj} view="student" options={options} />
        </div>
    )
}

export const ViewPayment = (props) => {
    //Use the payment id to query the api
    const { paymentId } = useParams();
    let queryObj = { resource: 'payments', filter: paymentId };

    const navigate = useNavigate();
    const options = <div></div>
    return (
        <div>
            <Header />
            <PageLayout display={<DetailView queryObj={queryObj} view="payment" />} />
            <PageAside queryObj={queryObj} view="payment" options={options} />
        </div>
    )
}

export const EditSchoolData = () => {
    const schoolName = localStorage.currentSchool;
    return(
        <div>
            <EditSchool  id={schoolName} view='school' />
        </div>
    )
}

export const EditClassroomData = () => {
    const {className} = useParams();
    return(
        <div>
            <EditClassroom  id={className} view='classroom' />
        </div>
    )
}

export const EditStudentData = () => {
    const { studentId } = useParams();
    return(
        <div>
            <EditStudent  id={studentId} view='student' />
        </div>
    )
}
