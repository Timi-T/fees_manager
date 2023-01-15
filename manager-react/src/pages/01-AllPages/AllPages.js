import { useNavigate, useParams } from "react-router-dom";
import AllClassroomsPage from "../AllClassroomsPage/AllClassroomsPage";
import BigBtn from "../../components/BigBtn/BigBtn";
import CreatePaymentPage from "../CreatePaymentPage/CreatePaymentPage";
import DeleteView from '../../components/deleteView/deleteView';
import DetailView from "../../components/DetailView/DetailView";
import EditClassroom from '../../components/editView/editClassroom';
import EditSchool from '../../components/editView/editSchool';
import EditStudent from '../../components/editView/editStudent';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import LoginPage from "../LoginPage/LoginPage";
import PageAside from "../../components/pageAside/pageASide"
import PageLayout from "../../components/pageLayout/pageLayout";
import PaymentsPage from "../PaymentsPage/PaymentsPage";
import ProfilePage from '../ProfilePage/ProfilePage';
import React, { useEffect, useState } from "react";
import RegisterClassroomPage from "../RegisterClassroomPage/RegisterClassroomPage";
import ResetPwdPage from "../ResetPwdPage/ResetPwdPage";
import SchoolsPage from "../SchoolsPage/SchoolsPage";
import SignupPage from "../SignupPage/SignupPage";
import StudentsPage from "../StudentsPage/StudentsPage";
import RegisterStudentPage from "../RegisterStudentPage/RegisterStudentPage";
import VerifyEmailPage from "../VerifyEmailPage/VerifyEmailPage";
import WebsiteHeader from "../../components/WebsiteHeader/WebsiteHeader";
import WelcomePage from "../WelcomePage/WelcomePage";
import RegsisterSchoolPage from "../RegisterSchoolPage/RegsisterSchoolPage";

let globalUser = null;
const screenStyle = "m-0 p-0 w-screen h-screen";
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const GetcurrentUser = async () => {
  const res = await fetch(`${BACKEND_HOST}/auth/`, {
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
}

export const Login = () => {
  return (
    <body className={screenStyle}>
      <WebsiteHeader />
      <LoginPage />
      <Footer />
    </body>
  )
}

export const Signup = () => {
  return (
    <body className={screenStyle}>
      <WebsiteHeader />
      <SignupPage />
      <Footer />
    </body>
  )
}

export const Verify = () => {
  return(
    <div>
      <VerifyEmailPage />
    </div>
  )
}

export const ResetPassword = () => {
  return (
    <div>
      <ResetPwdPage />
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
      <PageLayout display={<StudentsPage />} />
    </div>
  )
}

export const RegisterStudent = () => {
  return (
    <div>
      <Header />
        <PageLayout display={<RegisterStudentPage />} />
    </div>
  )
}

export const Schools = () => {
  return  (
    <div>
      <Header />
      <PageLayout display={<SchoolsPage />} />
    </div>
  )
}

export const RegisterSchool = () => {
  return (
    <div>
      <Header />
      <PageLayout display={<RegsisterSchoolPage />} />
    </div>
  )
}

export const Classrooms = () => {
  return (
    <div>
      <Header />
      <PageLayout display={<AllClassroomsPage />} />
    </div>
  )
}

export const Payments = () => {
  return (
    <div>
      <Header />
      <PageLayout display={<PaymentsPage />} />
    </div>
  )
}

export const MakePayment = () => {
  return (
    <div>
      <Header />
      <PageLayout display={<CreatePaymentPage/>} />
    </div>
  )
}

export const RegisterClassroom = () => {
  return (
    <div>
      <Header />
      <PageLayout display={<RegisterClassroomPage />} />
    </div>
  )
}

export const ViewSchool = (props) => {
  const { schoolName } = useParams();
  let queryObj = { resource: 'schools', filter: schoolName.replace(' ', '_') };
 
  // Setting options for school operations
  const navigate = useNavigate();

  const options =
		<div id="manage-options">
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
      <div onClick={() => {
        navigate(`/schools/${schoolName}/delete`);
      }}>
        <BigBtn text="Delete School" bcolor="rgb(60, 7, 60)" color="white" />
      </div>
    </div>

  return (
    <div>
      <Header />
      <PageLayout display={<DetailView queryObj={queryObj} view="school" />} />
      <PageAside queryObj={queryObj} view="school" options={options} />
    </div>
  )
}

export const ViewClassroom = () => {

  //Use the student id to query the api
  const { className } = useParams();
  let queryObj = { resource: 'classrooms', filter: className.replace(' ', '_') };

  const navigate = useNavigate()
  const options =
		<div id="manage-options">
    	<div onClick={() => {
      	navigate(`/students?classroom=${className}`);
      }}>
        <BigBtn text="View Students" />
      </div>
      <div onClick={() => {
        navigate(`/payments?classroom=${className}`);
      }}>
        <BigBtn text="View Payments" />
      </div>
      <div onClick={() => {
        navigate(`/classrooms/${className}/edit`);
      }}>
        <BigBtn text="Edit Classroom" />
      </div>
      <div onClick={() => {
        navigate(`/classrooms/${className}/delete`);
      }}>
        <BigBtn text="Delete Classroom" bcolor="rgb(60, 7, 60)" color="white" />
      </div>
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
  const options =
		<div id="manage-options">
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
      <div onClick={() => {
        navigate(`/students/${studentId}/delete`);
      }}>
        <BigBtn text="Delete Student" bcolor="rgb(60, 7, 60)" color="white" />
      </div>
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
  const options =
		<div id="manage-options">
      <div onClick={() => {
        navigate(`/payments/${paymentId}/archive`);
      }}>
        <BigBtn text="Archive Payment" />
      </div>
    </div>

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

export const DeleteSchool = () => {
  const { schoolName } = useParams();

  return (
    <div>
      <DeleteView view='school' id={schoolName} />
    </div>
  )
}

export const DeleteClassroom = () => {
  const { className } = useParams();

  return (
    <div>
      <DeleteView view='classroom' id={className} />
    </div>
  )
}

export const DeleteStudent = () => {
  const { studentId } = useParams();

  return (
  <div>
    <DeleteView view='student' id={studentId} />
  </div>
  )
}
