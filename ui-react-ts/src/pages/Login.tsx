import React from "react";
import {Redirect} from "react-router-dom";
import { login } from "../services/api";
import {setUserAuth, getLoginUser} from "../services/localStorage";
import LoginForm from "../components/LoginForm";
import {LoginRequest, LoginResponse} from "../models/Models";

const Login = () => {

  const loginUser : LoginResponse | null = getLoginUser();
  if (loginUser?.access_token) {
    return <Redirect to="/" />;
  }

  const handleLogin = (credentials: LoginRequest) => login(credentials)

  const handleLoginSuccess = (user: LoginResponse) => {
    setUserAuth(user);
    window.location.href = "/";
  };

  return (
    <LoginForm loginHandler={handleLogin} handleLoginSuccess={handleLoginSuccess}/>
  )
}

export default Login;
