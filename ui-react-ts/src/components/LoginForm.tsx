import React, {useState} from "react";
import {LoginRequest, LoginResponse} from "../models/Models";
import {AxiosResponse} from "axios";

interface LoginFormProps {
  loginHandler: (credentials: LoginRequest) => Promise<AxiosResponse<LoginResponse>>
  handleLoginSuccess: (loginResp: LoginResponse) => void
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    props.loginHandler({ username: username, password: password })
      .then(response => {
        console.log("auth success: ", response);
        props.handleLoginSuccess(response.data)
      })
      .catch(err => {
        setError(true)
        console.log("login error", err);
      });
  };

  return (
    <div className="container col-md-6 pb-3">
      <div className="card">
        <div className="card-header text-center">
          <h3>Login Form</h3>
        </div>
        <div className="card-body">
          <form onSubmit={e => handleLogin(e)} className="row justify-content-center">
            {error &&
            <div>
              <p className="text-danger">Invalid credentials. Please try again.</p>
            </div>
            }
            <div className="form-group col-md-10">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder={"Enter your email"}
                className="form-control col-md-12"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                placeholder={"Enter your password"}
                className="form-control col-md-12"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
