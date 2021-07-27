import React from "react";
import {Redirect} from "react-router-dom";
import { login } from "../services/api";
import {setUserAuth, getLoginUser} from "../services/localStorage";
import LoginForm from "../components/LoginForm";

const Login = () => {

  const user = getLoginUser() || {};
  if (user['access_token']) {
    return <Redirect to="/" />;
  }

  const handleLogin = credentials => login(credentials)
  const handleLoginSuccess = user => {
    setUserAuth(user);
    window.location = "/";
  };

  return (
    <LoginForm loginHandler={handleLogin} handleLoginSuccess={handleLoginSuccess}/>
  )
}

export default Login;
