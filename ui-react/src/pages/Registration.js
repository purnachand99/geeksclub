import React from "react";
import {Redirect} from "react-router-dom";
import { createUser } from "../services/api";
import { getLoginUser} from "../services/localStorage";
import RegistrationForm from "../components/RegistrationForm";

const Registration = () => {

  const user = getLoginUser() || {};
  if (user['access_token']) {
    return <Redirect to="/" />;
  }

  const handleRegistration = newUser => createUser(newUser)

  const handleRegistrationSuccess = (registeredUser) => {
    console.log("registration successful")
    window.location = "/";
  };

  return (
    <RegistrationForm registrationHandler={handleRegistration} registrationSuccessHandler={handleRegistrationSuccess}/>
  )
}

export default Registration;
