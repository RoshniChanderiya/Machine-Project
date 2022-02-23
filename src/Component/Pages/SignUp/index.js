import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate()
  const [usersValues, setUsersValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [eyeCheak, setEyeCheak] = useState(false);
  const toggle = () => {
    setEyeCheak(!eyeCheak)
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUsersValues({ ...usersValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(usersValues)
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }
    try {
      await axios.post(`http://localhost:3001/posts`, {firstName,lastName,email,password} )
      Cookies.set('POCusers', JSON.stringify({ usersValues }))
      navigate("/dashboard");
    } catch (error) {
      console.log("something went wrong");
    }
  };
  const { firstName, lastName, email, password } = usersValues;
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && !usersValues.firstName === "") {
      const setJson = async () => {
        try {
            await axios.post(`http://localhost:30001/posts/`, {firstName,lastName,email,password})
        } catch (error) {
          console.log("Something is Wrong")
        }
      }
      setJson()
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not Valid!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters";
    }
    if (!values.password) {
      errors.confirmPassword = "Confirm password is required"
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password does not match"
    }
    return errors;
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className={styles.container}>
            <form onSubmit={handleSubmit} >
              <h3 className={styles.Heading}>SignUp</h3>
              <p className={styles.disablecolor}>Please fill in this form to create an account!</p>
              <div>
                <div className="input-group mb-3">
                  <input type="text" value={usersValues.firstName}
                    name='firstName'
                    onChange={handleChange}
                    className="form-control"
                    placeholder='First Name'
                     />
                </div>
                <p>{formErrors.firstName}</p>
                <div className="input-group mb-3">
                  <input type="text"
                    value={usersValues.lastName}
                    name='lastName'
                    onChange={handleChange}
                    className="form-control"
                    placeholder='Last Name'
                     />
                </div>
                <p>{formErrors.lastName}</p>
                <div className="input-group mb-3">
                  <input type="text"
                    value={usersValues.email}
                    name='email'
                    onChange={handleChange}
                    className="form-control"
                    placeholder='Email'
                     />
                </div>
                <p>{formErrors.email}</p>
                <div className={`input-group mb-3`}>
                  <input type={eyeCheak ? "text" : "password"}
                    value={usersValues.password}
                    name='password'
                    onChange={handleChange}
                    className={`form-control ${styles.passfield}`}
                    placeholder='Password'
                  />
                  <span className={styles.cheaked}>
                    {
                      (eyeCheak === false) ? <BsFillEyeSlashFill onClick={toggle} /> :
                        <BsFillEyeFill onClick={toggle} />
                    }
                  </span>
                </div>
                <p>{formErrors.password}</p>
                <div>
                  <div className="input-group mb-3">
                    <input type="password"
                      value={usersValues.confirmPassword}
                      name='confirmPassword'
                      onChange={handleChange}
                      className="form-control"
                      placeholder='Confirm password'
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default" />
                  </div>
                  <p>{formErrors.confirmPassword}</p>
                  <button className={styles.button}>Create Your Account</button>
                  <p className={`forgot-password text-right ${styles.disablecolor}`}>
                    Already registered <Link to="/login">Log in? </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;


