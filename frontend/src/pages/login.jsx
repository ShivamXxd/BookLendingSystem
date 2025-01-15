import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/logincontext";
import classes from "./login.module.css";

function Login() {
  const postUrl = "http://localhost:3000/user/login";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setCurrentUser } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
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
          <div className={classes.signinTitle}>Login!</div>
          <div className={classes.signinText}>Please enter details to Sign in</div>
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
          <button className={classes.nextButton} onClick={handleLogin}>
            LOGIN
          </button>
          <div className={classes.signupPrompt}>
            <span>Don't have an account? </span>
            <Link to="/register" className={classes.signupLink}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
