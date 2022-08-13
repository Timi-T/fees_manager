import React from "react";
import './signupPage.css'
import { LoginSignup } from "../loginPage/loginPage";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate()
    const signupForm = 
    <form id="signup-form">
      <input type="text" placeholder="First name"></input>
      <input type="text" placeholder="Last name"></input>
      <input type="text" placeholder="Email"></input>
      <input type="text" placeholder="Phone number"></input>
      <input type="password" placeholder="Create password"></input>
      <input type="password" placeholder="Verify password"></input>
      <div id="signup-button" onClick={() => {
        navigate("/login");
      }}>
        Sign-up
      </div>
    </form>
    return (
        <LoginSignup form={signupForm} logoColor={"white"} signupstyle={{borderBottom: "5px solid rgb(82, 26, 82)"}} />
    )
}

export default SignupPage