import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";

function Register() {
  const postUrl = "http://localhost:3000/user/register";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phno, setPhno] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    const response = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        address,
        phno,
      }),
    });
    // const data = await response.json();
    if (response.ok) {
      navigate("/login");
    } else if (response.status == "501") {
      alert("User already exists!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddress("");
      setPassword("");
      setPhno("");
    } else {
      alert("Failed to Register!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.welcomeSection}>
          <img src="/book.png" alt="Reading" className={classes.illustration} />
          <div className={classes.welcomeText}>
            WELCOME TO <img src="/logo.png" alt="logo" className={classes.logo} />
          </div>
          <div className={classes.welcomeSubtitle}>"Your Gateway to Affordable Reads"</div>
        </div>
        <div className={classes.straightline}></div>
        <div className={classes.signinSection}>
          <div className={classes.signinHeading}>Register!</div>
          <div className={classes.signinDescription}>Please enter details to Register</div>
          <div className={classes.inputSection}>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                placeholder="Enter First Name"
                className={classes.inputField}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <FaUser className={classes.sideIcon} />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                placeholder="Enter Last Name"
                className={classes.inputField}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <FaUser className={classes.sideIcon} />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                placeholder="Enter Email"
                className={classes.inputField}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FaEnvelope className={classes.sideIcon} />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className={classes.inputField}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {showPassword ? <FaEyeSlash className={classes.sideIcon} onClick={togglePasswordVisibility} /> : <FaEye className={classes.sideIcon} onClick={togglePasswordVisibility} />}
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                placeholder="Enter Address"
                className={classes.inputField}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <FaMapMarkerAlt className={classes.sideIcon} />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="number"
                placeholder="Enter Phone Number"
                className={classes.inputField}
                value={phno}
                onChange={(e) => {
                  setPhno(e.target.value);
                }}
              />
              <FaPhone className={classes.sideIcon} />
            </div>
            <button className={classes.nextButton} onClick={handleRegistration}>
              Register
            </button>
          </div>

          <div className={classes.signupPrompt}>
            <span>Already have an account? </span>
            <Link to="/login" className={classes.signupLink}>
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
