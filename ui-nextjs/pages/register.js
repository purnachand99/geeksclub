import React from "react";
import Layout from "../components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import { registerUser } from '../services/api'

function Registration() {
  return (
    <Layout title={"Registration"}>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <RegistrationForm registrationHandler={registerUser}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Registration;
