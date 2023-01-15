import './AllClassroomsPage.css'
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { alertMessage } from '../../GlobalFunctions/GlobalFunctions';
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import React, { useEffect, useState } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const AllClassroomsPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [container, setContainer] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const classrooms = data.success.map((cls) => {
            return cls.name;
          });
          classrooms.sort();
          setTimeout(() => {
            setContainer(
              classrooms.map((cls) => {
                return (
                  <div key={cls} onClick={() => {
                      navigate(`/classrooms/${cls.replace(new RegExp(' ', 'g'), '_')}`);
                  }}>
                  	<DisplayCard name={cls} description={localStorage.currentSchool} />
                  </div>
                )
              })
            )
						const containerDisplay = document.getElementById('container');
						containerDisplay.style.display = 'grid';
						setIsLoading(false);
          }, 1000);
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          setTimeout(() => {
            setIsLoading(false);
            alertMessage(message.error, 'block', 'red')
          }, 1000);
        })
      }
    })
    .catch((err) => {
	    setTimeout(() => {
        setIsLoading(false);
        alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      })
    })
  }, [])

  return (
    <div id="big-con">
      <div id="schools-header">
          <h1>Classrooms</h1>
      </div>
      <div id="reg-cls" onClick={() => {
        navigate("/register-classroom");
      }}>
        <BigBtn text="Register Classroom" bcolor="rgb(60, 7, 60)" color="white" />
      </div>
      <div id="login-signup-msg">
        <h3 id="err-msg"></h3>
      </div>
      <div id="container">
        {
          isLoading ? <Loader loadingText={'Loading...'} /> : container
        }
      </div>
    </div>
	)
}

export default AllClassroomsPage;
