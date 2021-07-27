import React, { useState } from "react";

const RegistrationForm = ({registrationHandler}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name === "" || email === "" || password === "") {
      return;
    }
    const payload = {
      name,
      email,
      password
    }

    registrationHandler(payload).then(response => {
      console.log("Registration response: ", response)
      window.location = "/login";
    })
      .catch(err => {
        console.error(err)
        setMessage("Registration failed")
        setPassword("");
      });
  }

  return (
    <div>
      <h2>Registration</h2>
      {message && <div className="alert alert-primary" role="alert">{message}</div> }
      <form onSubmit={e => {handleSubmit(e)}}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
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

export default RegistrationForm;
