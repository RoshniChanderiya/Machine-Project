import React, { useState, useEffect } from "react";
import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
const LoginPage = () => {
  const navigate = useNavigate();
  const [usersValues, setUsersValues] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [eyeCheak, setEyeCheak] = useState(false);
  const [apiData, setApiData] = useState();
  const getData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/posts")
      setApiData(data.data)
    } catch (error) {
      console.log("Something Went Wrong")
    }
  }
  useEffect(() => {
    if (!apiData) {
      getData()
    }
  }, [formErrors, apiData])
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUsersValues({ ...usersValues, [name]: value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(usersValues))
    const loginEmails = apiData.filter(({ email, password }) => {
      return email === usersValues.email && password === usersValues.password
    })
    if (loginEmails.length > 0) {
      Cookies.set('POCusers', JSON.stringify({ usersValues }))
      navigate("/dashboard")
    } else {
      alert("Invalid userdata");
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email !";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const togglebtn = () => {
    setEyeCheak(prevState => !prevState)
  }
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" className={styles.container}>
            <form onSubmit={loginSubmit}>
              <h3>Log In</h3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  value={usersValues.email}
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  autoComplete='off'
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.email}</p>
              <div className="form-group">
                <label>Password</label>
                <input
                  type={eyeCheak ? "text" : "password"}
                  className={`form-control  ${styles.passfield}`}
                  value={usersValues.password}
                  name="password"
                  placeholder="Password"
                  autoComplete='off'
                  onChange={handleChange}
                />
                <button type="reset" className={`${styles.btn} ${styles.pass} btn`} onClick={togglebtn}>
                  {eyeCheak ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </button>
              </div>
              <p>{formErrors.password}</p>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              <div>
                <p className={`forgot-password text-right ${styles.membertext}`}>
                  Not a Member <Link to="/">SignUp</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;