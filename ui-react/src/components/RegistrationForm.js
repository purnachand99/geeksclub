import React, {useState} from "react";

const RegistrationForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleRegistration = e => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError(true);
      setErrorMsg("Please enter all the required fields");
      return;
    }
    props.registrationHandler({ name, email, password })
      .then(response => {
        console.log("registration success: ", response);
        props.registrationSuccessHandler(response.data);
      })
      .catch(err => {
        console.log("Registration error", e);
        setError(true);
        setErrorMsg(err.response.data.detail);
      });
  };

  return (
    <div className="container col-md-6 pb-3">
      <div className="card">
        <div className="card-header text-center">
          <h3>Registration Form</h3>
        </div>
        <div className="card-body">
          <form onSubmit={e => handleRegistration(e)} className="row justify-content-center">
            {error &&
            <div>
              <p className="text-danger">{errorMsg}</p>
            </div>
            }
            <div className="form-group col-md-10">
              <label htmlFor="name">Name*</label>
              <input
                id="name"
                placeholder={"Enter your name"}
                className="form-control col-md-12"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                placeholder={"Enter your email"}
                className="form-control col-md-12"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="password">Password*</label>
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
              <button type="button" className="btn btn-primary" onClick={handleRegistration}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
