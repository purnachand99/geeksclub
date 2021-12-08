import React from "react";
import {Redirect} from "react-router-dom";
import { createUser } from "../services/api";
import { getLoginUser} from "../services/localStorage";
import RegistrationForm from "../components/RegistrationForm";
import {CreateUserRequest, CreateUserResponse, LoginResponse} from "../models/Models";

const Registration = () => {

  const loginUser : LoginResponse | null = getLoginUser();
  if (loginUser?.access_token) {
    return <Redirect to="/" />;
  }

  const handleRegistration = (newUser: CreateUserRequest) => createUser(newUser)

  const handleRegistrationSuccess = (registeredUser: CreateUserResponse) => {
    console.log("registration successful")
    window.location.href = "/";
  };

  return (
    <RegistrationForm registrationHandler={handleRegistration} registrationSuccessHandler={handleRegistrationSuccess}/>
  )
}

export default Registration;
