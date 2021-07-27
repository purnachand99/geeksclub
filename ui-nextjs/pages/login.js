import React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { login } from '../services/api'

function Login() {
  return (
    <Layout title={"Login"}>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <LoginForm loginHandler={login}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login;
