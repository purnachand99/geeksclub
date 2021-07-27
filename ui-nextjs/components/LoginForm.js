import React, { useState } from "react";
import { setUserAuth } from '../services/localStorage';

const LoginForm = ({loginHandler}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username === "" || password === "") {
      return;
    }
    const payload = {
      username,
      password
    }

    loginHandler(payload).then(response => {
      console.log("Login response: ", response)
      setUserAuth(response)
      //setMessage("Login successful")
      window.location = "/";
    })
      .catch(err => {
        console.error(err)
        setMessage("Login failed")
        //setUsername("");
        setPassword("");
      });
  }

  return (
    <div>
      <h2>Login</h2>
      {message && <div className="alert alert-primary" role="alert">{message}</div> }
      <form onSubmit={e => {handleSubmit(e)}}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" id="email" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
};

export default LoginForm;
